import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Calendar, Bookmark } from "lucide-react";

const EVENTS_DATA = [
  {
    title: "Air Taxi Demonstration & Aviation Forum",
    date: "17 Jul 2026",
    category: "Aerospace",
    image: "/prog_engineering.png"
  },
  {
    title: "Annual Innovation & Entrepreneurship Summit",
    date: "05 Aug 2026",
    category: "Summit",
    image: "/prog_computer.png"
  },
  {
    title: "National Research Expo & Patent Showcase",
    date: "12 Sep 2026",
    category: "Research",
    image: "/prog_pharmacy.png"
  },
  {
    title: "Industry Connect: Corporate Leadership Panel",
    date: "03 Oct 2026",
    category: "Corporate",
    image: "/prog_management.png"
  }
];

const NEWS_DATA = [
  {
    title: "AI Research Lab Inaugurated on Campus",
    date: "12 May 2025",
    category: "Innovation",
    image: "/prog_computer.png"
  },
  {
    title: "Engineering Students Win Smart Hackathon 2025",
    date: "06 May 2025",
    category: "Achievement",
    image: "/prog_engineering.png"
  },
  {
    title: "MoU Signed with Top Global Corporations for Placements",
    date: "03 May 2025",
    category: "Corporate Link",
    image: "/prog_management.png"
  },
  {
    title: "New Pharmacy Research Formulations Published",
    date: "28 Apr 2025",
    category: "Research",
    image: "/prog_pharmacy.png"
  }
];

export default function Events() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.title = "Upcoming Events | City Chalapathi Institute of Technology";
  }, []);

  const currentData = EVENTS_DATA;

  // Autoplay handler
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, currentPage]);

  const handlePrev = () => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const itemWidth = el.clientWidth;
    const newScrollLeft = el.scrollLeft - itemWidth;
    el.scrollTo({ left: newScrollLeft < 0 ? el.scrollWidth - itemWidth : newScrollLeft, behavior: "smooth" });
  };

  const handleNext = () => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const itemWidth = el.clientWidth;
    const newScrollLeft = el.scrollLeft + itemWidth;
    el.scrollTo({ left: newScrollLeft >= el.scrollWidth - 5 ? 0 : newScrollLeft, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const scrolledRatio = el.scrollLeft / el.clientWidth;
    setCurrentPage(Math.round(scrolledRatio));
  };

  const handleDotClick = (index: number) => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
    setCurrentPage(index);
  };

  const totalPages = Math.ceil(currentData.length / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1));

  return (
    <div className="min-h-screen bg-[#FDFBF7]/30 font-[var(--font-poppins)] pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#072A6C] to-indigo-950 text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-[1440px] mx-auto relative z-10 text-center lg:text-left space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white font-bold text-[10px] uppercase tracking-wider backdrop-blur-sm">
            Campus Highlights
          </span>
          <h1 className="text-3xl lg:text-5xl font-[900] tracking-tight">Events Hub</h1>
          <p className="text-xs text-gray-300 font-light max-w-xl leading-relaxed">
            Stay in the loop with workshops, technical hackathons, guest lectures, and cultural events.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="max-w-[1440px] mx-auto px-5 mt-16">
        
        {/* Header containing Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-gray-200/80 pb-6">
          <div>
            <h2 className="text-3xl font-[800] text-[#072A6C] tracking-tight">
              Upcoming Events
            </h2>
            <p className="text-xs text-gray-400 mt-1 font-light">Swipe through the slides to view all items.</p>
          </div>
        </div>

        {/* Carousel with Navigation Arrows */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Slider Container */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 select-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollSnapType: "x mandatory"
            }}
            onScroll={handleScroll}
          >
            {currentData.map((item, idx) => (
              <div
                key={idx}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start snap-always"
              >
                <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                  {/* Image */}
                  <div className="h-52 overflow-hidden bg-slate-900 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      draggable="false"
                    />
                  </div>
                  {/* Content Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-semibold uppercase">
                        <span className="text-[#F97316]">{item.category}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                      <h4 className="text-base font-extrabold text-[#072A6C] leading-snug line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                    <div className="pt-4 border-t border-gray-50 mt-5 flex justify-between items-center text-xs font-bold text-[#072A6C]">
                      <span>View Details</span>
                      <ArrowRight size={14} className="text-[#F97316]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-gray-200 text-gray-700 shadow-md flex items-center justify-center hover:text-[#F97316] hover:border-[#F97316] transition-all opacity-0 group-hover:opacity-100 active:scale-95 z-20 cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-gray-200 text-gray-700 shadow-md flex items-center justify-center hover:text-[#F97316] hover:border-[#F97316] transition-all opacity-0 group-hover:opacity-100 active:scale-95 z-20 cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5 mt-8">
          {Array.from({ length: totalPages }).map((_, idx) => (
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

        {/* Centered CTA button (View More Events) */}
        <div className="flex justify-center mt-12">
          <Link
            to="/news/events"
            className="h-11 px-8 bg-[#854d0e] hover:bg-[#713f12] text-white text-[12px] font-bold rounded-xl inline-flex items-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
          >
            View More Events <ArrowRight size={12} />
          </Link>
        </div>

      </section>
    </div>
  );
}
