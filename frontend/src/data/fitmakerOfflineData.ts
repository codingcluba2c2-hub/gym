export interface GymBranchInfo {
  name: string;
  tagline: string;
  positioning: string;
  address: string;
  landmark: string;
  city: string;
  phone: string;
  whatsappNumber: string; // e.g. "919876543210" without symbols for wa.me link
  email: string;
  mapDirectionsUrl: string; // Configurable Google Maps URL
  mapEmbedUrl?: string;
  parkingInfo: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  amenities: string[];
}

export interface FacilityItem {
  id: string;
  title: string;
  category: 'Main Floor' | 'Free Weights' | 'Cardio' | 'Functional' | 'Personal Training' | 'Recovery & Lounge';
  image: string;
  badge: string;
  description: string;
  specs: string[];
  isFeatured?: boolean;
}

export interface PhysicalMembershipPlan {
  id: string;
  name: string;
  durationLabel: string;
  billingTerm: 'Monthly' | 'Quarterly' | 'Half-Yearly' | 'Annual';
  price: number;
  originalPrice?: number;
  periodLabel: string;
  savingsBadge?: string;
  popular?: boolean;
  accessIncluded: string;
  trainingFacilities: string[];
  coachingBenefits: string[];
  perks: string[];
}

export interface OfflineProgram {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  format: 'In-Gym' | 'Hybrid (Gym + Online)';
  intendedAudience: string;
  intensity: 'Beginner' | 'Moderate' | 'High Intensity' | 'All Fitness Levels';
  image: string;
  highlights: string[];
}

export interface OfflineTrainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  shortBio: string;
  trainingFormat: 'In-Person Gym Floor' | 'In-Person & Online' | 'Online Dedicated';
  image: string;
  demoNote?: string;
}

export interface OnlineCoachingFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  membershipType: string;
  quote: string;
  goal: string;
  duration: string;
  image: string;
  isDemoSample: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const FITMAKER_CONFIG: {
  brand: {
    name: string;
    tagline: string;
    eyebrow: string;
    heroHeadline: string;
    heroSupporting: string;
    positioning: string;
  };
  branch: GymBranchInfo;
  heroHighlights: string[];
  facilities: FacilityItem[];
  membershipPlans: PhysicalMembershipPlan[];
  programs: OfflineProgram[];
  trainers: OfflineTrainer[];
  onlineCoaching: {
    title: string;
    headline: string;
    description: string;
    appFeatures: OnlineCoachingFeature[];
    mockSchedule: { day: string; session: string; focus: string; coachCheckin: string }[];
    mockWorkouts: { exercise: string; setsReps: string; target: string; videoDuration: string }[];
  };
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
} = {
  brand: {
    name: "FITMAKER",
    tagline: "Discipline &bull; Strength &bull; Community",
    eyebrow: "A Complete Fitness Destination — Train In Our Gym or With Us Online",
    heroHeadline: "YOUR FITNESS JOURNEY STARTS HERE.",
    heroSupporting: "Train smarter, get stronger and build lasting habits with expert coaching, modern equipment and flexible membership options.",
    positioning: "A Complete Fitness Destination — Train In Our Gym or With Us Online.",
  },

  branch: {
    name: "FITMAKER Central Club",
    tagline: "State-of-the-art 15,000 sq ft fitness centre",
    positioning: "A Complete Fitness Destination — Train In Our Gym or With Us Online.",
    address: "Plot 42, Athletic Boulevard, Fitness District, Sector 18 (Configurable Demo Address)",
    landmark: "Adjacent to Central Metro Station & Sports Complex",
    city: "Metro Hub",
    phone: "+91 98765 43210 (Demo Contact)",
    whatsappNumber: "919876543210",
    email: "tour@fitmaker-gym-demo.com",
    mapDirectionsUrl: "https://maps.google.com/?q=Modern+Gym+Fitness+Center",
    parkingInfo: "Complimentary 2-hour underground member parking & bicycle racks available",
    hours: {
      weekdays: "05:30 AM – 10:30 PM",
      saturday: "06:00 AM – 09:30 PM",
      sunday: "07:00 AM – 06:00 PM",
    },
    amenities: [
      "15,000 Sq Ft Air-Conditioned Training Floors",
      "Calibrated Eleiko & Rogue Steel Barbells",
      "Urethane Dumbbells Ranging from 2.5kg to 65kg",
      "30-Meter High-Traction Sled Turf Track",
      "Certified Strength & Conditioning Coaches On-Site",
      "Executive Steam & Shower Lockers with Keyless Lockers",
      "InBody 570 Clinical Composition Scanner",
      "Clean Filtered Hydration & Recovery Beverage Bar",
    ],
  },

  heroHighlights: [
    "Personal Training",
    "Strength & Conditioning",
    "Flexible Memberships",
    "Online Coaching",
  ],

  facilities: [
    {
      id: "fac-1",
      title: "Main Strength & Free Weights Zone",
      category: "Free Weights",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
      badge: "FEATURED ZONE",
      description: "Equipped with 6 Olympic lifting platforms, heavy competition power racks, Eleiko calibrated plates, and precision urethane dumbbells up to 65kg.",
      specs: ["6 Olympic Drop Decks", "Chalk Allowed", "Calibrated Steel Plates", "Dumbbells 2.5kg – 65kg"],
      isFeatured: true,
    },
    {
      id: "fac-2",
      title: "Functional Conditioning & Sprint Turf",
      category: "Functional",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
      badge: "DYNAMIC TURF",
      description: "A dedicated 30-meter indoor astroturf lane designed for sled drives, farmer carries, battle ropes, plyometrics and Hyrox conditioning.",
      specs: ["30m Sled Track", "Heavy Prowler Sleds", "Battle Ropes & Plyo Boxes", "Kettlebells up to 48kg"],
    },
    {
      id: "fac-3",
      title: "Cardio Performance Deck",
      category: "Cardio",
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop",
      badge: "ENDURANCE SUITE",
      description: "State-of-the-art conditioning fleet including Concept2 Rowers, SkiErgs, Echo Bikes, Woodway curved treadmills, and StairMasters.",
      specs: ["Concept2 Erg Fleet", "Woodway Non-Motorized Decks", "Heart Rate Monitor Sync", "Low-Impact Climbers"],
    },
    {
      id: "fac-4",
      title: "1-on-1 Personal Training Bay",
      category: "Personal Training",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
      badge: "VIP COACHING",
      description: "Private assessment and 1-on-1 coaching studio equipped for joint mobility screenings, postural checks, and targeted biomechanics.",
      specs: ["InBody 570 Composition Scanner", "Functional Cable Towers", "Mobility Racks", "Video Technique Review"],
    },
    {
      id: "fac-5",
      title: "Complete Resistance Machine Floor",
      category: "Main Floor",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop",
      badge: "PIN & PLATE LOADED",
      description: "Comprehensive isolateral pin-loaded and plate-loaded selectorized equipment engineered for safe muscle isolation and progressive hypertrophy.",
      specs: ["Hammer Strength Iso-Lateral", "Dual Cable Crossovers", "Hack Squat & Belt Squat", "Leg Press 45-Degree"],
    },
    {
      id: "fac-6",
      title: "Locker Rooms, Sauna & Member Lounge",
      category: "Recovery & Lounge",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200&auto=format&fit=crop",
      badge: "RECOVERY & AMENITY",
      description: "Executive changing suites with private rainfall showers, dry Scandinavian cedar sauna, keyless electronic lockers, and post-workout refuel lounge.",
      specs: ["Keyless Digital Lockers", "High-Pressure Rainfall Showers", "Dry Heat Finnish Sauna", "Fresh Towel Service"],
    },
  ],

  membershipPlans: [
    {
      id: "plan-monthly",
      name: "Monthly Flex Membership",
      durationLabel: "1 Month Commitment",
      billingTerm: "Monthly",
      price: 2499,
      periodLabel: "/ month",
      savingsBadge: "FLEXIBLE",
      popular: false,
      accessIncluded: "All 7 Days (05:30 AM – 10:30 PM)",
      trainingFacilities: [
        "Full access to strength & free-weights floor",
        "Cardio performance deck & turf sprint lane",
        "Keyless locker rooms & executive rainfall showers",
      ],
      coachingBenefits: [
        "1 Complimentary movement screening & gym floor orientation",
        "FitMaker mobile companion app access",
      ],
      perks: [
        "No long-term tie-in; cancel with 7 days notice",
        "Free locker & high-speed Wi-Fi access",
      ],
    },
    {
      id: "plan-quarterly",
      name: "Quarterly Transformation Plan",
      durationLabel: "3 Months Periodized",
      billingTerm: "Quarterly",
      price: 6499,
      originalPrice: 7497,
      periodLabel: "/ 3 months",
      savingsBadge: "SAVE 15%",
      popular: false,
      accessIncluded: "Unlimited Gym Access All Days",
      trainingFacilities: [
        "All Monthly tier facility privileges included",
        "Access to functional conditioning & open turf hours",
        "Priority locker and shower usage",
      ],
      coachingBenefits: [
        "1 InBody 570 body composition analysis per month",
        "1 Personal training technique audit session",
        "Customized lifting split template & guidance",
      ],
      perks: [
        "Save ₹998 over monthly pricing",
        "2 Guest workout passes for friends",
      ],
    },
    {
      id: "plan-half-yearly",
      name: "Half-Yearly Builder Plan",
      durationLabel: "6 Months Consistent Routine",
      billingTerm: "Half-Yearly",
      price: 11999,
      originalPrice: 14994,
      periodLabel: "/ 6 months",
      savingsBadge: "BEST VALUE &bull; SAVE 20%",
      popular: true,
      accessIncluded: "Full Gym Access + Off-Peak Guest Access",
      trainingFacilities: [
        "Complete 15,000 sq ft facility access without restriction",
        "Access to cedar dry sauna suite post-workout",
        "Dedicated free-weight and cardio decks",
      ],
      coachingBenefits: [
        "Bi-weekly InBody biometric scans with trainer review",
        "2 One-on-one personal training coaching sessions",
        "Custom dietary macro target calculations",
      ],
      perks: [
        "Complimentary FitMaker shaker & training t-shirt",
        "4 Guest passes included",
        "1 Month membership freeze option for travel",
      ],
    },
    {
      id: "plan-annual",
      name: "Annual Elite Club Pass",
      durationLabel: "12 Months Full Dedication",
      billingTerm: "Annual",
      price: 19999,
      originalPrice: 29988,
      periodLabel: "/ 12 months",
      savingsBadge: "MAX SAVINGS &bull; SAVE 33%",
      popular: false,
      accessIncluded: "VIP 365-Day Unlimited Access",
      trainingFacilities: [
        "All facility zones + VIP contrast recovery & sauna access",
        "Priority reservation for functional turf hours",
        "Permanent locker reservation option",
      ],
      coachingBenefits: [
        "Quarterly 1-on-1 personal training refresh sessions (4 total)",
        "Monthly InBody scans and metabolic progress checks",
        "Combined gym + online coaching app premium access",
      ],
      perks: [
        "Up to 60 days total membership freeze flexibility",
        "8 Complimentary guest passes",
        "FitMaker Athlete Welcome Kit & Towel Service",
      ],
    },
  ],

  programs: [
    {
      id: "strength-power",
      title: "Strength & Progressive Barbell",
      shortDescription: "Structured compound lifting focusing on squats, deadlifts, bench presses and overhead strength with progressive overload.",
      fullDescription: "Built for lifters wanting measurable strength gains. Coaches teach barbell mechanics, safety, bar path tracking and periodization.",
      format: "In-Gym",
      intendedAudience: "All lifters from foundational beginners to experienced powerlifters seeking verified PR progression.",
      intensity: "High Intensity",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      highlights: ["Olympic platforms", "Velocity & bar path review", "Periodized 6-8 week blocks"],
    },
    {
      id: "weight-management",
      title: "Weight Management & Metabolic Conditioning",
      shortDescription: "Sustainable fat loss combining progressive resistance training, metabolic circuits and practical everyday nutrition advice.",
      fullDescription: "No starvation crash diets. We prioritize preserving lean muscle while maximizing caloric efficiency through compound lifting and interval training.",
      format: "In-Gym",
      intendedAudience: "Men and women looking to shed body fat, improve stamina and build long-term metabolic vitality.",
      intensity: "Moderate",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      highlights: ["Muscle-sparing circuits", "InBody body fat tracking", "Sustainable macro habits"],
    },
    {
      id: "personal-training-program",
      title: "1-on-1 Private Personal Coaching",
      shortDescription: "Dedicated one-on-one attention on the gym floor for accelerated progress, tailored biomechanics and continuous accountability.",
      fullDescription: "Your trainer is with you on every set, adjusting weight, spotting form, eliminating injury risks and custom-engineering your training split.",
      format: "In-Gym",
      intendedAudience: "Anyone wanting focused personal accountability, rapid form correction, or specific competitive preparation.",
      intensity: "All Fitness Levels",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
      highlights: ["Individualized biomechanics", "100% focused attention", "Direct coach communication"],
    },
    {
      id: "hiit-conditioning",
      title: "HIIT & Engine Conditioning",
      shortDescription: "High-energy interval training utilizing Concept2 ergs, kettlebells, assault bikes and bodyweight sprints.",
      fullDescription: "Build a relentless aerobic and anaerobic engine. Sessions focus on power-endurance without sacrificing your joint health.",
      format: "In-Gym",
      intendedAudience: "Athletes, sports players, and fitness enthusiasts wanting peak cardiovascular capacity.",
      intensity: "High Intensity",
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=800&auto=format&fit=crop",
      highlights: ["Concept2 & Echo bikes", "Heart-rate guided pacing", "Athletic endurance drills"],
    },
    {
      id: "functional-fitness",
      title: "Functional Fitness & Turf Training",
      shortDescription: "Multi-planar athletic movement, sled drives, farmer carries, and core stability designed for real-world strength.",
      fullDescription: "Train movements, not just isolated muscles. Develop rotational power, grip endurance, and durability that translates outside the gym.",
      format: "In-Gym",
      intendedAudience: "Lifters seeking athletic coordination, agility and preparation for physical outdoor challenges or Hyrox.",
      intensity: "Moderate",
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      highlights: ["Sled work & carries", "Rotational core strength", "Joint durability"],
    },
    {
      id: "mobility-recovery",
      title: "Mobility & Active Recovery",
      shortDescription: "Joint kinematics, controlled articular rotations, dynamic stretching and sauna contrast protocols to restore sore tissues.",
      fullDescription: "Heavy training requires deliberate recovery. Learn how to eliminate hip tightness, open overhead shoulders, and lower injury incidence.",
      format: "Hybrid (Gym + Online)",
      intendedAudience: "Lifters with desk-job tightness, joint restrictions or anyone seeking faster recuperation between heavy lifting days.",
      intensity: "Beginner",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
      highlights: ["Hip & shoulder opening", "Sauna contrast protocol", "Guided foam rolling & CARs"],
    },
  ],

  trainers: [
    {
      id: "trainer-1",
      name: "Marcus Vance",
      role: "Head Strength & Barbell Coach",
      experience: "12+ Years Coaching Experience",
      specialty: "Powerlifting, Biomechanics & Progressive Overload",
      shortBio: "Specializes in compound barbell lifting mechanics, squat/deadlift technique audits, and periodized strength cycles for lifetime drug-free lifters.",
      trainingFormat: "In-Person Gym Floor",
      image: "/coach-2.jpg",
      demoNote: "Illustrative demo trainer profile",
    },
    {
      id: "trainer-2",
      name: "Elena Rostova",
      role: "Metabolic Conditioning & Hypertrophy Coach",
      experience: "9+ Years Coaching Experience",
      specialty: "Hypertrophy, Functional Intervals & Caloric Programming",
      shortBio: "Dedicated to helping members shed excess body fat and sculpt lean muscle using progressive training principles and realistic nutritional strategies.",
      trainingFormat: "In-Person & Online",
      image: "/fitmaker-hero.jpg",
      demoNote: "Illustrative demo trainer profile",
    },
    {
      id: "trainer-3",
      name: "Devon Brooks",
      role: "Functional Athletics & Hyrox Coach",
      experience: "8+ Years Coaching Experience",
      specialty: "Athletic Conditioning, Sled Work & Engine Building",
      shortBio: "Brings high-energy coaching to our turf lanes and functional zones, helping athletes build unstoppable work capacity and injury resilience.",
      trainingFormat: "In-Person Gym Floor",
      image: "/coach-3.jpg",
      demoNote: "Illustrative demo trainer profile",
    },
    {
      id: "trainer-4",
      name: "Claire Sullivan",
      role: "Mobility Specialist & Remote Coach",
      experience: "7+ Years Coaching Experience",
      specialty: "Active Recovery, Joint Health & Remote Habit Design",
      shortBio: "Combines exercise physiology with structured online tracking to help busy professionals stay strong and injury-free both in the gym and while traveling.",
      trainingFormat: "In-Person & Online",
      image: "/coach-1.jpg",
      demoNote: "Illustrative demo trainer profile",
    },
  ],

  onlineCoaching: {
    title: "YOUR COACH. WHEREVER YOU ARE.",
    headline: "TRAIN WITH FITMAKER REMOTELY WITH DIGITAL PRECISION.",
    description: "Can't visit our physical gym every day or traveling for business? FitMaker Online Coaching delivers our club's proven programming, weekly video check-ins, and direct coach messaging directly into your smartphone.",
    appFeatures: [
      {
        title: "Personalized Workout Splits",
        description: "Weekly periodized lifting schedules tailored to your home setup or travel gym equipment.",
        iconName: "Dumbbell",
      },
      {
        title: "Video Form Review",
        description: "Upload clips of your compound lifts and receive direct audio/visual feedback on joint angles.",
        iconName: "Video",
      },
      {
        title: "Macro & Nutrition Guidance",
        description: "Daily protein and caloric targets customized to your metabolic rate and culinary lifestyle.",
        iconName: "Utensils",
      },
      {
        title: "Weekly Direct Check-Ins",
        description: "Scheduled video consultations to assess progress, adjust loads and set achievable milestones.",
        iconName: "MessageCircle",
      },
    ],
    mockSchedule: [
      { day: "Mon", session: "Upper Body Hypertrophy", focus: "Incline Press, Barbell Rows & Arms", coachCheckin: "Video review of Bench Press set" },
      { day: "Tue", session: "Lower Body Quad Focus", focus: "Squats, Romanian Deadlifts & Calves", coachCheckin: "Log weight & RPE in app" },
      { day: "Wed", session: "Active Mobility & Cardio", focus: "Hip Flow, Zone 2 Incline Walk 30m", coachCheckin: "Rest day recovery check" },
      { day: "Thu", session: "Upper Body Pull / Shoulders", focus: "Weighted Chins, Lateral Raises, Facepulls", coachCheckin: "Direct coach Q&A available" },
      { day: "Fri", session: "Posterior Chain & Core", focus: "Deadlifts, Split Squats, Hanging Legs", coachCheckin: "Weekly weigh-in & tape measurement" },
      { day: "Sat", session: "Coach Check-in Call", focus: "15-minute 1-on-1 video call review", coachCheckin: "Program updated for next week" },
    ],
    mockWorkouts: [
      { exercise: "Barbell Back Squat", setsReps: "4 sets &times; 6 reps (RPE 8)", target: "Legs & Core Stability", videoDuration: "0:45 form video" },
      { exercise: "Romanian Deadlift", setsReps: "3 sets &times; 8 reps (Tempo 3010)", target: "Hamstrings & Glutes", videoDuration: "0:40 form video" },
      { exercise: "Dumbbell Incline Bench", setsReps: "4 sets &times; 8-10 reps", target: "Upper Chest & Triceps", videoDuration: "0:35 form video" },
      { exercise: "Cable Facepulls", setsReps: "3 sets &times; 15 reps", target: "Rear Delts & Rotator Cuff", videoDuration: "0:30 form video" },
    ],
  },

  testimonials: [
    {
      id: "test-1",
      author: "Vikram Malhotra",
      membershipType: "Half-Yearly Member (Physical Gym)",
      quote: "Training on the gym floor under Marcus Vance cleared up years of squat lower-back pain. The equipment quality, drop platforms, and clean locker rooms make working out here the best hour of my day.",
      goal: "Strength & Joint Mechanics",
      duration: "Joined 8 Months Ago",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
      isDemoSample: true,
    },
    {
      id: "test-2",
      author: "Pooja Sharma",
      membershipType: "Hybrid Member (Gym + Online Coaching)",
      quote: "Because I travel two weeks every month, the hybrid membership is a lifesaver. When I'm in town I lift on the facility turf, and when traveling my coach updates my hotel workout schedule without skipping a beat.",
      goal: "Fat Loss & Muscle Retention",
      duration: "Joined 6 Months Ago",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
      isDemoSample: true,
    },
    {
      id: "test-3",
      author: "Arjun Nambiar",
      membershipType: "Annual Elite Member",
      quote: "No aggressive commercial sales pitches, no crowded chaos. Just serious lifters, calibrated weights, and coaches who actually pay attention to your form. The dry sauna after heavy deadlifts is worth it alone.",
      goal: "Powerlifting PRs",
      duration: "Joined 1.5 Years Ago",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
      isDemoSample: true,
    },
  ],

  faqs: [
    {
      question: "Can I take a tour of the gym before deciding to join?",
      answer: "Yes, absolutely! We encourage all prospective members to book a Free Gym Tour. A coach or facility manager will walk you through all 15,000 sq ft, explain the training zones, answer your questions, and offer a complimentary movement assessment.",
      category: "Tour & Visits",
    },
    {
      question: "Are your membership prices fixed or are there hidden sign-up fees?",
      answer: "All pricing displayed on this demo page is transparent and all-inclusive. In our actual gym, memberships include full equipment floor access, executive shower/locker privileges, and complimentary induction screenings with zero hidden registration surcharges.",
      category: "Memberships",
    },
    {
      question: "Do you offer personal training on the gym floor?",
      answer: "Yes. We offer both 1-on-1 in-person personal training on our dedicated gym floor bays and customized remote coaching. Members can book individual training packages or choose our Half-Yearly / Annual tiers which include complimentary 1-on-1 sessions.",
      category: "Training",
    },
    {
      question: "How does the Online Coaching service work alongside physical gym access?",
      answer: "Online Coaching is available as a standalone remote service or as a hybrid add-on to physical memberships. You receive custom periodized app programming, exercise demonstration tutorials, and weekly direct video review check-ins from our certified trainers.",
      category: "Online Coaching",
    },
    {
      question: "What should I bring for my first workout or gym tour?",
      answer: "Bring comfortable workout clothes, clean indoor athletic training shoes, and a photo ID for reception check-in. We provide chilled filtered water stations, towel service, and keyless electronic lockers.",
      category: "Visiting Us",
    },
    {
      question: "Is car parking available at the gym centre?",
      answer: "Yes. We provide 2 hours of complimentary member parking in our secure on-site parking deck with elevator access straight into our reception area.",
      category: "Facilities",
    },
  ],
};
