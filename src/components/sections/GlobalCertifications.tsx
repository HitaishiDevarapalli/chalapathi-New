import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Briefcase, GraduationCap, Zap, ChevronRight, ShieldCheck, Cpu, Bot, LineChart, Globe } from "lucide-react";

// Content Data mapped from user request
const certifications = [
  {
    name: "SAP",
    description: "Enterprise Resource Planning (ERP), business processes, supply chain, finance, and analytics.",
    iconUrl: "https://cdn.simpleicons.org/sap/ffffff",
    color: "#0FAFFF"
  },
  {
    name: "ServiceNow",
    description: "AI-powered workflow automation, IT service management, and digital operations.",
    iconUrl: "https://cdn.simpleicons.org/servicenow/ffffff",
    color: "#81B5A1"
  },
  {
    name: "Juniper Networks",
    description: "AI-native networking, cloud infrastructure, and cybersecurity.",
    iconUrl: "https://cdn.simpleicons.org/junipernetworks/ffffff",
    color: "#78A22F"
  },
  {
    name: "Salesforce",
    description: "Customer Relationship Management (CRM), sales automation, and business analytics.",
    iconUrl: "https://cdn.simpleicons.org/salesforce/ffffff",
    color: "#00A1E0"
  },
  {
    name: "Zscaler",
    description: "Zero Trust Security, SASE, and cloud cybersecurity.",
    iconUrl: "https://cdn.simpleicons.org/zscaler/ffffff",
    color: "#0054A6"
  },
  {
    name: "Microchip",
    description: "Embedded systems, IoT, microcontrollers, and Industry 4.0.",
    iconUrl: "https://cdn.simpleicons.org/microchip/ffffff",
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
    iconUrl: "https://cdn.simpleicons.org/codechef/ffffff",
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
    iconUrl: "https://cdn.simpleicons.org/amazonwebservices/ffffff",
    color: "#FF9900"
  },
  {
    name: "Coursera & edX",
    description: "Professional certifications from leading global universities and industry partners.",
    iconUrl: "https://cdn.simpleicons.org/coursera/ffffff",
    color: "#0056D2"
  },
  {
    name: "Oracle & Java",
    description: "Database management, Java programming, and enterprise application development.",
    iconUrl: "https://cdn.simpleicons.org/oracle/ffffff",
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
    iconUrl: "https://cdn.simpleicons.org/meta/ffffff",
    color: "#0668E1"
  }
];

export default function GlobalCertifications() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      className="relative w-full overflow-hidden font-sans bg-white"
    >
      {/* Container with tight top padding to fix the gap issue */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 pb-24 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-12 items-end mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-12 bg-[#072A6C] block"></span>
              <span className="text-[#072A6C] font-bold tracking-widest uppercase text-sm">Global Certifications</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#072A6C] leading-[1.1] tracking-tight">
              Adding Global Value<br/>To Your Degree.
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:w-1/2 text-gray-600 text-[15px] leading-relaxed"
          >
            <p>
              At Chalapathi University, we believe a degree alone isn't enough to stand out in today's competitive world — industry-recognized certifications give students the extra edge employers look for. 
            </p>
            <p className="mt-4">
              Students are provided opportunities to earn globally acclaimed certifications alongside their academic curriculum, boosting their skills, credibility, and career readiness.
            </p>
          </motion.div>
        </div>

        {/* Certifications Grid - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 relative">
          {certifications.map((cert, index) => {
            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
                className="group flex flex-col bg-white border border-gray-200 rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow duration-300 relative pt-3 overflow-hidden"
              >
                {/* Top Folder Tab Decoration */}
                <div className="absolute top-0 left-0 right-0 h-3 bg-[#7b8c9e]/80"></div>
                
                {/* Circular Icon Badge */}
                <div className="absolute top-1 right-4 w-10 h-10 bg-[#7b8c9e] rounded-full flex items-center justify-center text-white shadow-sm z-10">
                  {cert.iconUrl ? (
                    <img 
                      src={cert.iconUrl} 
                      alt={cert.name} 
                      className="w-5 h-5 object-contain"
                    />
                  ) : (
                    cert.Icon && <cert.Icon className="w-5 h-5 text-white" />
                  )}
                </div>

                <div className="p-6 pt-10 flex flex-col flex-grow relative z-0">
                  <h3 className="text-xl font-bold text-[#203348] mb-6 pr-6 leading-tight min-h-[56px]">
                    {cert.name}
                  </h3>
                  
                  {/* Tags */}
                  <div className="flex items-center gap-2 mb-3 border-t border-gray-100 pt-4">
                    <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">CERTIFICATION COURSE</span>
                    <Award size={14} className="text-[#3b4b5e] ml-auto" />
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">
                    {cert.description.length > 80 ? cert.description.slice(0, 80) + '...' : cert.description}
                  </p>
                  
                  <div className="text-sm text-[#006A80] font-medium mb-6 hover:underline cursor-pointer">
                    Read more
                  </div>
                  
                  <button className="w-full py-3 bg-[#425974] hover:bg-[#203348] text-white text-[13px] font-semibold rounded-[4px] transition-colors mt-auto">
                    Start certification
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Conclusion Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-[#f8fafc] border border-gray-200 rounded-[12px] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="md:w-2/3">
            <h3 className="text-3xl font-black text-[#072A6C] mb-4">
              Ready for the World Stage.
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
              These certifications, combined with academic learning, ensure students graduate as globally competent, industry-ready professionals — confident to compete not just in national markets, but anywhere in the world.
            </p>
          </div>

          <div className="md:w-1/3 flex justify-end">
            <button className="bg-[#072A6C] hover:bg-[#051d4d] text-white px-8 py-4 rounded font-bold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center">
              <span>View Curriculum</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
