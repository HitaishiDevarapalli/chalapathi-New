import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { Calendar, Clock, MapPin, Share2, ArrowLeft, CheckCircle, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function EventDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { events, updateEvents } = useData();
  
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  // Registration Form States
  const [showRegForm, setShowRegForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", rollNo: "" });
  const [regSuccess, setRegSuccess] = useState(false);

  // Find current event
  const currentIdx = events.findIndex((item) => item.slug === slug);
  const eventItem = currentIdx !== -1 ? events[currentIdx] : null;

  useEffect(() => {
    if (eventItem) {
      document.title = `${eventItem.title} | Events | Chalapathi University`;
      window.scrollTo(0, 0);
    }
  }, [eventItem]);

  if (!eventItem) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center p-6 text-center font-[var(--font-poppins)]">
        <h2 className="text-2xl font-black text-[#072A6C] mb-2">Event Not Found</h2>
        <p className="text-sm text-gray-500 mb-6 font-[var(--font-inter)]">The event you are looking for does not exist or has been removed.</p>
        <Link to="/news/events/all" className="px-5 py-2.5 bg-[#D71920] hover:bg-[#072A6C] text-white text-xs font-bold rounded-full transition-colors shadow-sm">
          Back to Event Directory
        </Link>
      </div>
    );
  }

  // Registration date cutoff check
  const isRegistrationClosed = (eventDateStr: string) => {
    try {
      const parts = eventDateStr.split(" ");
      if (parts.length >= 3) {
        const day = parseInt(parts[0], 10);
        const monthStr = parts[1];
        const year = parseInt(parts[2], 10);
        const months: Record<string, number> = {
          Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
          Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };
        const month = months[monthStr.substring(0, 3)] ?? 0;
        const eventDate = new Date(year, month, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today > eventDate;
      }
    } catch (e) {
      return false;
    }
    return false;
  };

  const closed = isRegistrationClosed(eventItem.date);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    setRegSuccess(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Prev / Next Navigation
  const prevEvent = currentIdx > 0 ? events[currentIdx - 1] : null;
  const nextEvent = currentIdx < events.length - 1 ? events[currentIdx + 1] : null;

  // Other Upcoming Events
  const relatedEvents = events
    .filter((item) => item.id !== eventItem.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F7F9FC] py-10 font-[var(--font-poppins)]">
      <div className="max-w-[1100px] mx-auto px-5">
        
        {/* Back Link */}
        <Link 
          to="/news/events/all" 
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#D71920] transition-colors mb-6 uppercase tracking-wider"
        >
          <ArrowLeft size={14} /> Back to Event Directory
        </Link>

        {/* Main Event Box */}
        <div className="bg-white rounded-[18px] overflow-hidden shadow-sm border border-gray-100/80 p-6 md:p-10 space-y-6 text-left">
          
          {/* Category & Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
            <div className="flex items-center gap-2.5">
              <span className="bg-[#F97316]/10 text-[#F97316] text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider">
                {eventItem.category}
              </span>
              {closed && (
                <span className="bg-gray-100 text-gray-500 text-[10px] font-bold uppercase px-3 py-1.5 rounded-full tracking-wider">
                  Registration Closed
                </span>
              )}
            </div>

            {/* Share Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                title="Share Event"
              >
                <Share2 size={16} />
              </button>
              
              {showShareMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200/85 rounded-xl shadow-lg p-2 z-20 flex flex-col gap-0.5 text-xs text-left animate-fade-in text-gray-700">
                  <button 
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg w-full transition-colors cursor-pointer"
                  >
                    <span>{copied ? "Copied!" : "Copy Page Link"}</span>
                  </button>
                  <a 
                    href={`https://wa.me/?text=${encodeURIComponent(eventItem.title + " " + window.location.href)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg w-full transition-colors"
                  >
                    <span>Share on WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Event Image */}
          <div className="h-[300px] md:h-[450px] w-full rounded-2xl overflow-hidden relative shadow-sm">
            <img 
              src={eventItem.image} 
              alt={eventItem.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Event Title */}
          <h1 className="text-2xl md:text-4xl font-[900] text-[#072A6C] tracking-tight leading-snug">
            {eventItem.title}
          </h1>

          {/* Details Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-500 font-semibold bg-gray-50 p-5 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
                <Calendar size={14} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Date</span>
                <span className="text-gray-700 font-bold">{eventItem.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
                <Clock size={14} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Time</span>
                <span className="text-gray-700 font-bold">{eventItem.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
                <MapPin size={14} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Location</span>
                <span className="text-gray-700 font-bold">{eventItem.location}</span>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Body content & Registration form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Description Body */}
            <div className="lg:col-span-2 space-y-5 text-sm text-gray-600 font-light leading-relaxed">
              <p>{eventItem.bodyText}</p>
            </div>

            {/* Registration Box */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 self-start space-y-4">
              <h3 className="text-sm font-black text-[#072A6C] uppercase tracking-wider">Registration</h3>
              
              {closed ? (
                <div className="text-xs text-gray-400 bg-gray-100/50 p-4 rounded-xl text-center font-medium">
                  We are no longer accepting registrations for this event since it has concluded.
                </div>
              ) : regSuccess ? (
                <div className="bg-green-50 border border-green-100 p-4 rounded-xl text-center space-y-2">
                  <CheckCircle className="mx-auto text-green-500" size={32} />
                  <h4 className="text-xs font-bold text-green-800">Successfully Registered!</h4>
                  <p className="text-[10px] text-green-600 font-light">Ticket details have been sent to <strong>{formData.email}</strong>.</p>
                </div>
              ) : !showRegForm ? (
                <div className="space-y-3">
                  <p className="text-[11px] text-gray-500 font-medium">Secure your seat for this upcoming campus activity online today.</p>
                  <button 
                    onClick={() => setShowRegForm(true)}
                    className="w-full py-2.5 bg-[#D71920] hover:bg-[#072A6C] text-white text-xs font-bold rounded-xl transition-all cursor-pointer hover:shadow-md"
                  >
                    Register Online
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-left">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#072A6C] bg-white"
                      placeholder="Enter name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#072A6C] bg-white"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#072A6C] bg-white"
                      placeholder="Enter phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button 
                      type="button"
                      onClick={() => setShowRegForm(false)}
                      className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-2 bg-[#D71920] hover:bg-[#b71217] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

          {/* Navigation Bar */}
          <div className="pt-8 border-t border-gray-100 flex items-center justify-between gap-4">
            {prevEvent ? (
              <Link 
                to={`/news/events/${prevEvent.slug}`} 
                className="flex items-center gap-2 text-left group max-w-[45%]"
              >
                <ChevronLeft size={20} className="text-gray-400 group-hover:text-[#D71920] transition-colors shrink-0" />
                <div className="hidden sm:block space-y-0.5">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Previous Event</p>
                  <p className="text-xs font-bold text-[#072A6C] line-clamp-1 group-hover:text-[#D71920] transition-colors">{prevEvent.title}</p>
                </div>
              </Link>
            ) : <div />}

            {nextEvent ? (
              <Link 
                to={`/news/events/${nextEvent.slug}`} 
                className="flex items-center gap-2 text-right group max-w-[45%] ml-auto"
              >
                <div className="hidden sm:block space-y-0.5">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Next Event</p>
                  <p className="text-xs font-bold text-[#072A6C] line-clamp-1 group-hover:text-[#D71920] transition-colors">{nextEvent.title}</p>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-[#D71920] transition-colors shrink-0" />
              </Link>
            ) : <div />}
          </div>

        </div>

        {/* Other Events list at bottom */}
        <div className="mt-14 space-y-6">
          <h2 className="text-xl lg:text-2xl font-[900] text-[#072A6C] text-left">Explore Other Campus Activities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedEvents.map((item) => {
              const itemClosed = isRegistrationClosed(item.date);
              return (
                <Link 
                  key={item.id}
                  to={`/news/events/${item.slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col h-full group text-left transition-all duration-300"
                >
                  <div className="h-44 w-full overflow-hidden bg-slate-900 relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute bottom-3 left-3 bg-[#F97316] text-white text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] text-gray-400 font-bold">{item.date}</span>
                      <h4 className="text-sm font-extrabold text-[#072A6C] group-hover:text-[#D71920] transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                    </div>
                    <div className="pt-4 border-t border-gray-50 mt-4 flex items-center justify-between text-xs font-bold text-[#072A6C]">
                      <span>{itemClosed ? "View Details" : "Register Now"}</span>
                      <ArrowLeft size={13} className="rotate-180 text-[#F97316]" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
