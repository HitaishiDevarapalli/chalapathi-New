import React from 'react';
import { motion } from 'framer-motion';

interface RoadmapProps {
  roadmap: { role: string; exp: string }[];
  color: string;
}

export default function CareerRoadmap({ roadmap, color }: RoadmapProps) {
  return (
    <div className="w-full">
      <div className="text-center mb-16">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Career Roadmap</h2>
        <h3 className="text-3xl md:text-4xl font-black text-gray-900">Your Progression</h3>
      </div>

      <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
        {/* Vertical Line */}
        <div className="absolute top-0 bottom-0 left-8 md:left-1/2 md:-ml-[2px] w-[4px] bg-gray-100 rounded-full">
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>

        <div className="space-y-12 relative z-10">
          {roadmap.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={index} className={`flex flex-col md:flex-row items-start md:items-center w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                
                {/* Mobile dot */}
                <div 
                  className="absolute left-8 -ml-3 w-6 h-6 rounded-full border-4 border-white shadow-md md:hidden"
                  style={{ backgroundColor: color }}
                />

                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                  className={`w-full md:w-[45%] bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow relative ml-6 md:ml-0 ${
                    isLeft ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
                  }`}
                >
                  {/* Desktop dot */}
                  <div 
                    className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white shadow-md hidden md:block ${
                      isLeft ? '-right-[calc(11%_-_1px)] md:-right-[calc(11.111%_+_2px)] lg:-right-[calc(11.111%_+_12px)] xl:-right-[calc(11.111%_+_24px)] 2xl:-right-[calc(11.111%_+_34px)] /* Needs precise adjustment based on container, using fixed positioning is better */' : '' 
                    }`}
                    style={{ backgroundColor: color, ...(isLeft ? { right: '-41px' } : { left: '-41px' }) }}
                  />

                  <h4 className="text-lg font-extrabold text-gray-900 mb-1">{step.role}</h4>
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-full">
                    Experience: {step.exp}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
