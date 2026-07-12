"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap, Users, ArrowRight, Play, Trophy, Handshake, Landmark,
  Compass, FileText, Award, Phone, MapPin, Mail, Sparkles, Building2, HelpCircle, Search, Globe
} from "lucide-react";
import { useRef } from "react";

const HOME_EVENTS = [
  { title: "International Conference on AI & Robotics", date: "20 Jul 2026", image: "/prog_computer.png" },
  { title: "Annual Tech Fest 2026", date: "25 Jul 2026", image: "/prog_engineering.png" },
  { title: "Global Education Fair & Career Expo", date: "05 Aug 2026", image: "/prog_management.png" },
  { title: "Smart Systems Hackathon Sprint", date: "12 Oct 2026", image: "/students_admission.png" }
];

const HOME_NEWS = [
  { title: "City Chalapathi Institute of Technology Launches AI Research Center", date: "12 May 2025", image: "/prog_computer.png" },
  { title: "Students Win National Level Hackathon 2025 in Delhi", date: "06 May 2025", image: "/prog_diploma.png" },
  { title: "MoU Signed with Global Fortune 500 Industry Leaders", date: "03 May 2025", image: "/prog_management.png" },
  { title: "Annual Convocation Ceremony Celebrating Master Graduates", date: "28 Apr 2025", image: "/students_admission.png" }
];

/* ── animation helpers ────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Home() {
  const [directionsFrom, setDirectionsFrom] = useState("");
  const [activeTab, setActiveTab] = useState<"events" | "news">("events");
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Handle Autoplay scroll
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      if (!carouselRef.current) return;
      const el = carouselRef.current;
      const cardWidth = el.offsetWidth;
      const totalWidth = el.scrollWidth;
      const currentScroll = el.scrollLeft;

      if (currentScroll + cardWidth >= totalWidth - 5) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollTo({ left: currentScroll + cardWidth, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, activeTab]);

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const scrollWidth = el.scrollWidth - el.clientWidth;
    if (scrollWidth <= 0) return;
    const scrolledRatio = el.scrollLeft / el.clientWidth;
    setCurrentPage(Math.round(scrolledRatio));
  };

  const handleDotClick = (index: number) => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
    setCurrentPage(index);
  };

  const handleDirections = (e: React.FormEvent) => {
    e.preventDefault();
    if (directionsFrom) {
      window.open(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(directionsFrom)}&destination=Chalapathi+Institute+of+Technology+Mothadaka`, "_blank");
    }
  };

  useEffect(() => {
    document.title = "City Chalapathi Institute of Technology | Autonomous University";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F8FC] text-[#222222] overflow-x-hidden font-[var(--font-poppins)]">
      {/* ═══ HERO SECTION (720px height) ═══ */}
      <section className="relative w-full overflow-hidden bg-white" style={{ height: "720px" }}>
        {/* Background image covering right side, fading to white/gray on the left */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/campus_hero.png')" }}
        />
        {/* White gradient overlay restricted to the left side (approx 40% width) for text readability */}
        <div className="absolute inset-y-0 left-0 w-full md:w-[50%] lg:w-[40%] bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none" />

        {/* Content (1440px Container) */}
        <div className="relative z-10 max-w-[1440px] mx-auto h-full px-5 flex items-center justify-between">
          <motion.div
            className="w-full md:w-[60%] lg:w-[48%] space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              className="font-[var(--font-poppins)] text-[44px] md:text-[54px] lg:text-[62px] font-[800] leading-[1.1] tracking-tight text-[#072A6C]"
              variants={fadeUp}
            >
              SHAPING
              <br />
              TOMORROW'S
              <br />
              <span className="text-[#D71920]">INNOVATORS</span>
            </motion.h1>

            <motion.p
              className="text-[15px] md:text-[16px] text-[#666666] leading-relaxed max-w-md font-[400]"
              variants={fadeUp}
            >
              Empowering minds through quality education, advanced learning and real-world experience. Your future begins here.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4" variants={fadeUp}>
              <Link
                to="/admissions"
                className="h-11 px-7 bg-[#072A6C] hover:bg-[#051c4a] text-white text-[13px] font-[700] rounded-[12px] inline-flex items-center gap-2 transition-all shadow-sm active:scale-95"
              >
                Explore Campus <ArrowRight size={15} />
              </Link>
              <Link
                to="/campus-life"
                className="h-11 px-7 bg-white border border-[#072A6C] text-[#072A6C] hover:bg-slate-50 text-[13px] font-[700] rounded-[12px] inline-flex items-center gap-2 transition-all active:scale-95"
              >
                Virtual Tour
                <div className="w-5 h-5 rounded-full border border-[#072A6C] flex items-center justify-center">
                  <Play size={8} className="fill-current ml-0.5" />
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Floating Card Stack (16px border-radius) */}
          <div className="hidden lg:flex flex-col gap-2.5 z-20">
            {[
              { label: "Enquire Now", icon: HelpCircle, to: "/contact" },
              { label: "Brochure", icon: FileText, to: "/admissions" },
              { label: "Scholarships", icon: GraduationCap, to: "/admissions/scholarships" },
              { label: "Visit Campus", icon: MapPin, to: "/contact" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex flex-col items-center justify-center w-24 h-24 bg-white border border-gray-100 hover:border-[#072A6C] rounded-[16px] shadow-sm transition-all text-center p-2 group hover:-translate-y-1 hover:shadow-md"
                >
                  <Icon size={20} className="text-[#072A6C] group-hover:text-[#D71920] transition-colors mb-2" strokeWidth={1.8} />
                  <span className="text-[10px] font-[700] text-[#072A6C] leading-tight">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ STATISTICS BAR (Dark Blue - 14px border-radius container) ═══ */}
      <section className="bg-[#072A6C] w-full text-white py-8 select-none relative z-20 overflow-hidden">
        <motion.div
          className="max-w-[1440px] mx-auto px-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-4 justify-items-center text-center">
            {[
              { n: "25+", label: "Years of Excellence", icon: Trophy },
              { n: "150+", label: "Programs Offered", icon: GraduationCap },
              { n: "50+", label: "Expert Faculty", icon: Users },
              { n: "300+", label: "Industry Partners", icon: Handshake },
              { n: "20,000+", label: "Successful Alumni", icon: Landmark },
              { n: "95%", label: "Placement Success", icon: Award },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i} className="flex flex-col items-center max-w-[160px] rounded-[14px]" variants={fadeUp}>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3 border border-[#D4AF37]/30 shadow-sm">
                    <Icon size={18} className="text-[#D4AF37]" strokeWidth={2} />
                  </div>
                  <span className="block text-[22px] font-[800] leading-none text-[#D4AF37]">
                    {s.n}
                  </span>
                  <span className="block text-[11px] text-gray-200 font-[500] mt-2 leading-tight">
                    {s.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ═══ WHY CHOOSE US SECTION ═══ */}
      <section className="max-w-[1440px] mx-auto w-full px-5 py-20 text-center">
        <motion.span
          className="text-[12px] font-[700] tracking-wider text-[#D71920] block mb-2 uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          WHY CHOOSE US
        </motion.span>
        <motion.h2
          className="text-[26px] md:text-[32px] font-[800] text-[#072A6C] mb-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          CITY CHALAPATHI INSTITUTE OF TECHNOLOGY?
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {[
            {
              title: "Industry-Driven Curriculum",
              desc: "Programs designed with industry experts for future-ready skills.",
              icon: Trophy,
              color: "#D71920"
            },
            {
              title: "Experienced Faculty",
              desc: "Learn from passionate educators and domain specialists.",
              icon: Users,
              color: "#2563EB"
            },
            {
              title: "Advanced Infrastructure",
              desc: "State-of-the-art labs, smart classrooms and innovation hubs.",
              icon: Building2,
              color: "#F59E0B"
            },
            {
              title: "Strong Industry Connections",
              desc: "Internships, live projects and placements with top companies.",
              icon: Handshake,
              color: "#0D9488"
            },
            {
              title: "Holistic Development",
              desc: "Focus on leadership, creativity, and overall personality growth.",
              icon: Sparkles,
              color: "#7C3AED"
            },
            {
              title: "Global Opportunities",
              desc: "International exposure and collaborations for a global career.",
              icon: Globe,
              color: "#072A6C"
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                className="bg-white border border-gray-100 rounded-[16px] p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1"
                variants={fadeUp}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon size={20} />
                </div>
                <h3 className="font-[700] text-[13px] text-[#072A6C] mb-3 leading-snug min-h-[36px] flex items-center justify-center">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#666666] leading-relaxed font-[400]">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ═══ OUR PROGRAMS SECTION (16px border-radius cards) ═══ */}
      <section className="bg-white border-t border-gray-100 py-20">
        <div className="max-w-[1440px] mx-auto w-full px-5">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-[26px] font-[800] text-[#072A6C]">
              OUR PROGRAMS
            </h2>
            <Link
              to="/academics"
              className="text-[13px] font-[700] text-[#072A6C] hover:text-[#D71920] flex items-center gap-1 transition-colors"
            >
              View All Programs <ArrowRight size={14} />
            </Link>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {[
              { name: "Engineering", color: "#D71920", image: "/prog_engineering.png", to: "/academics/computer-science" },
              { name: "Management", color: "#F59E0B", image: "/prog_management.png", to: "/academics" },
              { name: "Computer Applications", color: "#2563EB", image: "/prog_computer.png", to: "/academics/computer-science" },
              { name: "Pharmacy", color: "#10B981", image: "/prog_pharmacy.png", to: "/academics" },
              { name: "Diploma", color: "#8B5CF6", image: "/prog_diploma.png", to: "/academics" },
              { name: "M.Tech Programs", color: "#EAB308", image: "/prog_mtech.png", to: "/academics" }
            ].map((p, idx) => (
              <motion.div
                key={idx}
                className="group bg-white border border-gray-100 rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-shadow relative"
                variants={scaleIn}
              >
                <div className="h-[140px] relative overflow-hidden bg-gray-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                <div className="px-4 pb-4 relative pt-6 text-center">
                  <div
                    className="absolute -top-5 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white border-[3px] border-white shadow-md group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: p.color }}
                  >
                    <GraduationCap size={14} />
                  </div>
                  <Link to={p.to} className="block">
                    <h3 className="font-[700] text-[13px] text-[#072A6C] group-hover:text-[#D71920] transition-colors leading-tight">
                      {p.name}
                    </h3>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CHALAPATHI JOURNEY & CAMPUS SECTION (Grouping into White Card containers) ═══ */}
      <section className="max-w-[1440px] mx-auto w-full px-5 py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Card: Journey */}
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-[16px] p-6 shadow-sm hover:shadow transition-shadow">
          <div>
            <span className="text-[12px] font-[700] text-[#D71920] tracking-wider uppercase block mb-1">THE CHALAPATHI JOURNEY</span>
            <h2 className="text-[26px] font-[800] text-[#072A6C]">
              Your Path to Success
            </h2>
          </div>

          {/* Timeline steps container with absolute positioning for vertical gray line */}
          <motion.div
            className="space-y-6 mt-6 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Vertical timeline connector */}
            <div className="absolute left-[70px] top-6 bottom-6 w-0.5 bg-gray-100 z-0" />

            {[
              { step: "01", title: "DISCOVER", desc: "Explore programs and find your passion.", icon: Compass, to: "/academics" },
              { step: "02", title: "APPLY", desc: "Submit your application online.", icon: FileText, to: "/admissions/apply" },
              { step: "03", title: "LEARN", desc: "Gain knowledge & practical exposure.", icon: GraduationCap, to: "/academics/computer-science" },
              { step: "04", title: "GROW", desc: "Build skills & achieve milestones.", icon: Award, to: "/about" },
              { step: "05", title: "SUCCEED", desc: "Launch your dream career", icon: Trophy, to: "/placements" }
            ].map((j) => {
              const Icon = j.icon;
              return (
                <motion.div key={j.step} className="flex gap-4 items-center relative z-10" variants={fadeUp}>
                  {/* Step Flag Pointer badge */}
                  <div className="w-10 h-8 bg-[#D71920] text-white font-[700] text-[13px] flex items-center justify-center shrink-0 rounded-l shadow-sm relative mr-2">
                    {j.step}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 border-[4px] border-transparent border-l-[#D71920]" />
                  </div>

                  {/* Circular Icon Container */}
                  <div className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-[#072A6C]" />
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 min-w-0">
                    <Link to={j.to} className="block">
                      <h4 className="text-[13px] font-[800] text-[#072A6C] tracking-wide hover:text-[#D71920] transition-colors">
                        {j.title}
                      </h4>
                    </Link>
                    <p className="text-[11px] text-[#666666] mt-0.5 leading-normal font-[400] truncate">
                      {j.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Right Card: Campus & Navigation */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[16px] p-6 shadow-sm hover:shadow transition-shadow flex flex-col justify-between gap-6">
          <div>
            <span className="text-[12px] font-[700] text-[#F59E0B] tracking-wider uppercase block mb-1">OUR CAMPUS</span>
            <h2 className="text-[26px] font-[800] text-[#072A6C]">
              A Campus Built for Excellence
            </h2>
          </div>

          <motion.div
            className="rounded-[16px] overflow-hidden shadow-sm bg-gray-100 h-[230px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src="/campus_hero.png" alt="Campus View" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            className="bg-[#072A6C] text-white rounded-[16px] p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="text-center md:text-left min-w-[200px]">
              <h3 className="text-[15px] font-[700]">Find Your Way</h3>
              <p className="text-[11px] text-gray-300 font-[300] mt-0.5">Get directions to City Chalapathi Institute of Technology</p>
            </div>

            {/* Combined Input Bar */}
            <form onSubmit={handleDirections} className="w-full md:w-auto flex-1 flex max-w-xl bg-white rounded-full p-1 overflow-hidden shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 pl-3 flex-1">
                <Search size={15} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={directionsFrom}
                  onChange={(e) => setDirectionsFrom(e.target.value)}
                  placeholder="Enter your location"
                  className="w-full text-black text-[12px] outline-none bg-transparent"
                />
              </div>
              <button type="submit" className="bg-[#D71920] hover:bg-[#b71217] text-white font-[700] px-5 py-2 rounded-full text-[12px] flex items-center gap-1 shrink-0 whitespace-nowrap active:scale-95 transition-transform">
                Get Directions <MapPin size={12} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ═══ UPCOMING EVENTS SECTION (CAROUSEL) ═══ */}
      <section className="bg-[#FDFBF7]/30 border-y border-gray-100 py-16 font-[var(--font-poppins)]">
        <div className="max-w-[1440px] mx-auto px-5">
          
          {/* Section Header */}
          <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-5">
            <div>
              <h2 className="text-2xl lg:text-3xl font-[800] text-[#072A6C] tracking-tight">
                Upcoming Events
              </h2>
              <p className="text-[12px] text-gray-400 mt-1 font-light">Explore the latest happenings and academic forums from across our campus.</p>
            </div>
            <Link to="/news/events" className="text-[12px] font-[700] text-[#D71920] hover:text-[#072A6C] transition-colors flex items-center gap-0.5">
              View Calendar <ArrowRight size={12} />
            </Link>
          </div>

          {/* Carousel Slider */}
          <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 select-none"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                scrollSnapType: "x mandatory"
              }}
              onScroll={handleCarouselScroll}
            >
              {HOME_EVENTS.map((item, idx) => (
                <div
                  key={idx}
                  className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start snap-always"
                >
                  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                    {/* Featured Image */}
                    <div className="h-48 overflow-hidden bg-slate-900 relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        draggable="false"
                      />
                    </div>
                    {/* Content Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[11px] font-extrabold text-[#F97316] uppercase tracking-wider block">
                          {item.date}
                        </span>
                        <h4 className="text-sm font-extrabold text-[#072A6C] leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                      </div>
                      <div className="pt-4 border-t border-gray-50 mt-4 flex justify-between items-center">
                        <span className="text-[10px] text-gray-400 font-medium">
                          View Details
                        </span>
                        <ArrowRight size={14} className="text-[#F97316]" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center gap-1.5 mt-8">
            {Array.from({ length: Math.ceil(HOME_EVENTS.length / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1)) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentPage === idx ? "w-8 bg-[#F97316]" : "w-2 bg-gray-200"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Centered Action Button */}
          <div className="flex justify-center mt-10">
            <Link
              to="/news/events"
              className="h-11 px-8 bg-[#854d0e] hover:bg-[#713f12] text-white text-[12px] font-bold rounded-xl inline-flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer uppercase tracking-wider"
            >
              View More Events <ArrowRight size={12} />
            </Link>
          </div>

        </div>
      </section>

      {/* ═══ STANDALONE NEWS SECTION (4 CARDS IN A ROW) ═══ */}
      <section className="bg-white py-16 font-[var(--font-poppins)] border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-5">
          {/* Header */}
          <div className="flex justify-between items-end mb-8 pb-5 border-b border-gray-100">
            <div>
              <h2 className="text-2xl lg:text-3xl font-[800] text-[#072A6C]">
                News @ City Chalapathi
              </h2>
              <p className="text-[12px] text-gray-400 mt-1 font-light">Stay updated with the latest milestones, accolades, and events from our institute.</p>
            </div>
            <Link to="/news" className="text-[12px] font-[700] text-[#D71920] hover:text-[#072A6C] transition-colors flex items-center gap-0.5">
              View All <ArrowRight size={12} />
            </Link>
          </div>

          {/* Cards Grid: 4 cols on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "AI Research Lab Inaugurated on Campus",
                date: "12 May 2025",
                category: "Innovation",
                excerpt: "In partnership with global tech giants, the new laboratory features advanced machine learning compute nodes for research projects.",
                image: "/prog_computer.png"
              },
              {
                title: "Engineering Students Win Smart Hackathon 2025",
                date: "06 May 2025",
                category: "Achievement",
                excerpt: "Our team developed a decentralized IoT mesh network algorithm to win first prize at the national technology showcase competition.",
                image: "/prog_engineering.png"
              },
              {
                title: "MoU Signed with Top Global Corporations for Placements",
                date: "03 May 2025",
                category: "Corporate Link",
                excerpt: "Enabling direct internship allocations, corporate-readiness workshops, and accelerated final semester student placements.",
                image: "/prog_management.png"
              },
              {
                title: "New Pharmacy Research Formulations Published",
                date: "28 Apr 2025",
                category: "Research",
                excerpt: "Our department has published groundbreaking formulations on nano-carrier systems in high-impact medical journals.",
                image: "/prog_pharmacy.png"
              }
            ].map((newsItem, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Card Image */}
                  <div className="h-44 w-full rounded-2xl overflow-hidden mb-4 relative">
                    <img 
                      src={newsItem.image} 
                      alt={newsItem.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  {/* Metadata */}
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 font-semibold mb-2">
                    <span className="text-[#F97316] uppercase tracking-wider">{newsItem.category}</span>
                    <span>•</span>
                    <span>{newsItem.date}</span>
                  </div>
                  {/* Title */}
                  <h4 className="text-sm font-[800] text-[#072A6C] leading-snug line-clamp-2 group-hover:text-[#D71920] transition-colors">
                    {newsItem.title}
                  </h4>
                  {/* Excerpt */}
                  <p className="text-[12px] text-gray-500 line-clamp-3 font-light mt-1.5 leading-relaxed">
                    {newsItem.excerpt}
                  </p>
                </div>
                {/* Footer action */}
                <div className="pt-4 border-t border-gray-50 mt-4 flex items-center justify-between text-[11px] font-bold text-[#072A6C]">
                  <span>Read Article</span>
                  <ArrowRight size={12} className="text-[#D71920] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ADMISSIONS OPEN 2026 STRIP ═══ */}
      <section className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Red Card */}
          <div className="lg:col-span-8 bg-[#D71920] text-white rounded-[16px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
            <div className="space-y-4 max-w-lg z-10">
              <h2 className="text-[26px] font-[800] tracking-wide">
                ADMISSIONS OPEN 2026
              </h2>
              <p className="text-[12px] text-red-100 leading-relaxed font-[300]">
                Join a community of innovators and leaders. Shape your future with City Chalapathi Institute of Technology.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2 font-[var(--font-poppins)]">
                <Link
                  to="/admissions/apply"
                  className="h-10 px-5 bg-white text-[#D71920] hover:bg-red-50 text-[11px] font-[700] rounded-[8px] inline-flex items-center gap-1.5 shadow active:scale-95 transition-transform"
                >
                  Apply Now <ArrowRight size={13} />
                </Link>
                <Link
                  to="/admissions"
                  className="h-10 px-5 border border-white hover:bg-white/10 text-[11px] font-[700] rounded-[8px] inline-flex items-center gap-1.5 active:scale-95 transition-transform"
                >
                  Download Brochure
                </Link>
                <Link
                  to="/contact"
                  className="h-10 px-5 border border-white hover:bg-white/10 text-[11px] font-[700] rounded-[8px] inline-flex items-center gap-1.5 active:scale-95 transition-transform"
                >
                  Talk to Counselor
                </Link>
              </div>
            </div>

            {/* Students Image absolute positioned on the right edge */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 h-full w-full md:w-[42%] overflow-hidden z-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img src="/students_admission.png" alt="Students" className="w-full h-full object-cover object-left-top" />
            </motion.div>
          </div>

          {/* Right White Card */}
          <div className="lg:col-span-4 bg-white border border-gray-200/60 rounded-[16px] p-6 flex items-center justify-between gap-4 shadow-sm">
            <div className="space-y-4 flex-1">
              <h3 className="text-[13px] font-[800] uppercase tracking-wider text-[#072A6C]">VISIT US</h3>
              <div className="space-y-2.5 text-[11px] text-gray-600 font-[400]">
                <div className="flex items-start gap-1.5">
                  <MapPin size={12} className="shrink-0 mt-0.5 text-gray-400" />
                  <span>A.R. Nagar, Mothadaka, Guntur, Andhra Pradesh - 522034</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Phone size={12} className="shrink-0 mt-0.5 text-gray-400" />
                  <span>8886630355 | 8886630356 9905505566</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Mail size={12} className="shrink-0 mt-0.5 text-gray-400" />
                  <span>admissions@city.ac.in</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Globe size={12} className="shrink-0 mt-0.5 text-gray-400" />
                  <span>www.city.ac.in</span>
                </div>
              </div>
            </div>

            {/* Map Frame */}
            <div className="w-[130px] h-[130px] rounded-[12px] overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.974950454796!2d80.28581691486445!3d16.375218788685984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a79679802cfad%3A0xe67e2a901bbd33fe!2sChalapathi%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1657523129846!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
