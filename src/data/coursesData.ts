import { Course, CommunityThread, LeaderboardEntry } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'web-dev-fullstack',
    titleBn: 'ফুলস্ট্যাক ওয়েব ডেভেলপমেন্ট উইথ রিয়্যাক্ট ও নোড.জেএস',
    subtitleBn: 'জিরো থেকে হিরো: আধুনিক জাভাস্ক্রিপ্ট, রিয়্যাক্ট, নোড এবং ডেটাবেজ দিয়ে ফুলস্ট্যাক অ্যাপ্লিকেশন তৈরি করুন।',
    category: 'web-dev',
    categoryLabelBn: 'প্রোগ্রামিং',
    instructor: 'মাহমুদুল হাসান',
    instructorRole: 'Lead Software Engineer, Dhaka',
    enrolledCount: 1420,
    rating: 4.9,
    levelBn: 'বিগিনার থেকে প্রো',
    totalHours: '৩৬ ঘণ্টা',
    colorScheme: 'indigo',
    featured: true,
    chapters: [
      {
        id: 'wd-ch-1',
        titleBn: 'অধ্যায় ১: ওয়েব ফাউন্ডেশন ও আধুনিক জাভাস্ক্রিপ্ট',
        lessons: [
          {
            id: 'wd-l-101',
            titleBn: '১.১ আধুনিক ওয়েব আর্কিটেকচার ও ক্লায়েন্ট-সার্ভার মডেল',
            duration: '১৪ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/SccSCuHhOw0',
            summaryBn: 'ওয়েবের ব্যাকগ্রাউন্ড প্রসেসিং, ডিএনএস কিভাবে কাজ করে এবং ক্লায়েন্ট ব্রাউজার কীভাবে সার্ভার থেকে ডেটা রিসিভ করে তার স্পষ্ট চিত্রায়ন।',
            pdfResourceUrl: '#download-pdf-architecture',
            pdfTitle: 'Web_Architecture_Foundations_BN.pdf',
          },
          {
            id: 'wd-l-102',
            titleBn: '১.২ ইএস৬+ সিনট্যাক্স, অ্যারো ফাংশন ও ডিস্ট্রাকচারিং',
            duration: '২২ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/NCwa_xi0Uuc',
            summaryBn: 'মডার্ন জাভাস্ক্রিপ্ট সিনট্যাক্স, কনস্ট, লেট, স্প্রেড অপারেটর এবং অবজেক্ট ডিস্ট্রাকচারিং নিয়ে বাস্তবিক কোডিং উদাহরণ।',
            pdfResourceUrl: '#download-pdf-es6',
            pdfTitle: 'Modern_ES6_Cheatsheet_Shikhun.pdf',
            quiz: {
              id: 'quiz-wd-1',
              titleBn: 'মডার্ন জাভাস্ক্রিপ্ট নলেজ চেক কুইজ',
              passPercentage: 70,
              xpReward: 150,
              questions: [
                {
                  id: 'q-wd-1',
                  questionBn: 'জাভাস্ক্রিপ্টে const কিওয়ার্ড দিয়ে ডিক্লেয়ার করা ভ্যারিয়েবলের ক্ষেত্রে কোনটি সঠিক?',
                  optionsBn: [
                    'ভ্যারিয়েবলটি পুনরায় রি-অ্যাসাইন করা যাবে না',
                    'ভ্যারিয়েবলটি গ্লোবাল স্কোপে থাকবে সবসময়',
                    'ভ্যারিয়েবলের মান কখনো মেমোরিতে সেভ হয় না',
                    'এটি শুধুমাত্র লুপের ভেতরে ব্যবহার করা যায়'
                  ],
                  correctIndex: 0,
                  explanationBn: 'const কিওয়ার্ড দিয়ে ডিক্লেয়ার করা ভ্যারিয়েবলের রেফারেন্স অপরিবর্তনীয় থাকে, ফলে এটিকে নতুন কোনো মান দিয়ে রি-অ্যাসাইন করা সম্ভব নয়।'
                },
                {
                  id: 'q-wd-2',
                  questionBn: 'অ্যারে থেকে উপাদান সহজে আলাদা করার জন্য আধুনিক সিনট্যাক্স কোনটি?',
                  optionsBn: [
                    'Array Concatenation',
                    'Destructuring Assignment',
                    'Event Bubbling',
                    'Currying Function'
                  ],
                  correctIndex: 1,
                  explanationBn: 'Destructuring Assignment এর মাধ্যমে এক লাইনে অ্যারে বা অবজেক্টের ভ্যালু নির্দিষ্ট ভ্যারিয়েবলে এক্সট্র্যাক্ট করা যায়।'
                },
                {
                  id: 'q-wd-3',
                  questionBn: 'Promise এর ৩টি প্রধান অবস্থা (States) কী কী?',
                  optionsBn: [
                    'Pending, Fulfilled, Rejected',
                    'Start, Running, End',
                    'True, False, Null',
                    'Open, Wait, Closed'
                  ],
                  correctIndex: 0,
                  explanationBn: 'জাভাস্ক্রিপ্ট Promise এর তিনটি স্টেট: Pending (অপেক্ষমান), Fulfilled (সফল) এবং Rejected (ব্যর্থ)।'
                }
              ]
            }
          }
        ]
      },
      {
        id: 'wd-ch-2',
        titleBn: 'অধ্যায় ২: রিয়্যাক্ট কম্পোনেন্ট ও স্টেট ম্যানেজমেন্ট',
        lessons: [
          {
            id: 'wd-l-201',
            titleBn: '২.১ ফাংশনাল কম্পোনেন্ট ও JSX রূপরেখা',
            duration: '১৯ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
            summaryBn: 'রিয়্যাক্টের কোর আইডিয়া: রি-ইউজেবল কম্পোনেন্ট তৈরি এবং প্রপসের সাহায্যে এক কম্পোনেন্ট থেকে অন্যটিতে ডেটা পাঠানো।',
            pdfResourceUrl: '#download-pdf-react-basics',
            pdfTitle: 'React_Component_Mindmap_BN.pdf',
          },
          {
            id: 'wd-l-202',
            titleBn: '২.২ useState ও useEffect হুকের গভীর বিশ্লেষণ',
            duration: '২৬ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/O6P86uwfdR0',
            summaryBn: 'কম্পোনেন্টে লোকাল স্টেট হ্যান্ডলিং এবং ডেটা ফেচিং বা লাইফসাইকেল অ্যাকশনের জন্য useEffect হুকের ব্যবহার।',
            pdfResourceUrl: '#download-pdf-hooks',
            pdfTitle: 'React_Hooks_DeepDive_Guide.pdf',
            quiz: {
              id: 'quiz-wd-2',
              titleBn: 'রিয়্যাক্ট স্টেট ও হুক কুইজ টেস্ট',
              passPercentage: 70,
              xpReward: 200,
              questions: [
                {
                  id: 'q-wd-201',
                  questionBn: 'useEffect এ ডিপেনডেন্সি অ্যারে [] খালি রাখলে কী ঘটবে?',
                  optionsBn: [
                    'ইফেক্টটি প্রতি রেন্ডারে রান করবে',
                    'ইফেক্টটি কম্পোনেন্ট প্রথমবার মাউন্ট হলে একবারই রান করবে',
                    'ব্রাউজারে এরর আসবে',
                    'কম্পোনেন্ট রি-রেন্ডার হওয়া বন্ধ হয়ে যাবে'
                  ],
                  correctIndex: 1,
                  explanationBn: 'খালি ডিপেনডেন্সি অ্যারে [] দিলে রিয়্যাক্ট নিশ্চিত করে যে ইফেক্টটি শুধুমাত্র ইনিশিয়াল মাউন্টের পর একবার চলবে।'
                },
                {
                  id: 'q-wd-202',
                  questionBn: 'রিয়্যাক্টে স্টেট সরাসরি পরিবর্তন (Mutate) করা কেন অনুচিত?',
                  optionsBn: [
                    'কারণ এটি করলে রিয়্যাক্ট রি-রেন্ডার ট্রিগার করতে পারে না',
                    'কারণ মেমোরি ক্র্যাশ করে',
                    'কারণ সিএসএস নষ্ট হয়ে যায়',
                    'জাভাস্ক্রিপ্ট এটিকে সাপোর্ট করে না'
                  ],
                  correctIndex: 0,
                  explanationBn: 'রিয়্যাক্ট রেফারেন্স তুলনা করে ডম আপডেট করে। সরাসরি মিউটেট করলে রিয়্যাক্ট স্টেট পরিবর্তনের সিগন্যাল পায় না।'
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'uiux-figma-mastery',
    titleBn: 'ইউআই/ইউএক্স ডিজাইন অ্যান্ড ফিগমা প্রো মাস্টারক্লাস',
    subtitleBn: 'ইউজার রিসার্চ, ওয়্যারফ্রেম, কালার থিওরি এবং ফিগমার অ্যাডভান্সড অটো-লেআউট শিখে আন্তর্জাতিক মানের ইন্টারফেস তৈরি করুন।',
    category: 'ui-ux',
    categoryLabelBn: 'ইউআই/ইউএক্স',
    instructor: 'সাবরিনা আক্তার',
    instructorRole: 'Product Designer at FinTech, Singapore',
    enrolledCount: 980,
    rating: 4.8,
    levelBn: 'সব স্তরের শিক্ষার্থীদের জন্য',
    totalHours: '২৮ ঘণ্টা',
    colorScheme: 'rose',
    featured: true,
    chapters: [
      {
        id: 'ui-ch-1',
        titleBn: 'অধ্যায় ১: ডিজাইন থিংকিং ও ওয়্যারফ্রেমিং',
        lessons: [
          {
            id: 'ui-l-101',
            titleBn: '১.১ ইউজার সেন্ট্রিক ডিজাইন ও প্রবলেম স্টেটমেন্ট নির্ধারণ',
            duration: '১৭ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
            summaryBn: 'ব্যবহারকারীর মূল সমস্যা চিহ্নিত করে সমাধানমুখী ইন্টারফেস স্ট্রাকচার দাঁড় করানোর বাস্তব গাইডলাইন।',
            pdfResourceUrl: '#download-pdf-design-thinking',
            pdfTitle: 'Design_Thinking_Workbook_BN.pdf',
          },
          {
            id: 'ui-l-102',
            titleBn: '১.২ লো-ফিডেলিটি ওয়্যারফ্রেম ও ইনফরমেশন আর্কিটেকচার',
            duration: '২৪ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/FTFaQWZBqQ8',
            summaryBn: 'স্কেচ থেকে ডিজিটাল ওয়্যারফ্রেমে রূপান্তরের ধাপসমূহ ও কন্টেন্ট প্রায়োরিটাইজেশন।',
            pdfResourceUrl: '#download-pdf-wireframe',
            pdfTitle: 'Wireframing_Checklist_Figma.pdf',
            quiz: {
              id: 'quiz-ui-1',
              titleBn: 'ডিজাইন থিংকিং ও ইউজার জার্নি কুইজ',
              passPercentage: 66,
              xpReward: 160,
              questions: [
                {
                  id: 'q-ui-101',
                  questionBn: 'ডিজাইন থিংকিং প্রসেসের প্রথম ধাপ কোনটি?',
                  optionsBn: [
                    'প্রোটোটাইপ তৈরি করা',
                    'ব্যবহারকারীর অনুভূতি বোঝা (Empathize)',
                    'ভিজ্যুয়াল সিএসএস লেখা',
                    'ইউজার ইন্টারভিউ বাতিল করা'
                  ],
                  correctIndex: 1,
                  explanationBn: 'ডিজাইন থিংকিং শুরু হয় ব্যবহারকারীর প্রয়োজন ও বেদনাদায়ক বিষয়গুলো গভীরভাবে অনুভব (Empathize) করার মাধ্যমে।'
                },
                {
                  id: 'q-ui-102',
                  questionBn: 'লো-ফিডেলিটি ওয়্যারফ্রেমে কালার বা চমৎকার ফন্ট পরিহার করার মূল কারণ কী?',
                  optionsBn: [
                    'যাতে লেআউট এবং ইনফরমেশন স্ট্রাকচারের ওপর পূর্ণ মনোযোগ থাকে',
                    'ফিগমায় কালার ব্যবহার করা কঠিন তাই',
                    'ক্লায়েন্টরা কালার পছন্দ করে না',
                    'কারণ এতে ফাইল সাইজ ছোট হয়'
                  ],
                  correctIndex: 0,
                  explanationBn: 'প্রাথমিক ওয়্যারফ্রেমে ভিজ্যুয়াল সাজসজ্জার চেয়ে কনটেন্ট বিন্যাস ও ইউজার জার্নির কার্যকারিতা যাচাই করা প্রধান উদ্দেশ্য।'
                }
              ]
            }
          }
        ]
      },
      {
        id: 'ui-ch-2',
        titleBn: 'অধ্যায় ২: ফিগমা অটো-লেআউট ও কম্পোনেন্ট লাইব্রেরি',
        lessons: [
          {
            id: 'ui-l-201',
            titleBn: '২.১ অটো-লেআউট ৫.০ ও রেসপনসিভ কনস্ট্রেইন্টস',
            duration: '৩১ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/NrKX46DzkGQ',
            summaryBn: 'প্যাডিং, গ্যাপ, ফ্লেক্সিবল রিসাইজিং ও নেস্টেড অটো লেআউটের সঠিক নিয়মাবলী।',
            pdfResourceUrl: '#download-pdf-autolayout',
            pdfTitle: 'Figma_AutoLayout_Bible_BN.pdf',
          }
        ]
      }
    ]
  },
  {
    id: 'freelancing-upwork-mastery',
    titleBn: 'ফ্রিল্যান্সিং সাকসেস ব্লুপ্রিন্ট: আপওয়ার্ক ও ফাইভার',
    subtitleBn: 'আন্তর্জাতিক মার্কেটপ্লেসে আকর্ষণীয় প্রোফাইল তৈরি, ক্লায়েন্ট কমিউনিকেশন ও উইনিং প্রপোজাল লেখার প্র্যাক্টিক্যাল কৌশল।',
    category: 'freelancing',
    categoryLabelBn: 'ফ্রিল্যান্সিং',
    instructor: 'আরিফুর রহমান',
    instructorRole: 'Top Rated Plus Freelancer, Upwork',
    enrolledCount: 2150,
    rating: 4.9,
    levelBn: 'সব স্তরের পেশাদার',
    totalHours: '২০ ঘণ্টা',
    colorScheme: 'emerald',
    featured: true,
    chapters: [
      {
        id: 'fl-ch-1',
        titleBn: 'অধ্যায় ১: আন্তর্জাতিক প্রোফাইল সেটআপ ও ক্লায়েন্ট সাইকোলজি',
        lessons: [
          {
            id: 'fl-l-101',
            titleBn: '১.১ আপওয়ার্ক ১০০% কমপ্লিট প্রোফাইল ও টাইটেল অপটিমাইজেশন',
            duration: '১৮ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/5p8eE9i_p6M',
            summaryBn: 'কিওয়ার্ড রিসার্চ, আকর্ষণীয় বায়ো রাইটিং এবং পোর্টফোলিও শোকেস যা ক্লায়েন্টদের দ্রুত ইনভাইটেশন পাঠাতে বাধ্য করে।',
            pdfResourceUrl: '#download-pdf-freelance-profile',
            pdfTitle: 'Upwork_Profile_Winning_Formula.pdf',
          },
          {
            id: 'fl-l-102',
            titleBn: '১.২ উইনিং প্রপোজাল রাইটিং ও ক্লায়েন্ট ইন্টারভিউ টেকনিক',
            duration: '২৫ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/7V3jF1lC77U',
            summaryBn: 'কপি-পেস্ট কভার লেটার পরিহার করে প্রথম দুই লাইনে ক্লায়েন্টের পেইন পয়েন্ট সমাধানের অনন্য কৌশল।',
            pdfResourceUrl: '#download-pdf-proposals',
            pdfTitle: '10_Winning_Cover_Letter_Templates.pdf',
            quiz: {
              id: 'quiz-fl-1',
              titleBn: 'কভার লেটার ও ক্লায়েন্ট কমিউনিকেশন কুইজ',
              passPercentage: 70,
              xpReward: 180,
              questions: [
                {
                  id: 'q-fl-101',
                  questionBn: 'একটি কার্যকর কভার লেটারের প্রথম দুই লাইনে কী থাকা উচিত?',
                  optionsBn: [
                    'ক্লায়েন্টের স্পেসিফিক সমস্যা সমাধানের সরাসরি প্রস্তাব',
                    'আমার নিজের পুরো জীবনের শিক্ষাগত যোগ্যতা',
                    'একটি লম্বা শুভেচ্ছা ও জন্মস্থান বিবরণ',
                    'দাম কমানোর অনুরোধ'
                  ],
                  correctIndex: 0,
                  explanationBn: 'ক্লায়েন্ট নোটিফিকেশনে কেবল প্রথম ২ লাইন প্রিভিউ দেখে। তাই সেখানে তার কাজের সরাসরি সমাধান তুলে ধরা জয়ী হওয়ার চাবিকাঠি।'
                },
                {
                  id: 'q-fl-102',
                  questionBn: 'ইন্টারভিউ চলাকালীন ক্লায়েন্টের সাথে মেসেজে কোন বিষয়টিতে সবচেয়ে বেশি গুরুত্ব দেয়া উচিত?',
                  optionsBn: [
                    'কাজের ডেলিভারি টাইমলাইন ও স্পষ্ট কমিটমেন্ট পরিষ্কার করা',
                    'দ্রুত পেমেন্ট চেয়ে ফেলা',
                    'মার্কেটপ্লেসের বাইরে কথা বলতে জোর করা',
                    'ভুল তথ্য দিয়ে কাজ নেওয়া'
                  ],
                  correctIndex: 0,
                  explanationBn: 'প্রফেশনাল ফ্রিল্যান্সাররা সবসময় ক্লায়েন্টকে ডেডলাইন ও কাজের প্রতিটি ধাপের স্পষ্ট রূপরেখা দিয়ে ভরসা যোগান।'
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'motion-graphics-editing',
    titleBn: 'মোশন গ্রাফিক্স ও ভিডিও এডিটিং উইথ প্রিমিয়ার প্রো',
    subtitleBn: 'ইউটিউব কনটেন্ট, কমার্শিয়াল বিজ্ঞাপন ও সোশ্যাল মিডিয়ার জন্য ট্রেন্ডি অ্যানিমেশন এবং ভিজ্যুয়াল স্টোরিটেলিং।',
    category: 'graphics',
    categoryLabelBn: 'গ্রাফিক্স ও ভিডিও',
    instructor: 'রাকিব তানজিম',
    instructorRole: 'Visual Director & Animator',
    enrolledCount: 740,
    rating: 4.8,
    levelBn: 'ইন্টারমিডিয়েট',
    totalHours: '২২ ঘণ্টা',
    colorScheme: 'amber',
    chapters: [
      {
        id: 'mg-ch-1',
        titleBn: 'অধ্যায় ১: ভিডিও এডিটিংয়ের টাইমলাইন ও কাটিং ক্রাফট',
        lessons: [
          {
            id: 'mg-l-101',
            titleBn: '১.১ সিকোয়েন্স সেটিংস, প্রক্সি ওয়ার্কফ্লো ও বি-রোল সিঙ্ক',
            duration: '২১ মিনিট',
            videoUrl: 'https://www.youtube.com/embed/u73-zM4pWqE',
            summaryBn: 'স্মুথ প্লেব্যাকের জন্য প্রক্সি তৈরি এবং গল্পের ছন্দ বজায় রেখে এ-রোল ও বি-রোল কাটার নিয়মাবলী।',
            pdfResourceUrl: '#download-pdf-premiere',
            pdfTitle: 'Premiere_Pro_Shortcuts_Map_BN.pdf',
          }
        ]
      }
    ]
  }
];

export const INITIAL_COMMUNITY_THREADS: CommunityThread[] = [
  {
    id: 'thread-1',
    courseId: 'web-dev-fullstack',
    courseTitleBn: 'ফুলস্ট্যাক ওয়েব ডেভেলপমেন্ট উইথ রিয়্যাক্ট ও নোড.জেএস',
    authorName: 'তানভীর আহমেদ',
    authorRole: 'student',
    createdAt: '২ ঘণ্টা আগে',
    titleBn: 'useEffect এ অবজেক্ট ডিপেনডেন্সি দিলে কি ইনফিনিট লুপ তৈরি হতে পারে?',
    contentBn: 'আমি যখন useEffect এর ডিপেনডেন্সিতে একটি লোকাল অবজেক্ট দিচ্ছি, প্রতি রেন্ডারে তা নতুন মেমোরি রেফারেন্স তৈরি করে আবার ইফেক্ট রান করাচ্ছে। এটি সমাধানের সঠিক উপায় কী? useMemo ব্যবহার করব নাকি প্রোপার্টিগুলো আলাদা করব?',
    upvotes: 18,
    userUpvoted: false,
    isPinned: true,
    replies: [
      {
        id: 'reply-1',
        authorName: 'মাহমুদুল হাসান',
        authorRole: 'instructor',
        createdAt: '১ ঘণ্টা আগে',
        contentBn: 'খুব চমৎকার ও প্রাসঙ্গিক প্রশ্ন তানভীর! জাভাস্ক্রিপ্টে অবজেক্টগুলো রেফারেন্সে চেক হয় (===)। আপনি অবজেক্টের নির্দিষ্ট প্রিমিটিভ প্রোপার্টি (যেমন: user.id) ডিপেনডেন্সি হিসেবে দিতে পারেন অথবা সম্পূর্ণ অবজেক্টের জন্য useMemo হুক দিয়ে মেমোইজ করে রাখতে পারেন।',
        upvotes: 14
      },
      {
        id: 'reply-2',
        authorName: 'নুসরাত জাহান',
        authorRole: 'student',
        createdAt: '৪৫ মিনিট আগে',
        contentBn: 'ধন্যবাদ ভাইয়া! আমিও সেইম সমস্যায় পড়েছিলাম, প্রোপার্টি স্পেসিফিক দিয়ে এখন ঠিক কাজ করছে।',
        upvotes: 4
      }
    ]
  },
  {
    id: 'thread-2',
    courseId: 'freelancing-upwork-mastery',
    courseTitleBn: 'ফ্রিল্যান্সিং সাকসেস ব্লুপ্রিন্ট: আপওয়ার্ক ও ফাইভার',
    authorName: 'সাদিয়া ইসলাম',
    authorRole: 'student',
    createdAt: '৫ ঘণ্টা আগে',
    titleBn: 'নতুন একাউন্টে কত কানেক্টস দিয়ে প্রথম প্রপোজাল পাঠানো নিরাপদ?',
    contentBn: 'আপওয়ার্কে প্রথম প্রোফাইল এপ্রুভ হওয়ার পর আমি ১৬ কানেক্টস দিয়ে বুস্টিং করব নাকি সাধারণ ৮ বা ১২ কানেক্টসে বিড করা বুদ্ধিমানের কাজ হবে?',
    upvotes: 12,
    userUpvoted: true,
    replies: [
      {
        id: 'reply-3',
        authorName: 'আরিফুর রহমান',
        authorRole: 'instructor',
        createdAt: '৩ ঘণ্টা আগে',
        contentBn: 'শুরুতে বুস্টিংয়ে বেশি কানেক্টস অপচয় না করে যেসব জবে প্রপোজাল ৫ এর কম জমা পড়েছে এবং ক্লায়েন্টের পেমেন্ট ভেরিফাইড, সেখানে দ্রুত ও প্রাসঙ্গিক কভার লেটার দিয়ে আবেদন করুন। এটি প্রথম জব পাওয়ার সেরা রাস্তা।',
        upvotes: 19
      }
    ]
  },
  {
    id: 'thread-3',
    courseId: 'uiux-figma-mastery',
    courseTitleBn: 'ইউআই/ইউএক্স ডিজাইন অ্যান্ড ফিগমা প্রো মাস্টারক্লাস',
    authorName: 'তাহমিদ হক',
    authorRole: 'student',
    createdAt: '১ দিন আগে',
    titleBn: 'বাংলা ফন্টের ক্ষেত্রে ফিগমা অটো-লেআউটে লাইন হাইট কত রাখা আদর্শ?',
    contentBn: 'ইংরেজি ফন্টের তুলনায় বাংলা যুক্তবর্ণ বা হ্রস্ব-ই কার/দী্র্ঘ-ঈ কার উপরে-নিচে কেটে যায় যদি লাইন হাইট কম থাকে। আপনাদের স্ট্যান্ডার্ড রেসিপি কী?',
    upvotes: 21,
    userUpvoted: false,
    replies: [
      {
        id: 'reply-4',
        authorName: 'সাবরিনা আক্তার',
        authorRole: 'instructor',
        createdAt: '১৮ ঘণ্টা আগে',
        contentBn: 'বাংলা টাইপোগ্রাফির জন্য সবসময় ফন্ট সাইজের চেয়ে অন্তত ৬০% থেকে ৭০% বেশি লাইন হাইট (যেমন: ১৬ পিক্সেল ফন্টে ২৫-২৬ পিক্সেল লাইনহাইট) দেওয়া উচিত। Hind Siliguri বা Tiro Bangla ব্যবহারে এই রেসিপি সবচেয়ে ভালো কাজ করে।',
        upvotes: 17
      }
    ]
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lb-1',
    nameBn: 'শাকিল আহমেদ',
    districtBn: 'চট্টগ্রাম',
    xp: 2850,
    streakDays: 14,
    completedQuizzes: 18,
    avatarBg: 'bg-emerald-500'
  },
  {
    id: 'lb-2',
    nameBn: 'তানভীর আহমেদ',
    districtBn: 'ঢাকা (আপনি)',
    xp: 2420,
    streakDays: 8,
    completedQuizzes: 12,
    avatarBg: 'bg-indigo-500',
    isCurrentUser: true
  },
  {
    id: 'lb-3',
    nameBn: 'ফারহানা বিনতে রফিক',
    districtBn: 'সিলেট',
    xp: 2190,
    streakDays: 11,
    completedQuizzes: 14,
    avatarBg: 'bg-rose-500'
  },
  {
    id: 'lb-4',
    nameBn: 'তাহমিদুর রহমান',
    districtBn: 'রাজশাহী',
    xp: 1950,
    streakDays: 6,
    completedQuizzes: 10,
    avatarBg: 'bg-amber-500'
  },
  {
    id: 'lb-5',
    nameBn: 'জান্নাতুল ফেরদৌস',
    districtBn: 'খুলনা',
    xp: 1840,
    streakDays: 9,
    completedQuizzes: 9,
    avatarBg: 'bg-sky-500'
  }
];
