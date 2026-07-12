import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, ChevronDown } from "lucide-react";

export default function Header({ onToggleAi }: { onToggleAi?: () => void } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [mobileAcademicsOpen, setMobileAcademicsOpen] = useState(false);
  const [managementOpen, setManagementOpen] = useState(false);
  const [mobileManagementOpen, setMobileManagementOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileAcademicsOpen(false);
    setMobileManagementOpen(false);
  }, [location.pathname]);

  const navLinks = [
    "About Us", "Academics", "Admissions", "Research", "Management",
    "Campus Life", "Placements", "News", "Events", "Contact",
  ];

  const navHrefs: Record<string, string> = {
    "About Us": "/about",
    "Academics": "/academics",
    "Admissions": "/admissions",
    "Research": "/research",
    "Management": "/management",
    "Campus Life": "/campus-life",
    "Placements": "/placements",
    "News": "/news",
    "Events": "/news/events",
    "Contact": "/contact",
  };

  const academicsItems = [
    { label: "Academics @ Chalapathi", to: "/academics" },
    { label: "Academic Calendar", to: "/academics/calendar" },
    { label: "Flexibilities", to: "/academics/flexibilities" },
    { label: "Programmes Offered", to: "/academics/programmes" },
    { label: "Grading", to: "/academics/grading" },
    { label: "Award of Degrees", to: "/academics/degrees" },
    { label: "Electives", to: "/academics/electives" },
    { label: "Rules & Regulations", to: "/academics/rules" },
    { label: "Teaching & Evaluation", to: "/academics/teaching" },
    { label: "BOS Members", to: "/academics/bos" }
  ];

  const managementItems = [
    { label: "Board Members", to: "/management/board-members" },
    { label: "Faculty", to: "/management/faculty" },
    { label: "Staff", to: "/management/staff" }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        } h-[80px]`}
        style={{ borderBottom: "1px solid #E8E8E8" }}
      >
        <div className="max-w-[1440px] mx-auto h-full px-5 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 py-1">
            <img
              src="/logo.png"
              alt="City Chalapathi Institute of Technology"
              className="h-14 w-auto object-contain transition-all"
            />
          </Link>

          {/* Center nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((name) => {
              if (name === "Academics") {
                return (
                  <div
                    key={name}
                    className="relative"
                    onMouseEnter={() => setAcademicsOpen(true)}
                    onMouseLeave={() => setAcademicsOpen(false)}
                  >
                    <button
                      type="button"
                      className="px-3.5 py-2 text-[14px] font-medium text-[#222222] hover:text-[#D71920] transition-colors whitespace-nowrap font-[var(--font-poppins)] inline-flex items-center gap-1 cursor-pointer outline-none"
                    >
                      {name} <ChevronDown size={14} className={`transition-transform duration-200 ${academicsOpen ? "rotate-180" : ""}`} />
                    </button>
                    {academicsOpen && (
                      <div className="absolute top-full left-0 mt-0 w-[240px] bg-white border border-gray-200/80 rounded-[12px] shadow-lg py-2.5 z-50 flex flex-col gap-0.5 animate-fade-in font-[var(--font-poppins)]">
                        {academicsItems.map((item) => (
                          <Link
                            key={item.label}
                            to={item.to}
                            className="px-4 py-2 text-[13px] font-medium text-[#222222] hover:text-[#D71920] hover:bg-[#D71920]/5 transition-all"
                            onClick={() => setAcademicsOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (name === "Management") {
                return (
                  <div
                    key={name}
                    className="relative"
                    onMouseEnter={() => setManagementOpen(true)}
                    onMouseLeave={() => setManagementOpen(false)}
                  >
                    <button
                      type="button"
                      className="px-3.5 py-2 text-[14px] font-medium text-[#222222] hover:text-[#D71920] transition-colors whitespace-nowrap font-[var(--font-poppins)] inline-flex items-center gap-1 cursor-pointer outline-none"
                    >
                      {name} <ChevronDown size={14} className={`transition-transform duration-200 ${managementOpen ? "rotate-180" : ""}`} />
                    </button>
                    {managementOpen && (
                      <div className="absolute top-full left-0 mt-0 w-[180px] bg-white border border-gray-200/80 rounded-[12px] shadow-lg py-2.5 z-50 flex flex-col gap-0.5 animate-fade-in font-[var(--font-poppins)]">
                        {managementItems.map((item) => (
                          <Link
                            key={item.label}
                            to={item.to}
                            className="px-4 py-2 text-[13px] font-medium text-[#222222] hover:text-[#D71920] hover:bg-[#D71920]/5 transition-all"
                            onClick={() => setManagementOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={name}
                  to={navHrefs[name]}
                  className="px-3.5 py-2 text-[14px] font-medium text-[#222222] hover:text-[#D71920] transition-colors whitespace-nowrap font-[var(--font-poppins)]"
                >
                  {name}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="hidden xl:flex items-center gap-4 shrink-0">
            <Link
              to="/admissions/apply"
              className="h-10 px-6 bg-[#D71920] hover:bg-[#b71217] text-white text-[13px] font-bold rounded-[12px] inline-flex items-center justify-center transition-colors shadow-sm font-[var(--font-poppins)]"
            >
              Apply Now
            </Link>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#222222] hover:text-[#D71920] hover:border-[#D71920] transition-colors cursor-pointer"
            >
              <Search size={16} />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex xl:hidden items-center gap-2">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-[#222222]"><Search size={18} /></button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-[#222222]">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search overlay */}
        {searchOpen && (
          <div className="absolute top-full left-0 w-full bg-[#072A6C] p-4 shadow-xl z-50 animate-slide-down">
            <div className="max-w-2xl mx-auto flex gap-2">
              <input
                type="text"
                placeholder="Search programs, faculty, events..."
                className="flex-1 bg-white/10 text-white border border-white/20 rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#D71920] placeholder:text-white/50 font-[var(--font-poppins)]"
              />
              <button className="bg-[#D71920] text-white font-bold px-6 py-2.5 rounded-[12px] text-sm hover:bg-[#b71217] transition-colors font-[var(--font-poppins)]">
                Search
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[90px] z-30 bg-white flex flex-col p-6 overflow-y-auto xl:hidden shadow-2xl">
          {navLinks.map((name) => {
            if (name === "Academics") {
              return (
                <div key={name} className="flex flex-col border-b border-gray-100 py-3">
                  <button
                    type="button"
                    onClick={() => setMobileAcademicsOpen(!mobileAcademicsOpen)}
                    className="w-full flex items-center justify-between text-[15px] font-semibold text-[#222222] hover:text-[#D71920] transition-colors font-[var(--font-poppins)] text-left outline-none cursor-pointer"
                  >
                    <span>{name}</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${mobileAcademicsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileAcademicsOpen && (
                    <div className="pl-4 flex flex-col gap-2 mt-2 pt-2 border-t border-gray-50">
                      {academicsItems.map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          className="text-[13px] font-medium text-gray-600 hover:text-[#D71920] py-1.5 transition-colors font-[var(--font-poppins)]"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (name === "Management") {
              return (
                <div key={name} className="flex flex-col border-b border-gray-100 py-3">
                  <button
                    type="button"
                    onClick={() => setMobileManagementOpen(!mobileManagementOpen)}
                    className="w-full flex items-center justify-between text-[15px] font-semibold text-[#222222] hover:text-[#D71920] transition-colors font-[var(--font-poppins)] text-left outline-none cursor-pointer"
                  >
                    <span>{name}</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${mobileManagementOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileManagementOpen && (
                    <div className="pl-4 flex flex-col gap-2 mt-2 pt-2 border-t border-gray-50">
                      {managementItems.map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          className="text-[13px] font-medium text-gray-600 hover:text-[#D71920] py-1.5 transition-colors font-[var(--font-poppins)]"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={name}
                to={navHrefs[name]}
                className="text-[15px] font-semibold text-[#222222] hover:text-[#D71920] py-3 border-b border-gray-100 transition-colors font-[var(--font-poppins)]"
              >
                {name}
              </Link>
            );
          })}
          <div className="flex flex-col gap-3 pt-8">
            <Link to="/admissions/apply" className="w-full text-center py-3 bg-[#D71920] text-white font-bold text-sm rounded-[12px] font-[var(--font-poppins)]">Apply Now</Link>
          </div>
        </div>
      )}
    </>
  );
}
