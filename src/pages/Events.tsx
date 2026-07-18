import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { useData } from "../context/DataContext";

export default function Events() {
  const { events } = useData();

  useEffect(() => {
    document.title = "Upcoming Events | City Chalapathi Institute of Technology";
    window.scrollTo(0, 0);
  }, []);

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

      {/* Events Grid Section */}
      <section className="max-w-[1440px] mx-auto px-5 mt-16">
        <div className="mb-8 pb-5 border-b border-gray-200">
          <h2 className="text-2xl lg:text-3xl font-[800] text-[#072A6C]">
            Upcoming Events
          </h2>
          <p className="text-[12px] text-gray-400 mt-1 font-light">Explore academic activities, guest lectures, and student festivals.</p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-400">No upcoming events listed at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((item, idx) => {
              const closed = isRegistrationClosed(item.date);
              return (
                <Link
                  key={idx}
                  to={`/news/events/${item.slug}`}
                  className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full group text-left cursor-pointer outline-none focus:ring-2 focus:ring-[#F97316]"
                >
                  {/* Image */}
                  <div className="h-56 overflow-hidden bg-slate-900 relative w-full">
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
                    <span className="absolute bottom-4 left-4 text-[10px] font-black text-white bg-[#F97316] py-1 px-3 rounded-lg uppercase tracking-wider shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  {/* Content Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between w-full">
                    <div className="space-y-3">
                      <div className="flex flex-col gap-1 text-[10px] text-gray-400 font-semibold uppercase">
                        <div className="flex items-center gap-1">
                          <Calendar size={11} className="text-[#F97316]" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={11} className="text-[#F97316]" />
                          <span>{item.time}</span>
                        </div>
                      </div>
                      <h4 className="text-base font-extrabold text-[#072A6C] leading-snug line-clamp-2 group-hover:text-[#D71920] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed font-light font-[var(--font-inter)]">
                        {item.bodyText}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-gray-50 mt-5 flex justify-between items-center text-xs font-bold text-[#072A6C]">
                      <span>{closed ? "View Details" : "Register Now"}</span>
                      <ArrowRight size={14} className={closed ? "text-gray-400" : "text-[#F97316]"} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Centered directory link */}
        <div className="flex justify-center mt-12">
          <Link
            to="/news/events/all"
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#072A6C] hover:bg-[#D71920] text-white text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <span>Explore All Events Archive</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </div>
  );
}
