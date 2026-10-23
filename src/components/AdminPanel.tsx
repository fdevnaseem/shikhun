import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { Course, Lesson, Chapter, CourseCategory } from '../types';
import { 
  ShieldCheck, 
  BookOpen, 
  Users, 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  RotateCcw, 
  Video, 
  FileDown, 
  Sparkles, 
  HelpCircle,
  Eye,
  Pin
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { 
    courses, 
    communityThreads, 
    enrolledProgress,
    adminAddCourse, 
    adminDeleteCourse,
    adminAddLesson,
    adminDeleteLesson,
    adminResetProgress,
    adminDeleteThread,
    adminTogglePinThread
  } = useLearning();

  const [activeTab, setActiveTab] = useState<'courses' | 'students' | 'moderation'>('courses');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');

  // Add course form modal state
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseSubtitle, setNewCourseSubtitle] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState<CourseCategory>('web-dev');
  const [newCourseInstructor, setNewCourseInstructor] = useState('');
  const [newCourseHours, setNewCourseHours] = useState('২৪ ঘণ্টা');

  // Add lesson form state
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [targetChapterId, setTargetChapterId] = useState('');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonDuration, setNewLessonDuration] = useState('২০ মিনিট');
  const [newLessonVideoUrl, setNewLessonVideoUrl] = useState('https://www.youtube.com/embed/SccSCuHhOw0');
  const [newLessonSummary, setNewLessonSummary] = useState('');
  const [newLessonPdfTitle, setNewLessonPdfTitle] = useState('Lecture_Handout.pdf');

  // Selected course object
  const selectedCourse = courses.find(c => c.id === selectedCourseId) || courses[0];

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      titleBn: newCourseTitle,
      subtitleBn: newCourseSubtitle || 'ব্যবহারিক প্রজেক্ট ও আধুনিক স্কিল ভিত্তিক নতুন কোর্স।',
      category: newCourseCategory,
      categoryLabelBn: newCourseCategory === 'web-dev' ? 'প্রোগ্রামিং' : newCourseCategory === 'ui-ux' ? 'ইউআই/ইউএক্স' : 'ফ্রিল্যান্সিং',
      instructor: newCourseInstructor || 'সুপার অ্যাডমিন ইনস্ট্রাক্টর',
      instructorRole: 'Course Specialist, Shikhun',
      enrolledCount: 0,
      rating: 5.0,
      levelBn: 'সকল শিক্ষার্থীর জন্য',
      totalHours: newCourseHours,
      colorScheme: 'indigo',
      chapters: [
        {
          id: `ch-${Date.now()}`,
          titleBn: 'অধ্যায় ১: প্রাথমিক প্রস্তুতি ও ওরিয়েন্টেশন',
          lessons: [
            {
              id: `l-${Date.now()}`,
              titleBn: '১.১ পরিচিতি ও কোর্সের রোডম্যাপ',
              duration: '১৫ মিনিট',
              videoUrl: 'https://www.youtube.com/embed/SccSCuHhOw0',
              summaryBn: 'এই কোর্সের লক্ষ্য ও ভবিষ্যৎ ক্যারিয়ার স্কোপ নিয়ে দিকনির্দেশনা।',
              pdfTitle: 'Course_Roadmap_BN.pdf'
            }
          ]
        }
      ]
    };

    adminAddCourse(newCourse);
    setSelectedCourseId(newCourse.id);
    setIsAddCourseModalOpen(false);
    setNewCourseTitle('');
    setNewCourseSubtitle('');
    setNewCourseInstructor('');
  };

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim() || !selectedCourse || !targetChapterId) return;

    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      titleBn: newLessonTitle,
      duration: newLessonDuration,
      videoUrl: newLessonVideoUrl,
      summaryBn: newLessonSummary || 'এই লেকচারের মূল আলোচনা ও সোর্স পয়েন্ট।',
      pdfTitle: newLessonPdfTitle,
      quiz: {
        id: `quiz-${Date.now()}`,
        titleBn: `${newLessonTitle} কুইজ মূল্যায়ন`,
        passPercentage: 70,
        xpReward: 120,
        questions: [
          {
            id: `q-${Date.now()}`,
            questionBn: 'এই লেকচারে আলোচিত মূল ধারণার ক্ষেত্রে কোনটি সত্য?',
            optionsBn: [
              'এটি কোড ও কাজের গতি বৃদ্ধি করে',
              'এটি অপ্রয়োজনীয় জটিলতা বাড়ায়',
              'এটি কেবল পুরনো সফটওয়্যারে কাজ করে',
              'কোনোটিই নয়'
            ],
            correctIndex: 0,
            explanationBn: 'সঠিক ওয়ার্কফ্লো অনুসরণের মাধ্যমে ডেভেলপমেন্টের কার্যকারিতা বহুগুণ বৃদ্ধি পায়।'
          }
        ]
      }
    };

    adminAddLesson(selectedCourse.id, targetChapterId, newLesson);
    setIsAddLessonModalOpen(false);
    setNewLessonTitle('');
    setNewLessonSummary('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Super Admin Welcome Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded text-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>সুপার অ্যাডমিন কন্ট্রোল রুম (Super Admin Portal)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-medium tracking-tight">
            কোর্স কনটেন্ট ও শিক্ষার্থী অগ্রগতি নিয়ন্ত্রণ
          </h1>
          <p className="text-xs text-slate-400 font-normal">
            প্ল্যাটফর্মের সকল কোর্স, লেকচার ভিডিও, পিডিএফ হ্যান্ডআউট ও কুইজ পরিচালনা করার একক অ্যাডমিন ড্যাশবোর্ড।
          </p>
        </div>

        {/* Global Key Metrics */}
        <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-6">
          <div>
            <span className="text-[11px] text-slate-400 block">মোট নিবন্ধিত শিক্ষার্থী</span>
            <span className="text-xl font-semibold font-mono text-emerald-400">৫,২৯০+</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">কোর্স সমাপ্তি হার</span>
            <span className="text-xl font-semibold font-mono text-indigo-400">৭৪.২%</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === 'courses'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>কোর্স ও কনটেন্ট পরিচালনা</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === 'students'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>শিক্ষার্থীদের অগ্রগতি ট্র্যাকিং</span>
        </button>

        <button
          onClick={() => setActiveTab('moderation')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === 'moderation'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>কমিউনিটি মডারেশন ({communityThreads.length})</span>
        </button>
      </div>

      {/* TAB 1: Courses & Content Manager */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          
          {/* Course Selector & Add Course Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white border border-slate-200/90 rounded-lg">
            <div className="flex items-center gap-3">
              <label className="text-xs font-medium text-slate-700 whitespace-nowrap">
                কোর্স সিলেক্ট করুন:
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.titleBn} ({c.categoryLabelBn})</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddCourseModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>নতুন কোর্স যোগ করুন</span>
              </button>

              <button
                onClick={() => adminDeleteCourse(selectedCourse.id)}
                disabled={courses.length <= 1}
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs rounded-lg transition-colors disabled:opacity-40"
                title="কোর্সটি মুছে ফেলুন"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>কোর্স মুছুন</span>
              </button>
            </div>
          </div>

          {/* Selected Course Details Card */}
          {selectedCourse && (
            <div className="bg-white border border-slate-200/90 rounded-lg p-6 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[11px] text-indigo-600 font-medium">ক্যাটাগরি: {selectedCourse.categoryLabelBn}</span>
                  <h2 className="text-lg font-medium text-slate-900 mt-0.5">{selectedCourse.titleBn}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">মেন্টর: {selectedCourse.instructor} · {selectedCourse.totalHours}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (selectedCourse.chapters[0]?.id) {
                        setTargetChapterId(selectedCourse.chapters[0].id);
                        setIsAddLessonModalOpen(true);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>নতুন লেকচার যুক্ত করুন</span>
                  </button>
                </div>
              </div>

              {/* Chapters & Lessons Tree */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold text-slate-800">
                  সিলেবাস ও লেকচার কনটেন্ট কাঠামো ({selectedCourse.chapters.length}টি অধ্যায়)
                </h3>

                {selectedCourse.chapters.map((chapter) => (
                  <div key={chapter.id} className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-100">
                      <span className="text-xs font-semibold text-slate-800">{chapter.titleBn}</span>
                      <button
                        onClick={() => {
                          setTargetChapterId(chapter.id);
                          setIsAddLessonModalOpen(true);
                        }}
                        className="text-[11px] text-indigo-600 hover:underline flex items-center gap-1 font-medium"
                      >
                        <Plus className="w-3 h-3" />
                        এই অধ্যায়ে লেকচার যোগ করুন
                      </button>
                    </div>

                    <div className="divide-y divide-slate-100 p-2">
                      {chapter.lessons.map((lesson) => (
                        <div key={lesson.id} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 rounded transition-colors">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-slate-900">{lesson.titleBn}</span>
                              <span className="text-[11px] text-slate-400 font-mono">({lesson.duration})</span>
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-slate-500">
                              <span className="flex items-center gap-1 text-indigo-600">
                                <Video className="w-3 h-3" />
                                ভিডিও লিঙ্ক সংযুক্ত
                              </span>
                              {lesson.pdfTitle && (
                                <span className="flex items-center gap-1 text-rose-600">
                                  <FileDown className="w-3 h-3" />
                                  {lesson.pdfTitle}
                                </span>
                              )}
                              {lesson.quiz && (
                                <span className="flex items-center gap-1 text-amber-600">
                                  <Sparkles className="w-3 h-3" />
                                  কুইজ টেস্ট ({lesson.quiz.questions.length}টি প্রশ্ন)
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => adminDeleteLesson(selectedCourse.id, chapter.id, lesson.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                              title="লেকচার মুছে ফেলুন"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      )}

      {/* TAB 2: Students Progress Monitoring */}
      {activeTab === 'students' && (
        <div className="bg-white border border-slate-200/90 rounded-lg overflow-hidden space-y-4 p-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              নিবন্ধিত শিক্ষার্থীদের অগ্রগতি ও মাইলস্টোন
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              শিক্ষার্থীরা কোন কোর্সে কত শতাংশ লেকচার শেষ করেছে এবং কুইজ স্কোর কত তা পর্যবেক্ষণ করুন।
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-medium">
                  <th className="py-3 px-4">শিক্ষার্থীর নাম</th>
                  <th className="py-3 px-4">এনরোল্ড কোর্স</th>
                  <th className="py-3 px-4">সম্পন্ন লেকচার</th>
                  <th className="py-3 px-4">কোর্স সমাপ্তি হার</th>
                  <th className="py-3 px-4">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((course) => {
                  const progress = enrolledProgress[course.id];
                  const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
                  const completed = progress?.completedLessonIds.length || 0;
                  const percent = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

                  return (
                    <tr key={course.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        তানভীর আহমেদ (লগইন করা ইউজার)
                      </td>
                      <td className="py-3.5 px-4 text-indigo-700 font-medium">
                        {course.titleBn}
                      </td>
                      <td className="py-3.5 px-4 tabular-nums text-slate-600">
                        {completed} / {totalLessons}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full" style={{ width: `${percent}%` }} />
                          </div>
                          <span className="font-mono text-slate-700 tabular-nums">{percent}%</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => adminResetProgress(course.id)}
                          className="inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 border border-slate-200 px-2 py-1 rounded hover:bg-slate-100 transition-colors"
                          title="শিক্ষার্থীর এই কোর্সের অগ্রগতি রিসেট করুন"
                        >
                          <RotateCcw className="w-3 h-3 text-amber-600" />
                          <span>অগ্রগতি রিসেট</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Community Moderation */}
      {activeTab === 'moderation' && (
        <div className="bg-white border border-slate-200/90 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              ফোরাম ও প্রশ্নোত্তর মডারেশন
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              শিক্ষার্থীদের পোস্ট রিভিউ করুন, গুরুত্বপূর্ণ প্রশ্ন পিন করুন বা স্প্যাম প্রশ্ন মুছে ফেলুন।
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {communityThreads.map((thread) => (
              <div key={thread.id} className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-medium text-slate-800">{thread.authorName}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-indigo-600">{thread.courseTitleBn}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-400">{thread.createdAt}</span>
                    {thread.isPinned && (
                      <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded font-medium">
                        পিন করা
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900">{thread.titleBn}</h4>
                  <p className="text-xs text-slate-600">{thread.contentBn}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => adminTogglePinThread(thread.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs border border-slate-200 text-slate-700 hover:bg-slate-50 rounded"
                  >
                    <Pin className="w-3 h-3" />
                    <span>{thread.isPinned ? 'আনপিন' : 'পিন'}</span>
                  </button>

                  <button
                    onClick={() => adminDeleteThread(thread.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs border border-rose-200 text-rose-600 hover:bg-rose-50 rounded"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>মুছুন</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {isAddCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-lg border border-slate-200 shadow-xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-semibold text-slate-900">
              নতুন কোর্স তৈরি করুন
            </h3>

            <form onSubmit={handleCreateCourse} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">কোর্সের শিরোনাম (বাংলায়)</label>
                <input
                  type="text"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="যেমন: পাইথন প্রোগ্রামিং ও ডেটা সায়েন্স"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">ক্যাটাগরি</label>
                <select
                  value={newCourseCategory}
                  onChange={(e) => setNewCourseCategory(e.target.value as CourseCategory)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md"
                >
                  <option value="web-dev">ওয়েব প্রোগ্রামিং</option>
                  <option value="ui-ux">ইউআই/ইউএক্স ডিজাইন</option>
                  <option value="freelancing">ফ্রিল্যান্সিং ক্যারিয়ার</option>
                  <option value="graphics">গ্রাফিক্স ও ভিডিও</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">প্রধান মেন্টরের নাম</label>
                <input
                  type="text"
                  value={newCourseInstructor}
                  onChange={(e) => setNewCourseInstructor(e.target.value)}
                  placeholder="যেমন: তানভীর আহমেদ"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">সংক্ষিপ্ত বিবরণ</label>
                <textarea
                  value={newCourseSubtitle}
                  onChange={(e) => setNewCourseSubtitle(e.target.value)}
                  rows={2}
                  placeholder="কোর্সের মূল উদ্দেশ্য ও আউটকাম..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddCourseModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 text-xs rounded-lg"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg"
                >
                  কোর্স তৈরি করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {isAddLessonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-lg border border-slate-200 shadow-xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-semibold text-slate-900">
              নতুন লেকচার যুক্ত করুন
            </h3>

            <form onSubmit={handleCreateLesson} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">লেকচারের শিরোনাম</label>
                <input
                  type="text"
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  placeholder="যেমন: ৩.১ ডেটাবেজ স্কিমা ও মাইগ্রেশন"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">সময়কাল</label>
                  <input
                    type="text"
                    value={newLessonDuration}
                    onChange={(e) => setNewLessonDuration(e.target.value)}
                    placeholder="যেমন: ২০ মিনিট"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">পিডিএফ হ্যান্ডআউটের নাম</label>
                  <input
                    type="text"
                    value={newLessonPdfTitle}
                    onChange={(e) => setNewLessonPdfTitle(e.target.value)}
                    placeholder="Lecture_Slide.pdf"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">ভিডিও এম্বেড URL</label>
                <input
                  type="text"
                  value={newLessonVideoUrl}
                  onChange={(e) => setNewLessonVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">লেকচার সামারি নোটস</label>
                <textarea
                  value={newLessonSummary}
                  onChange={(e) => setNewLessonSummary(e.target.value)}
                  rows={3}
                  placeholder="শিক্ষার্থীদের জন্য কী কী শিখন পয়েন্ট থাকবে..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddLessonModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 text-xs rounded-lg"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg"
                >
                  লেকচার যুক্ত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
