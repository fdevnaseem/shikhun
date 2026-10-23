import React, { useState } from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CourseCard } from './components/CourseCard';
import { ClassroomPlayer } from './components/ClassroomPlayer';
import { CommunityBoard } from './components/CommunityBoard';
import { LeaderboardView } from './components/LeaderboardView';
import { AdminPanel } from './components/AdminPanel';
import { CourseCategory } from './types';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Heart
} from 'lucide-react';

const MainApp: React.FC = () => {
  const { 
    courses, 
    enrolledProgress, 
    activeCourseId, 
    setActiveCourseId,
    currentRole 
  } = useLearning();

  const [currentView, setCurrentView] = useState<'catalog' | 'classroom' | 'community' | 'leaderboard' | 'admin'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('all');

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = 
      course.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subtitleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const enrolledCourseIds = Object.keys(enrolledProgress);
  const enrolledCoursesList = courses.filter(c => enrolledCourseIds.includes(c.id));

  const handleOpenClassroom = (courseId: string) => {
    setActiveCourseId(courseId);
    setCurrentView('classroom');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 font-['Hind_Siliguri',sans-serif]">
      
      {/* Strict 3-zone Top Bar Navigation */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* VIEW 1: CATALOG & DISCOVERY */}
        {currentView === 'catalog' && (
          <div className="space-y-12">
            
            {/* Hero Section */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              enrolledCount={enrolledCourseIds.length}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
              
              {/* Enrolled Courses Strip (if student has enrolled courses) */}
              {enrolledCoursesList.length > 0 && !searchQuery && selectedCategory === 'all' && (
                <div className="p-6 rounded-lg bg-indigo-50/50 border border-indigo-100/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-indigo-600" />
                      <h2 className="text-base font-semibold text-slate-900">
                        আপনার চলমান পড়াশোনা ({enrolledCoursesList.length}টি কোর্স)
                      </h2>
                    </div>
                    <button
                      onClick={() => {
                        setActiveCourseId(enrolledCoursesList[0].id);
                        setCurrentView('classroom');
                      }}
                      className="text-xs text-indigo-700 hover:text-indigo-800 font-medium inline-flex items-center gap-1"
                    >
                      <span>ক্লাসরুমে যান</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {enrolledCoursesList.map((course) => {
                      const progress = enrolledProgress[course.id];
                      const total = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
                      const done = progress?.completedLessonIds.length || 0;
                      const pct = total > 0 ? Math.round((done / total) * 100) : 0;

                      return (
                        <div 
                          key={course.id}
                          onClick={() => handleOpenClassroom(course.id)}
                          className="bg-white p-4 rounded-lg border border-indigo-100/90 shadow-2xs hover:border-indigo-300 cursor-pointer transition-all flex flex-col justify-between space-y-3"
                        >
                          <div>
                            <span className="text-[11px] text-indigo-600 font-medium">{course.categoryLabelBn}</span>
                            <h3 className="text-xs font-semibold text-slate-900 line-clamp-1 mt-0.5">{course.titleBn}</h3>
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                              <span>অগ্রগতি</span>
                              <span className="font-mono text-emerald-600 font-semibold">{pct}%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* All Curated Courses Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-medium text-slate-900 tracking-tight">
                      {selectedCategory === 'all' ? 'জনপ্রিয় ও ক্যারিয়ারমুখী কোর্সসমূহ' : 'নির্বাচিত কোর্সসমূহ'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      মোট {filteredCourses.length}টি কোর্স পাওয়া গেছে
                    </p>
                  </div>
                </div>

                {filteredCourses.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-xs text-slate-500">
                    কোনো কোর্স পাওয়া যায়নি। অন্য কোনো কি-ওয়ার্ড দিয়ে সার্চ করুন।
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        onOpenClassroom={handleOpenClassroom}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Why Learn With Shikhun Section */}
              <div className="p-8 bg-white border border-slate-200/90 rounded-lg">
                <div className="max-w-2xl mx-auto text-center space-y-2 mb-8">
                  <span className="text-xs font-medium text-indigo-600 tracking-wider">আমাদের স্বাতন্ত্র্য</span>
                  <h2 className="text-2xl font-medium text-slate-900">
                    কেন ‘শিখুন’ শিক্ষার্থীদের প্রথম পছন্দ?
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    আমরা গতানুগতিক ভিডিও দেখার চেয়ে সক্রিয় প্রজেক্ট তৈরি এবং তাৎক্ষণিক কুইজ মূল্যায়নে বিশ্বাস করি।
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                  <div className="p-4 rounded-lg bg-slate-50/70 border border-slate-100 space-y-2">
                    <div className="w-9 h-9 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold text-xs">
                      ০১
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">গেইমিফাইড লার্নিং ও XP রিওয়ার্ড</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      প্রতিটি লেকচারের পর কুইজে অংশগ্রহণ করে এক্সপি অর্জন করুন এবং জাতীয় লিডারবোর্ডে নিজের অবস্থান তুলে ধরুন।
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50/70 border border-slate-100 space-y-2">
                    <div className="w-9 h-9 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold text-xs">
                      ০২
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">মুদ্রণযোগ্য পিডিএফ ও সোর্স ফাইল</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      ক্লাসের পাশাপাশি রিভিশন ও প্র্যাকটিসের জন্য প্রতিটি পাঠে দেওয়া আছে সম্পূর্ণ বাংলা হ্যান্ডআউট ও চিটশিট।
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50/70 border border-slate-100 space-y-2">
                    <div className="w-9 h-9 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center font-semibold text-xs">
                      ০৩
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">সক্রিয় সহপাঠী কমিউনিটি</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      কোডিং বা ডিজাইনে আটকে গেলে ফোরামে প্রশ্ন করুন। সিনিয়র মেন্টর ও সহপাঠীরা দ্রুত সমাধান দিয়ে সাহায্য করবে।
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* VIEW 2: CLASSROOM PLAYER */}
        {currentView === 'classroom' && (
          <ClassroomPlayer
            courseId={activeCourseId || enrolledCourseIds[0] || courses[0].id}
            onBackToCatalog={() => setCurrentView('catalog')}
          />
        )}

        {/* VIEW 3: COMMUNITY BOARD */}
        {currentView === 'community' && (
          <CommunityBoard />
        )}

        {/* VIEW 4: LEADERBOARD & XP */}
        {currentView === 'leaderboard' && (
          <LeaderboardView />
        )}

        {/* VIEW 5: SUPER ADMIN CONTROL PANEL */}
        {currentView === 'admin' && (
          <AdminPanel />
        )}

      </main>

      {/* Clean, Non-slop Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center text-xs font-semibold">
              শি
            </div>
            <span className="font-medium text-slate-800">শিখুন — বাংলা ই-লার্নিং প্ল্যাটফর্ম</span>
            <span>·</span>
            <span>সর্বস্বত্ব সংরক্ষিত ২০২৬</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentView('catalog')} className="hover:text-indigo-600 transition-colors">
              সকল কোর্স
            </button>
            <button onClick={() => setCurrentView('community')} className="hover:text-indigo-600 transition-colors">
              কমিউনিটি
            </button>
            <button onClick={() => setCurrentView('leaderboard')} className="hover:text-indigo-600 transition-colors">
              লিডারবোর্ড
            </button>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              বাংলাদেশি শিক্ষার্থীদের জন্য নিবেদিত
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <LearningProvider>
      <MainApp />
    </LearningProvider>
  );
}
