import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Trophy, GraduationCap, Briefcase, Award, Zap, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

// Standard fade-up animation for text and cards
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Animated counter component for stats
function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const [count, setCount] = React.useState(0);
  const elementRef = React.useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9,]/g, "");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / 2000, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeProgress * numericPart));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [numericPart, hasAnimated]);

  return (
    <div ref={elementRef} className="flex flex-col border-l border-gray-200/50 pl-6 relative">
      {/* Decorative dot */}
      <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-[#072A6C]" />
      <motion.span 
        className="text-[32px] md:text-[40px] font-[900] text-[#072A6C] tracking-tight leading-none mb-1"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={hasAnimated ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {numericPart >= 1 ? count : ""}{suffix}
      </motion.span>
      <span className="text-[13px] text-gray-500 font-[500] uppercase tracking-wider">{label}</span>
    </div>
  );
}

const certifications = [
  { name: "SAP", focus: ["Enterprise Resource Planning", "Business Processes", "Supply Chain", "Finance", "Analytics"], iconUrl: "https://cdn.simpleicons.org/sap", color: "#0FAFFF" },
  { name: "ServiceNow", focus: ["AI Workflow Automation", "IT Service Management", "Digital Operations"], iconUrl: "https://cdn.simpleicons.org/servicenow", color: "#81B5A1" },
  { name: "Salesforce", focus: ["CRM", "Business Automation", "Analytics"], iconUrl: "https://cdn.simpleicons.org/salesforce", color: "#00A1E0" },
  { name: "Juniper Networks", focus: ["AI Native Networking", "Cloud Infrastructure", "Cybersecurity"], iconUrl: "https://cdn.simpleicons.org/junipernetworks", color: "#7B9600" },
  { name: "Microchip", focus: ["Embedded Systems", "Microcontrollers", "IoT", "Industry 4.0"], iconUrl: "https://cdn.simpleicons.org/microchip", color: "#E02222" },
  { name: "AWS", focus: ["Cloud Computing", "DevOps", "AI Services"], iconUrl: "https://cdn.simpleicons.org/amazonaws", color: "#FF9900" },
  { name: "Microsoft Azure", focus: ["Cloud Platform", "AI", "Data Engineering"], iconUrl: "https://cdn.simpleicons.org/microsoftazure", color: "#0089D6" },
  { name: "Google Cloud", focus: ["Cloud Infrastructure", "Machine Learning"], iconUrl: "https://cdn.simpleicons.org/googlecloud", color: "#4285F4" },
  { name: "Oracle", focus: ["Java", "Database", "Enterprise Applications"], iconUrl: "https://cdn.simpleicons.org/oracle", color: "#F80000" },
  { name: "Zscaler", focus: ["Zero Trust", "Cloud Security", "SASE"], iconUrl: "https://cdn.simpleicons.org/zscaler", color: "#000000" },
  { name: "CodeChef", focus: ["Competitive Programming", "Problem Solving"], iconUrl: "https://cdn.simpleicons.org/codechef", color: "#5B4638" },
  { name: "Coursera", focus: ["Professional Certifications"], iconUrl: "https://cdn.simpleicons.org/coursera", color: "#0056D2" },
  { name: "edX", focus: ["Global University Courses"], iconUrl: "https://cdn.simpleicons.org/edx", color: "#02262B" },
  { name: "Google Digital Marketing", focus: ["SEO", "Analytics"], iconUrl: "https://cdn.simpleicons.org/google", color: "#4285F4" },
  { name: "HubSpot", focus: ["Inbound Marketing"], iconUrl: "https://cdn.simpleicons.org/hubspot", color: "#FF7A59" },
  { name: "Meta", focus: ["Social Media Marketing"], iconUrl: "https://cdn.simpleicons.org/meta", color: "#0467DF" },
];

// Items without simpleicons get lucide icons
const extraCertifications = [
  { name: "Addverb Robotics", focus: ["Automation", "Robotics", "Smart Manufacturing"], Icon: Zap, color: "#F59E0B" },
  { name: "NPTEL", focus: ["IIT Certified Courses"], Icon: GraduationCap, color: "#072A6C" },
  { name: "Six Sigma", focus: ["Quality Management"], Icon: Trophy, color: "#D71920" },
  { name: "PMP", focus: ["Project Management"], Icon: Briefcase, color: "#10B981" },
];

export default function GlobalCertifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll animations
  const yImage = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), { stiffness: 100, damping: 30 });
  const rotateLogos = useSpring(useTransform(scrollYProgress, [0, 1], [0, 15]), { stiffness: 50, damping: 20 });

  return (
    <section ref={containerRef} className="relative w-full bg-[#FAFAFA] font-[var(--font-poppins)] overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#072A6C]/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#D71920]/[0.02] rounded-full blur-[150px] pointer-events-none" />

      {/* ──────────────────────── */}
      {/* SECTION INTRO & HERO     */}
      {/* ──────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-5 pt-24 pb-16 lg:pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Text Block */}
          <motion.div 
            className="w-full lg:w-1/2 space-y-6 z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200/60 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[11px] font-[800] text-[#072A6C] tracking-widest uppercase">Global Certifications</span>
            </motion.div>
            
            <motion.h2 
              variants={fadeUp}
              className="text-[42px] md:text-[56px] font-[900] text-[#072A6C] leading-[1.05] tracking-tight"
            >
              Graduate with <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D71920] to-[#FF4D4D]">More Than a Degree</span>
            </motion.h2>

            <motion.p 
              variants={fadeUp}
              className="text-[15px] md:text-[17px] text-[#444444] leading-relaxed font-[300] max-w-xl"
            >
              At Chalapathi University, education extends beyond traditional academics. Students earn globally recognized industry certifications alongside their degree programs, gaining practical expertise, internationally valued credentials, and a significant competitive advantage in today's global workforce.
            </motion.p>
          </motion.div>

          {/* Right Visual Hero (Floating 3D Illustration) */}
          <motion.div 
            className="w-full lg:w-1/2 relative z-10 flex justify-center"
            style={{ y: yImage }}
          >
            <div className="relative w-full max-w-[600px] aspect-square rounded-[32px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(7,42,108,0.15)] bg-white/50 backdrop-blur-md border border-white p-2 group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#072A6C]/5 to-[#D71920]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img 
                src="/cert_hero.jpg" 
                alt="Global Digital Certifications" 
                className="w-full h-full object-cover rounded-[24px] transform group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
              />
              
              {/* Floating Elements simulated with CSS animations */}
              <div className="absolute top-10 left-10 w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center border border-white/40 animate-[bounce_4s_infinite]">
                <img src="https://cdn.simpleicons.org/amazonaws" alt="AWS" className="w-8 h-8 opacity-80" />
              </div>
              <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center border border-white/40 animate-[bounce_5s_infinite_reverse]">
                <img src="https://cdn.simpleicons.org/microsoftazure" alt="Azure" className="w-8 h-8 opacity-80" />
              </div>
              <div className="absolute top-1/2 right-4 -translate-y-1/2 w-14 h-14 bg-white/80 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center border border-white/40 animate-[pulse_3s_infinite]">
                <ShieldCheck className="w-6 h-6 text-[#10B981]" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ──────────────────────── */}
      {/* PREMIUM EXPERIENCE STATS */}
      {/* ──────────────────────── */}
      <div className="w-full bg-white border-y border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] relative z-20">
        <div className="max-w-[1440px] mx-auto px-5 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <AnimatedCounter value="20+" label="Global Partners" />
            <AnimatedCounter value="100%" label="Industry Skills" />
            <AnimatedCounter value="50+" label="Career Pathways" />
            <AnimatedCounter value="Global" label="Recognition" />
          </div>
        </div>
      </div>

      {/* ──────────────────────── */}
      {/* CERTIFICATION SHOWCASE   */}
      {/* ──────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-5 py-24 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-[28px] md:text-[36px] font-[900] text-[#072A6C] mb-4">The Certification Ecosystem</h3>
          <p className="text-[14px] text-gray-500 max-w-2xl mx-auto font-[300]">Integrate official curricula directly into your coursework. Hover over each badge to reveal full-color official brand identities.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...certifications, ...extraCertifications].map((cert, index) => {
            const Icon = (cert as any).Icon;
            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white/40 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(7,42,108,0.08)] rounded-[24px] p-6 transition-all duration-300 flex flex-col justify-between min-h-[220px] overflow-hidden cursor-pointer"
              >
                {/* Background Illuminating Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[24px]"
                  style={{ background: `radial-gradient(circle at top right, ${cert.color}, transparent 60%)` }}
                />
                
                {/* Logo / Icon Area */}
                <div className="relative z-10 mb-6">
                  {(cert as any).iconUrl ? (
                    <motion.img 
                      src={(cert as any).iconUrl} 
                      alt={cert.name} 
                      className="h-10 w-auto object-contain transition-all duration-500"
                      style={{ rotate: rotateLogos }}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-6 h-6 text-gray-400 group-hover:text-current transition-colors" style={{ color: cert.color }} />
                    </div>
                  )}
                  {/* CSS to handle the SimpleIcons monochrome to color */}
                  <style>{`
                    .group img[alt="${cert.name}"] {
                      filter: grayscale(100%) opacity(60%);
                    }
                    .group:hover img[alt="${cert.name}"] {
                      filter: drop-shadow(0 4px 6px ${cert.color}40);
                      content: url("${(cert as any).iconUrl || ''}/${cert.color.replace('#', '')}");
                    }
                  `}</style>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow flex flex-col justify-end">
                  <h4 className="text-[16px] font-[800] text-[#072A6C] mb-3 group-hover:text-black transition-colors">{cert.name}</h4>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.focus.map((f, i) => (
                      <span key={i} className="text-[9px] font-[600] text-gray-500 bg-gray-100/80 px-2 py-0.5 rounded-md border border-gray-200/50">
                        {f}
                      </span>
                    ))}
                  </div>
                  
                  {/* Learn More Arrow */}
                  <div className="flex items-center gap-1.5 text-[11px] font-[800] text-gray-400 group-hover:text-[#D71920] transition-colors mt-auto">
                    <span>Explore Program</span>
                    <ArrowRight size={12} className="transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ──────────────────────── */}
      {/* BOTTOM PREMIUM BANNER    */}
      {/* ──────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-5 pb-24">
        <motion.div 
          className="w-full rounded-[32px] overflow-hidden relative shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#072A6C] via-[#051c4a] to-[#030d24] z-0" />
          
          {/* Particle / Line Accents */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0 mix-blend-overlay" />
          
          <div className="relative z-10 px-8 py-16 md:py-24 md:px-20 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h3 className="text-[32px] md:text-[44px] font-[900] text-white leading-tight mb-4">
                Industry Ready.<br /> Globally Recognized.
              </h3>
              <p className="text-[14px] md:text-[16px] text-blue-100 font-[300] leading-relaxed">
                Graduate with internationally respected certifications that complement your academic degree and prepare you for leadership in technology, engineering, business, cloud computing, cybersecurity, automation, artificial intelligence, and emerging industries.
              </p>
            </div>
            
            <Link 
              to="/admissions" 
              className="shrink-0 h-14 px-8 bg-white hover:bg-[#F4B400] text-[#072A6C] hover:text-white text-[14px] font-[800] rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_rgba(244,180,0,0.3)] hover:-translate-y-1 group"
            >
              Explore Certification Pathways
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
