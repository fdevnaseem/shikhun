import React from 'react';
import { useLearning } from '../context/LearningContext';
import { 
  GraduationCap, 
  Flame, 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  Trophy, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';

export type AppView = 'home' | 'courses' | 'classroom' | 'community' | 'leaderboard' | 'admin';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  const { gamification, currentRole, setRole, enrolledProgress } = useLearning();
  const enrolledCount = Object.keys(enrolledProgress).length;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          
          {/* Zone 1: Brand Wordmark (Navigates to Home) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-2.5 text-left group transition-transform active:scale-95 cursor-pointer"
              title="শিখুন হোমপেজে যান"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-2xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  শিখুন
                </span>
                <span className="text-[10px] text-slate-500 -mt-1 font-normal tracking-wide">
                  শিলিগুরির আলোয় নতুন ক্যারিয়ার
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean, No Redundant Home Button) */}
          <nav className="hidden md:flex items-center gap-7 text-[14px] font-normal text-slate-600">
            <button
              onClick={() => setCurrentView('courses')}
              className={`transition-colors hover:text-indigo-600 flex items-center gap-1.5 py-1 ${
                currentView === 'courses'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium'
                  : ''
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>সকল কোর্স</span>
            </button>

            <button
              onClick={() => setCurrentView('classroom')}
              className={`transition-colors hover:text-indigo-600 flex items-center gap-1.5 py-1 ${
                currentView === 'classroom'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium'
                  : ''
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>আমার ক্লাসরুম</span>
              {enrolledCount > 0 && (
                <span className="text-[11px] bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded font-mono">
                  {enrolledCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentView('community')}
              className={`transition-colors hover:text-indigo-600 flex items-center gap-1.5 py-1 ${
                currentView === 'community'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium'
                  : ''
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>কমিউনিটি ফোরাম</span>
            </button>

            <button
              onClick={() => setCurrentView('leaderboard')}
              className={`transition-colors hover:text-indigo-600 flex items-center gap-1.5 py-1 ${
                currentView === 'leaderboard'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium'
                  : ''
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>লিডারবোর্ড</span>
            </button>

            {currentRole === 'superadmin' && (
              <button
                onClick={() => setCurrentView('admin')}
                className={`transition-colors hover:text-amber-600 flex items-center gap-1.5 py-1 ${
                  currentView === 'admin'
                    ? 'text-amber-700 border-b-2 border-amber-600 font-medium'
                    : 'text-amber-700'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>সুপার অ্যাডমিন</span>
              </button>
            )}
          </nav>

          {/* Zone 3: Gamification Stats & Role Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Gamification Stats */}
            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-slate-50/90 border border-slate-200/70 rounded-lg text-xs text-slate-600">
              <div className="flex items-center gap-1 text-amber-600" title="দৈনিক স্ট্রিক">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="font-semibold text-slate-800 tabular-nums">{gamification.streakDays}</span>
                <span className="text-slate-500 text-[11px]">দিন</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1 text-emerald-600" title="অর্জিত মোট এক্সপি">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span className="font-semibold text-slate-800 tabular-nums">{gamification.xp}</span>
                <span className="text-slate-500 text-[11px]">XP</span>
              </div>
            </div>

            {/* Role Switcher Button */}
            <button
              onClick={() => {
                const nextRole = currentRole === 'student' ? 'superadmin' : 'student';
                setRole(nextRole);
                if (nextRole === 'superadmin') {
                  setCurrentView('admin');
                } else if (currentView === 'admin') {
                  setCurrentView('home');
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                currentRole === 'superadmin'
                  ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title="শিক্ষার্থী এবং সুপার অ্যাডমিন ভিউয়ের মধ্যে সুইচ করুন"
            >
              {currentRole === 'superadmin' ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">অ্যাডমিন মোড</span>
                  <span className="sm:hidden">অ্যাডমিন</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">শিক্ষার্থী মোড</span>
                  <span className="sm:hidden">ছাত্র</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sub-Navigation Bar (Home removed, logo handles it) */}
      <div className="flex md:hidden items-center justify-around border-t border-slate-100 py-2 px-2 bg-white text-xs text-slate-600 overflow-x-auto">
        <button
          onClick={() => setCurrentView('courses')}
          className={`px-2 py-1 whitespace-nowrap ${currentView === 'courses' ? 'text-indigo-600 font-medium' : ''}`}
        >
          সকল কোর্স
        </button>
        <button
          onClick={() => setCurrentView('classroom')}
          className={`px-2 py-1 whitespace-nowrap ${currentView === 'classroom' ? 'text-indigo-600 font-medium' : ''}`}
        >
          ক্লাসরুম {enrolledCount > 0 && `(${enrolledCount})`}
        </button>
        <button
          onClick={() => setCurrentView('community')}
          className={`px-2 py-1 whitespace-nowrap ${currentView === 'community' ? 'text-indigo-600 font-medium' : ''}`}
        >
          কমিউনিটি
        </button>
        <button
          onClick={() => setCurrentView('leaderboard')}
          className={`px-2 py-1 whitespace-nowrap ${currentView === 'leaderboard' ? 'text-indigo-600 font-medium' : ''}`}
        >
          লিডারবোর্ড
        </button>
        {currentRole === 'superadmin' && (
          <button
            onClick={() => setCurrentView('admin')}
            className={`px-2 py-1 whitespace-nowrap text-amber-700 ${currentView === 'admin' ? 'font-medium underline' : ''}`}
          >
            অ্যাডমিন
          </button>
        )}
      </div>
    </header>
  );
};
