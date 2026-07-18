import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Briefcase, GraduationCap, Zap, ChevronRight, ShieldCheck, Cpu, Bot, LineChart, Globe } from "lucide-react";

// Content Data mapped from user request
const certifications = [
  {
    name: "SAP",
    description: "Enterprise Resource Planning (ERP), business processes, supply chain, finance, and analytics.",
    iconUrl: "https://cdn.simpleicons.org/sap",
    color: "#0FAFFF"
  },
  {
    name: "ServiceNow",
    description: "AI-powered workflow automation, IT service management, and digital operations.",
    iconUrl: "https://cdn.simpleicons.org/servicenow",
    color: "#81B5A1"
  },
  {
    name: "Juniper Networks",
    description: "AI-native networking, cloud infrastructure, and cybersecurity.",
    iconUrl: "https://cdn.simpleicons.org/junipernetworks",
    color: "#78A22F"
  },
  {
    name: "Salesforce",
    description: "Customer Relationship Management (CRM), sales automation, and business analytics.",
    iconUrl: "https://cdn.simpleicons.org/salesforce",
    color: "#00A1E0"
  },
  {
    name: "Zscaler",
    description: "Zero Trust Security, SASE, and cloud cybersecurity.",
    iconUrl: "https://cdn.simpleicons.org/zscaler",
    color: "#0054A6"
  },
  {
    name: "Microchip",
    description: "Embedded systems, IoT, microcontrollers, and Industry 4.0.",
    iconUrl: "https://cdn.simpleicons.org/microchip",
    color: "#E42528"
  },
  {
    name: "Addverb Robotics",
    description: "Robotics, intelligent automation, warehouse automation, and AI-driven manufacturing.",
    Icon: Bot,
    color: "#F97316"
  },
  {
    name: "CodeChef",
    description: "Competitive programming, coding, and algorithmic problem-solving.",
    iconUrl: "https://cdn.simpleicons.org/codechef",
    color: "#5B4638"
  },
  {
    name: "NPTEL",
    description: "IIT/IISc-certified courses in engineering, technology, sciences, and management.",
    Icon: GraduationCap,
    color: "#072A6C"
  },
  {
    name: "AWS, Azure & Google Cloud",
    description: "Cloud computing, AI, DevOps, cybersecurity, and data engineering.",
    iconUrl: "https://cdn.simpleicons.org/amazonwebservices",
    color: "#FF9900"
  },
  {
    name: "Coursera & edX",
    description: "Professional certifications from leading global universities and industry partners.",
    iconUrl: "https://cdn.simpleicons.org/coursera",
    color: "#0056D2"
  },
  {
    name: "Oracle & Java",
    description: "Database management, Java programming, and enterprise application development.",
    iconUrl: "https://cdn.simpleicons.org/oracle",
    color: "#F80000"
  },
  {
    name: "Six Sigma & PMP",
    description: "Quality management, process improvement, and project management.",
    Icon: Briefcase,
    color: "#8B5CF6"
  },
  {
    name: "Digital Marketing",
    description: "SEO, SEM, social media marketing, analytics, and branding (Google, HubSpot & Meta).",
    iconUrl: "https://cdn.simpleicons.org/meta",
    color: "#0668E1"
  }
];

export default function GlobalCertifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateLogos = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#f8fafc] overflow-hidden font-sans"
    >
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-transparent z-0" />
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl opacity-60 z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-50/50 rounded-full blur-3xl opacity-60 z-0" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-24 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-12 items-end mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-12 bg-blue-600 block"></span>
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Global Certifications</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#0a1930] leading-[1.1] tracking-tight">
              Adding <span className="text-blue-600">Global Value</span><br/>To Your Degree.
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 text-gray-600 text-lg leading-relaxed font-light"
          >
            <p>
              At Chalapathi University, we believe a degree alone isn't enough to stand out in today's competitive world — industry-recognized certifications give students the extra edge employers look for. 
            </p>
            <p className="mt-4">
              Students are provided opportunities to earn globally acclaimed certifications alongside their academic curriculum, boosting their skills, credibility, and career readiness.
            </p>
          </motion.div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative">
          {certifications.map((cert, index) => {
            const isWide = index === 0 || index === 9 || index === 13; // Make some cards span 2 columns for a masonry feel
            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`group relative bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${isWide ? 'md:col-span-2' : 'col-span-1'}`}
              >
                {/* Glow Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at bottom right, ${cert.color}, transparent 70%)` }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div className="h-12 flex items-center">
                      {(cert as any).iconUrl ? (
                        <motion.img 
                          src={(cert as any).iconUrl} 
                          alt={cert.name} 
                          className="h-10 w-auto max-w-[120px] object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                          style={{ rotate: rotateLogos }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          {cert.Icon && <cert.Icon className="w-6 h-6 text-gray-400 group-hover:text-current transition-colors" style={{ color: cert.color }} />}
                        </div>
                      )}
                    </div>
                    
                    <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Conclusion Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 relative bg-[#072A6C] rounded-[40px] p-10 md:p-16 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 text-white shadow-2xl"
        >
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
            <svg viewBox="0 0 1024 1024" className="absolute -top-1/2 -right-1/2 w-full h-full opacity-10 blur-3xl animate-spin-slow" aria-hidden="true">
              <circle cx="512" cy="512" r="512" fill="url(#radial-gradient)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="radial-gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(512 512) rotate(90) scale(512)">
                  <stop stopColor="#60A5FA" />
                  <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 md:w-2/3">
            <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              Ready for the <span className="text-blue-400">World Stage.</span>
            </h3>
            <p className="text-blue-100/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              These certifications, combined with academic learning, ensure students graduate as globally competent, industry-ready professionals — confident to compete not just in national markets, but anywhere in the world.
            </p>
          </div>

          <div className="relative z-10 md:w-1/3 flex justify-end">
            <button className="bg-white text-[#072A6C] hover:bg-blue-50 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center">
              <span>View Curriculum</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
