import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, Bookmark, X, Clock, MapPin, Share2, Flame, Award, Trophy, Users, GraduationCap, BookOpen, ChevronRight } from "lucide-react";
import { useData } from "../context/DataContext";

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
  const { news } = useData();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  useEffect(() => {
    document.title = "University News | City Chalapathi Institute of Technology";
  }, []);



  // Auto scroll featured news slider
  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % news.slice(0, 3).length);
    }, 6000);
    return () => clearInterval(timer);
  }, [news.length]);

  const getRelatedArticles = (activeId: number) => {
    return news.filter(item => item.id !== activeId).slice(0, 3);
  };

  const filteredNews = activeCategory === "All" 
    ? news 
    : news.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  const featuredArticle = news[featuredIndex] || news[0];

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
                  {news.slice(0, 3).map((_, idx) => (
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
                {news.slice(0, 5).map((item, idx) => (
                  <button 
                    key={item.id}
                    onClick={() => navigate(`/news/${item.slug}`)}
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

          {/* Right Column: Upcoming Events & Weather */}
          <div className="space-y-6">
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

        </div>

      </section>



    </div>
  );
}
