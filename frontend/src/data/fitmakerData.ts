export interface FitMakerProgram {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
}

export interface FitMakerPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface FitMakerCoach {
  id: string;
  name: string;
  role: string;
  experience: string;
  image: string;
  rating: number;
}

export interface FitMakerTestimonial {
  id: string;
  author: string;
  role: string;
  text: string;
  rating: number;
  image: string;
}

export const FITMAKER_DATA = {
  brand: {
    name: "FitMaker",
    tagline: "Transform Your Body",
  },
  stats: [
    { value: "98%", label: "Client Satisfaction", note: "Our Members Love Their Transformation Results" },
    { value: "+8", label: "Years Of Experience", note: "Trusted Track Record Of Transforming 10,000+ Athletes" },
    { value: "+1,400", label: "Active Members", note: "Join India's Most Dedicated Fitness Community" },
    { value: "24/7", label: "Support Available", note: "Expert Coaching Assistance Whenever You Need" },
  ],
  services: [
    {
      id: "weight-loss",
      title: "FAT LOSS & SHRED",
      subtitle: "Click To Join Our Fat Loss Program",
      description: "Achieve rapid sustainable weight loss with our customized Indian diet and training protocol designed to burn fat and maintain peak muscle.",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "muscle-building",
      title: "HYPERTROPHY & MUSCLE",
      subtitle: "Click To Join Our Muscle Building Protocol",
      description: "Pack on rock-hard density with progressive overload principles, compound lifts, and calculated protein surplus guidance.",
      image: "/muscle-building.jpg",
    },
    {
      id: "home-training",
      title: "HOME ATHLETIC CONDITIONING",
      subtitle: "Click To View Our Home Workout Split",
      description: "Stay in peak conditioning from home. Zero equipment bodyweight & calisthenics protocols engineered for maximum fat burn.",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "gym-plan",
      title: "PRO BODYBUILDING SPLIT",
      subtitle: "Click To View Our Stage & Heavy Iron Plan",
      description: "Maximize your gym sessions with professional splits engineered for massive chest, wide lats, 3D shoulders, and heavy legs.",
      image: "/coach-3.jpg",
    },
  ],
  plans: [
    {
      id: "pro-plan",
      name: "PRO ATHLETE PLAN",
      monthlyPrice: 2499,
      yearlyPrice: 19999,
      description: "Our most chosen plan offers advanced bodybuilding splits, custom Indian macro diet, and weekly 1-on-1 coach feedback.",
      features: [
        "Access To All HD Exercise Form Videos",
        "Weekly Progress Tracking & Biometric Scans",
        "Customized Indian High-Protein Meal Plans",
        "1-on-1 Dedicated Coach Form Audit",
        "Access To Elite Iron Masterclasses"
      ],
      popular: false,
    },
    {
      id: "custom-plan",
      name: "CHAMPION CUSTOM PLAN",
      monthlyPrice: 4999,
      yearlyPrice: 39999,
      description: "Experience fully tailored one-on-one competition prep with our master bodybuilding trainers to take your body to the next level.",
      features: [
        "Everything in Pro Plan Included",
        "Weekly 1-on-1 Video Coaching Check-Ins",
        "Dynamic Macro, Calorie & Refeed Cycles",
        "Biomechanical Form Audits & Video Review",
        "VIP Direct WhatsApp Coach Access",
        "Exclusive Gym Floor Pass & Recovery Suite"
      ],
      popular: true,
    },
    {
      id: "beginner-plan",
      name: "STARTER FITNESS PLAN",
      monthlyPrice: 1499,
      yearlyPrice: 11999,
      description: "Start your fitness journey with proper guidance. Build a solid strength foundation with core compound lifts and beginner nutrition.",
      features: [
        "Access To Foundational Gym Exercise Library",
        "Beginner 3-Day & 4-Day Split Schedules",
        "Baseline Calorie & Protein Targets",
        "Community Member WhatsApp Group",
        "Monthly InBody Scan & Form Assessment"
      ],
      popular: false,
    },
  ],
  tools: [
    {
      id: "bmi",
      name: "BMI CALCULATOR",
      desc: "Measure your Body Mass Index quickly to evaluate healthy weight zones.",
      icon: "Scale",
    },
    {
      id: "bmr",
      name: "BMR CALCULATOR",
      desc: "Calculate your Basal Metabolic Rate and baseline daily caloric burning.",
      icon: "Flame",
    },
    {
      id: "macro",
      name: "MACRO NUTRIENTS",
      desc: "Pinpoint your exact daily Protein, Carb, and Fat requirements.",
      icon: "PieChart",
    },
    {
      id: "body-fat",
      name: "BODY FAT CALCULATOR",
      desc: "Accurately estimate subcutaneous body fat percentages.",
      icon: "Activity",
    },
  ],
  testimonials: [
    {
      id: "1",
      author: "Vikram Malhotra",
      role: "Member For 1 Year",
      text: "FitMaker changed the way I look at bodybuilding. The coaches break down every lift with clinical precision. Dropped 14kg fat while gaining huge bicep and shoulder mass!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "2",
      author: "Pooja Sharma",
      role: "Member For 8 Months",
      text: "The Pro Plan gave me the structure I always lacked. The personalized high-protein diet with Indian meals made it easy and sustainable.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    },
  ],
  coaches: [
    {
      id: "1",
      name: "Sangram Chougule",
      role: "Head Hypertrophy & Pro Bodybuilding Coach",
      experience: "12+ Years Experience",
      image: "/coach-2.jpg",
      rating: 5.0,
    },
    {
      id: "2",
      name: "Mukesh Singh Gehlot",
      role: "National Powerlifting & Heavy Strength Coach",
      experience: "15+ Years Experience",
      image: "/coach-3.jpg",
      rating: 4.9,
    },
    {
      id: "3",
      name: "Aryan Deshmukh",
      role: "Athletic Conditioning & Hypertrophy Specialist",
      experience: "8+ Years Experience",
      image: "/coach-1.jpg",
      rating: 4.9,
    },
    {
      id: "4",
      name: "Rohit Rajput",
      role: "Fat Shred & Metabolic Conditioning Coach",
      experience: "7+ Years Experience",
      image: "/coach-4.jpg",
      rating: 4.8,
    },
  ],
  blogPosts: [
    {
      id: "1",
      title: "10 Best Compound Exercises For Maximum Muscle Growth",
      category: "Strength Training",
      readTime: "5 Min Read",
      image: "/coach-1.jpg",
    },
    {
      id: "2",
      title: "Complete Indian High-Protein Diet Plan For Lean Bulk",
      category: "Nutrition",
      readTime: "7 Min Read",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "3",
      title: "How To Recover Faster Between Heavy Squats & Deadlifts",
      category: "Recovery & Health",
      readTime: "4 Min Read",
      image: "/coach-3.jpg",
    },
  ],
};
