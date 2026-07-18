import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, Bookmark, X, Clock, MapPin, Share2, Flame, Award, Trophy, Users, GraduationCap, BookOpen, ChevronRight } from "lucide-react";

interface Article {
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
}

const MSN_NEWS_ITEMS: Article[] = [
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
    slug: "ai-research-lab"
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
    slug: "smart-hackathon"
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
    slug: "yoga-day"
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
    slug: "renewable-energy"
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
    slug: "record-placements"
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
    slug: "annual-convocation"
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
    slug: "innovation-summit"
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
    slug: "annual-sports-meet"
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
    slug: "admissions-open"
  }
];

const UPCOMING_EVENTS = [
  {
    day: "20",
    month: "MAY",
    title: "National Seminar on Artificial Intelligence",
    time: "10:00 AM - 04:00 PM",
    location: "Auditorium, Block A"
  },
  {
    day: "24",
    month: "MAY",
    title: "Workshop on Data Science with Python",
    time: "09:00 AM - 01:00 PM",
    location: "Lab 3, Tech Block"
  },
  {
    day: "31",
    month: "MAY",
    title: "Entrepreneurship Conclave 2025",
    time: "10:00 AM - 03:00 PM",
    location: "Innovation Hall"
  }
];

const NEWS_CATEGORIES_INFO = [
  {
    title: "ACADEMICS",
    desc: "Curriculum updates, academic activities and more.",
    articles: "32 Articles",
    icon: GraduationCap,
    bgColor: "bg-blue-50 text-blue-600",
    iconColor: "#2563EB"
  },
  {
    title: "RESEARCH",
    desc: "Innovations, publications and research highlights.",
    articles: "28 Articles",
    icon: BookOpen,
    bgColor: "bg-rose-50 text-rose-600",
    iconColor: "#E11D48"
  },
  {
    title: "SPORTS",
    desc: "Matches, tournaments and sports achievements.",
    articles: "18 Articles",
    icon: Trophy,
    bgColor: "bg-amber-50 text-amber-600",
    iconColor: "#D97706"
  },
  {
    title: "STUDENT LIFE",
    desc: "Clubs, events and student achievements.",
    articles: "24 Articles",
    icon: Users,
    bgColor: "bg-sky-50 text-sky-600",
    iconColor: "#0284C7"
  }
];

const FILTER_CATEGORIES = ["All", "Research", "Placements", "Campus Life", "Events", "Sports", "Admissions", "Innovation"];

export default function News() {
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    document.title = "University News | City Chalapathi Institute of Technology";
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden";
      setShowShareMenu(false);
    } else {
      document.body.style.overflow = "";
      setShowShareMenu(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedArticle]);

  // Handle escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedArticle(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto scroll featured news slider
  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % MSN_NEWS_ITEMS.slice(0, 3).length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const getRelatedArticles = (activeId: number) => {
    return MSN_NEWS_ITEMS.filter(item => item.id !== activeId).slice(0, 3);
  };

  const filteredNews = activeCategory === "All" 
    ? MSN_NEWS_ITEMS 
    : MSN_NEWS_ITEMS.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  const featuredArticle = MSN_NEWS_ITEMS[featuredIndex];

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-[var(--font-poppins)] pb-24 relative select-none text-left">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#072A6C] to-indigo-950 text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-[1440px] mx-auto relative z-10 text-center lg:text-left space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white font-bold text-[10px] uppercase tracking-wider backdrop-blur-sm">
            Latest Bulletins
          </span>
          <h1 className="text-3xl lg:text-5xl font-[900] tracking-tight">University News</h1>
          <p className="text-xs text-white font-light max-w-xl leading-relaxed">
            Stay updated with the latest happenings, milestones, and achievements from across the university.
          </p>
        </div>
      </section>

      {/* Main MSN News Content */}
      <section className="max-w-[1440px] mx-auto px-5 mt-10">
        
        {/* Top 3-Column MSN Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Featured News Block (Spans 2 columns) */}
          <div className="lg:col-span-2 bg-white rounded-[18px] shadow-sm border border-gray-100/80 overflow-hidden flex flex-col md:flex-row h-full min-h-[380px] group transition-all duration-300">
            {/* Image (55%) */}
            <div className="w-full md:w-[55%] relative overflow-hidden h-[240px] md:h-auto shrink-0">
              <img 
                src={featuredArticle.image} 
                alt={featuredArticle.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-[#D71920] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-md shadow-sm">
                FEATURED NEWS
              </span>
            </div>
            
            {/* Content (45%) */}
            <div className="w-full md:w-[45%] p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <span className="text-[#D71920]">{featuredArticle.category}</span>
                  <span>•</span>
                  <span>{featuredArticle.date}</span>
                </div>
                <h2 className="text-lg md:text-xl font-[800] text-[#072A6C] leading-snug tracking-tight">
                  {featuredArticle.title}
                </h2>
                <p className="text-[12px] text-gray-500 font-[var(--font-inter)] leading-relaxed line-clamp-4">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-5 flex flex-col gap-4">
                <button 
                  onClick={() => navigate(`/news/${featuredArticle.slug}`)}
                  className="h-10 px-5 bg-[#072A6C] hover:bg-[#072A6C]/90 text-white text-[11px] font-bold rounded-xl inline-flex items-center justify-center gap-1.5 transition-all self-start cursor-pointer hover:shadow-md"
                >
                  <span>Read Full Story</span>
                  <ArrowRight size={13} />
                </button>
                
                {/* Dots indicators */}
                <div className="flex items-center gap-2">
                  {MSN_NEWS_ITEMS.slice(0, 3).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setFeaturedIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === featuredIndex ? "bg-[#D71920] w-4" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Trending Now */}
          <div className="bg-white rounded-[18px] p-6 shadow-sm border border-gray-100/80 flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center gap-2 text-[#072A6C] border-b border-gray-100 pb-3 mb-4">
                <Flame size={18} className="text-red-500 fill-current animate-pulse" />
                <h3 className="text-sm font-black uppercase tracking-wider">TRENDING NOW</h3>
              </div>
              <div className="space-y-4">
                {MSN_NEWS_ITEMS.slice(0, 5).map((item, idx) => (
                  <button 
                    key={item.id}
                    onClick={() => setSelectedArticle(item)}
                    className="flex items-start gap-4 text-left w-full group cursor-pointer"
                  >
                    <span className="text-xl font-black text-gray-200 group-hover:text-[#D71920] transition-colors leading-none pt-0.5">
                      {`0${idx + 1}`}
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="text-[12px] font-bold text-gray-700 leading-snug group-hover:text-[#072A6C] transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-[9px] text-gray-400 font-semibold">{item.date}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => setActiveCategory("All")}
              className="text-[11px] font-bold text-[#072A6C] hover:text-[#D71920] inline-flex items-center gap-1 mt-5 self-start transition-colors"
            >
              <span>View All Trending</span>
              <ChevronRight size={12} />
            </button>
          </div>

        </div>

        {/* Lower Row: Filter & Latest Grid & Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 items-start">
          
          {/* Main Grid + Filter Section (Left/Center 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200/80 pb-5">
              <div>
                <h3 className="text-xl font-black text-[#072A6C]">Latest News</h3>
                <p className="text-[11px] text-gray-400 mt-1 font-light">Explore recent headlines, faculty achievements, and student innovations.</p>
              </div>
            </div>

            {/* MSN Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none whitespace-nowrap">
              {FILTER_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-all duration-200 cursor-pointer ${
                    activeCategory === cat 
                      ? "bg-[#072A6C] text-white border-[#072A6C] shadow-sm" 
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Latest News Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredNews.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(`/news/${item.slug}`)}
                  className="bg-white rounded-[18px] border border-gray-100/80 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group text-left w-full cursor-pointer outline-none"
                >
                  <div>
                    {/* Image Area */}
                    <div className="h-44 w-full overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {/* Content Details */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-2.5 text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                        <span className="text-[#D71920]">{item.category}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                      <h4 className="text-[13px] font-[800] text-[#072A6C] leading-snug line-clamp-2 group-hover:text-[#D71920] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11.5px] text-gray-500 font-[var(--font-inter)] line-clamp-2 leading-relaxed font-light">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-gray-50 flex items-center justify-between text-[10px] font-bold text-[#072A6C] w-full">
                    <span>Read More</span>
                    <ArrowRight size={11} className="text-[#D71920] group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>

            {/* Bottom 4 Category Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {NEWS_CATEGORIES_INFO.map((cat, idx) => {
                const IconComponent = cat.icon;
                return (
                  <div 
                    key={idx} 
                    className="bg-white rounded-[18px] p-4 border border-gray-100/80 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-all duration-300"
                  >
                    <div className={`w-10 h-10 rounded-xl ${cat.bgColor} flex items-center justify-center shrink-0`}>
                      <IconComponent size={20} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-[#072A6C] tracking-wide">{cat.title}</span>
                        <span className="text-[9px] font-bold text-gray-400">{cat.articles}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 leading-normal font-[var(--font-inter)] font-light">{cat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Upcoming Events */}
          <div className="bg-white rounded-[18px] p-6 shadow-sm border border-gray-100/80 space-y-4">
            <div className="flex items-center gap-2 text-[#072A6C] border-b border-gray-100 pb-3 mb-2">
              <Calendar size={16} className="text-[#D71920]" />
              <h3 className="text-sm font-black uppercase tracking-wider">UPCOMING EVENTS</h3>
            </div>
            
            <div className="space-y-5">
              {UPCOMING_EVENTS.map((event, idx) => (
                <div key={idx} className="flex gap-4 items-start border-b border-gray-50 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-[#D71920] shrink-0 border border-red-100/30">
                    <span className="text-base font-black leading-none">{event.day}</span>
                    <span className="text-[9px] font-black tracking-wider uppercase leading-none mt-1">{event.month}</span>
                  </div>
                  <div className="space-y-1 text-left">
                    <h4 className="text-[11.5px] font-bold text-gray-800 leading-snug hover:text-[#072A6C] transition-colors cursor-pointer">
                      {event.title}
                    </h4>
                    <div className="flex flex-col gap-0.5 text-[9px] text-gray-400 font-semibold font-[var(--font-inter)]">
                      <div className="flex items-center gap-1">
                        <Clock size={9} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={9} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* ======================================================== */}
      {/* 🌟 CENTERED MODAL POPUP OVERLAY                           */}
      {/* ======================================================== */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 overflow-y-auto"
          onClick={() => setSelectedArticle(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Animated Modal Container */}
          <div 
            className="bg-white w-full max-w-[900px] rounded-[24px] overflow-hidden shadow-2xl relative animate-fade-in flex flex-col max-h-[90vh] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/75 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            {/* Scrollable Modal Content */}
            <div className="overflow-y-auto p-6 md:p-8 space-y-6">
              
              {/* Large Featured Image */}
              <div className="h-[280px] md:h-[380px] w-full rounded-2xl overflow-hidden relative shadow-sm">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-bold text-white bg-[#D71920] py-1 px-3 rounded-lg uppercase tracking-wider shadow-sm">
                  {selectedArticle.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-3xl font-[900] text-[#072A6C] tracking-tight leading-snug">
                {selectedArticle.title}
              </h2>

              {/* Metadata Panel */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-gray-500 font-semibold bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#D71920]" />
                  <span>{selectedArticle.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#D71920]" />
                  <span>{selectedArticle.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#D71920]" />
                  <span>{selectedArticle.location}</span>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-100" />

              {/* Content Body */}
              <div className="text-sm text-gray-600 font-light leading-relaxed space-y-4">
                <p>{selectedArticle.bodyText}</p>
                <p>Collaborating with local and global stakeholders, City Chalapathi continues to design ecosystems that support professional readiness, technical excellence, and research publications. Contact the department administration office for enrollment procedures or specific course details.</p>
              </div>

              {/* Related Section (Read Next) */}
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <h4 className="text-xs font-extrabold tracking-wider text-[#072A6C] uppercase">
                  Read Next
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {getRelatedArticles(selectedArticle.id).map((related, rIdx) => (
                    <button
                      key={rIdx}
                      onClick={() => setSelectedArticle(related)}
                      className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow text-left flex flex-col gap-2 transition-all w-full cursor-pointer hover:border-gray-200"
                    >
                      <span className="text-[9px] font-extrabold text-[#D71920] uppercase">{related.category}</span>
                      <h5 className="text-[12px] font-extrabold text-[#072A6C] line-clamp-2 leading-tight">
                        {related.title}
                      </h5>
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-6 border-t border-gray-100 flex justify-end gap-3 items-center">
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="h-10 px-5 border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  >
                    <Share2 size={13} /> Share Article
                  </button>

                  {showShareMenu && (
                    <div className="absolute bottom-12 right-0 bg-white border border-gray-250 rounded-full shadow-2xl p-2 z-30 flex items-center gap-2 animate-fade-in whitespace-nowrap">
                      {/* WhatsApp */}
                      <a 
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(selectedArticle.title + " " + window.location.origin + "/news#" + selectedArticle.id)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                        onClick={() => setShowShareMenu(false)}
                        title="Share on WhatsApp"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.49-3.238c1.677.995 3.398 1.493 5.45 1.495 5.518.002 10.005-4.486 10.008-10.007.001-2.673-1.04-5.186-2.932-7.078C17.13 3.28 14.619 2.238 11.944 2.238 6.428 2.238 1.94 6.724 1.937 12.247c-.001 2.098.547 4.148 1.593 5.922L2.544 21.6l3.774-1.002z" /></svg>
                      </a>
                      {/* Twitter / X */}
                      <a 
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + "/news#" + selectedArticle.id)}&text=${encodeURIComponent(selectedArticle.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                        onClick={() => setShowShareMenu(false)}
                        title="Share on X"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      </a>
                      {/* LinkedIn */}
                      <a 
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + "/news#" + selectedArticle.id)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-[#0077B5] hover:bg-[#00669c] text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                        onClick={() => setShowShareMenu(false)}
                        title="Share on LinkedIn"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                      {/* Facebook */}
                      <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + "/news#" + selectedArticle.id)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-[#1877F2] hover:bg-[#1466d0] text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                        onClick={() => setShowShareMenu(false)}
                        title="Share on Facebook"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </a>
                      {/* Telegram */}
                      <a 
                        href={`https://t.me/share/url?url=${encodeURIComponent(window.location.origin + "/news#" + selectedArticle.id)}&text=${encodeURIComponent(selectedArticle.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-[#24A1DE] hover:bg-[#208fca] text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                        onClick={() => setShowShareMenu(false)}
                        title="Share on Telegram"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M11.944 0C5.352 0 0 5.352 0 12s5.352 12 11.944 12c6.648 0 12-5.352 12-12S18.592 0 11.944 0zm5.82 8.016c-.156 1.488-.816 5.376-1.152 7.176-.144.756-.42 1.008-.684 1.032-.588.06-1.032-.384-1.608-.756-.888-.588-1.392-.948-2.256-1.512-1.008-.648-.36-1.008.216-1.596.156-.156 2.856-2.616 2.904-2.82.012-.048.012-.228-.096-.324-.108-.096-.264-.06-.384-.036-.168.036-2.844 1.8-8.028 5.292-.756.516-1.44.768-2.052.756-.672-.012-1.968-.372-2.928-.684-1.176-.384-2.124-.588-2.04-1.248.048-.336.504-.684 1.38-1.032 5.4-2.352 9-3.9 10.8-4.656 5.136-2.148 6.204-2.52 6.9-2.532.156 0 .504.036.732.228.192.156.24.372.252.528 0 .096-.012.336-.024.456z"/></svg>
                      </a>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="h-10 px-6 bg-[#072A6C] hover:bg-[#072A6C]/90 text-white text-xs font-bold rounded-xl inline-flex items-center transition-all active:scale-95 cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
