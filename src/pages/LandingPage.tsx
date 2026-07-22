import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, BookOpen, Landmark, Trophy, Users, Award, 
  Send, ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight, Phone, Mail, MapPin, 
  Lightbulb, Brain, Cpu, Database, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INDIAN_STATES = [
  "Andhra Pradesh", "Telangana", "Karnataka", "Tamil Nadu", "Maharashtra", 
  "Delhi", "Kerala", "Gujarat", "Rajasthan", "Uttar Pradesh", "West Bengal", 
  "Madhya Pradesh", "Other"
];

const QUALIFICATIONS = [
  "Class 12 / Intermediate", "Graduation / Under Graduate", "Post Graduation", "Diploma", "Other"
];

const YEARS_OF_PASSING = [
  "2030", "2029", "2028", "2027", "2026", "2025", "2024", "2023", "Before 2023"
];

const PROGRAMS = [
  "B.Tech - Computer Science and Engineering",
  "B.Tech - CSE (Data Science)",
  "B.Tech - CSE (Artificial Intelligence)",
  "B.Tech - Artificial Intelligence & Machine Learning",
  "B.Tech - CSE (Cyber Security)",
  "M.Tech - Computer Science and Engineering",
  "M.Tech - CSE (AI & ML)",
  "MCA",
  "Ph.D - Computer Science and Engineering",
  "B.Tech - Electronics and Communication Engineering",
  "M.Tech - VLSI and Embedded Systems Design",
  "B.Tech - Civil Engineering",
  "M.Tech - Structural Engineering",
  "MBA"
];

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&fit=crop",
    title: "Empowering Minds. Shaping Futures.",
    subtitle: "Admissions Open for Academic Year 2026-27"
  },
  {
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&fit=crop",
    title: "State-of-the-Art Labs & Infrastructure",
    subtitle: "Learn Today. Lead Tomorrow."
  },
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&fit=crop",
    title: "95% Placement Record in Top MNCs",
    subtitle: "Your Pathway to Global Career Success"
  }
];

const GALLERY_IMAGES = [
  { url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&fit=crop", title: "Computing Lab" },
  { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&fit=crop", title: "Engineering Lab" },
  { url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&fit=crop", title: "Central Library" },
  { url: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&fit=crop", title: "Seminar Hall" },
  { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&fit=crop", title: "Student Discussion" },
  { url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&fit=crop", title: "Placement Training" }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    state: "",
    qualification: "",
    yearOfPassing: "",
    program: "",
    query: ""
  });

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...formData
    };
    const existingLeads = JSON.parse(localStorage.getItem("chalapathi_enquiry_leads") || "[]");
    localStorage.setItem("chalapathi_enquiry_leads", JSON.stringify([newLead, ...existingLeads]));
    setFormSubmitted(true);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("enquiry-form-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-[var(--font-poppins)] text-slate-800">
      
      {/* ─── MINI HEADER ───────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-100 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png?v=3" alt="Chalapathi University" className="h-12 w-auto object-contain" />
          </div>
          <button 
            onClick={scrollToForm}
            className="h-10 px-6 bg-[#072A6C] hover:bg-[#051c4a] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-md"
          >
            Apply Now
          </button>
        </div>
      </header>

      {/* ─── HERO CAROUSEL BANNER ──────────────────────────────── */}
      <section className="relative h-[550px] md:h-[650px] overflow-hidden select-none bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img 
              src={HERO_SLIDES[currentSlide].image} 
              alt="University banner" 
              className="w-full h-full object-cover opacity-60"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 max-w-4xl mx-auto z-10 text-white space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="px-4 py-1.5 bg-[#D4AF37] text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-full"
          >
            Admissions Open 2026-27
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight"
          >
            {HERO_SLIDES[currentSlide].title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-sm md:text-lg text-slate-200 font-light tracking-wide max-w-2xl"
          >
            {HERO_SLIDES[currentSlide].subtitle}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-4"
          >
            <button 
              onClick={scrollToForm}
              className="px-8 py-4 bg-[#FAB005] hover:bg-[#e09e00] text-slate-900 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Start Admission Process
            </button>
          </motion.div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? "w-8 bg-[#D4AF37]" : "w-2.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ─── ABOUT CHALAPATHI UNIVERSITY ─────────────────────── */}
      <section className="py-20 px-6 max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">About Our University</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#072A6C] uppercase tracking-tight leading-none">
            Legacy of Educational <span className="text-[#D4AF37]">Excellence</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed">
            Chalapathi University stands as a beacon of academic prestige and research excellence. Offering state-of-the-art laboratory facilities, smart classrooms, and an outstanding curriculum aligned with modern industry trends, we prepare our graduates to learn, innovate, and lead in global tech and business ecosystems.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="border-l-4 border-[#072A6C] pl-4 space-y-1">
              <span className="block text-2xl font-black text-[#072A6C]">35+ Years</span>
              <span className="text-[11px] text-slate-500 font-bold uppercase">Educational Legacy</span>
            </div>
            <div className="border-l-4 border-[#D4AF37] pl-4 space-y-1">
              <span className="block text-2xl font-black text-[#072A6C]">95%</span>
              <span className="text-[11px] text-slate-500 font-bold uppercase">Placement Success</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 bg-white p-2 border border-slate-100 rounded-3xl shadow-md rotate-1 hover:rotate-0 transition-transform duration-500">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&fit=crop" 
            alt="Campus block" 
            className="rounded-2xl w-full h-auto object-cover aspect-[4/3]"
          />
        </div>
      </section>

      {/* ─── ACADEMIC SCHOOLS ─────────────────────────────────── */}
      <section className="py-20 bg-slate-100 px-6">
        <div className="max-w-[1240px] mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">Our Schools</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#072A6C] uppercase tracking-tight">Academic Departments</h2>
            <p className="text-xs text-slate-500 max-w-xl mx-auto font-light leading-relaxed">
              Explore specialized world-class programs across our three major academic branches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* School of Computing Sciences */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[320px] hover:translate-y-[-4px] transition-transform">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#072A6C]/5 flex items-center justify-center text-[#072A6C]">
                  <Cpu size={24} />
                </div>
                <h3 className="text-lg font-black uppercase text-[#072A6C] tracking-wide">Computing Sciences</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Specialized courses in AI & ML, Data Science, Cyber Security, Software Engineering, and Computer Applications.
                </p>
              </div>
              <button onClick={scrollToForm} className="text-xs font-bold text-[#D4AF37] hover:text-[#072A6C] flex items-center gap-1 mt-6">
                Apply Here →
              </button>
            </div>

            {/* School of Engineering */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[320px] hover:translate-y-[-4px] transition-transform">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#072A6C]/5 flex items-center justify-center text-[#072A6C]">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-lg font-black uppercase text-[#072A6C] tracking-wide">School of Engineering</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Advanced labs and courses in Electronics & Communication (ECE), VLSI, Embedded Systems, and Civil Engineering.
                </p>
              </div>
              <button onClick={scrollToForm} className="text-xs font-bold text-[#D4AF37] hover:text-[#072A6C] flex items-center gap-1 mt-6">
                Apply Here →
              </button>
            </div>

            {/* School of Business & Management */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[320px] hover:translate-y-[-4px] transition-transform">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#072A6C]/5 flex items-center justify-center text-[#072A6C]">
                  <Landmark size={24} />
                </div>
                <h3 className="text-lg font-black uppercase text-[#072A6C] tracking-wide">Business & Management</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  MBA programs nurturing global entrepreneurial thinking, leadership capabilities, corporate strategies, and finance.
                </p>
              </div>
              <button onClick={scrollToForm} className="text-xs font-bold text-[#D4AF37] hover:text-[#072A6C] flex items-center gap-1 mt-6">
                Apply Here →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INNOVATION & ENTREPRENEURSHIP ───────────────────── */}
      <section className="py-20 px-6 max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 bg-white p-2 border border-slate-100 rounded-3xl shadow-md -rotate-1 hover:rotate-0 transition-transform duration-500 order-2 lg:order-1">
          <img 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&fit=crop" 
            alt="Innovation hub" 
            className="rounded-2xl w-full h-auto object-cover aspect-[4/3]"
          />
        </div>
        <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
          <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">Innovation & Incubation</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#072A6C] uppercase tracking-tight leading-none">
            Fostering <span className="text-[#D4AF37]">Student Startups</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed">
            Our campus Innovation Hub and Incubation Center support student founders from idea conception to launch. With dedicated seed funding, workspace structures, and patent filing assistance, we are creating next-generation technological leaders and entrepreneurs.
          </p>
          <div className="flex gap-4 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center text-[#FAB005] shrink-0 mt-1">
                <Lightbulb size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#072A6C] uppercase">Ideation Cells</h4>
                <p className="text-[11px] text-slate-500 font-light">Regular mentoring tables and hackathons</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#072A6C] shrink-0 mt-1">
                <Brain size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#072A6C] uppercase">Patent Filing</h4>
                <p className="text-[11px] text-slate-500 font-light">Comprehensive legal and financial support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── UNIVERSITY EXCELLENCE & ACHIEVEMENTS ─────────────── */}
      <section className="py-16 bg-[#072A6C] text-white text-center select-none px-6">
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-1">
            <span className="block text-3xl md:text-4xl font-black text-[#D4AF37]">NAAC A+</span>
            <span className="text-[10px] text-slate-300 font-extrabold uppercase tracking-wider block">Accredited Grade</span>
          </div>
          <div className="space-y-1">
            <span className="block text-3xl md:text-4xl font-black text-[#D4AF37]">95%</span>
            <span className="text-[10px] text-slate-300 font-extrabold uppercase tracking-wider block">Placement Success</span>
          </div>
          <div className="space-y-1">
            <span className="block text-3xl md:text-4xl font-black text-[#D4AF37]">₹15 LPA</span>
            <span className="text-[10px] text-slate-300 font-extrabold uppercase tracking-wider block">Highest Package</span>
          </div>
          <div className="space-y-1">
            <span className="block text-3xl md:text-4xl font-black text-[#D4AF37]">50+</span>
            <span className="text-[10px] text-slate-300 font-extrabold uppercase tracking-wider block">Recruitment Partners</span>
          </div>
        </div>
      </section>

      {/* ─── CAMPUS GALLERY ──────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-[1240px] mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">Campus Life</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#072A6C] uppercase tracking-tight">Our Gallery</h2>
            <p className="text-xs text-slate-500 max-w-xl mx-auto font-light leading-relaxed">
              Take a visual tour around our modern campus infrastructure and student activity zones.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((img, idx) => (
              <div 
                key={idx} 
                className="group relative overflow-hidden rounded-2xl border border-slate-100 shadow-sm aspect-[4/3] cursor-pointer"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 text-left" />
                <span className="absolute bottom-4 left-4 text-white font-bold text-xs uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  {img.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ADMISSION ENQUIRY FORM ───────────────────────────── */}
      <section id="enquiry-form-section" className="py-20 bg-slate-900 text-white px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Form Info Panel */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">Start Your Journey</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none">
              Admissions <span className="text-[#D4AF37]">Open 2026-27</span>
            </h2>
            <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed">
              Fill out the enquiry form with your contact and academic details. Our admissions counsellor team will review your application and get in touch with you shortly.
            </p>
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#D4AF37]" />
                <span className="text-xs text-slate-300 font-bold">+91 863-2345678</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#D4AF37]" />
                <span className="text-xs text-slate-300 font-bold">admissions@chalapathiuniversity.edu.in</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[#D4AF37]" />
                <span className="text-xs text-slate-300 font-bold">Guntur, Andhra Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Form Card Panel */}
          <div className="lg:col-span-7 bg-white text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl relative text-left">
            <h3 className="text-lg font-black uppercase text-[#072A6C] tracking-wide border-b border-slate-100 pb-3 mb-6">
              Admission Enquiry Form
            </h3>

            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
                <CheckCircle2 size={56} className="text-emerald-500 animate-bounce" />
                <h4 className="text-base font-extrabold text-[#072A6C]">Enquiry Submitted Successfully!</h4>
                <p className="text-xs text-slate-500 max-w-[340px]">
                  Thank you for your interest in Chalapathi University. Our counselors will call you on your registered mobile number shortly.
                </p>
                <button 
                  onClick={() => { setFormSubmitted(false); setFormData({ name: "", mobile: "", email: "", city: "", state: "", qualification: "", yearOfPassing: "", program: "", query: "" }); }}
                  className="h-10 px-6 bg-[#072A6C] hover:bg-[#051c4a] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-10 px-3.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Mobile Number *</label>
                    <input 
                      type="tel" 
                      required
                      pattern="[0-9]{10}"
                      placeholder="Enter 10 digit number"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full h-10 px-3.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-10 px-3.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">City *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full h-10 px-3.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold"
                    />
                  </div>
                  <div className="space-y-1 relative">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">State *</label>
                    <select 
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full h-10 px-3.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold bg-white appearance-none cursor-pointer"
                    >
                      <option value="">Select state</option>
                      {INDIAN_STATES.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3.5 top-[29px] text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 relative">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Qualification *</label>
                    <select 
                      required
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full h-10 px-3.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold bg-white appearance-none cursor-pointer"
                    >
                      <option value="">Select qualification</option>
                      {QUALIFICATIONS.map((q) => (
                        <option key={q} value={q}>{q}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3.5 top-[29px] text-slate-400 pointer-events-none" />
                  </div>
                  <div className="space-y-1 relative">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Year of Passing *</label>
                    <select 
                      required
                      value={formData.yearOfPassing}
                      onChange={(e) => setFormData({ ...formData, yearOfPassing: e.target.value })}
                      className="w-full h-10 px-3.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold bg-white appearance-none cursor-pointer"
                    >
                      <option value="">Select year</option>
                      {YEARS_OF_PASSING.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3.5 top-[29px] text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1 relative">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Interested Program *</label>
                  <select 
                    required
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full h-10 px-3.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold bg-white appearance-none cursor-pointer"
                  >
                    <option value="">Select program</option>
                    {PROGRAMS.map((prog) => (
                      <option key={prog} value={prog}>{prog}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3.5 top-[29px] text-slate-400 pointer-events-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Any Query (Optional)</label>
                  <textarea 
                    placeholder="Write query message..."
                    value={formData.query}
                    onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                    rows={2}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-semibold resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full h-11 bg-[#FAB005] hover:bg-[#e09e00] text-slate-900 font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 transition-all cursor-pointer border-none"
                  >
                    <Send size={13} className="rotate-45" />
                    <span>Apply Enquiry</span>
                  </button>
                  <div className="flex items-center justify-center gap-1 mt-3 text-[9px] text-slate-400 font-bold">
                    <ShieldCheck size={12} />
                    <span>Information secure and confidential</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─── FOOTER STRIP ────────────────────────────────────── */}
      <footer className="bg-slate-950 text-slate-500 py-6 text-center border-t border-slate-900 text-[10px] font-bold uppercase tracking-wider">
        <span>© 2026 Chalapathi University. All Rights Reserved.</span>
      </footer>

    </div>
  );
}
