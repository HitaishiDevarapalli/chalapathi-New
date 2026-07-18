import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Award, ChevronRight } from "lucide-react";

// Content Data mapped from user request with updated Wordmark Logos
const certifications = [
  {
    name: "SAP",
    description: "Enterprise Resource Planning (ERP), business processes, supply chain, finance, and analytics.",
    images: ["https://www.vectorlogo.zone/logos/sap/sap-ar21.svg"],
    color: "#0FAFFF"
  },
  {
    name: "ServiceNow",
    description: "AI-powered workflow automation, IT service management, and digital operations.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/5/57/ServiceNow_logo.svg"],
    color: "#81B5A1"
  },
  {
    name: "Juniper Networks",
    description: "AI-native networking, cloud infrastructure, and cybersecurity.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/3/31/Juniper_Networks_logo.svg"],
    color: "#78A22F"
  },
  {
    name: "Salesforce",
    description: "Customer Relationship Management (CRM), sales automation, and business analytics.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg"],
    color: "#00A1E0"
  },
  {
    name: "Zscaler",
    description: "Zero Trust Security, SASE, and cloud cybersecurity.",
    images: ["https://logo.clearbit.com/zscaler.com"],
    color: "#0054A6"
  },
  {
    name: "Microchip",
    description: "Embedded systems, IoT, microcontrollers, and Industry 4.0.",
    images: ["https://cdn.worldvectorlogo.com/logos/microchip.svg"],
    color: "#E42528"
  },
  {
    name: "Addverb Robotics",
    description: "Robotics, intelligent automation, warehouse automation, and AI-driven manufacturing.",
    images: ["https://logo.clearbit.com/addverb.com"],
    color: "#F97316"
  },
  {
    name: "CodeChef",
    description: "Competitive programming, coding, and algorithmic problem-solving.",
    images: ["https://logo.clearbit.com/codechef.com"],
    color: "#5B4638"
  },
  {
    name: "NPTEL",
    description: "IIT/IISc-certified courses in engineering, technology, sciences, and management.",
    images: ["https://logo.clearbit.com/nptel.ac.in"],
    color: "#072A6C"
  },
  {
    name: "AWS, Azure & Google Cloud",
    description: "Cloud computing, AI, DevOps, cybersecurity, and data engineering.",
    images: [
      "https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg",
      "https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg",
      "https://www.vectorlogo.zone/logos/google/google-ar21.svg"
    ],
    color: "#FF9900"
  },
  {
    name: "Coursera & edX",
    description: "Professional certifications from leading global universities and industry partners.",
    images: [
      "https://logo.clearbit.com/coursera.org",
      "https://logo.clearbit.com/edx.org"
    ],
    color: "#0056D2"
  },
  {
    name: "Oracle & Java",
    description: "Database management, Java programming, and enterprise application development.",
    images: [
      "https://www.vectorlogo.zone/logos/oracle/oracle-ar21.svg",
      "https://www.vectorlogo.zone/logos/java/java-ar21.svg"
    ],
    color: "#F80000"
  },
  {
    name: "Six Sigma & PMP",
    description: "Quality management, process improvement, and project management.",
    images: [
      "https://logo.clearbit.com/pmi.org",
      "https://logo.clearbit.com/sixsigma.com"
    ],
    color: "#8B5CF6"
  },
  {
    name: "Digital Marketing",
    description: "SEO, SEM, social media marketing, analytics, and branding (Google, HubSpot & Meta).",
    images: [
      "https://logo.clearbit.com/google.com",
      "https://logo.clearbit.com/hubspot.com",
      "https://logo.clearbit.com/meta.com"
    ],
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
      {/* Container with balanced spacing */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-12 pb-24 relative z-10">
        
        {/* Header Section inside a red outline box */}
        <div className="border border-red-500 rounded-2xl p-8 md:p-12 mb-12 bg-white/40 shadow-sm flex flex-col md:flex-row gap-12 items-center">
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
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: (index % 4) * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group flex flex-col bg-white border border-gray-200 rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)] transition-all duration-400 relative pt-3 overflow-hidden cursor-pointer"
              >
                {/* Top Folder Tab Decoration - expands slightly on hover */}
                <div className="absolute top-0 left-0 right-0 h-3 bg-[#7b8c9e]/80 group-hover:h-4 transition-all duration-300"></div>
                
                {/* Rectangular Logo Badge (Supports multiple logos now) */}
                <div className="absolute top-4 right-4 h-12 min-w-[80px] max-w-[160px] bg-white rounded-md flex items-center justify-center gap-3 shadow-[0_4px_12px_rgba(0,0,0,0.1)] px-3 py-2 z-10 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 border border-gray-100">
                  {cert.images.map((img, idx) => (
                    <img 
                      key={idx}
                      src={img} 
                      alt={`${cert.name} logo ${idx + 1}`} 
                      className={`${cert.images.length > 1 ? 'h-6' : 'h-full'} w-auto max-w-[100px] object-contain transition-transform duration-500`}
                    />
                  ))}
                </div>

                <div className="p-6 pt-16 flex flex-col flex-grow relative z-0">
                  <h3 className="text-xl font-bold text-[#203348] mb-6 pr-2 leading-tight min-h-[56px]">
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
                  
                  <div className="text-sm text-[#006A80] font-medium mb-6 group-hover:text-red-500 transition-colors flex items-center gap-1">
                    Read more <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  
                  <button className="w-full py-3 bg-[#425974] group-hover:bg-[#072A6C] text-white text-[13px] font-semibold rounded-[4px] transition-colors duration-300 mt-auto transform group-hover:-translate-y-1">
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
