import React from 'react';
import { useLearning } from '../context/LearningContext';
import { INITIAL_LEADERBOARD } from '../data/coursesData';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Footprints, 
  Zap, 
  Medal 
} from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const { gamification } = useLearning();

  // All possible badges to unlock
  const allBadges = [
    {
      id: 'badge-first-step',
      nameBn: 'প্রথম পদক্ষেপ',
      descBn: 'প্রথম লেকচার সম্পন্ন করেছেন',
      icon: Footprints,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200'
    },
    {
      id: 'badge-streak-7',
      nameBn: 'সাপ্তাহিক যোদ্ধা',
      descBn: 'টানা ৭ দিন পড়াশোনা বজায় রেখেছেন',
      icon: Flame,
      color: 'text-amber-600 bg-amber-50 border-amber-200'
    },
    {
      id: 'badge-perfect-quiz',
      nameBn: 'নিখুঁত স্কোরার',
      descBn: 'কুইজে ১০০% পূর্ণ নম্বর পেয়েছেন',
      icon: Award,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    },
    {
      id: 'badge-pro-learner',
      nameBn: 'মাইলস্টোন মাস্টার',
      descBn: 'যেকোনো একটি সম্পূর্ণ কোর্স ফিনিশ করেছেন',
      icon: Zap,
      color: 'text-rose-600 bg-rose-50 border-rose-200'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Total XP */}
        <div className="p-5 bg-white border border-slate-200/90 rounded-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-normal">আপনার অর্জিত মোট এক্সপি</p>
            <p className="text-2xl font-semibold text-slate-900 font-mono tabular-nums">
              {gamification.xp} <span className="text-sm font-sans font-normal text-emerald-600">XP</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">প্রতিটি লেকচার ও কুইজ থেকে বৃদ্ধি পায়</p>
          </div>
        </div>

        {/* Card 2: Daily Streak */}
        <div className="p-5 bg-white border border-slate-200/90 rounded-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-normal">দৈনিক স্ট্রিক ফায়ার</p>
            <p className="text-2xl font-semibold text-slate-900 font-mono tabular-nums">
              {gamification.streakDays} <span className="text-sm font-sans font-normal text-amber-600">দিন</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">টানা প্রতিদিন পড়ার ধারাবাহিকতা</p>
          </div>
        </div>

        {/* Card 3: Ranking standing */}
        <div className="p-5 bg-white border border-slate-200/90 rounded-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-normal">জাতীয় র‍্যাংকিং অবস্থান</p>
            <p className="text-2xl font-semibold text-slate-900 font-mono tabular-nums">
              #০২ <span className="text-sm font-sans font-normal text-indigo-600">সারা দেশে</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">শীর্ষ ১% সক্রিয় শিক্ষার্থীদের তালিকায়</p>
          </div>
        </div>

      </div>

      {/* Badges Section */}
      <div className="bg-white border border-slate-200/90 rounded-lg p-6 space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            আপনার অর্জিত ব্যাজ ও মাইলস্টোন পদক
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            নিয়মিত ক্লাসে অংশগ্রহণ ও কুইজে কৃতিত্বের স্বীকৃতি হিসেবে ব্যাজ আনলক হয়।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          {allBadges.map((badge) => {
            const isUnlocked = gamification.badges.some(b => b.id === badge.id);
            const Icon = badge.icon;

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-lg border transition-all text-center flex flex-col items-center justify-between space-y-2 ${
                  isUnlocked
                    ? 'bg-slate-50/50 border-slate-200'
                    : 'bg-slate-50/30 border-slate-100 opacity-50 grayscale'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${badge.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">{badge.nameBn}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{badge.descBn}</p>
                </div>
                <div className="pt-1">
                  {isUnlocked ? (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      আনলকড
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      লক করা আছে
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Leaderboard Table */}
      <div className="bg-white border border-slate-200/90 rounded-lg overflow-hidden">
        
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Medal className="w-4 h-4 text-amber-500" />
              সাপ্তাহিক টপ লার্নার লিডারবোর্ড
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              গত ৭ দিনের অর্জিত এক্সপি পয়েন্ট ও কুইজ অ্যাক্টিভিটির ভিত্তিতে আপডেট করা হয়।
            </p>
          </div>
          <span className="text-xs text-indigo-600 font-mono">লাইভ র‍্যাংকিং</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/30 text-slate-500">
                <th className="py-3 px-6 font-medium">স্থান</th>
                <th className="py-3 px-6 font-medium">শিক্ষার্থীর নাম</th>
                <th className="py-3 px-6 font-medium">জেলা</th>
                <th className="py-3 px-6 font-medium text-right">স্ট্রিক</th>
                <th className="py-3 px-6 font-medium text-right">কুইজ টেস্ট</th>
                <th className="py-3 px-6 font-medium text-right">মোট এক্সপি</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INITIAL_LEADERBOARD.map((item, idx) => {
                const rank = idx + 1;
                let rankBadge = (
                  <span className="font-mono text-slate-500 font-semibold tabular-nums">
                    #{rank < 10 ? `0${rank}` : rank}
                  </span>
                );

                if (rank === 1) {
                  rankBadge = <span className="text-amber-500 font-semibold font-mono">🥇 ০১</span>;
                } else if (rank === 2) {
                  rankBadge = <span className="text-slate-600 font-semibold font-mono">🥈 ০২</span>;
                } else if (rank === 3) {
                  rankBadge = <span className="text-amber-700 font-semibold font-mono">🥉 ০৩</span>;
                }

                return (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      item.isCurrentUser ? 'bg-indigo-50/40 font-medium' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <td className="py-3.5 px-6 whitespace-nowrap">{rankBadge}</td>
                    <td className="py-3.5 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-full text-white text-[11px] font-medium flex items-center justify-center shrink-0 ${item.avatarBg}`}>
                          {item.nameBn.charAt(0)}
                        </div>
                        <span className="text-slate-900">{item.nameBn}</span>
                        {item.isCurrentUser && (
                          <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded">
                            আপনি
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-6 whitespace-nowrap text-slate-600">{item.districtBn}</td>
                    <td className="py-3.5 px-6 whitespace-nowrap text-right font-mono tabular-nums text-amber-600">
                      {item.streakDays} দিন
                    </td>
                    <td className="py-3.5 px-6 whitespace-nowrap text-right font-mono tabular-nums text-slate-600">
                      {item.completedQuizzes}টি
                    </td>
                    <td className="py-3.5 px-6 whitespace-nowrap text-right font-mono font-semibold tabular-nums text-emerald-600">
                      {item.isCurrentUser ? gamification.xp : item.xp} XP
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
