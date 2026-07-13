import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { X, RefreshCw, CheckCircle2, Megaphone, Bell, Calendar, GraduationCap, FileText, Award, BookOpen } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import DynamicPage from "./pages/DynamicPage";
import Events from "./pages/Events";
import News from "./pages/News";
import AllEvents from "./pages/AllEvents";

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const ANNOUNCEMENTS_LIST = [
  {
    title: "Admissions 2026 Applications Open",
    desc: "Apply online for all undergraduate and postgraduate engineering, management, and pharmacy streams.",
    date: "12 May 2026",
    icon: GraduationCap
  },
  {
    title: "Orientation Program 2026 Schedule",
    desc: "Schedule and venue details released for the incoming freshers orientation week starting next month.",
    date: "08 May 2026",
    icon: Calendar
  },
  {
    title: "Semester Examination Notification",
    desc: "The final semester examination timetable has been officially released by the controller of examinations.",
    date: "02 May 2026",
    icon: FileText
  },
  {
    title: "Merit-Based Scholarship Applications",
    desc: "Tuition waiver applications open for academic top performers and sports quota achievements.",
    date: "28 Apr 2026",
    icon: Award
  },
  {
    title: "Mega Campus Placement Drive 2026",
    desc: "Registrations now open for eligible pre-final year candidates for upcoming on-campus MNC recruitment drives.",
    date: "22 Apr 2026",
    icon: BookOpen
  }
];

export default function App() {
  const [showSplash, setShowSplash] = useState(() => {
    const visited = sessionStorage.getItem("chalapathy_visited");
    return !visited;
  });

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const fallbackTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden";
      
      // Safety fallback: dismiss splash screen after 10s if stuck loading
      fallbackTimerRef.current = setTimeout(() => {
        setShowSplash(false);
      }, 10000);

      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.log("Autoplay blocked or video error, fallback active:", err);
        });
      }

      return () => {
        if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
      sessionStorage.setItem("chalapathy_visited", "true");
    }
  }, [showSplash]);

  const handleVideoPlay = () => {
    // Clear safety loading timer once playback starts to avoid cutting video mid-play
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  };

  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [showAnnouncementsDrawer, setShowAnnouncementsDrawer] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    state: "",
    city: "",
    college: "",
    degree: "",
    program: "",
    captchaInput: "",
    agree: false
  });
  
  const [captchaCode, setCaptchaCode] = useState("6a3ca0");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Generate a random captcha code
  const generateCaptcha = () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaCode(code);
  };

  useEffect(() => {
    if (showEnquiryModal) {
      generateCaptcha();
      document.body.style.overflow = "hidden";
    } else if (showAnnouncementsDrawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setFormSubmitted(false);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        state: "",
        city: "",
        college: "",
        degree: "",
        program: "",
        captchaInput: "",
        agree: false
      });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showEnquiryModal, showAnnouncementsDrawer]);

  // Handle escape key listener to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowEnquiryModal(false);
        setShowAnnouncementsDrawer(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.captchaInput.toLowerCase() !== captchaCode.toLowerCase()) {
      alert("Invalid Captcha code! Please try again.");
      generateCaptcha();
      return;
    }
    if (!formData.agree) {
      alert("Please authorize us to contact you by ticking the checkbox.");
      return;
    }
    setFormSubmitted(true);
  };

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[999999] bg-black flex items-center justify-center select-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          >
            <video
              ref={videoRef}
              src="/videodisplay.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              onPlay={handleVideoPlay}
              onError={() => setShowSplash(false)}
              onEnded={() => {
                setTimeout(() => {
                  setShowSplash(false);
                }, 1500); // 1.5-second pause on final frame
              }}
              className="w-full h-full object-cover"
            />
            <style dangerouslySetInnerHTML={{__html: `
              .intro-speech-bubble {
                position: absolute;
                bottom: 96px;
                right: 24px;
                background: #ffffff;
                border: 3.5px solid #D71920;
                border-radius: 16px;
                padding: 12px 22px;
                font-weight: 900;
                font-size: 11px;
                color: #072A6C;
                text-transform: uppercase;
                letter-spacing: 0.12em;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
                cursor: pointer;
                outline: none;
                transition: all 0.2s ease;
                z-index: 1000000;
              }
              .intro-speech-bubble:hover {
                transform: scale(1.05);
              }
              .intro-speech-bubble:active {
                transform: scale(0.95);
              }
              .intro-speech-bubble::after, .intro-speech-bubble::before {
                top: 100%;
                left: 25%;
                border: solid transparent;
                content: "";
                height: 0;
                width: 0;
                position: absolute;
                pointer-events: none;
              }
              .intro-speech-bubble::after {
                border-top-color: #ffffff;
                border-width: 9px;
                margin-left: -9px;
              }
              .intro-speech-bubble::before {
                border-top-color: #D71920;
                border-width: 13px;
                margin-left: -13px;
              }
            `}} />
            
            <button
              onClick={() => setShowSplash(false)}
              className="intro-speech-bubble"
            >
              Skip Intro ➔
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#F7F8FC]">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* About Routes */}
            <Route path="/about" element={<DynamicPage />} />
            <Route path="/about/history" element={<DynamicPage />} />
            <Route path="/about/vision" element={<DynamicPage />} />
            <Route path="/about/leadership" element={<DynamicPage />} />
            <Route path="/about/advantage" element={<DynamicPage />} />

            {/* Academics Routes */}
            <Route path="/academics" element={<DynamicPage />} />
            <Route path="/academics/schools" element={<DynamicPage />} />
            <Route path="/academics/departments" element={<DynamicPage />} />
            <Route path="/academics/computer-science" element={<DynamicPage />} />
            <Route path="/academics/artificial-intelligence" element={<DynamicPage />} />
            <Route path="/academics/data-science" element={<DynamicPage />} />
            <Route path="/academics/calendar" element={<DynamicPage />} />
            <Route path="/academics/flexibilities" element={<DynamicPage />} />
            <Route path="/academics/programmes" element={<DynamicPage />} />
            <Route path="/academics/grading" element={<DynamicPage />} />
            <Route path="/academics/degrees" element={<DynamicPage />} />
            <Route path="/academics/electives" element={<DynamicPage />} />
            <Route path="/academics/rules" element={<DynamicPage />} />
            <Route path="/academics/teaching" element={<DynamicPage />} />
            <Route path="/academics/bos" element={<DynamicPage />} />
            <Route path="/academics/*" element={<DynamicPage />} />


            {/* Admissions Routes */}
            <Route path="/admissions" element={<DynamicPage />} />
            <Route path="/admissions/undergraduate" element={<DynamicPage />} />
            <Route path="/admissions/postgraduate" element={<DynamicPage />} />
            <Route path="/admissions/phd" element={<DynamicPage />} />
            <Route path="/admissions/international" element={<DynamicPage />} />
            <Route path="/admissions/fees" element={<DynamicPage />} />
            <Route path="/admissions/scholarships" element={<DynamicPage />} />
            <Route path="/admissions/apply" element={<DynamicPage />} />

            {/* Research Routes */}
            <Route path="/research" element={<DynamicPage />} />
            <Route path="/research/projects" element={<DynamicPage />} />
            <Route path="/research/publications" element={<DynamicPage />} />
            <Route path="/research/patents" element={<DynamicPage />} />

            {/* Management Routes */}
            <Route path="/management" element={<DynamicPage />} />
            <Route path="/management/board-members" element={<DynamicPage />} />
            <Route path="/management/faculty" element={<DynamicPage />} />
            <Route path="/management/staff" element={<DynamicPage />} />

            {/* Campus Life Routes */}
            <Route path="/campus-life" element={<DynamicPage />} />
            <Route path="/campus-life/hostels" element={<DynamicPage />} />
            <Route path="/campus-life/library" element={<DynamicPage />} />
            <Route path="/campus-life/sports" element={<DynamicPage />} />
            <Route path="/campus-life/clubs" element={<DynamicPage />} />
            <Route path="/campus-life/*" element={<DynamicPage />} />

            {/* Placements Routes */}
            <Route path="/placements" element={<DynamicPage />} />
            <Route path="/placements/statistics" element={<DynamicPage />} />
            <Route path="/placements/recruiters" element={<DynamicPage />} />
            <Route path="/placements/training" element={<DynamicPage />} />

            {/* News Routes */}
            <Route path="/news" element={<News />} />
            <Route path="/news/latest" element={<DynamicPage />} />
            <Route path="/news/events" element={<Events />} />
            <Route path="/news/events/all" element={<AllEvents />} />

            {/* Contact Route */}
            <Route path="/contact" element={<DynamicPage />} />

            {/* Legal / Policy Routes */}
            <Route path="/privacy-policy" element={<DynamicPage />} />
            <Route path="/terms-conditions" element={<DynamicPage />} />
            <Route path="/sitemap" element={<DynamicPage />} />
          </Routes>
        </main>
        <Footer />
      </div>

      {/* ======================================================== */}
      {/* 🌟 SLIMMED NON-OVERLAPPING STACKED RIGHT-SIDE TABS       */}
      {/* ======================================================== */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 items-end font-[var(--font-poppins)]">
        {/* Announcements Tab (Gold/Dark Text) */}
        <button
          onClick={() => setShowAnnouncementsDrawer(true)}
          className="w-[48px] h-[220px] bg-[#D4AF37] hover:bg-[#c29e28] text-gray-900 font-bold text-[10px] tracking-[1.5px] rounded-l-xl shadow-md transition-all duration-300 hover:-translate-x-1 flex items-center justify-center [writing-mode:vertical-lr] rotate-180 whitespace-nowrap cursor-pointer select-none uppercase border border-r-0 border-white/10 outline-none"
        >
          Announcements
        </button>
        {/* Admission Enquiry Tab (Maroon/White Text) */}
        <button
          onClick={() => setShowEnquiryModal(true)}
          className="w-[48px] h-[220px] bg-[#D71920] hover:bg-[#b71217] text-white font-bold text-[10px] tracking-[1.5px] rounded-l-xl shadow-md transition-all duration-300 hover:-translate-x-1 flex items-center justify-center [writing-mode:vertical-lr] rotate-180 whitespace-nowrap cursor-pointer select-none uppercase border border-r-0 border-white/10 outline-none"
        >
          Admission Enquiry
        </button>
      </div>

      {/* ======================================================== */}
      {/* 🌟 SLIDING LEFT-SIDE ANNOUNCEMENTS DRAWER                 */}
      {/* ======================================================== */}
      {showAnnouncementsDrawer && (
        <div 
          className="fixed inset-0 z-50 flex items-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowAnnouncementsDrawer(false)}
        >
          <div 
            className="bg-[#F7F8FC] w-full max-w-[400px] h-full shadow-2xl relative flex flex-col text-left rounded-r-2xl transform transition-transform duration-300 animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header (Maroon) */}
            <div className="bg-[#D71920] text-white p-5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <Megaphone size={18} className="text-[#D4AF37]" />
                <h3 className="font-extrabold text-sm tracking-wide">Chalapathi Announcements</h3>
              </div>
              <button 
                onClick={() => setShowAnnouncementsDrawer(false)}
                className="text-white/80 hover:text-white transition-colors cursor-pointer outline-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable list items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {ANNOUNCEMENTS_LIST.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow transition-shadow flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-full bg-[#072A6C]/5 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-[#072A6C]" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-[#D71920] font-extrabold uppercase tracking-wider">Announcement</span>
                        <span className="text-[9px] text-gray-400 font-medium">{item.date}</span>
                      </div>
                      <h4 className="text-xs font-bold text-[#072A6C] line-clamp-1 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-gray-200/60 bg-white flex justify-end">
              <button 
                onClick={() => setShowAnnouncementsDrawer(false)}
                className="h-9 px-5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close Drawer
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 🌟 ADMISSION ENQUIRY POPUP MODAL (SRM DESIGN)             */}
      {/* ======================================================== */}
      {showEnquiryModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setShowEnquiryModal(false)}
        >
          <div 
            className="bg-white w-full max-w-[620px] rounded-[16px] overflow-hidden shadow-2xl relative animate-fade-in flex flex-col max-h-[92vh] text-left border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowEnquiryModal(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 hover:bg-white/45 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Scrollable Container */}
            <div className="overflow-y-auto">
              
              {/* Header Title Banner */}
              <div className="bg-[#072A6C] text-white py-6 px-8 text-center relative">
                <h3 className="text-xl md:text-2xl font-[800] tracking-tight">Admission Enquiry</h3>
                <p className="text-[11px] text-blue-200 mt-1 font-light uppercase tracking-wider">Academic Year 2026-2027</p>
              </div>

              {/* Form Content */}
              <div className="p-6 md:p-8">
                {formSubmitted ? (
                  <div className="py-10 text-center space-y-4 animate-fade-in">
                    <CheckCircle2 className="mx-auto text-green-500" size={56} />
                    <h4 className="text-xl font-bold text-[#072A6C]">Enquiry Submitted Successfully!</h4>
                    <p className="text-sm text-gray-500 font-light max-w-sm mx-auto leading-relaxed">
                      Thank you for your interest in City Chalapathi. Our admissions counselor will contact you shortly on <strong>{formData.mobile}</strong>.
                    </p>
                    <button
                      onClick={() => setShowEnquiryModal(false)}
                      className="h-10 px-6 bg-[#072A6C] hover:bg-[#072A6C]/90 text-white text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 font-[var(--font-poppins)]">
                    
                    {/* Name */}
                    <div>
                      <input
                        type="text"
                        required
                        className="w-full h-11 px-4 text-xs border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#072A6C] bg-white text-gray-700 placeholder-gray-400"
                        placeholder="Enter Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        type="email"
                        required
                        className="w-full h-11 px-4 text-xs border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#072A6C] bg-white text-gray-700 placeholder-gray-400"
                        placeholder="Enter Email Address *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    {/* Mobile Number Group */}
                    <div className="flex gap-2">
                      <select 
                        className="h-11 px-3 text-xs border border-gray-200 rounded-lg outline-none bg-gray-50 text-gray-600 font-medium"
                        defaultValue="+91"
                      >
                        <option>+91 (IND)</option>
                        <option>+1 (USA)</option>
                        <option>+44 (UK)</option>
                      </select>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        className="flex-1 h-11 px-4 text-xs border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#072A6C] bg-white text-gray-700 placeholder-gray-400"
                        placeholder="Enter Mobile Number *"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      />
                    </div>

                    {/* State & City selectors */}
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        required
                        className="h-11 px-3 text-xs border border-gray-200 rounded-lg outline-none bg-white text-gray-500"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      >
                        <option value="">Select State *</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                      </select>
                      <select
                        required
                        className="h-11 px-3 text-xs border border-gray-200 rounded-lg outline-none bg-white text-gray-500"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      >
                        <option value="">Select City *</option>
                        <option value="Guntur">Guntur</option>
                        <option value="Vijayawada">Vijayawada</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Chennai">Chennai</option>
                      </select>
                    </div>

                    {/* College & Degree selectors */}
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        required
                        className="h-11 px-3 text-xs border border-gray-200 rounded-lg outline-none bg-white text-gray-500"
                        value={formData.college}
                        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      >
                        <option value="">Select Faculty/College *</option>
                        <option value="Engineering">School of Engineering</option>
                        <option value="Pharmacy">School of Pharmacy</option>
                        <option value="Management">School of Management</option>
                      </select>
                      <select
                        required
                        className="h-11 px-3 text-xs border border-gray-200 rounded-lg outline-none bg-white text-gray-500"
                        value={formData.degree}
                        onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                      >
                        <option value="">Select Degree *</option>
                        <option value="B.Tech">B.Tech (Undergraduate)</option>
                        <option value="MBA">MBA (Postgraduate)</option>
                        <option value="MCA">MCA (Postgraduate)</option>
                        <option value="B.Pharm">B.Pharm (Pharmacy)</option>
                      </select>
                    </div>

                    {/* Program selector */}
                    <div>
                      <select
                        required
                        className="w-full h-11 px-3 text-xs border border-gray-200 rounded-lg outline-none bg-white text-gray-500"
                        value={formData.program}
                        onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      >
                        <option value="">Select Program *</option>
                        <option value="CSE">Computer Science & Engineering</option>
                        <option value="AIML">Artificial Intelligence & ML</option>
                        <option value="DS">Data Science</option>
                        <option value="ECE">Electronics & Communication</option>
                      </select>
                    </div>

                    {/* Captcha verification layout */}
                    <div className="grid grid-cols-2 gap-3 items-center">
                      <div className="h-11 border border-gray-200 rounded-lg flex items-center justify-between px-3 bg-gray-100 select-none">
                        <span className="font-mono text-sm tracking-widest font-bold line-through text-gray-700 italic">
                          {captchaCode}
                        </span>
                        <button 
                          type="button"
                          onClick={generateCaptcha}
                          className="text-gray-400 hover:text-[#072A6C] transition-colors cursor-pointer"
                        >
                          <RefreshCw size={13} />
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        className="h-11 px-4 text-xs border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#072A6C] bg-white text-gray-700 placeholder-gray-400 font-mono"
                        placeholder="Enter Captcha"
                        value={formData.captchaInput}
                        onChange={(e) => setFormData({ ...formData, captchaInput: e.target.value })}
                      />
                    </div>

                    {/* Disclaimer check */}
                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        id="agree"
                        type="checkbox"
                        required
                        className="w-3.5 h-3.5 mt-0.5 border border-gray-300 rounded accent-[#072A6C] cursor-pointer"
                        checked={formData.agree}
                        onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                      />
                      <label htmlFor="agree" className="text-[10px] text-gray-500 leading-normal font-light cursor-pointer select-none">
                        I authorize City Chalapathi Institute of Technology and its representatives to contact me regarding updates and notifications through Email, SMS, WhatsApp, and Calls. This consent overrides any DND/NDNC registration.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full h-11 bg-[#D71920] hover:bg-[#b71217] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer mt-2"
                    >
                      Submit
                    </button>

                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </BrowserRouter>
  );
}
