import React from 'react';
import { motion } from 'framer-motion';

interface SkillsProps {
  skills: string[];
  color: string;
}

export default function SkillChips({ skills, color }: SkillsProps) {
  return (
    <div className="w-full flex flex-col items-center text-center">
      <div className="mb-12">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Skills You'll Master</h2>
        <h3 className="text-3xl md:text-4xl font-black text-gray-900">Your Technical Arsenal</h3>
      </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: `0 0 20px ${color}60`,
              backgroundColor: color,
              color: "#ffffff"
            }}
            className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-full text-sm cursor-pointer shadow-sm transition-colors duration-300"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
