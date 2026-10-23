import React from 'react';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';
import { 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Palette, 
  Briefcase, 
  Trophy, 
  Flame, 
  FileText, 
  ShieldCheck, 
  Star,
  Compass
} from 'lucide-react';

interface MarketingHomeProps {
  onNavigateToCourses: () => void;
  onNavigateToClassroom: () => void;
  enrolledCount: number;
}

export const MarketingHome: React.FC<MarketingHomeProps> = ({
  onNavigateToCourses,
  onNavigateToClassroom,
  enrolledCount
}) => {
  return (
    <div className="relative space-y-28 pb-24 pt-6 sm:pt-10">
      
      {/* Continuous Full-Viewport 3D Mascot Canvas (Follows the scroll corridors) */}
      <ThreeHeroCanvas />

      {/* 1. HERO SECTION (Left Weighted: Mascot travels on Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl lg:pr-8 space-y-6 text-left relative z-20">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50/90 border border-indigo-200/60 rounded-md text-xs text-indigo-700 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>বাঙালি শিক্ষার্থীদের আন্তর্জাতিক ক্যারিয়ার গড়ার অনন্য প্ল্যাটফর্ম</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-medium text-slate-900 tracking-tight leading-[1.25] text-balance">
            মাতৃভাষায় স্কিল শিখুন, বিশ্বমঞ্চে গড়ে তুলুন আপনার ক্যারিয়ার
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            ‘শিখুন’ শুধু ভিডিও দেখার জায়গা নয়—এখানে রয়েছে বাস্তব প্রজেক্ট-ভিত্তিক কোডিং, ফিগমা ডিজাইন সিস্টেম, আপওয়ার্ক ফ্রিল্যান্সিং গাইড এবং প্রতিদিনের গেইমিফাইড কুইজ চ্যালেঞ্জ।
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onNavigateToCourses}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow"
            >
              <span>সকল কোর্স এক্সপ্লোর করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {enrolledCount > 0 ? (
              <button
                onClick={onNavigateToClassroom}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-sm font-medium rounded-lg transition-colors"
              >
                <span>আমার ক্লাসরুম ({enrolledCount})</span>
              </button>
            ) : (
              <button
                onClick={onNavigateToCourses}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium rounded-lg transition-colors shadow-2xs"
              >
                <Compass className="w-4 h-4 text-slate-500" />
                <span>সিলেবাস দেখুন</span>
              </button>
            )}
          </div>

          {/* Quantitative Metrics Strip */}
          <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-xs text-slate-600">
            <div>
              <span className="font-semibold text-slate-900 font-mono text-lg block tabular-nums">৫,২৯০+</span>
              <span className="text-[11px] text-slate-500">সক্রিয় শিক্ষার্থী</span>
            </div>
            <div>
              <span className="font-semibold text-slate-900 font-mono text-lg block tabular-nums">৯৮.৪%</span>
              <span className="text-[11px] text-slate-500">কোর্স সন্তুষ্টি হার</span>
            </div>
            <div>
              <span className="font-semibold text-slate-900 font-mono text-lg block tabular-nums">২৪/৭</span>
              <span className="text-[11px] text-slate-500">মেন্টর প্রশ্নোত্তর সাপোর্ট</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. WHAT IS SHIKHUN (Right Weighted: Mascot travels on Left) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl ml-auto lg:pl-10 relative z-20 space-y-6">
          
          <div className="space-y-2 text-left">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">আমাদের স্বাতন্ত্র্য</span>
            <h2 className="text-2xl sm:text-3xl font-medium text-slate-900">
              কী এই ‘শিখুন’ এবং কেন আপনার জন্য উপযুক্ত?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              অনলাইনে হাজারো ইংরেজি টিউটোরিয়াল আছে, কিন্তু কনসেপ্টের গভীরে গিয়ে বাস্তব প্রজেক্ট তৈরি ও মেন্টর গাইডেন্সে সফল হতে নিজের মাতৃভাষাই সেরা মাধ্যম।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-lg bg-white/95 border border-slate-200/90 shadow-2xs space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                বাস্তব প্রজেক্ট-ভিত্তিক শিক্ষাক্রম
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                থিওরির পর থিওরি নয়; প্রথম অধ্যায় থেকেই শুরু হয় আধুনিক রিয়্যাক্ট ওয়েব অ্যাপ ও ফিগমা ডিজাইন সিস্টেমের বাস্তব কোডিং।
              </p>
            </div>

            <div className="p-5 rounded-lg bg-white/95 border border-slate-200/90 shadow-2xs space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                গেইমিফাইড দৈনিক কুইজ ও XP
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                পড়ালেখা যেন আনন্দদায়ক হয়! প্রতিটি লেকচারের কুইজ দিয়ে অর্জন করুন এক্সপি এবং বজায় রাখুন দৈনিক স্ট্রিক ফ্লেম।
              </p>
            </div>

            <div className="p-5 rounded-lg bg-white/95 border border-slate-200/90 shadow-2xs space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                আন্তর্জাতিক ফ্রিল্যান্সিং গাইড
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                কেবল কাজ শেখা নয়—আপওয়ার্ক ও ফাইভার মার্কেটপ্লেসে ক্লায়েন্ট পাওয়া ও উইনিং কভার লেটার লেখার প্র্যাক্টিক্যাল টেকনিক।
              </p>
            </div>

            <div className="p-5 rounded-lg bg-white/95 border border-slate-200/90 shadow-2xs space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                মুদ্রণযোগ্য বাংলা হ্যান্ডআউট
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                প্রতিটি লেকচারের সাথে থাকছে পূর্ণাঙ্গ পিডিএফ হ্যান্ডআউট ও রেফারেন্স চিটশিট যা ভবিষ্যতে সবসময় কাছে রাখা যাবে।
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. 3-STEP LEARNING METHODOLOGY (Left Weighted: Mascot travels on Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl lg:pr-8 relative z-20 space-y-6">
          
          <div className="space-y-2 text-left">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">পদ্ধতিগত অগ্রগতি</span>
            <h2 className="text-2xl sm:text-3xl font-medium text-slate-900">
              কীভাবে পরিচালিত হয় ‘শিখুন’ ৩-ধাপের লার্নিং জার্নি?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              ধাপে ধাপে শেখা এবং প্রতিটি মাইলস্টোন সফলভাবে সম্পন্নের মাধ্যমে তৈরি হয় আসল আত্মবিশ্বাস।
            </p>
          </div>

          <div className="space-y-3.5">
            
            <div className="bg-white/95 border border-slate-200/90 rounded-lg p-5 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-indigo-600">ধাপ ০১</span>
                <span className="text-[11px] text-slate-400 font-mono">STEP 01</span>
              </div>
              <h3 className="text-base font-medium text-slate-900">ভিডিও লেকচার ও রিভিশন শিট</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                হাই-ডেফিনিশন ভিডিও ক্লাস দেখার পাশাপাশি প্রয়োজনীয় রেফারেন্স কোড ও কনসেপ্ট চিটশিট ডাউনলোড করে নিন।
              </p>
            </div>

            <div className="bg-white/95 border border-slate-200/90 rounded-lg p-5 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-amber-600">ধাপ ০২</span>
                <span className="text-[11px] text-slate-400 font-mono">STEP 02</span>
              </div>
              <h3 className="text-base font-medium text-slate-900">কুইজ সমাধান ও মাইলস্টোন আনলক</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                লেকচারের বিষয় কতটা আয়ত্ত হয়েছে তা গেইমিফাইড কুইজ দিয়ে তাৎক্ষণিক যাচাই করে পরবর্তী পাঠে প্রবেশ করুন।
              </p>
            </div>

            <div className="bg-white/95 border border-slate-200/90 rounded-lg p-5 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-emerald-600">ধাপ ০৩</span>
                <span className="text-[11px] text-slate-400 font-mono">STEP 03</span>
              </div>
              <h3 className="text-base font-medium text-slate-900">ভেরিফাইড সনদ ও ক্যারিয়ার প্রোফাইল</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                ১০০% মাইলস্টোন পূর্ণ হলে অফিশিয়াল সমাপনী সনদপত্র গ্রহণ করে আন্তর্জাতিক মার্কেটপ্লেসে সরাসরি কাজ শুরু করুন।
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. CURATED CAREER TRACKS (Full Width Corridor) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-lg p-8 sm:p-12 space-y-8 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">CURATED TRACKS</span>
              <h2 className="text-2xl sm:text-3xl font-medium mt-1">
                উচ্চ-চাহিদাপূর্ণ ক্যারিয়ার ট্র্যাকসমূহ
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                দেশসেরা সফটওয়্যার ইঞ্জিনিয়ার ও প্রোডাক্ট ডিজাইনারদের বাস্তব কর্মক্ষেত্রের অভিজ্ঞতায় সাজানো।
              </p>
            </div>

            <button
              onClick={onNavigateToCourses}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-colors shrink-0"
            >
              <span>সকল কোর্স দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-indigo-300 font-mono">TRACK 01</span>
                <Code2 className="w-4 h-4 text-indigo-400" />
              </div>
              <h3 className="text-base font-medium">ফুলস্ট্যাক ওয়েব ডেভেলপমেন্ট</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                React, Node.js, Express, REST APIs, এবং রিয়েল ডেটাবেজ অ্যাপ্লিকেশন।
              </p>
              <div className="pt-2 text-xs text-indigo-300 flex items-center gap-1 font-mono">
                <span>৩৬ ঘণ্টা · ৩৬টি লেকচার</span>
              </div>
            </div>

            <div className="p-5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-rose-300 font-mono">TRACK 02</span>
                <Palette className="w-4 h-4 text-rose-400" />
              </div>
              <h3 className="text-base font-medium">ইউআই/ইউএক্স ও ফিগমা প্রো</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                ইউজার রিসার্চ, ওয়্যারফ্রেমিং, ফিগমা অটো-লেআউট ৫.০ ও কম্পোনেন্ট লাইব্রেরি।
              </p>
              <div className="pt-2 text-xs text-rose-300 flex items-center gap-1 font-mono">
                <span>২৮ ঘণ্টা · ২৫টি লেকচার</span>
              </div>
            </div>

            <div className="p-5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-emerald-300 font-mono">TRACK 03</span>
                <Briefcase className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-base font-medium">ফ্রিল্যান্সিং আপওয়ার্ক ও ফাইভার</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                ১০০% কমপ্লিট প্রোফাইল, উইনিং কভার লেটার রাইটিং ও পেমেন্ট ম্যানেজমেন্ট।
              </p>
              <div className="pt-2 text-xs text-emerald-300 flex items-center gap-1 font-mono">
                <span>২০ ঘণ্টা · ২০টি লেকচার</span>
              </div>
            </div>

          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onNavigateToCourses}
              className="text-xs text-indigo-300 hover:text-white underline underline-offset-4 font-medium transition-colors"
            >
              সম্পূর্ণ সিলেবাস দেখতে সকল কোর্স ডিরেক্টরিতে যান →
            </button>
          </div>

        </div>
      </section>

      {/* 5. STUDENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 space-y-8">
        <div className="text-center space-y-1">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">লার্নার ফিডব্যাক</span>
          <h2 className="text-2xl font-medium text-slate-900">
            শিক্ষার্থীদের অভিজ্ঞতা ও সাফল্যের গল্প
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/95 border border-slate-200/90 rounded-lg p-5 space-y-3 shadow-2xs">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              "বাংলায় এমন গোছানো ও নিখুঁত কুইজ ভিত্তিক রিয়্যাক্ট কোর্স আগে পাইনি। প্রতিটি লেকচারের পর কুইজে XP পাওয়ার আনন্দ প্রতিদিন পড়তে বসতে বাধ্য করে।"
            </p>
            <div className="border-t border-slate-100 pt-3">
              <p className="text-xs font-semibold text-slate-900">তানভীর আহমেদ</p>
              <p className="text-[11px] text-slate-500">জুনিয়র ওয়েব ডেভেলপার, ঢাকা</p>
            </div>
          </div>

          <div className="bg-white/95 border border-slate-200/90 rounded-lg p-5 space-y-3 shadow-2xs">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              "আপওয়ার্কে প্রথম দুই মাস কোনো জব পাচ্ছিলাম না। এখানকার কভার লেটার ও ক্লায়েন্ট সাইকোলজি লেকচার দেখে প্রপোজাল পরিবর্তন করার পর প্রথম সপ্তাহে দুটি অর্ডার পেয়েছি!"
            </p>
            <div className="border-t border-slate-100 pt-3">
              <p className="text-xs font-semibold text-slate-900">সাদিয়া ইসলাম</p>
              <p className="text-[11px] text-slate-500">ফ্রিল্যান্স ডিজাইনার, চট্টগ্রাম</p>
            </div>
          </div>

          <div className="bg-white/95 border border-slate-200/90 rounded-lg p-5 space-y-3 shadow-2xs">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              "কমিউনিটি ফোরামে প্রশ্ন করলে সিনিয়র মেন্টররা সরাসরি কোড ব্যাখ্যা করে বুঝিয়ে দেন। একা পড়ার যে দ্বিধাদ্বন্দ্ব ছিল তা পুরোপুরি কেটে গেছে।"
            </p>
            <div className="border-t border-slate-100 pt-3">
              <p className="text-xs font-semibold text-slate-900">শাকিল আহমেদ</p>
              <p className="text-[11px] text-slate-500">শিক্ষার্থী, সিলেট</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL ACTION BANNER (Mascot Celebrates at Center) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="bg-indigo-600 text-white rounded-lg p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">
              আজই শুরু করুন আপনার নতুন স্কিল শেখার যাত্রা
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              দেরি না করে আপনার পছন্দের কোর্সে যুক্ত হোন এবং আগামী ৯০ দিনের মধ্যে নিজের ক্যারিয়ারকে নিয়ে যান নতুন উচ্চতায়।
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={onNavigateToCourses}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-indigo-700 hover:bg-indigo-50 text-xs sm:text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              <span>সকল কোর্স দেখুন এবং এনরোল করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
