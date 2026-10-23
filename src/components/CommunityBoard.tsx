import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { 
  MessageSquare, 
  ThumbsUp, 
  Search, 
  Plus, 
  Pin, 
  Send, 
  Filter, 
  User, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export const CommunityBoard: React.FC = () => {
  const { 
    communityThreads, 
    courses, 
    addCommunityThread, 
    replyToCommunityThread, 
    toggleUpvoteThread,
    currentRole,
    adminDeleteThread,
    adminTogglePinThread
  } = useLearning();

  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewQuestionOpen, setIsNewQuestionOpen] = useState(false);
  const [newCourseId, setNewCourseId] = useState(courses[0]?.id || '');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // Active expanded thread for replies
  const [expandedThreadId, setExpandedThreadId] = useState<string | null>(communityThreads[0]?.id || null);
  const [replyInput, setReplyInput] = useState<{ [threadId: string]: string }>({});

  const filteredThreads = communityThreads
    .filter(t => {
      const matchesCourse = selectedCourseFilter === 'all' || t.courseId === selectedCourseFilter;
      const matchesSearch = 
        t.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.contentBn.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCourse && matchesSearch;
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return b.upvotes - a.upvotes;
    });

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    addCommunityThread(newCourseId, newTitle, newContent);
    setNewTitle('');
    setNewContent('');
    setIsNewQuestionOpen(false);
  };

  const handleSendReply = (threadId: string) => {
    const text = replyInput[threadId]?.trim();
    if (!text) return;
    replyToCommunityThread(threadId, text);
    setReplyInput(prev => ({ ...prev, [threadId]: '' }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-medium text-slate-900 tracking-tight">
            শিক্ষার্থী কমিউনিটি ফোরাম ও প্রশ্নোত্তর
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            কোর্স চলাকালীন আপনার যে কোনো সমস্যার সমাধান খুঁজুন, কোড শেয়ার করুন ও সহপাঠীদের সাথে মতবিনিময় করুন।
          </p>
        </div>

        <button
          onClick={() => setIsNewQuestionOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors shadow-xs shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন প্রশ্ন করুন</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="আলোচনা বা সমস্যার বিষয় লিখে সার্চ করুন..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        {/* Course Filter Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="w-full md:w-auto px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">সকল কোর্সের প্রশ্ন</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.titleBn}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Questions & Discussion List */}
      <div className="space-y-4">
        {filteredThreads.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-slate-500 text-xs">
            কোনো আলোচনা পাওয়া যায়নি। আপনার কোনো জিজ্ঞাসা থাকলে প্রথম প্রশ্নটি পোস্ট করুন!
          </div>
        ) : (
          filteredThreads.map((thread) => {
            const isExpanded = expandedThreadId === thread.id;

            return (
              <div 
                key={thread.id} 
                className={`bg-white rounded-lg border transition-all ${
                  thread.isPinned ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="p-5 space-y-3">
                  
                  {/* Meta row */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      {thread.isPinned && (
                        <span className="flex items-center gap-1 text-[11px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-medium">
                          <Pin className="w-3 h-3" />
                          পিন করা
                        </span>
                      )}
                      <span className="font-medium text-slate-800">{thread.authorName}</span>
                      {thread.authorRole === 'superadmin' && (
                        <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded font-medium">
                          সুপার অ্যাডমিন
                        </span>
                      )}
                      <span className="text-slate-300">·</span>
                      <span className="text-indigo-600 truncate max-w-xs">{thread.courseTitleBn}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-400">{thread.createdAt}</span>
                    </div>

                    {/* Admin Moderation Controls if in superadmin mode */}
                    {currentRole === 'superadmin' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => adminTogglePinThread(thread.id)}
                          className="text-[11px] text-amber-700 hover:underline"
                        >
                          {thread.isPinned ? 'আনপিন করুন' : 'পিন করুন'}
                        </button>
                        <button
                          onClick={() => adminDeleteThread(thread.id)}
                          className="text-[11px] text-rose-600 hover:underline"
                        >
                          মুছুন
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Title & Content */}
                  <div>
                    <h3 className="text-base font-medium text-slate-900 leading-snug">
                      {thread.titleBn}
                    </h3>
                    <p className="text-xs text-slate-700 mt-1.5 leading-relaxed font-normal">
                      {thread.contentBn}
                    </p>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleUpvoteThread(thread.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                          thread.userUpvoted
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${thread.userUpvoted ? 'fill-indigo-600' : ''}`} />
                        <span className="tabular-nums">{thread.upvotes}</span>
                        <span className="hidden sm:inline">সহায়ক</span>
                      </button>

                      <button
                        onClick={() => setExpandedThreadId(isExpanded ? null : thread.id)}
                        className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 px-2 py-1 rounded-md hover:bg-slate-50 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span className="tabular-nums">{thread.replies.length}টি উত্তর</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setExpandedThreadId(isExpanded ? null : thread.id)}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      {isExpanded ? 'উত্তর গুটিয়ে রাখুন' : 'উত্তর দিন বা দেখুন'}
                    </button>
                  </div>

                </div>

                {/* Expanded Replies Section */}
                {isExpanded && (
                  <div className="border-t border-slate-100 bg-slate-50/60 p-5 space-y-4">
                    
                    {/* Reply list */}
                    {thread.replies.length > 0 ? (
                      <div className="space-y-3">
                        {thread.replies.map((reply) => (
                          <div key={reply.id} className="bg-white p-3.5 rounded-lg border border-slate-200/80 space-y-1.5">
                            <div className="flex items-center justify-between text-[11px] text-slate-500">
                              <div className="flex items-center gap-1.5">
                                <span className="font-medium text-slate-800">{reply.authorName}</span>
                                {reply.authorRole === 'instructor' && (
                                  <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-medium">
                                    মেন্টর
                                  </span>
                                )}
                                {reply.authorRole === 'superadmin' && (
                                  <span className="bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded font-medium">
                                    অ্যাডমিন
                                  </span>
                                )}
                              </div>
                              <span>{reply.createdAt}</span>
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed font-normal">
                              {reply.contentBn}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic">এখনও কোনো উত্তর আসেনি। প্রথম উত্তরটি আপনিই লিখুন!</p>
                    )}

                    {/* New Reply Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={replyInput[thread.id] || ''}
                        onChange={(e) => setReplyInput(prev => ({ ...prev, [thread.id]: e.target.value }))}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendReply(thread.id)}
                        placeholder="আপনার উত্তর বা মতামত লিখুন..."
                        className="flex-1 px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      />
                      <button
                        onClick={() => handleSendReply(thread.id)}
                        disabled={!replyInput[thread.id]?.trim()}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>পাঠান</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* New Question Modal */}
      {isNewQuestionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-lg border border-slate-200 shadow-xl overflow-hidden p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-semibold text-slate-900">
              ফোরামে নতুন প্রশ্ন জিজ্ঞাসা করুন
            </h3>

            <form onSubmit={handleCreateQuestion} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  কোর্স নির্বাচন করুন
                </label>
                <select
                  value={newCourseId}
                  onChange={(e) => setNewCourseId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.titleBn}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  প্রশ্নের শিরোনাম
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="যেমন: রিয়্যাক্ট রাউটারে 404 পেজ কীভাবে হ্যান্ডল করব?"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  বিস্তারিত বিবরণ ও কোড/ডিজাইন রেফারেন্স
                </label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                  placeholder="আপনি কী করতে চেয়েছিলেন এবং কী সমস্যা হচ্ছে তা বিস্তারিত লিখুন..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewQuestionOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs rounded-lg"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg"
                >
                  প্রশ্ন পোস্ট করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
