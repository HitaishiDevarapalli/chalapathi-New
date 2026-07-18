import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Award, ChevronRight, ArrowLeft, CheckCircle2, ShieldCheck, Briefcase, Zap, Globe, ArrowRight, X } from "lucide-react";

import { certifications, Certification } from "../../data/certifications";

export default function GlobalCertifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedCert]);

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
                  

                  <button 
                    onClick={() => setSelectedCert(cert)}
                    className="w-full py-3 bg-[#425974] group-hover:bg-[#072A6C] text-white text-[13px] font-semibold rounded-[4px] transition-colors duration-300 mt-auto transform group-hover:-translate-y-1 block text-center cursor-pointer"
                  >
                    Read More
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

      {/* ======================================================== */}
      {/* 🌟 CERTIFICATION DETAIL POPUP MODAL                      */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-6"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
              className="bg-[#F7F8FC] w-full max-w-[1200px] h-[90vh] md:h-auto md:max-h-[92vh] rounded-[24px] shadow-2xl relative overflow-hidden flex flex-col font-[var(--font-poppins)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur rounded-full flex items-center justify-center text-gray-700 shadow-md transition-all hover:scale-105 hover:text-red-500 cursor-pointer border border-gray-100"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto scrollbar-none w-full h-full pb-10">
                {/* 
                  ========================================
                  PREMIUM HERO SECTION (Inside Modal)
                  ========================================
                */}
                <div className="relative overflow-hidden bg-white border-b border-gray-100 min-h-[400px]">
                  
                  {/* Subtle animated background gradients */}
                  <div className="absolute inset-0 z-0 opacity-30 pointer-events-none overflow-hidden">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[100px]"
                      style={{ backgroundColor: selectedCert.color }}
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                      className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] bg-blue-100"
                    />
                  </div>

                  <div className="px-8 lg:px-16 py-12 md:py-16 relative z-10 flex flex-col md:flex-row items-center gap-12">
                    
                    {/* Left Text Content */}
                    <div className="w-full md:w-1/2 space-y-6">
                      <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 shadow-sm">
                          <ShieldCheck size={14} className="text-[#072A6C]" />
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#072A6C]">Global Certification Partner</span>
                        </div>
                        
                        <h1 className="text-3xl md:text-5xl font-black text-[#072A6C] leading-[1.1] tracking-tight">
                          {selectedCert.name}
                        </h1>
                        
                        <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed max-w-xl">
                          {selectedCert.description} Earn globally recognized credentials and master industry-standard tools directly through our integrated curriculum.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <button className="h-12 px-6 bg-[#072A6C] hover:bg-[#051c4a] text-white font-bold text-[12px] rounded-xl flex items-center justify-center gap-2 transition-all shadow-md transform hover:-translate-y-1 cursor-pointer">
                          Start Certification <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Right Floating Visuals */}
                    <div className="w-full md:w-1/2 relative h-[300px] flex items-center justify-center">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="absolute z-20 w-[240px] h-[280px] bg-white/70 backdrop-blur-xl border border-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-6 flex flex-col items-center justify-center gap-6 group"
                      >
                        <div 
                          className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                          style={{ background: `linear-gradient(135deg, ${selectedCert.color}, transparent)` }}
                        />
                        
                        <div className="flex flex-wrap items-center justify-center gap-4">
                          {selectedCert.images.map((img, i) => (
                            <img 
                              key={i} 
                              src={img} 
                              alt={`${selectedCert.name} Logo ${i+1}`} 
                              className="h-16 w-auto max-w-[120px] object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-110" 
                            />
                          ))}
                        </div>
                        
                        <div className="text-center relative z-10">
                          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Official Credential</p>
                          <h3 className="text-base font-bold text-gray-800">{selectedCert.name} Certified</h3>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* 
                  ========================================
                  CONTENT SECTION (Inside Modal)
                  ========================================
                */}
                <div className="px-8 lg:px-16 py-12 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    
                    {/* Main Info */}
                    <div className="md:col-span-2 space-y-8">
                      <div>
                        <h2 className="text-xl font-black text-[#072A6C] mb-3">Why {selectedCert.name}?</h2>
                        <p className="text-gray-600 leading-relaxed text-[14px] font-light">
                          Industry certifications like {selectedCert.name} bridge the gap between academic theory and real-world application. By integrating this credential into your degree program, Chalapathi University ensures you graduate with the exact specialized skills that top global employers are actively hiring for.
                        </p>
                      </div>

                      <div className="bg-white border border-gray-100 rounded-[20px] p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-800 mb-5 flex items-center gap-2">
                          <Briefcase size={18} className="text-[#072A6C]" /> Career Outcomes
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            "Higher starting salary potential",
                            "Global recognition across industries",
                            "Priority consideration for top roles",
                            "Faster career progression"
                          ].map((item, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-1" />
                              <span className="text-[13px] text-gray-600 font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-[#072A6C] to-[#0A3D9C] p-6 rounded-[20px] text-white shadow-xl relative overflow-hidden">
                        <Globe size={24} className="text-blue-300 mb-4" />
                        <h3 className="text-2xl font-black mb-1">100%</h3>
                        <p className="text-blue-100 text-[11px] font-medium mb-6">Industry Aligned Curriculum</p>
                        <hr className="border-white/10 mb-6" />
                        <h3 className="text-2xl font-black mb-1">Global</h3>
                        <p className="text-blue-100 text-[11px] font-medium">Valid Credential</p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
