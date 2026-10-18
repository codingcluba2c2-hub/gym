export const BRAND = {
  name: "IRON DISTRICT FITNESS",
  shortName: "IRON DISTRICT",
  tagline: "Discipline Defined By Strength",
  eyebrow: "PREMIUM ATHLETIC & STRENGTH CLUB",
  contact: {
    phone: "+1 (555) 019-4820",
    email: "contact@irondistrictfitness-demo.com",
    address: "420 Ironworks Avenue, District 4, Metro City",
    hours: [
      { days: "Mon - Fri", time: "05:00 AM - 11:00 PM" },
      { days: "Saturday", time: "06:00 AM - 10:00 PM" },
      { days: "Sunday", time: "07:00 AM - 08:00 PM" },
    ],
  },
  social: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    twitter: "https://twitter.com",
  },
};

export interface Program {
  id: string;
  title: string;
  category: "strength" | "conditioning" | "recovery" | "personal";
  categoryLabel: string;
  description: string;
  fullDescription: string;
  duration: string;
  intensity: "High" | "Moderate" | "Intense" | "All Levels";
  calories: string;
  image: string;
  features: string[];
}

export const PROGRAMS: Program[] = [
  {
    id: "strength-training",
    title: "Strength & Powerlifting",
    category: "strength",
    categoryLabel: "Strength",
    description: "Periodized barbell and heavy compound lifting designed for progressive overload and raw power.",
    fullDescription: "Master Olympic and barbell lifting fundamentals under expert coaches. Focuses on squat, bench press, deadlift, and clean progression with video-assisted technique breakdown.",
    duration: "60 Min",
    intensity: "High",
    calories: "500 - 750 kcal",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    features: ["Olympic lifting platforms", "Custom velocity tracking", "Dedicated coaching cues", "Periodized 8-week cycles"],
  },
  {
    id: "personal-training",
    title: "1-on-1 Elite Coaching",
    category: "personal",
    categoryLabel: "Personal",
    description: "Tailored one-on-one athletic programming, biomechanical assessment, and holistic accountability.",
    fullDescription: "Targeted training customized specifically to your physiological profile, movement asymmetries, and athletic goals. Includes ongoing nutritional guidance.",
    duration: "45 / 60 Min",
    intensity: "All Levels",
    calories: "Variable",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
    features: ["InBody body composition scans", "Custom nutrition blueprint", "1-on-1 private lifting suite", "Dedicated recovery protocols"],
  },
  {
    id: "hiit-conditioning",
    title: "HIIT & Engine Conditioning",
    category: "conditioning",
    categoryLabel: "Conditioning",
    description: "High-intensity intervals combining SkiErgs, assault bikes, kettlebells, and bodyweight circuits.",
    fullDescription: "Push your cardiovascular ceiling and lactic threshold with dynamic anaerobic intervals. Designed to build athletic stamina and lean muscle endurance.",
    duration: "45 Min",
    intensity: "Intense",
    calories: "600 - 900 kcal",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    features: ["Heart rate telemetry", "Echo bikes & Concept2 rowers", "Turf sprint lanes", "Team energy dynamics"],
  },
  {
    id: "functional-fitness",
    title: "Functional Movement & Hyrox",
    category: "conditioning",
    categoryLabel: "Conditioning",
    description: "Multi-planar agility, sled pushes, sandbag carries, and high-transfer functional athleticism.",
    fullDescription: "Bridge the gap between pure strength and daily physical capability. Prepares you for real-world durability, obstacle challenges, and competitive fitness races.",
    duration: "50 Min",
    intensity: "High",
    calories: "550 - 800 kcal",
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1200&auto=format&fit=crop",
    features: ["Heavy sled pushes & pulls", "Sandbag and kettlebell complexes", "Core stabilization work", "Movement pattern diagnostics"],
  },
  {
    id: "weight-management",
    title: "Metabolic Transformation",
    category: "personal",
    categoryLabel: "Personal",
    description: "Structured resistance workouts combined with metabolic conditioning for body recomposition.",
    fullDescription: "A science-backed protocol engineered for sustainable fat loss while preserving and building lean muscle mass through metabolic circuit training.",
    duration: "55 Min",
    intensity: "Moderate",
    calories: "450 - 700 kcal",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop",
    features: ["Targeted heart-rate zones", "Strength-to-metabolic ratios", "Dietary habit coaching", "Bi-weekly metric check-ins"],
  },
  {
    id: "mobility-recovery",
    title: "Mobility & Contrast Recovery",
    category: "recovery",
    categoryLabel: "Recovery",
    description: "Joint articulation, foam rolling, dynamic fascial stretching, and contrast bath therapies.",
    fullDescription: "Prevent injury and restore your central nervous system. Combines mobility drills, tissue release techniques, and breathwork to ensure complete recovery between heavy lifting sessions.",
    duration: "40 Min",
    intensity: "All Levels",
    calories: "150 - 250 kcal",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    features: ["Cold plunges & Infrared sauna", "Active assisted stretching", "Hypervolt percussion therapy", "Spine & hip decompression"],
  },
];

export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  bio: string;
  image: string;
  certifications: string[];
}

export const TRAINERS: Trainer[] = [
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    role: "Head Strength Coach",
    experience: "12+ Years Coaching",
    specialty: "Barbell Mechanics & Powerlifting",
    bio: "Former competitive weightlifter dedicated to injury-free strength progression, technical mastery, and athletic longevity.",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop",
    certifications: ["CSCS (NSCA)", "USA Weightlifting Level 2", "Precision Nutrition L1"],
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "Conditioning & HIIT Lead",
    experience: "9+ Years Coaching",
    specialty: "Metabolic Conditioning & Engine Building",
    bio: "Specializes in high-output energy systems, track conditioning, and mental grit for hybrid athletes and endurance enthusiasts.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    certifications: ["CrossFit Level 3 Coach", "EXOS Performance Specialist", "TRX Master Trainer"],
  },
  {
    id: "devon-brooks",
    name: "Devon Brooks",
    role: "Functional Fitness & Hyrox Coach",
    experience: "8+ Years Coaching",
    specialty: "Functional Movement & Obstacle Endurance",
    bio: "Focuses on multi-planar power, tactical conditioning, and functional endurance to equip athletes for high-stakes physical demands.",
    image: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=800&auto=format&fit=crop",
    certifications: ["NASM Performance Enhancement", "Hyrox Certified Coach", "Kettlebell Athletics L2"],
  },
  {
    id: "claire-sullivan",
    name: "Claire Sullivan",
    role: "Mobility & Recovery Specialist",
    experience: "10+ Years Coaching",
    specialty: "Joint Health, Kinematics & CNS Reset",
    bio: "Integrates clinical biomechanics and dynamic mobility therapies to help lifters overcome mobility deficits and recover faster.",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop",
    certifications: ["FRC Mobility Specialist", "B.S. Exercise Physiology", "RockTape FMT Certified"],
  },
];

export interface ScheduleItem {
  id: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  time: string;
  program: string;
  trainer: string;
  intensity: "High" | "Moderate" | "Intense" | "All Levels";
  duration: string;
  room: string;
}

export const WEEKLY_SCHEDULE: ScheduleItem[] = [
  // Monday
  { id: "m1", day: "Monday", time: "06:00 AM", program: "Strength & Powerlifting", trainer: "Marcus Vance", intensity: "High", duration: "60m", room: "Iron Deck A" },
  { id: "m2", day: "Monday", time: "07:30 AM", program: "HIIT & Engine Conditioning", trainer: "Elena Rostova", intensity: "Intense", duration: "45m", room: "Turf Zone" },
  { id: "m3", day: "Monday", time: "12:00 PM", program: "Functional Movement & Hyrox", trainer: "Devon Brooks", intensity: "High", duration: "50m", room: "Turf Zone" },
  { id: "m4", day: "Monday", time: "05:30 PM", program: "Strength & Powerlifting", trainer: "Marcus Vance", intensity: "High", duration: "60m", room: "Iron Deck A" },
  { id: "m5", day: "Monday", time: "07:00 PM", program: "Mobility & Contrast Recovery", trainer: "Claire Sullivan", intensity: "All Levels", duration: "40m", room: "Recovery Studio" },

  // Tuesday
  { id: "t1", day: "Tuesday", time: "06:00 AM", program: "HIIT & Engine Conditioning", trainer: "Elena Rostova", intensity: "Intense", duration: "45m", room: "Turf Zone" },
  { id: "t2", day: "Tuesday", time: "08:00 AM", program: "Metabolic Transformation", trainer: "Marcus Vance", intensity: "Moderate", duration: "55m", room: "Iron Deck B" },
  { id: "t3", day: "Tuesday", time: "12:15 PM", program: "Mobility & Contrast Recovery", trainer: "Claire Sullivan", intensity: "All Levels", duration: "40m", room: "Recovery Studio" },
  { id: "t4", day: "Tuesday", time: "06:00 PM", program: "Functional Movement & Hyrox", trainer: "Devon Brooks", intensity: "High", duration: "50m", room: "Turf Zone" },
  { id: "t5", day: "Tuesday", time: "07:30 PM", program: "Strength & Powerlifting", trainer: "Marcus Vance", intensity: "High", duration: "60m", room: "Iron Deck A" },

  // Wednesday
  { id: "w1", day: "Wednesday", time: "06:00 AM", program: "Strength & Powerlifting", trainer: "Marcus Vance", intensity: "High", duration: "60m", room: "Iron Deck A" },
  { id: "w2", day: "Wednesday", time: "07:30 AM", program: "Functional Movement & Hyrox", trainer: "Devon Brooks", intensity: "High", duration: "50m", room: "Turf Zone" },
  { id: "w3", day: "Wednesday", time: "12:00 PM", program: "HIIT & Engine Conditioning", trainer: "Elena Rostova", intensity: "Intense", duration: "45m", room: "Turf Zone" },
  { id: "w4", day: "Wednesday", time: "05:30 PM", program: "Metabolic Transformation", trainer: "Elena Rostova", intensity: "Moderate", duration: "55m", room: "Iron Deck B" },
  { id: "w5", day: "Wednesday", time: "07:00 PM", program: "Mobility & Contrast Recovery", trainer: "Claire Sullivan", intensity: "All Levels", duration: "40m", room: "Recovery Studio" },

  // Thursday
  { id: "th1", day: "Thursday", time: "06:30 AM", program: "HIIT & Engine Conditioning", trainer: "Elena Rostova", intensity: "Intense", duration: "45m", room: "Turf Zone" },
  { id: "th2", day: "Thursday", time: "08:00 AM", program: "Strength & Powerlifting", trainer: "Marcus Vance", intensity: "High", duration: "60m", room: "Iron Deck A" },
  { id: "th3", day: "Thursday", time: "12:30 PM", program: "Mobility & Contrast Recovery", trainer: "Claire Sullivan", intensity: "All Levels", duration: "40m", room: "Recovery Studio" },
  { id: "th4", day: "Thursday", time: "06:00 PM", program: "Functional Movement & Hyrox", trainer: "Devon Brooks", intensity: "High", duration: "50m", room: "Turf Zone" },

  // Friday
  { id: "f1", day: "Friday", time: "06:00 AM", program: "Strength & Powerlifting", trainer: "Marcus Vance", intensity: "High", duration: "60m", room: "Iron Deck A" },
  { id: "f2", day: "Friday", time: "07:30 AM", program: "HIIT & Engine Conditioning", trainer: "Elena Rostova", intensity: "Intense", duration: "45m", room: "Turf Zone" },
  { id: "f3", day: "Friday", time: "12:00 PM", program: "Metabolic Transformation", trainer: "Devon Brooks", intensity: "Moderate", duration: "55m", room: "Iron Deck B" },
  { id: "f4", day: "Friday", time: "05:30 PM", program: "Strength & Powerlifting", trainer: "Marcus Vance", intensity: "High", duration: "60m", room: "Iron Deck A" },
  { id: "f5", day: "Friday", time: "07:00 PM", program: "Mobility & Contrast Recovery", trainer: "Claire Sullivan", intensity: "All Levels", duration: "40m", room: "Recovery Studio" },

  // Saturday
  { id: "s1", day: "Saturday", time: "08:00 AM", program: "Strength & Powerlifting", trainer: "Marcus Vance", intensity: "High", duration: "60m", room: "Iron Deck A" },
  { id: "s2", day: "Saturday", time: "09:30 AM", program: "Functional Movement & Hyrox", trainer: "Devon Brooks", intensity: "High", duration: "60m", room: "Turf Zone" },
  { id: "s3", day: "Saturday", time: "11:00 AM", program: "HIIT & Engine Conditioning", trainer: "Elena Rostova", intensity: "Intense", duration: "45m", room: "Turf Zone" },
  { id: "s4", day: "Saturday", time: "01:00 PM", program: "Mobility & Contrast Recovery", trainer: "Claire Sullivan", intensity: "All Levels", duration: "45m", room: "Recovery Studio" },

  // Sunday
  { id: "su1", day: "Sunday", time: "09:00 AM", program: "Mobility & Contrast Recovery", trainer: "Claire Sullivan", intensity: "All Levels", duration: "60m", room: "Recovery Studio" },
  { id: "su2", day: "Sunday", time: "10:30 AM", program: "Open Turf & Recovery Protocol", trainer: "Staff Coach", intensity: "Moderate", duration: "60m", room: "Open Facility" },
];

export interface MembershipPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  badge?: string;
  highlighted: boolean;
  description: string;
  features: string[];
  notIncluded?: string[];
  ctaText: string;
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "essential",
    name: "Essential",
    price: "₹1,999",
    period: "per month",
    highlighted: false,
    description: "Ideal for disciplined self-starters who want premium strength equipment without unnecessary fluff.",
    features: [
      "Full access to strength & free-weight floor",
      "Locker room & executive shower amenities",
      "Complimentary initial movement screening",
      "Member mobile app for facility check-in",
      "Standard operating hours access (5AM - 11PM)",
    ],
    notIncluded: [
      "Coach-led group training classes",
      "Contrast therapy suite (Sauna & Cold Plunges)",
      "Nutritional consultation",
    ],
    ctaText: "Select Essential",
  },
  {
    id: "performance",
    name: "Performance",
    price: "₹3,499",
    period: "per month",
    badge: "MOST POPULAR",
    highlighted: true,
    description: "The complete athletic package. Unlimited coach-led conditioning, lifting sessions, and recovery perks.",
    features: [
      "All Essential tier privileges",
      "Unlimited Coach-led Group Classes (HIIT, Strength, Mobility)",
      "Priority online class reservations (7-day advance)",
      "Access to Infrared Sauna & Cold Plunge suites",
      "Monthly InBody body composition scan",
      "2 Guest passes per month",
    ],
    ctaText: "Join Performance",
  },
  {
    id: "elite",
    name: "Elite Athlete",
    price: "₹5,499",
    period: "per month",
    highlighted: false,
    description: "For uncompromising athletes demanding personalized 1-on-1 guidance, recovery suite, and priority access.",
    features: [
      "All Performance tier privileges",
      "Two 1-on-1 Personal Coaching sessions monthly",
      "Custom nutrition programming & coach check-in",
      "Unlimited contrast recovery suite usage",
      "Complimentary gym apparel & performance shaker",
      "Unlimited guest passes with advance booking",
      "Private VIP locker reservation",
    ],
    ctaText: "Apply For Elite",
  },
];

export interface Testimonial {
  id: string;
  name: string;
  tagline: string;
  quote: string;
  discipline: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Derrick Chen",
    tagline: "Competitive Powerlifter (Sample Demo Profile)",
    discipline: "Strength & Powerlifting",
    quote: "The equipment calibration and coaching standard at Iron District is unrivaled. In six months of structured coaching, my squat and deadlift totals broke PRs I'd been chasing for three years.",
    rating: 5,
  },
  {
    id: "t-2",
    name: "Sarah Lindqvist",
    tagline: "Corporate Executive & Hyrox Competitor (Sample Demo Profile)",
    discipline: "Functional Conditioning",
    quote: "No gimmicks, no loud ego contests. Just elite programming, spotless equipment, and coaches who know human biomechanics inside out. The contrast recovery suite is a game-changer.",
    rating: 5,
  },
  {
    id: "t-3",
    name: "Mateo Alvarez",
    tagline: "Former College Athlete (Sample Demo Profile)",
    discipline: "1-on-1 Athletic Coaching",
    quote: "After knee surgery, I struggled to trust heavy compound lifts again. The personalized reassessment and progressive loading protocols restored my confidence and explosive power.",
    rating: 5,
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: "Facility" | "Strength" | "Conditioning" | "Recovery";
  image: string;
  caption: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-1",
    title: "Heavy Barbell Platform",
    category: "Strength",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop",
    caption: "Custom calibrated steel plates and competition-spec power racks.",
  },
  {
    id: "g-2",
    title: "Conditioning Turf & Sprint Lanes",
    category: "Conditioning",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    caption: "30-meter high-density turf track for sled pushes and sprint drills.",
  },
  {
    id: "g-3",
    title: "Olympic Lifting Deck",
    category: "Strength",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    caption: "Drop-proof oak lifting decks with Eleiko bars and bumper plates.",
  },
  {
    id: "g-4",
    title: "Contrast Therapy & Cold Plunges",
    category: "Recovery",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    caption: "Sub-45°F immersion tubs and Scandinavian cedar dry sauna.",
  },
  {
    id: "g-5",
    title: "Dumbbell & Free Weights Vault",
    category: "Strength",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop",
    caption: "Precision urethane dumbbells ranging up to 150 lbs.",
  },
  {
    id: "g-6",
    title: "Main Training Floor Atmosphere",
    category: "Facility",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200&auto=format&fit=crop",
    caption: "Architectural acoustic damping, low-glare lighting, and high ceilings.",
  },
  {
    id: "g-7",
    title: "1-on-1 Performance Suite",
    category: "Facility",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
    caption: "Dedicated private coaching studio for personalized biomechanics.",
  },
  {
    id: "g-8",
    title: "Functional Aerobic Ergs",
    category: "Conditioning",
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1200&auto=format&fit=crop",
    caption: "Concept2 SkiErgs, rowers, and air bikes for high-intensity intervals.",
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "Which membership should I choose?",
    answer: "If you primarily train independently on the barbell and dumbbell floor, the Essential plan offers unrestricted access to all strength equipment. If you want coach-led group classes and access to our infrared sauna and cold plunge recovery suites, the Performance plan is our recommended best-value option. For dedicated 1-on-1 coaching, choose Elite.",
  },
  {
    question: "Do you offer personal training?",
    answer: "Yes. Our Elite Athlete tier includes two one-on-one sessions per month. We also offer standalone private coaching packages customized to your individual goals, from Olympic weightlifting to post-rehabilitation conditioning.",
  },
  {
    question: "Can beginners join?",
    answer: "Absolutely. Discipline is built, not born. Every new member receives an initial movement assessment where our coaches evaluate joint mobility, foundational mechanics, and help tailor weights to your current physical baseline.",
  },
  {
    question: "What should I bring to my first session?",
    answer: "Bring athletic apparel, flat-soled lifting shoes or training sneakers, and a water bottle. We provide premium filtered hydration stations, towel service, and full executive shower amenities.",
  },
  {
    question: "How can I enquire about a membership?",
    answer: "You can submit an inquiry through our Contact page or click 'Explore Memberships' on any plan card. Our staff will schedule a private tour of the facilities and arrange your complimentary movement screening.",
  },
];
