import React, { createContext, useContext, useState, useEffect } from "react";
import { PROGRAMS_DATA, ProgramDetail } from "../data/programsData";

export type { ProgramDetail };

// Announcements interface
export interface Announcement {
  title: string;
  desc: string;
  date: string;
  iconName: string; // We will map string names to Lucide icons
}

// News interface
export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  excerpt: string;
  bodyText: string;
  image: string;
  slug: string;
  sourceUrl?: string;
}

// Event interface
export interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  bodyText: string;
}

// Calendar Event interface
export interface CalendarEvent {
  day: number;
  eventText: string;
}

export interface MonthCalendarData {
  name: string;
  yearOffset: number;
  startDay: number;
  totalDays: number;
  events: Record<number, string>;
}

// About Us Content interface
export interface AboutUsContent {
  history: {
    introText: string;
    quoteText: string;
    milestones: { year: string; title: string; desc: string }[];
  };
  vision: {
    visionText: string;
    missionList: string[];
    valuesList: string[];
  };
  leadership: {
    chairmanName: string;
    designation: string;
    messageQuote: string;
    messageParagraphs: string[];
    philosophies: { title: string; desc: string }[];
  };
  advantage: {
    cards: { title: string; desc: string; detail: string }[];
  };
}

export interface FacultyMember {
  name: string;
  title: string;
  edu: string;
  interests: string;
  phone: string;
  email: string;
  avatar: string;
  age: string;
  experience: string;
  idNo: string;
  department: string;
}

export interface DirectoryData {
  hod: FacultyMember;
  others: FacultyMember[];
}

// Placements page content
export interface PlacedStudent {
  name: string;
  branch: string;
  company: string;
  ctc: string;
  img: string;
}

export interface Recruiter {
  name: string;
  logo: string;
}

export interface PlacementsContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  highestPackage: string;
  averagePackage: string;
  placementPercent: string;
  philosophyText: string;
  careerPrograms: string[];
  industryConnectDesc: string;
  industryConnectItems: string[];
  placementCellDesc: string;
  placementCellItems: { t: string; d: string }[];
  placedStudents: PlacedStudent[];
  recruiters: Recruiter[];
}

interface DataContextType {
  announcements: Announcement[];
  programs: ProgramDetail[];
  news: NewsArticle[];
  events: EventItem[];
  aboutContent: AboutUsContent;
  calendarData: MonthCalendarData[];
  facultyData: Record<string, DirectoryData>;
  boardData: Record<string, DirectoryData>;
  staffData: Record<string, DirectoryData>;
  placementsContent: PlacementsContent;
  
  // Update functions
  updateAnnouncements: (list: Announcement[]) => void;
  updatePrograms: (list: ProgramDetail[]) => void;
  updateNews: (list: NewsArticle[]) => void;
  updateEvents: (list: EventItem[]) => void;
  updateAboutContent: (content: AboutUsContent) => void;
  updateCalendarData: (data: MonthCalendarData[]) => void;
  updateFacultyData: (data: Record<string, DirectoryData>) => void;
  updateBoardData: (data: Record<string, DirectoryData>) => void;
  updateStaffData: (data: Record<string, DirectoryData>) => void;
  updatePlacementsContent: (data: PlacementsContent) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial states (Compact but detailed)
const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  { title: "Admissions 2026 Applications Open", desc: "Apply online for all undergraduate and postgraduate engineering, management, and pharmacy streams.", date: "12 May 2026", iconName: "GraduationCap" },
  { title: "Orientation Program 2026 Schedule", desc: "Schedule and venue details released for the incoming freshers orientation week starting next month.", date: "08 May 2026", iconName: "Calendar" },
  { title: "Semester Examination Notification", desc: "The final semester examination timetable has been officially released by the controller of examinations.", date: "02 May 2026", iconName: "FileText" },
  { title: "Merit-Based Scholarship Applications", desc: "Tuition waiver applications open for academic top performers and sports quota achievements.", date: "28 Apr 2026", iconName: "Award" },
  { title: "Mega Campus Placement Drive 2026", desc: "Registrations now open for eligible pre-final year candidates for upcoming on-campus MNC recruitment drives.", date: "22 Apr 2026", iconName: "BookOpen" }
];

const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 1,
    title: "AI Research Lab Inaugurated on Campus",
    date: "18 May 2025",
    time: "10:30 AM",
    location: "Main Science Block, Room 302",
    category: "Innovation",
    excerpt: "In partnership with global tech giants, the new laboratory features advanced machine learning compute nodes for research projects.",
    bodyText: "Today marks a historic milestone for City Chalapathi Institute of Technology as we formally inaugurate our state-of-the-art Artificial Intelligence and Machine Learning Research Laboratory. Developed in close collaboration with global technology leaders, this research center is equipped with high-throughput multi-GPU processing systems and next-generation compute environments designed specifically for heavy workload deep learning and neural network model training. Under the direction of our senior AI research staff, undergraduate and doctoral scholars will collaborate on active research papers, smart industrial solutions, and healthcare diagnostics automation projects.",
    image: "/prog_computer.png",
    slug: "ai-research-lab",
    sourceUrl: "https://www.thehindu.com/sci-tech/technology/internet/artificial-intelligence-research-lab-inaugurated/article671829.ece"
  },
  {
    id: 2,
    title: "Engineering Students Win Smart Hackathon 2025",
    date: "17 May 2025",
    time: "09:00 AM",
    location: "Tech Exhibition Hub, New Delhi",
    category: "Achievement",
    excerpt: "Our team developed a decentralized IoT mesh network algorithm to win first prize.",
    bodyText: "Our student research team from our Electronics and Computer Science Engineering departments has won the prestigious National Smart Systems Hackathon 2025. Over a grueling 36-hour continuous sprint in New Delhi, the team designed and prototyped a self-healing, decentralized IoT mesh network framework tailored for real-time disaster management communication.",
    image: "/prog_engineering.png",
    slug: "smart-hackathon",
    sourceUrl: "https://timesofindia.indiatimes.com/education/engineering-students-win-national-smart-hackathon-2025/articleshow/1089271.cms"
  },
  {
    id: 3,
    title: "International Yoga Day Celebrated with Enthusiasm",
    date: "16 May 2025",
    time: "07:00 AM",
    location: "Central Playground Complex",
    category: "Campus Life",
    excerpt: "Students and faculty participated in a special yoga session promoting health and wellness.",
    bodyText: "Students and faculty participated in a special yoga session promoting health, wellness, and mental clarity on International Yoga Day. The event was held in the main campus courtyard with over 500 participants practicing various asanas guided by certified yoga instructors.",
    image: "/prog_diploma.png",
    slug: "yoga-day",
    sourceUrl: "https://www.eenadu.net/yoga-day-celebrations-chalapathi-campus/article/120250516"
  },
  {
    id: 4,
    title: "New Study on Renewable Energy Published in Scopus Journal",
    date: "15 May 2025",
    time: "11:00 AM",
    location: "Academic Block 1 Seminar Room",
    category: "Research",
    excerpt: "The research highlights the efficiency of hybrid models in optimizing sustainable energy.",
    bodyText: "A breakthrough research paper on renewable energy harvesting techniques has been published in a top-tier Scopus-indexed journal. The study highlights the implementation of hybrid solar-wind energy conservation models in microgrids.",
    image: "/prog_mtech.png",
    slug: "renewable-energy",
    sourceUrl: "https://www.sakshi.com/renewable-energy-research-study-published-scopus/article/20250515"
  },
  {
    id: 5,
    title: "Record Placements in 2025 Batch",
    date: "14 May 2025",
    time: "10:00 AM",
    location: "Placements Office",
    category: "Placements",
    excerpt: "Top recruiters from across the globe visited campus. Students secured roles in leading MNCs.",
    bodyText: "City Chalapathi Institute of Technology registers outstanding placement results for the 2025 batch. Leading multinationals including tech and core giants participated, offering premium software engineering and core research positions to over 90% of eligible graduates.",
    image: "/prog_management.png",
    slug: "record-placements",
    sourceUrl: "https://www.abnandhrajyothy.com/chalapathi-university-record-placements-2025/article/1109"
  },
  {
    id: 6,
    title: "Annual Convocation 2025 Held with Grandeur",
    date: "12 May 2025",
    time: "10:00 AM",
    location: "Main Auditorium Auditorium Hall",
    category: "Campus Life",
    excerpt: "Graduating students received degrees and medals at the colorful convocation ceremony.",
    bodyText: "The 2025 annual convocation ceremony was celebrated with grand success. Distinguished chief guests from corporate and academic bodies addressed the graduating cohort and distributed gold medals to academic toppers.",
    image: "/prog_pharmacy.png",
    slug: "annual-convocation",
    sourceUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: 7,
    title: "Annual Innovation & Entrepreneurship Summit",
    date: "10 May 2025",
    time: "09:30 AM",
    location: "Campus Incubation & Startup Block",
    category: "Events",
    excerpt: "Empowering student founders, early-stage startups, and venture capitalists to collaborate on product solutions.",
    bodyText: "The Annual Innovation & Entrepreneurship Summit at City Chalapathi stands as our premier event dedicated to building startup ecosystems. Student groups will pitch prototypes directly to angel investors, regional venture capital firms, and incubator heads.",
    image: "/prog_engineering.png",
    slug: "innovation-summit",
    sourceUrl: "https://tv9telugu.com/chalapathi-startup-innovation-summit-guntur-2025/article/99281"
  },
  {
    id: 8,
    title: "Annual Sports Meet Kickstarts with Inter-Department Matches",
    date: "08 May 2025",
    time: "09:00 AM",
    location: "Central Sports Complex",
    category: "Sports",
    excerpt: "The campus cricket and basketball tournaments kicked off with participation from over 500 athletes.",
    bodyText: "The annual campus sports tournament commenced yesterday with a spectacular torch run and flag hoisting ceremony at the main sports complex. Over 500 student athletes representing all departments are participating.",
    image: "/prog_pharmacy.png",
    slug: "annual-sports-meet",
    sourceUrl: "https://ntvtelugu.com/chalapathi-annual-sports-meet-2025/article/7716"
  },
  {
    id: 9,
    title: "Admissions Open for Academic Year 2025-26",
    date: "05 May 2025",
    time: "10:00 AM",
    location: "Admissions Cell",
    category: "Admissions",
    excerpt: "Applications are invited for UG, PG, and Ph.D. courses. Apply online today.",
    bodyText: "Admissions are officially open for the academic term 2025-2026. Prospective candidates can check qualifications, course fees, placement details, and apply online through our official portal.",
    image: "/prog_computer.png",
    slug: "admissions-open",
    sourceUrl: "https://www.chalapathiengg.ac.in/admissions-2025-26"
  }
];

const INITIAL_EVENTS: EventItem[] = [
  { id: 1, title: "Air Taxi Demonstration & Aviation Forum", date: "17 Jul 2026", time: "09:30 AM", location: "Aeronautics Hangar & Airfield Complex", category: "Aerospace", image: "/prog_engineering.png", bodyText: "In collaboration with global aerospace research institutions and pioneering aviation companies, City Chalapathi Institute of Technology is proud to host the Air Taxi Demonstration and Aviation Forum. This event features real-world test flights and static exhibitions of cutting-edge electric Vertical Take-Off and Landing (eVTOL) air taxi models." }
];

const INITIAL_ABOUT_CONTENT: AboutUsContent = {
  history: {
    introText: "A LEGACY OF EXCELLENCE — 30+ YEARS IN EDUCATION\n\nA Strong Society, A Stronger Vision for the Future\nChalapathi University is backed by a highly reputed and visionary educational society, with over three decades of excellence in education, research, and innovation. This deep-rooted legacy reflects a long-term commitment to academic quality, institutional growth, and societal impact.\n\nToday, the society proudly runs six professional and educational institutions, shaping thousands of careers across diverse fields of study. This strong foundation empowers Chalapathi University with stability, credibility, and a forward-looking vision, enabling it to continuously innovate and evolve in line with global educational trends and industry demands.\n\nDriven by decades of experience and an unwavering commitment to excellence, the society stands as a pillar of trust, growth, and opportunity — nurturing generations of students to become confident, capable, and future-ready professionals.\n\nABOUT US\nAt Chalapathi University, we don't just teach — we transform potential into performance. We are building more than degrees; we are building industry-ready innovators, problem-solvers, and leaders of tomorrow. Through cutting-edge infrastructure, mentorship from accomplished faculty, and curricula co-designed with industry demands, every student is equipped not just to enter the workforce — but to lead it.\n\nOur student-first philosophy blends knowledge with real-world application, research with relevance, and creativity with career readiness — through hands-on projects, live industry collaborations, skill labs, and innovation hubs that ensure learning goes beyond the classroom and into impact.",
    quoteText: "To provide value-based quality technical education and produce competent engineers who can contribute to the progress of the society.",
    milestones: [
      { year: "2001", title: "Inception", desc: "Started operations with core engineering undergraduate branches and 180 intake." },
      { year: "2008", title: "NBA Accreditation", desc: "Received first NBA accreditation for key programs, verifying academic standards." },
      { year: "2015", title: "Conferred Autonomous Status", desc: "Granted UGC autonomous status, enabling flexible industry-centric curricula." },
      { year: "2021", title: "NAAC A+ Rank", desc: "Achieved prestigious NAAC A+ accreditation status with outstanding GPA scores." }
    ]
  },
  vision: {
    visionText: "To become a globally respected university that empowers students through excellence in education, innovation, research, and ethical leadership.",
    missionList: [
      "To provide high-quality, industry-relevant education.",
      "To foster innovation, critical thinking, and research culture.",
      "To promote holistic student development and leadership.",
      "To build strong academic and industry collaborations.",
      "To contribute positively to society through knowledge and service."
    ],
    valuesList: [
      "Set academic benchmarks in global learning frameworks.",
      "Fulfill corporate milestones through student placement readiness.",
      "Inspire creative engineering prototypes and patent acquisitions.",
      "Ensure environment sustainability and social upliftment programs."
    ]
  },
  leadership: {
    chairmanName: "Sri Y. V. Anjaneyulu",
    designation: "Founder Chairman & President",
    messageQuote: "Inspiring Excellence, Integrity & Innovation",
    messageParagraphs: [
      "Welcome to Chalapathi University, an institution built upon the pillars of academic rigour, social responsibility, and future-centric innovation. From our modest beginnings, we have constantly pushed the boundaries of knowledge, seeking to create an educational ecosystem that nurtures tomorrow's global leaders.",
      "We believe that education must go beyond conventional memorization. Our classrooms, research centers, and digital modules are designed to cultivate critical thinking, design awareness, and technological skills. By prioritizing ethical values, domain specialization, and hands-on exposure, we empower our graduates to lead with integrity in an ever-evolving world.",
      "I invite you to explore our advanced research pathways, engage in collaborative innovation drives, and join us in our continuous pursuit of excellence. Together, let us shape a bright tomorrow."
    ],
    philosophies: [
      { title: "Vision", desc: "Setting benchmarks in global learning systems and digital technology transfers." },
      { title: "Leadership", desc: "Empowering student cohorts to lead academic, corporate, and civil domains." },
      { title: "Innovation", desc: "Fostering active laboratory research, patent designs, and startup projects." },
      { title: "Excellence", desc: "Upholding high standards of quality assurance, accreditations, and placements." }
    ]
  },
  advantage: {
    cards: [
      { title: "Autonomous Curriculum", desc: "Tailored syllabus modules synced directly with current IT and core sector requirements.", detail: "Allows for rapid curriculum updating, ensuring learners study the newest engineering standards." },
      { title: "Industry Immersion", desc: "Mandatory corporate internships, case study reviews, and MNC leadership seminars.", detail: "Direct connection with industry majors to build practical skills before graduation." },
      { title: "Accredited Programs", desc: "NBA-accredited courses and NAAC A+ institutional tier ratings verifying excellence.", detail: "High-value credentials recognized globally for higher education and corporate careers." },
      { title: "Placement Track", desc: "Consistency in recruiting achievements with top MNC software and hardware firms.", detail: "Comprehensive guidance program from pre-final year until successful placement onboarding." }
    ]
  }
};

const INITIAL_CALENDAR_DATA: MonthCalendarData[] = [
  { name: "July", yearOffset: 0, startDay: 2, totalDays: 31, events: { 15: "Commencement of Classwork" } },
  { name: "August", yearOffset: 0, startDay: 5, totalDays: 31, events: {} },
  { name: "September", yearOffset: 0, startDay: 1, totalDays: 30, events: { 5: "First Mid-Term Examinations" } },
  { name: "October", yearOffset: 0, startDay: 3, totalDays: 31, events: {} },
  { name: "November", yearOffset: 0, startDay: 6, totalDays: 30, events: { 14: "Second Mid-Term Examinations" } },
  { name: "December", yearOffset: 0, startDay: 1, totalDays: 31, events: { 3: "Practical Examinations", 15: "End Semester Theory Exams" } },
  { name: "January", yearOffset: 1, startDay: 4, totalDays: 31, events: { 5: "Commencement of Next Semester" } }
];

const INITIAL_PLACEMENTS_CONTENT: PlacementsContent = {
  heroTitle: "A Step Towards Success!",
  heroSubtitle: "Building Careers. Creating Leaders.",
  heroDescription: "At Chalapathi Institute of Technology, placements are more than securing a job—they are about preparing students for lifelong professional success. Our dedicated Training & Placement Cell bridges the gap between academic learning and industry expectations by equipping students with the knowledge, skills, and confidence to excel in today's competitive global workforce.",
  highestPackage: "₹18 LPA",
  averagePackage: "₹5.5 LPA",
  placementPercent: "95%",
  philosophyText: "We focus on developing industry-ready professionals through a holistic approach that combines academic excellence, technical expertise, professional skills, and real-world exposure. Students receive continuous support throughout their academic journey, enabling them to confidently transition from campus to career.",
  careerPrograms: [
    "Industry-oriented technical training",
    "Aptitude and logical reasoning development",
    "Communication and soft skills enhancement",
    "Coding and programming practice sessions",
    "Resume building and portfolio development",
    "Group discussion and interview preparation",
    "Mock interviews with industry professionals",
    "Personality development workshops",
    "Internship guidance and career mentoring"
  ],
  industryConnectDesc: "The institute actively collaborates with leading organizations to provide students with meaningful industry exposure through:",
  industryConnectItems: [
    "Campus recruitment drives",
    "Internship opportunities",
    "Industry expert lectures",
    "Corporate mentoring sessions",
    "Technical workshops and certification programs",
    "Industrial visits and experiential learning",
    "Live projects and collaborative initiatives"
  ],
  placementCellDesc: "Our Placement Cell works closely with students and recruiters to ensure a seamless recruitment process.",
  placementCellItems: [
    { t: "Mentorship", d: "Career counseling and mentoring" },
    { t: "Assessment", d: "Placement readiness assessments" },
    { t: "Recruitment Drives", d: "Organizing campus placement sessions" },
    { t: "Internships", d: "Facilitating internship placements" },
    { t: "Collaborations", d: "Industry-academia partnerships" },
    { t: "Relations", d: "Employer relationship management" },
    { t: "Career Pathing", d: "Higher education guidance" },
    { t: "Alumni Network", d: "Interaction and alumni links" }
  ],
  placedStudents: [
    { name: "P. Vinay Kumar", branch: "Computer Science", company: "Amazon", ctc: "₹18.0 LPA", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop&crop=face" },
    { name: "K. Hari Priya", branch: "Artificial Intelligence", company: "Microsoft", ctc: "₹15.5 LPA", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face" },
    { name: "Ch. Sandeep", branch: "Information Technology", company: "Adobe", ctc: "₹14.0 LPA", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face" },
    { name: "M. Sneha Reddy", branch: "Electronics & Comm", company: "Cognizant", ctc: "₹12.0 LPA", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face" },
    { name: "V. Sai Teja", branch: "Computer Science", company: "TCS Digital", ctc: "₹9.0 LPA", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face" },
    { name: "A. Lakshmi Prasanna", branch: "Data Science", company: "Infosys", ctc: "₹9.5 LPA", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face" },
    { name: "G. Rajesh Babu", branch: "Mechanical Eng", company: "L&T Core", ctc: "₹8.0 LPA", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face" },
    { name: "S. Niharika", branch: "Civil Engineering", company: "JMC Projects", ctc: "₹7.5 LPA", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop&crop=face" }
  ],
  recruiters: [
    { name: "TCS", logo: "https://img.logo.dev/tcs.com?token=pk_SHNMbGFOQUOj4ys42P2YSA&format=png" },
    { name: "Infosys", logo: "https://img.logo.dev/infosys.com?token=pk_SHNMbGFOQUOj4ys42P2YSA&format=png" },
    { name: "Mindtree", logo: "https://img.logo.dev/ltimindtree.com?token=pk_SHNMbGFOQUOj4ys42P2YSA&format=png" },
    { name: "L&T", logo: "https://img.logo.dev/larsentoubro.com?token=pk_SHNMbGFOQUOj4ys42P2YSA&format=png" },
    { name: "HCL", logo: "https://img.logo.dev/hcltech.com?token=pk_SHNMbGFOQUOj4ys42P2YSA&format=png" },
    { name: "Wipro", logo: "https://img.logo.dev/wipro.com?token=pk_SHNMbGFOQUOj4ys42P2YSA&format=png" },
    { name: "Oracle", logo: "https://img.logo.dev/oracle.com?token=pk_SHNMbGFOQUOj4ys42P2YSA&format=png" },
    { name: "Tech Mahindra", logo: "https://img.logo.dev/techmahindra.com?token=pk_SHNMbGFOQUOj4ys42P2YSA&format=png" }
  ]
};

const INITIAL_FACULTY_DATA: Record<string, DirectoryData> = {
  "Computer Science & Engineering": {
    hod: { name: "Prof. P. V. Ramana", title: "HOD & Professor", edu: "Ph.D - Indian Institute of Technology Madras, India", interests: "Algorithms, Distributed Networks, Database Optimization", phone: "0863 2345432", email: "hod.cse@city.ac.in", avatar: "PVR", age: "52 Years", experience: "24 Years of Teaching & Research", idNo: "CCIT-CSE-001", department: "Computer Science & Engineering" },
    others: [
      { name: "Dr. A. Kiran Kumar", title: "Professor", edu: "Ph.D - National Institute of Technology Warangal, India", interests: "Cyber Security, Network Architectures & Trust Models", phone: "0863 2345433", email: "kiran.cse@city.ac.in", avatar: "AKK", age: "45 Years", experience: "16 Years", idNo: "CCIT-CSE-002", department: "Computer Science & Engineering" },
      { name: "Mrs. K. Jhansi", title: "Assistant Professor", edu: "M.Tech - JNTU, Kakinada", interests: "Software Engineering & Object Oriented Designs", phone: "0863 2345434", email: "jhansi.cse@city.ac.in", avatar: "KJ", age: "34 Years", experience: "8 Years", idNo: "CCIT-CSE-003", department: "Computer Science & Engineering" },
      { name: "Dr. B. Satyanarayana", title: "Associate Professor", edu: "Ph.D - Osmania University, Hyderabad", interests: "Cloud Computing, Grid Virtualization, Distributing Computing", phone: "0863 2345435", email: "satyanarayana.cse@city.ac.in", avatar: "BS", age: "41 Years", experience: "13 Years", idNo: "CCIT-CSE-004", department: "Computer Science & Engineering" }
    ]
  },
  "Artificial Intelligence & ML": {
    hod: { name: "Dr. S. Mallikharjuna Rao", title: "HOD & Associate Professor", edu: "Ph.D - Andhra University", interests: "Machine Learning, Neural Networks, Natural Language Processing", phone: "0863 2345440", email: "hod.ai@city.ac.in", avatar: "SMR", age: "43 Years", experience: "15 Years", idNo: "CCIT-AI-001", department: "Artificial Intelligence & ML" },
    others: [
      { name: "Dr. K. Swetha", title: "Professor", edu: "Ph.D - University of Hyderabad", interests: "Computer Vision, Cognitive Robotics, Automation", phone: "0863 2345441", email: "swetha.ai@city.ac.in", avatar: "KS", age: "46 Years", experience: "17 Years", idNo: "CCIT-AI-002", department: "Artificial Intelligence & ML" },
      { name: "Mr. P. Ravi", title: "Assistant Professor", edu: "M.Tech - JNTU Hyderabad", interests: "Deep Learning, Python ML frameworks, TensorFlow operations", phone: "0863 2345442", email: "ravi.ai@city.ac.in", avatar: "PR", age: "32 Years", experience: "6 Years", idNo: "CCIT-AI-003", department: "Artificial Intelligence & ML" }
    ]
  },
  "Data Science": {
    hod: { name: "Dr. G. Srinivasa Rao", title: "HOD & Associate Professor", edu: "Ph.D - Acharya Nagarjuna University", interests: "Data Analytics, Big Data ecosystems, Hadoop clusters setup", phone: "0863 2345450", email: "hod.ds@city.ac.in", avatar: "GSR", age: "44 Years", experience: "16 Years", idNo: "CCIT-DS-001", department: "Data Science" },
    others: [
      { name: "Smt. T. Kavitha", title: "Assistant Professor", edu: "M.Tech - JNTU Kakinada", interests: "Statistical Analytics, R programming, data warehousing", phone: "0863 2345451", email: "kavitha.ds@city.ac.in", avatar: "TK", age: "35 Years", experience: "9 Years", idNo: "CCIT-DS-002", department: "Data Science" }
    ]
  },
  "School of Pharmacy": {
    hod: { name: "Prof. Dr. A. Narendra", title: "Principal & Professor", edu: "Ph.D - Indian Institute of Chemical Technology (IICT), Hyderabad", interests: "Pharmaceutics, Target-oriented Drug Delivery Systems, Nano-carriers", phone: "0863 2345470", email: "principal.pharmacy@city.ac.in", avatar: "AN", age: "55 Years", experience: "26 Years of Research", idNo: "CCIT-PH-001", department: "School of Pharmacy" },
    others: [
      { name: "Dr. P. Kavitha", title: "Professor", edu: "Ph.D - JNTU Anantapur", interests: "Pharmacology, clinical drug safety audits, toxicity metrics", phone: "0863 2345471", email: "kavitha.pharmacy@city.ac.in", avatar: "PK", age: "47 Years", experience: "18 Years", idNo: "CCIT-PH-002", department: "School of Pharmacy" },
      { name: "Smt. G. Swathi", title: "Assistant Professor", edu: "M.Pharm - Acharya Nagarjuna University", interests: "Pharmaceutical analysis, quality control procedures", phone: "0863 2345472", email: "swathi.pharmacy@city.ac.in", avatar: "GS", age: "33 Years", experience: "7 Years", idNo: "CCIT-PH-003", department: "School of Pharmacy" }
    ]
  },
  "School of Management": {
    hod: { name: "Dr. K. S. Rao", title: "Principal & Professor", edu: "Ph.D - Andhra University, Visakhapatnam", interests: "Financial Management, Corporate governance, accounting practices", phone: "0863 2345480", email: "director.mba@city.ac.in", avatar: "KSR", age: "50 Years", experience: "22 Years", idNo: "CCIT-MGMT-001", department: "School of Management" },
    others: [
      { name: "Dr. P. S. R. Murthy", title: "Associate Professor", edu: "Ph.D - Andhra University", interests: "Marketing Management, Consumer Behaviour, Digital Retail", phone: "0863 2345482", email: "murthy.mba@city.ac.in", avatar: "PSM", age: "44 Years", experience: "17 Years", idNo: "CCIT-MGMT-003", department: "School of Management" },
      { name: "Mr. G. Ravindra", title: "Assistant Professor", edu: "MBA - Acharya Nagarjuna University", interests: "Operations Management, Supply Chain Logistics, Quality Auditing", phone: "0863 2345483", email: "ravi.mba@city.ac.in", avatar: "GR", age: "33 Years", experience: "8 Years", idNo: "CCIT-MGMT-004", department: "School of Management" }
    ]
  }
};

const INITIAL_BOARD_DATA: Record<string, DirectoryData> = {
  "Governing Council": {
    hod: { name: "Sri Y. V. Anjaneyulu", title: "Chairman & President", edu: "Graduate in Engineering & Humanities", interests: "Administration, institutional strategy, policy planning, and infrastructure development.", phone: "0863 2345401", email: "chairman@city.ac.in", avatar: "YVA", age: "65 Years", experience: "35 Years of Administrative Leadership", idNo: "CUB-GC-001", department: "Governing Council" },
    others: []
  },
  "Chancellor": {
    hod: { name: "Sri Y. V. Anjaneyulu", title: "Chancellor", edu: "Renowned Educationist & Founder Sponsor Representative", interests: "Strategic leadership, academic governance, public relations, and legal policies.", phone: "0863 2345401", email: "chancellor@city.ac.in", avatar: "YVA", age: "65 Years", experience: "35 Years", idNo: "CUB-CH-001", department: "Office of the Chancellor" },
    others: []
  },
  "Pro Chancellor": {
    hod: { name: "Sri Y. Sujit Kumar", title: "Pro Chancellor", edu: "M.Tech & MBA - Executive Education", interests: "Institutional progress planning, modernization initiatives, and industry collaborations.", phone: "0863 2345402", email: "prochan@city.ac.in", avatar: "YSK", age: "42 Years", experience: "18 Years", idNo: "CUB-PC-001", department: "Office of the Pro Chancellor" },
    others: []
  },
  "Vice Chancellor": {
    hod: { name: "Dr. K. Prasad Rao", title: "Vice Chancellor", edu: "Ph.D., Former Senior Professor - Administration & Research", interests: "Curriculum planning coordination, academic excellence, and international relations.", phone: "0863 2345403", email: "vc@city.ac.in", avatar: "KPR", age: "58 Years", experience: "30 Years", idNo: "CUB-VC-001", department: "Office of the Vice Chancellor" },
    others: []
  },
  "Registrar": {
    hod: { name: "Prof. T. Sivaramaiah", title: "Registrar", edu: "M.Tech, Ph.D. - Computer Networks", interests: "General administration, statutory records management, and legal affairs compliance.", phone: "0863 2345404", email: "registrar@city.ac.in", avatar: "TS", age: "53 Years", experience: "25 Years", idNo: "CUB-RG-001", department: "Registrar Office" },
    others: []
  },
  "Dean – Academic Affairs": {
    hod: { name: "Prof. P. V. Ramana", title: "Dean – Academic Affairs", edu: "Ph.D - Indian Institute of Technology Madras, India", interests: "Academic planning, curriculum development, and examinations coordination.", phone: "0863 2345432", email: "dean.academics@city.ac.in", avatar: "PVR", age: "52 Years", experience: "24 Years", idNo: "CUB-DA-001", department: "Academic Affairs Office" },
    others: []
  },
  "Dean – Research & Innovation": {
    hod: { name: "Dr. K. Chandrasekhar", title: "Dean – Research & Innovation", edu: "Ph.D - Indian Institute of Technology Delhi, India", interests: "Research ecosystem governance, patent filing, sponsored grants, and innovations.", phone: "0863 2345430", email: "dean.research@city.ac.in", avatar: "KC", age: "48 Years", experience: "20 Years", idNo: "CUB-DR-001", department: "Research & Development Cell" },
    others: []
  },
  "Dean – Student Affairs": {
    hod: { name: "Dr. G. Madhavi", title: "Dean – Student Affairs", edu: "Ph.D - Andhra University", interests: "Student welfare guidelines, professional clubs, and hostel supervision.", phone: "0863 2345460", email: "dean.students@city.ac.in", avatar: "GM", age: "42 Years", experience: "15 Years", idNo: "CUB-DS-001", department: "Student Affairs Cell" },
    others: []
  },
  "Dean – Faculty Affairs": {
    hod: { name: "Dr. T. Anuradha", title: "Dean – Faculty Affairs", edu: "Ph.D - BITS Pilani", interests: "Faculty recruitment, performance reviews, and professional development programs.", phone: "0863 2345470", email: "dean.faculty@city.ac.in", avatar: "TA", age: "47 Years", experience: "18 Years", idNo: "CUB-DF-001", department: "Faculty Affairs Office" },
    others: []
  },
  "Dean – Admissions": {
    hod: { name: "Dr. L. Rama Krishna", title: "Dean – Admissions", edu: "Ph.D - Osmania University", interests: "Admissions operations, merit scholarships, and student enrollment support.", phone: "0863 2345480", email: "dean.admissions@city.ac.in", avatar: "LRK", age: "51 Years", experience: "22 Years", idNo: "CUB-DAD-001", department: "Admissions Office" },
    others: []
  },
  "Dean – Placements & Relations": {
    hod: { name: "Dr. R. Karthik", title: "Dean – Placements & Relations", edu: "Ph.D - NIT Trichy", interests: "Industry relations, placements campaigns, and placement coordinates.", phone: "0863 2345461", email: "dean.placements@city.ac.in", avatar: "RK", age: "40 Years", experience: "13 Years", idNo: "CUB-DP-001", department: "Placement Office" },
    others: []
  },
  "Finance Officer": {
    hod: { name: "Sri G. Ravindra", title: "Finance Officer", edu: "MBA & Chartered Accountant", interests: "Finance supervision, budgeting audits, cash logs, and payroll systems.", phone: "0863 2345483", email: "finance@city.ac.in", avatar: "GR", age: "33 Years", experience: "8 Years", idNo: "CUB-FO-001", department: "Finance & Accounts Department" },
    others: []
  },
  "Controller of Examinations": {
    hod: { name: "Dr. V. Satish", title: "Controller of Examinations", edu: "Ph.D - JNTU Hyderabad", interests: "Examinations conduction, grading papers, and degree certification.", phone: "0863 2345471", email: "coe@city.ac.in", avatar: "VS", age: "38 Years", experience: "11 Years", idNo: "CUB-COE-001", department: "Examination Cell" },
    others: []
  }
};

const INITIAL_STAFF_DATA: Record<string, DirectoryData> = {
  "Registrar Office": {
    hod: { name: "Sri M. Srinivasa Rao", title: "Assistant Registrar", edu: "M.A. in Public Administration - Andhra University", interests: "General administration, statutory records maintenance, legal compliances support.", phone: "0863 2345530", email: "registrar.office@city.ac.in", avatar: "MSR", age: "48 Years", experience: "18 Years", idNo: "CUS-REG-001", department: "Registrar Office" },
    others: [
      { name: "Sri K. Ramu", title: "Section Officer", edu: "B.Com - Acharya Nagarjuna University", interests: "Files registry, letters cataloging, statutory documentation records.", phone: "0863 2345531", email: "ramu.reg@city.ac.in", avatar: "KR", age: "42 Years", experience: "13 Years", idNo: "CUS-REG-002", department: "Registrar Office" },
      { name: "Smt. G. Mary", title: "Senior Assistant", edu: "B.Sc - JNTU Kakinada", interests: "Inward outward dispatch, student data catalog entries.", phone: "0863 2345532", email: "mary.reg@city.ac.in", avatar: "GM", age: "36 Years", experience: "9 Years", idNo: "CUS-REG-003", department: "Registrar Office" }
    ]
  },
  "Academic Affairs": {
    hod: { name: "Sri V. Prasad", title: "Academic Coordinator", edu: "M.Tech in CSE", interests: "Academic registers compilation, class logs allocation support.", phone: "0863 2345540", email: "academic.office@city.ac.in", avatar: "VP", age: "40 Years", experience: "12 Years", idNo: "CUS-ACAD-001", department: "Academic Affairs" },
    others: []
  },
  "Finance & Accounts": {
    hod: { name: "Sri G. Suresh", title: "Accounts Officer", edu: "M.Com & MBA Finance", interests: "Accounts logs entry, financial audits review, cash books.", phone: "0863 2345550", email: "accounts@city.ac.in", avatar: "GS", age: "45 Years", experience: "16 Years", idNo: "CUS-FIN-001", department: "Finance & Accounts" },
    others: [
      { name: "Sri P. Naidu", title: "Senior Accountant", edu: "B.Com - ANU", interests: "Bank reconciliation, audit vouchers compilation.", phone: "0863 2345551", email: "naidu.fin@city.ac.in", avatar: "PN", age: "38 Years", experience: "10 Years", idNo: "CUS-FIN-002", department: "Finance & Accounts" }
    ]
  },
  "General Administration": {
    hod: { name: "Sri T. Satish", title: "Administrative Officer", edu: "M.A. - Public Admin", interests: "Daily campus operations management, logistic arrangements.", phone: "0863 2345560", email: "ao.admin@city.ac.in", avatar: "TS", age: "46 Years", experience: "17 Years", idNo: "CUS-ADM-001", department: "General Administration" },
    others: []
  },
  "Establishment": {
    hod: { name: "Sri K. Subba Rao", title: "Establishment Head", edu: "M.B.A. HR", interests: "Leaves records entry, promotion database, service logs.", phone: "0863 2345570", email: "estab@city.ac.in", avatar: "KSR", age: "52 Years", experience: "22 Years", idNo: "CUS-EST-001", department: "Establishment" },
    others: []
  },
  "Admissions Office": {
    hod: { name: "Smt. K. Aruna", title: "Admission Officer", edu: "MBA - Guntur", interests: "Counseling support, digital portal checks, certificate verification.", phone: "0863 2345580", email: "admissions.office@city.ac.in", avatar: "KA", age: "38 Years", experience: "11 Years", idNo: "CUS-ADM-001", department: "Admissions Office" },
    others: [
      { name: "Sri M. Ravi", title: "Verification Officer", edu: "B.Tech - JNTU", interests: "Academic marks verification and entry verification.", phone: "0863 2345581", email: "ravi.admissions@city.ac.in", avatar: "MR", age: "33 Years", experience: "7 Years", idNo: "CUS-ADM-002", department: "Admissions Office" }
    ]
  },
  "Examination Cell": {
    hod: { name: "Sri D. Srinivasa Rao", title: "Assistant COE", edu: "M.Tech - Andhra University", interests: "Grade books processing, certificate logs, seating layouts.", phone: "0863 2345590", email: "exams.office@city.ac.in", avatar: "DSR", age: "43 Years", experience: "14 Years", idNo: "CUS-EXAM-001", department: "Examination Cell" },
    others: [
      { name: "Smt. P. Kavitha", title: "Evaluation Assistant", edu: "B.Sc - ANU", interests: "Paper marks entries, dispatch queues, certification database.", phone: "0863 2345591", email: "kavitha.exams@city.ac.in", avatar: "PK", age: "34 Years", experience: "8 Years", idNo: "CUS-EXAM-002", department: "Examination Cell" }
    ]
  },
  "Placement Office": {
    hod: { name: "Sri K. Hari Prasad", title: "Placement Officer", edu: "M.B.A. HR & Marketing", interests: "Recruiter relations, coordinate placement schedules, training camps.", phone: "0863 2345600", email: "placements.office@city.ac.in", avatar: "KHP", age: "39 Years", experience: "12 Years", idNo: "CUS-PLC-001", department: "Placement Office" },
    others: [
      { name: "Smt. G. Swathi", title: "Corporate Relations Executive", edu: "M.A. English - Guntur", interests: "Corporate placement communication, resumes collection support.", phone: "0863 2345601", email: "swathi.plc@city.ac.in", avatar: "GS", age: "31 Years", experience: "6 Years", idNo: "CUS-PLC-002", department: "Placement Office" }
    ]
  },
  "Library": {
    hod: { name: "Dr. K. Swathi", title: "Chief Librarian", edu: "Ph.D. in Library Sciences", interests: "Index registries compilation, online journal accesses, purchase catalogs.", phone: "0863 2345610", email: "library@city.ac.in", avatar: "KS", age: "47 Years", experience: "18 Years", idNo: "CUS-LIB-001", department: "Library" },
    others: [
      { name: "Sri T. Kumar", title: "Library Assistant", edu: "M.Lib.Sc - ANU", interests: "Book registry circulation, digital logs tracking.", phone: "0863 2345611", email: "kumar.lib@city.ac.in", avatar: "TK", age: "35 Years", experience: "9 Years", idNo: "CUS-LIB-002", department: "Library" }
    ]
  },
  "Computer Centre": {
    hod: { name: "Sri K. Venkatesh", title: "System Administrator", edu: "M.Tech in Computer Networks", interests: "Laboratory support, LAN firewalls, network monitoring.", phone: "0863 2345620", email: "sysadmin@city.ac.in", avatar: "KV", age: "41 Years", experience: "15 Years", idNo: "CUS-COMP-001", department: "Computer Centre" },
    others: [
      { name: "Sri M. Ravi Kumar", title: "Network Engineer", edu: "B.Tech in CSE", interests: "Fiber router access points configurations, server updates.", phone: "0863 2345621", email: "network@city.ac.in", avatar: "MRK", age: "32 Years", experience: "6 Years", idNo: "CUS-COMP-002", department: "Computer Centre" }
    ]
  },
  "Research Office": {
    hod: { name: "Sri S. Venkatesh", title: "Research Coordinator", edu: "M.Tech - Research Associate", interests: "Filing patent archives, project grants tracker coordination.", phone: "0863 2345630", email: "research.office@city.ac.in", avatar: "SV", age: "37 Years", experience: "10 Years", idNo: "CUS-RES-001", department: "Research Office" },
    others: []
  },
  "Purchase & Stores": {
    hod: { name: "Sri B. Rajesh", title: "Purchase Superintendent", edu: "B.Tech - Mechanical", interests: "Stores ledger tracking, inventory checks, vendor bills log.", phone: "0863 2345640", email: "stores@city.ac.in", avatar: "BR", age: "45 Years", experience: "16 Years", idNo: "CUS-PUR-001", department: "Purchase & Stores" },
    others: []
  },
  "Estate Office": {
    hod: { name: "Sri P. S. Rao", title: "Estate Officer", edu: "B.Tech in Civil Engineering", interests: "Campus utilities, maintenance supervisor, green cover records.", phone: "0863 2345650", email: "estate@city.ac.in", avatar: "PSR", age: "50 Years", experience: "21 Years", idNo: "CUS-EST-001", department: "Estate Office" },
    others: []
  },
  "Public Relations": {
    hod: { name: "Sri K. Naidu", title: "PRO Head", edu: "M.A. in Journalism", interests: "Press drafting, news releases, hospitality services logs.", phone: "0863 2345660", email: "pro@city.ac.in", avatar: "KN", age: "44 Years", experience: "15 Years", idNo: "CUS-PR-001", department: "Public Relations" },
    others: []
  },
  "Student Affairs": {
    hod: { name: "Sri G. Ravindra", title: "Student Welfare Assistant", edu: "MBA - Student Coordinator", interests: "Club registrations support, coordinate sports events, hostel rosters.", phone: "0863 2345670", email: "student.office@city.ac.in", avatar: "GR", age: "36 Years", experience: "8 Years", idNo: "CUS-SA-001", department: "Student Affairs" },
    others: []
  },
  "Transport": {
    hod: { name: "Sri T. Prasad", title: "Transport Supervisor", edu: "Diploma in Mech Engineering", interests: "Bus driver log records, route planning registers, fuel logs.", phone: "0863 2345680", email: "transport@city.ac.in", avatar: "TP", age: "48 Years", experience: "20 Years", idNo: "CUS-TR-001", department: "Transport" },
    others: []
  },
  "Health Centre": {
    hod: { name: "Dr. S. Radha", title: "Medical Officer", edu: "M.B.B.S. - GMC", interests: "First-aid, diagnostics logs, medical inventory support.", phone: "0863 2345690", email: "health@city.ac.in", avatar: "SR", age: "42 Years", experience: "14 Years", idNo: "CUS-MED-001", department: "Health Centre" },
    others: []
  },
  "Guest House": {
    hod: { name: "Sri M. Ravi", title: "Guest House Warden", edu: "B.Sc - Hotel Management", interests: "Room booking entries, inventory audit logs, pantry check.", phone: "0863 2345700", email: "guesthouse@city.ac.in", avatar: "MR", age: "35 Years", experience: "9 Years", idNo: "CUS-GST-001", department: "Guest House" },
    others: []
  }
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const local = localStorage.getItem("chalapathi_announcements");
    return local ? JSON.parse(local) : INITIAL_ANNOUNCEMENTS;
  });

  const [programs, setPrograms] = useState<ProgramDetail[]>(() => {
    const local = localStorage.getItem("chalapathi_programs");
    return local ? JSON.parse(local) : PROGRAMS_DATA;
  });

  const [news, setNews] = useState<NewsArticle[]>(() => {
    const local = localStorage.getItem("chalapathi_news");
    return local ? JSON.parse(local) : INITIAL_NEWS;
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    const local = localStorage.getItem("chalapathi_events");
    return local ? JSON.parse(local) : INITIAL_EVENTS;
  });

  const [aboutContent, setAboutContent] = useState<AboutUsContent>(() => {
    const local = localStorage.getItem("chalapathi_about_v2");
    return local ? JSON.parse(local) : INITIAL_ABOUT_CONTENT;
  });

  const [calendarData, setCalendarData] = useState<MonthCalendarData[]>(() => {
    const local = localStorage.getItem("chalapathi_calendar");
    return local ? JSON.parse(local) : INITIAL_CALENDAR_DATA;
  });

  const [facultyData, setFacultyData] = useState<Record<string, DirectoryData>>(() => {
    const local = localStorage.getItem("chalapathi_faculty_data");
    return local ? JSON.parse(local) : INITIAL_FACULTY_DATA;
  });

  const [boardData, setBoardData] = useState<Record<string, DirectoryData>>(() => {
    const local = localStorage.getItem("chalapathi_board_data");
    return local ? JSON.parse(local) : INITIAL_BOARD_DATA;
  });

  const [staffData, setStaffData] = useState<Record<string, DirectoryData>>(() => {
    const local = localStorage.getItem("chalapathi_staff_data");
    return local ? JSON.parse(local) : INITIAL_STAFF_DATA;
  });

  const [placementsContent, setPlacementsContent] = useState<PlacementsContent>(() => {
    const local = localStorage.getItem("chalapathi_placements");
    return local ? JSON.parse(local) : INITIAL_PLACEMENTS_CONTENT;
  });

  const updateAnnouncements = (list: Announcement[]) => {
    setAnnouncements(list);
    localStorage.setItem("chalapathi_announcements", JSON.stringify(list));
  };

  const updatePrograms = (list: ProgramDetail[]) => {
    setPrograms(list);
    localStorage.setItem("chalapathi_programs", JSON.stringify(list));
  };

  const updateNews = (list: NewsArticle[]) => {
    setNews(list);
    localStorage.setItem("chalapathi_news", JSON.stringify(list));
  };

  const updateEvents = (list: EventItem[]) => {
    setEvents(list);
    localStorage.setItem("chalapathi_events", JSON.stringify(list));
  };

  const updateAboutContent = (content: AboutUsContent) => {
    setAboutContent(content);
    localStorage.setItem("chalapathi_about_v2", JSON.stringify(content));
  };

  const updateCalendarData = (data: MonthCalendarData[]) => {
    setCalendarData(data);
    localStorage.setItem("chalapathi_calendar", JSON.stringify(data));
  };

  const updateFacultyData = (data: Record<string, DirectoryData>) => {
    setFacultyData(data);
    localStorage.setItem("chalapathi_faculty_data", JSON.stringify(data));
  };

  const updateBoardData = (data: Record<string, DirectoryData>) => {
    setBoardData(data);
    localStorage.setItem("chalapathi_board_data", JSON.stringify(data));
  };

  const updateStaffData = (data: Record<string, DirectoryData>) => {
    setStaffData(data);
    localStorage.setItem("chalapathi_staff_data", JSON.stringify(data));
  };

  const updatePlacementsContent = (data: PlacementsContent) => {
    setPlacementsContent(data);
    localStorage.setItem("chalapathi_placements", JSON.stringify(data));
  };

  return (
    <DataContext.Provider value={{
      announcements,
      programs,
      news,
      events,
      aboutContent,
      calendarData,
      facultyData,
      boardData,
      staffData,
      placementsContent,
      updateAnnouncements,
      updatePrograms,
      updateNews,
      updateEvents,
      updateAboutContent,
      updateCalendarData,
      updateFacultyData,
      updateBoardData,
      updateStaffData,
      updatePlacementsContent
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
