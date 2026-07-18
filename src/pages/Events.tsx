import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Calendar, Bookmark, X, Clock, MapPin, CheckCircle } from "lucide-react";
import { useData } from "../context/DataContext";

interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  bodyText: string;
}

export default function Events() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [showRegForm, setShowRegForm] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.title = "Upcoming Events | City Chalapathi Institute of Technology";
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedEvent]);

  // Handle escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") resetModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { events } = useData();
  const currentData = events;

  // Autoplay handler
  useEffect(() => {
    if (isHovered || selectedEvent) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, currentPage, selectedEvent]);

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

  const totalPages = currentData.length;

  const isRegistrationClosed = (dateStr: string) => {
    return new Date(dateStr) < new Date();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    setRegSuccess(true);
  };

  const resetModal = () => {
    setSelectedEvent(null);
    setShowRegForm(false);
    setRegSuccess(false);
    setFormData({ name: "", email: "", phone: "" });
  };

  const getRelatedEvents = (activeId: number) => {
    return events.filter(item => item.id !== activeId).slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]/30 font-[var(--font-poppins)] pb-24 relative">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#072A6C] to-indigo-950 text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-[1440px] mx-auto relative z-10 text-center lg:text-left space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white font-bold text-[10px] uppercase tracking-wider backdrop-blur-sm">
            Campus Activities
          </span>
          <h1 className="text-3xl lg:text-5xl font-[900] tracking-tight">University Events</h1>
          <p className="text-xs text-white font-light max-w-xl leading-relaxed">
            Participate in hackathons, expert workshops, alumni gatherings, and regional technology exhibitions.
          </p>
        </div>
      </section>

      {/* Events Slider Section */}
      <section className="max-w-[1440px] mx-auto px-5 mt-16">
        <div className="mb-8 pb-5 border-b border-gray-200">
          <h2 className="text-2xl lg:text-3xl font-[800] text-[#072A6C]">
            Upcoming Events
          </h2>
          <p className="text-[12px] text-gray-400 mt-1 font-light">Swipe through the slides to view all items.</p>
        </div>

        <div 
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Scrollable Container */}
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
            {currentData.map((item, idx) => {
              const closed = isRegistrationClosed(item.date);
              return (
                <div
                  key={idx}
                  className="w-full shrink-0 snap-start snap-always px-4"
                >
                  <button 
                    onClick={() => {
                      setSelectedEvent(item);
                      setShowRegForm(false);
                      setRegSuccess(false);
                    }}
                    className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full max-w-3xl mx-auto block group w-full text-left cursor-pointer outline-none focus:ring-2 focus:ring-[#F97316]"
                  >
                    {/* Image */}
                    <div className="h-[380px] md:h-[460px] overflow-hidden bg-slate-900 relative w-full">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        draggable="false"
                      />
                      {closed && (
                        <div className="absolute top-4 right-4 bg-gray-500/90 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-sm uppercase tracking-wider">
                          Registration Closed
                        </div>
                      )}
                    </div>
                    {/* Content Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between w-full">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-semibold uppercase">
                          <span className="text-[#F97316]">{item.category}</span>
                          <span>•</span>
                          <span>{item.date}</span>
                        </div>
                        <h4 className="text-base font-extrabold text-[#072A6C] leading-snug line-clamp-2 group-hover:text-[#D71920] transition-colors">
                          {item.title}
                        </h4>
                      </div>
                      <div className="pt-4 border-t border-gray-50 mt-5 flex justify-between items-center text-xs font-bold text-[#072A6C]">
                        <span>{closed ? "View Details" : "Register Now"}</span>
                        <ArrowRight size={14} className={closed ? "text-gray-400" : "text-[#F97316]"} />
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
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

        {/* Centered CTA button */}
        <div className="flex justify-center mt-12">
          <Link
            to="/news/events/all"
            className="h-11 px-8 bg-[#854d0e] hover:bg-[#713f12] text-white text-[12px] font-bold rounded-xl inline-flex items-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
          >
            View More Events <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 🌟 CENTERED EVENT MODAL POPUP OVERLAY                     */}
      {/* ======================================================== */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-hidden"
          onClick={resetModal}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-white w-full max-w-[900px] rounded-[20px] overflow-hidden shadow-2xl relative animate-fade-in flex flex-col max-h-[90vh] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Trigger */}
            <button 
              onClick={resetModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/75 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Scrollable Modal Content */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8 space-y-6">
              
              {/* Event Image */}
              <div className="h-[280px] md:h-[350px] w-full rounded-2xl overflow-hidden relative shadow-sm">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-bold text-white bg-[#F97316] py-1 px-3 rounded-lg uppercase tracking-wider shadow-sm">
                  {selectedEvent.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-3xl font-[900] text-[#072A6C] tracking-tight leading-snug">
                {selectedEvent.title}
              </h2>

              {/* Metadata Panel */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-gray-500 font-semibold bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#D71920]" />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#D71920]" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#D71920]" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-100" />

              {/* Content Body or Form */}
              {!showRegForm ? (
                <div className="text-sm text-gray-600 font-light leading-relaxed space-y-4 animate-fade-in">
                  <p>{selectedEvent.bodyText}</p>
                </div>
              ) : (
                <div className="animate-fade-in">
                  {regSuccess ? (
                    <div className="bg-green-50 border border-green-100 p-6 rounded-2xl text-center space-y-3">
                      <CheckCircle className="mx-auto text-green-500" size={40} />
                      <h4 className="text-lg font-bold text-green-800">Registration Successful!</h4>
                      <p className="text-xs text-green-600 font-light">A confirmation email along with entry tickets has been dispatched for <strong>{formData.name}</strong>.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleRegisterSubmit} className="space-y-4 max-w-md bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <h4 className="text-sm font-bold text-[#072A6C]">Complete Registration Details</h4>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          required 
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#072A6C] bg-white"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          required 
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#072A6C] bg-white"
                          placeholder="Your email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">Contact Number</label>
                        <input 
                          type="tel" 
                          required 
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#072A6C] bg-white"
                          placeholder="Your phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="w-full py-2.5 bg-[#D71920] hover:bg-[#b71217] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Submit Registration
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Related Section (Related Events) */}
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <h4 className="text-xs font-extrabold tracking-wider text-[#072A6C] uppercase">
                  Other Upcoming Events
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {getRelatedEvents(selectedEvent.id).map((related, rIdx) => (
                    <button
                      key={rIdx}
                      onClick={() => {
                        setSelectedEvent(related);
                        setShowRegForm(false);
                        setRegSuccess(false);
                      }}
                      className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow text-left flex flex-col gap-2 transition-all w-full cursor-pointer hover:border-gray-200"
                    >
                      <span className="text-[9px] font-extrabold text-[#F97316] uppercase">{related.category}</span>
                      <h5 className="text-[12px] font-extrabold text-[#072A6C] line-clamp-2 leading-tight">
                        {related.title}
                      </h5>
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                {isRegistrationClosed(selectedEvent.date) ? (
                  <button
                    disabled
                    className="h-10 px-6 bg-gray-300 text-gray-500 text-xs font-bold rounded-xl cursor-not-allowed inline-flex items-center gap-1.5"
                  >
                    Registration Closed
                  </button>
                ) : !showRegForm ? (
                  <button
                    onClick={() => setShowRegForm(true)}
                    className="h-10 px-6 bg-gradient-to-r from-[#D71920] to-[#b71217] text-white text-xs font-bold rounded-xl inline-flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                  >
                    Register Now <ArrowRight size={13} />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowRegForm(false)}
                    className="h-10 px-5 border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Back to Details
                  </button>
                )}
                <button
                  onClick={resetModal}
                  className="h-10 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl inline-flex items-center transition-all active:scale-95 cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
