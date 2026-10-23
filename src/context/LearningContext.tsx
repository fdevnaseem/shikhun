import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, CourseProgress, GamificationProfile, CommunityThread, Lesson } from '../types';
import { INITIAL_COURSES, INITIAL_COMMUNITY_THREADS } from '../data/coursesData';

interface LearningContextType {
  courses: Course[];
  enrolledProgress: Record<string, CourseProgress>;
  gamification: GamificationProfile;
  communityThreads: CommunityThread[];
  currentRole: 'student' | 'superadmin';
  activeCourseId: string | null;
  activeLessonId: string | null;
  setActiveCourseId: (id: string | null) => void;
  setActiveLessonId: (id: string | null) => void;
  setRole: (role: 'student' | 'superadmin') => void;
  enrollInCourse: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  markLessonCompleted: (courseId: string, lessonId: string) => void;
  recordQuizResult: (courseId: string, quizId: string, scorePercentage: number, xpGained: number) => void;
  addCommunityThread: (courseId: string, titleBn: string, contentBn: string) => void;
  replyToCommunityThread: (threadId: string, contentBn: string) => void;
  toggleUpvoteThread: (threadId: string) => void;
  // Super Admin actions
  adminAddCourse: (newCourse: Course) => void;
  adminUpdateCourse: (updatedCourse: Course) => void;
  adminDeleteCourse: (courseId: string) => void;
  adminAddLesson: (courseId: string, chapterId: string, lesson: Lesson) => void;
  adminUpdateLesson: (courseId: string, chapterId: string, lesson: Lesson) => void;
  adminDeleteLesson: (courseId: string, chapterId: string, lessonId: string) => void;
  adminResetProgress: (courseId: string) => void;
  adminDeleteThread: (threadId: string) => void;
  adminTogglePinThread: (threadId: string) => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

const LOCAL_STORAGE_COURSES_KEY = 'shikhun_courses_v1';
const LOCAL_STORAGE_ENROLLED_KEY = 'shikhun_enrolled_v1';
const LOCAL_STORAGE_GAMIFICATION_KEY = 'shikhun_gamification_v1';
const LOCAL_STORAGE_THREADS_KEY = 'shikhun_threads_v1';

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load courses
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_COURSES_KEY);
      return saved ? JSON.parse(saved) : INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  });

  // Default pre-enrolled in Web Dev course for rich instant preview
  const [enrolledProgress, setEnrolledProgress] = useState<Record<string, CourseProgress>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ENROLLED_KEY);
      if (saved) return JSON.parse(saved);
      return {
        'web-dev-fullstack': {
          completedLessonIds: ['wd-l-101'],
          quizScores: {},
          enrolledAt: new Date().toISOString(),
          lastAccessedLessonId: 'wd-l-102'
        }
      };
    } catch {
      return {
        'web-dev-fullstack': {
          completedLessonIds: ['wd-l-101'],
          quizScores: {},
          enrolledAt: new Date().toISOString(),
          lastAccessedLessonId: 'wd-l-102'
        }
      };
    }
  });

  const [gamification, setGamification] = useState<GamificationProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_GAMIFICATION_KEY);
      if (saved) return JSON.parse(saved);
      return {
        xp: 1450,
        streakDays: 7,
        lastActiveDate: new Date().toISOString(),
        badges: [
          {
            id: 'badge-first-step',
            nameBn: 'প্রথম পদক্ষেপ',
            descriptionBn: 'প্রথম লেকচার সফলভাবে সম্পন্ন করেছেন',
            iconName: 'Footprints',
            unlockedAt: '৩ দিন আগে'
          },
          {
            id: 'badge-streak-7',
            nameBn: 'সাপ্তাহিক যোদ্ধা',
            descriptionBn: 'টানা ৭ দিন পড়াশোনার ধারাবাহিকতা বজায় রেখেছেন',
            iconName: 'Flame',
            unlockedAt: 'আজ'
          }
        ]
      };
    } catch {
      return {
        xp: 1450,
        streakDays: 7,
        lastActiveDate: new Date().toISOString(),
        badges: []
      };
    }
  });

  const [communityThreads, setCommunityThreads] = useState<CommunityThread[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_THREADS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_THREADS;
    } catch {
      return INITIAL_COMMUNITY_THREADS;
    }
  });

  const [currentRole, setCurrentRole] = useState<'student' | 'superadmin'>('student');
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_COURSES_KEY, JSON.stringify(courses));
    } catch {
      // Storage unavailable or quota exceeded
    }
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ENROLLED_KEY, JSON.stringify(enrolledProgress));
    } catch {
      // Storage unavailable or quota exceeded
    }
  }, [enrolledProgress]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_GAMIFICATION_KEY, JSON.stringify(gamification));
    } catch {
      // Storage unavailable or quota exceeded
    }
  }, [gamification]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_THREADS_KEY, JSON.stringify(communityThreads));
    } catch {
      // Storage unavailable or quota exceeded
    }
  }, [communityThreads]);

  const isEnrolled = (courseId: string) => {
    return Boolean(enrolledProgress[courseId]);
  };

  const enrollInCourse = (courseId: string) => {
    if (enrolledProgress[courseId]) return;

    const course = courses.find(c => c.id === courseId);
    const firstLessonId = course?.chapters[0]?.lessons[0]?.id;

    setEnrolledProgress(prev => ({
      ...prev,
      [courseId]: {
        completedLessonIds: [],
        quizScores: {},
        enrolledAt: new Date().toISOString(),
        lastAccessedLessonId: firstLessonId
      }
    }));

    // Award XP for taking initiative to enroll
    setGamification(prev => ({
      ...prev,
      xp: prev.xp + 50
    }));
  };

  const markLessonCompleted = (courseId: string, lessonId: string) => {
    setEnrolledProgress(prev => {
      const current = prev[courseId] || {
        completedLessonIds: [],
        quizScores: {},
        enrolledAt: new Date().toISOString()
      };

      if (current.completedLessonIds.includes(lessonId)) {
        return prev;
      }

      return {
        ...prev,
        [courseId]: {
          ...current,
          completedLessonIds: [...current.completedLessonIds, lessonId],
          lastAccessedLessonId: lessonId
        }
      };
    });

    // Reward lesson completion XP
    setGamification(prev => ({
      ...prev,
      xp: prev.xp + 40
    }));
  };

  const recordQuizResult = (courseId: string, quizId: string, scorePercentage: number, xpGained: number) => {
    setEnrolledProgress(prev => {
      const current = prev[courseId] || {
        completedLessonIds: [],
        quizScores: {},
        enrolledAt: new Date().toISOString()
      };

      return {
        ...prev,
        [courseId]: {
          ...current,
          quizScores: {
            ...current.quizScores,
            [quizId]: Math.max(current.quizScores[quizId] || 0, scorePercentage)
          }
        }
      };
    });

    // Award quiz XP
    setGamification(prev => {
      const updatedXp = prev.xp + xpGained;
      const newBadges = [...prev.badges];

      if (scorePercentage === 100 && !newBadges.some(b => b.id === 'badge-perfect-quiz')) {
        newBadges.push({
          id: 'badge-perfect-quiz',
          nameBn: 'নিখুঁত স্কোরার',
          descriptionBn: 'কুইজে ১০০% সঠিক উত্তর দিয়ে পূর্ণ নম্বর অর্জন করেছেন',
          iconName: 'Award',
          unlockedAt: 'মাত্র এখন'
        });
      }

      return {
        ...prev,
        xp: updatedXp,
        badges: newBadges
      };
    });
  };

  const addCommunityThread = (courseId: string, titleBn: string, contentBn: string) => {
    const course = courses.find(c => c.id === courseId);
    const newThread: CommunityThread = {
      id: `thread-${Date.now()}`,
      courseId,
      courseTitleBn: course?.titleBn || 'সাধারণ আলোচনা',
      authorName: currentRole === 'superadmin' ? 'সুপার অ্যাডমিন (শিখুন)' : 'তানভীর আহমেদ',
      authorRole: currentRole === 'superadmin' ? 'superadmin' : 'student',
      createdAt: 'এইমাত্র',
      titleBn,
      contentBn,
      upvotes: 1,
      userUpvoted: true,
      replies: []
    };

    setCommunityThreads(prev => [newThread, ...prev]);

    if (currentRole === 'student') {
      setGamification(prev => ({
        ...prev,
        xp: prev.xp + 20
      }));
    }
  };

  const replyToCommunityThread = (threadId: string, contentBn: string) => {
    setCommunityThreads(prev =>
      prev.map(thread => {
        if (thread.id !== threadId) return thread;

        return {
          ...thread,
          replies: [
            ...thread.replies,
            {
              id: `reply-${Date.now()}`,
              authorName: currentRole === 'superadmin' ? 'সুপার অ্যাডমিন (শিখুন)' : 'তানভীর আহমেদ',
              authorRole: currentRole === 'superadmin' ? 'superadmin' : 'student',
              createdAt: 'এইমাত্র',
              contentBn,
              upvotes: 0
            }
          ]
        };
      })
    );

    if (currentRole === 'student') {
      setGamification(prev => ({
        ...prev,
        xp: prev.xp + 15
      }));
    }
  };

  const toggleUpvoteThread = (threadId: string) => {
    setCommunityThreads(prev =>
      prev.map(thread => {
        if (thread.id !== threadId) return thread;
        const willUpvote = !thread.userUpvoted;
        return {
          ...thread,
          upvotes: willUpvote ? thread.upvotes + 1 : Math.max(0, thread.upvotes - 1),
          userUpvoted: willUpvote
        };
      })
    );
  };

  // Super Admin operations
  const adminAddCourse = (newCourse: Course) => {
    setCourses(prev => [newCourse, ...prev]);
  };

  const adminUpdateCourse = (updatedCourse: Course) => {
    setCourses(prev => prev.map(c => (c.id === updatedCourse.id ? updatedCourse : c)));
  };

  const adminDeleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    setEnrolledProgress(prev => {
      const next = { ...prev };
      delete next[courseId];
      return next;
    });
    if (activeCourseId === courseId) {
      setActiveCourseId(null);
      setActiveLessonId(null);
    }
  };

  const adminAddLesson = (courseId: string, chapterId: string, lesson: Lesson) => {
    setCourses(prev =>
      prev.map(course => {
        if (course.id !== courseId) return course;
        return {
          ...course,
          chapters: course.chapters.map(ch => {
            if (ch.id !== chapterId) return ch;
            return {
              ...ch,
              lessons: [...ch.lessons, lesson]
            };
          })
        };
      })
    );
  };

  const adminUpdateLesson = (courseId: string, chapterId: string, updatedLesson: Lesson) => {
    setCourses(prev =>
      prev.map(course => {
        if (course.id !== courseId) return course;
        return {
          ...course,
          chapters: course.chapters.map(ch => {
            if (ch.id !== chapterId) return ch;
            return {
              ...ch,
              lessons: ch.lessons.map(l => (l.id === updatedLesson.id ? updatedLesson : l))
            };
          })
        };
      })
    );
  };

  const adminDeleteLesson = (courseId: string, chapterId: string, lessonId: string) => {
    setCourses(prev =>
      prev.map(course => {
        if (course.id !== courseId) return course;
        return {
          ...course,
          chapters: course.chapters.map(ch => {
            if (ch.id !== chapterId) return ch;
            return {
              ...ch,
              lessons: ch.lessons.filter(l => l.id !== lessonId)
            };
          })
        };
      })
    );
  };

  const adminResetProgress = (courseId: string) => {
    setEnrolledProgress(prev => {
      const next = { ...prev };
      if (next[courseId]) {
        next[courseId] = {
          completedLessonIds: [],
          quizScores: {},
          enrolledAt: new Date().toISOString()
        };
      }
      return next;
    });
  };

  const adminDeleteThread = (threadId: string) => {
    setCommunityThreads(prev => prev.filter(t => t.id !== threadId));
  };

  const adminTogglePinThread = (threadId: string) => {
    setCommunityThreads(prev =>
      prev.map(t => (t.id === threadId ? { ...t, isPinned: !t.isPinned } : t))
    );
  };

  return (
    <LearningContext.Provider
      value={{
        courses,
        enrolledProgress,
        gamification,
        communityThreads,
        currentRole,
        activeCourseId,
        activeLessonId,
        setActiveCourseId,
        setActiveLessonId,
        setRole: setCurrentRole,
        enrollInCourse,
        isEnrolled,
        markLessonCompleted,
        recordQuizResult,
        addCommunityThread,
        replyToCommunityThread,
        toggleUpvoteThread,
        adminAddCourse,
        adminUpdateCourse,
        adminDeleteCourse,
        adminAddLesson,
        adminUpdateLesson,
        adminDeleteLesson,
        adminResetProgress,
        adminDeleteThread,
        adminTogglePinThread
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
