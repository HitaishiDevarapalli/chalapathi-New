import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, ChevronDown } from "lucide-react";

const UNDERGRADUATE_GROUPS = {
  "Computer Science & Eng": [
    { title: "B.Tech. Computer Science & Eng", slug: "btech-cse" },
    { title: "B.Tech. CSE (AI & Machine Learning)", slug: "btech-cse-ai-ml" },
    { title: "B.Tech. CSE (Data Science)", slug: "btech-cse-data-science" },
    { title: "B.Tech. CSE (Cyber Security)", slug: "btech-cse-cyber-security" },
    { title: "B.Tech. CSE (Internet of Things)", slug: "btech-cse-iot" },
    { title: "B.Tech. CSE (Cloud Computing)", slug: "btech-cse-cloud-computing" },
    { title: "B.Tech. CSE (Blockchain)", slug: "btech-cse-blockchain" },
    { title: "B.Tech. CSE (Software Engineering)", slug: "btech-cse-software-engineering" }
  ],
  "Electronics & Communication": [
    { title: "B.Tech. Electronics & Comm Eng", slug: "btech-ece" },
    { title: "B.Tech. ECE (VLSI Design)", slug: "btech-ece-vlsi" },
    { title: "B.Tech. ECE (Embedded Systems)", slug: "btech-ece-embedded-systems" },
    { title: "B.Tech. ECE (Robotics & Automation)", slug: "btech-ece-robotics-automation" },
    { title: "B.Tech. ECE (IoT Specialization)", slug: "btech-ece-iot" }
  ],
  "Electrical & Mechanical": [
    { title: "B.Tech. Electrical & Electronics Eng", slug: "btech-eee" },
    { title: "B.Tech. EEE (Electric Vehicles)", slug: "btech-eee-electric-vehicles" },
    { title: "B.Tech. EEE (Renewable Energy)", slug: "btech-eee-renewable-energy" },
    { title: "B.Tech. EEE (Smart Grid)", slug: "btech-eee-smart-grid" },
    { title: "B.Tech. Mechanical Engineering", slug: "btech-mechanical" },
    { title: "B.Tech. Mechanical (Mechatronics)", slug: "btech-mechanical-mechatronics" },
    { title: "B.Tech. Mechanical (Robotics)", slug: "btech-mechanical-robotics" },
    { title: "B.Tech. Mechanical (Automobile)", slug: "btech-mechanical-automobile" },
    { title: "B.Tech. Mechanical (Manufacturing)", slug: "btech-mechanical-manufacturing" }
  ],
  "Civil & Emerging Tech": [
    { title: "B.Tech. Civil Engineering", slug: "btech-civil" },
    { title: "B.Tech. Civil (Smart Infrastructure)", slug: "btech-civil-smart-infrastructure" },
    { title: "B.Tech. Civil (Construction Tech)", slug: "btech-civil-construction-technology" },
    { title: "B.Tech. Emerging (AI)", slug: "btech-emerging-ai" },
    { title: "B.Tech. Emerging (Data Science)", slug: "btech-emerging-ds" },
    { title: "B.Tech. Emerging (Robotics)", slug: "btech-emerging-robotics" },
    { title: "B.Tech. Biomedical Engineering", slug: "btech-biomedical" },
    { title: "B.Tech. Biotechnology", slug: "btech-biotechnology" },
    { title: "B.Tech. Agricultural Engineering", slug: "btech-agricultural" }
  ]
};

const MEGA_MENU_PROGRAMS: Record<string, { label: string; to: string }[]> = {
  "Undergraduate (UG)": [], // Handled dynamically by UNDERGRADUATE_GROUPS
  "Postgraduate (PG)": [
    { label: "M.Tech. Computer Science", to: "/academics/mtech-cse" },
    { label: "M.Tech. Power Systems", to: "/academics/mtech-power-systems" },
    { label: "M.Tech. VLSI & Embedded Systems", to: "/academics/mtech-vlsi-embedded" },
    { label: "MBA (Master of Business Administration)", to: "/academics/mba" },
    { label: "MCA (Master of Computer Applications)", to: "/academics/mca" },
    { label: "M.Pharm. (Master of Pharmacy)", to: "/academics/mpharm" }
  ],
  "Integrated Programs": [
    { label: "Integrated B.Tech + M.Tech", to: "/academics/integrated-btech-mtech" },
    { label: "Integrated BBA + MBA", to: "/academics/integrated-bba-mba" }
  ],
  "Diploma Programs": [
    { label: "Diploma in Engineering (Polytechnic)", to: "/academics/diploma-engineering" },
    { label: "Diploma in Pharmacy (D.Pharm)", to: "/academics/diploma-pharmacy" }
  ],
  "Doctoral (Ph.D.)": [
    { label: "Ph.D. in Computer Science", to: "/academics/phd-cse" },
    { label: "Ph.D. in Electronics", to: "/academics/phd-ece" },
    { label: "Ph.D. in Management", to: "/academics/phd-management" },
    { label: "Ph.D. in Pharmacy", to: "/academics/phd-pharmacy" }
  ],
  "Honors & Minors": [
    { label: "Honors Degrees (Special Track)", to: "/academics/flexibilities" },
    { label: "Minor Specialization Streams", to: "/academics/flexibilities" }
  ]
};

export default function Header({ onToggleAi }: { onToggleAi?: () => void } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [mobileAcademicsOpen, setMobileAcademicsOpen] = useState(false);
  const [managementOpen, setManagementOpen] = useState(false);
  const [mobileManagementOpen, setMobileManagementOpen] = useState(false);
  const [campusLifeOpen, setCampusLifeOpen] = useState(false);
  const [mobileCampusLifeOpen, setMobileCampusLifeOpen] = useState(false);
  const [activeLevel, setActiveLevel] = useState("Undergraduate (UG)");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();

    if (q.includes("computer") || q.includes("cse") || q.includes("software") || q.includes("b.tech")) {
      navigate("/academics/computer-science");
    } else if (q.includes("ai") || q.includes("ml") || q.includes("artificial") || q.includes("intelligence")) {
      navigate("/academics/artificial-intelligence");
    } else if (q.includes("data") || q.includes("ds")) {
      navigate("/academics/data-science");
    } else if (q.includes("program") || q.includes("course") || q.includes("academic")) {
      navigate("/academics");
    } else if (q.includes("faculty") || q.includes("teacher") || q.includes("professor") || q.includes("hod")) {
      navigate("/management/faculty");
    } else if (q.includes("staff") || q.includes("admin") || q.includes("clerk")) {
      navigate("/management/staff");
    } else if (q.includes("board") || q.includes("governing") || q.includes("chancellor") || q.includes("registrar")) {
      navigate("/management/board-members");
    } else if (q.includes("event") || q.includes("news") || q.includes("announcement")) {
      navigate("/news");
    } else if (q.includes("undergrad") || q.includes("ug")) {
      navigate("/admissions/undergraduate");
    } else if (q.includes("postgrad") || q.includes("pg") || q.includes("mba") || q.includes("mca")) {
      navigate("/admissions/postgraduate");
    } else if (q.includes("fee") || q.includes("cost") || q.includes("tuition")) {
      navigate("/admissions/fees");
    } else if (q.includes("scholarship") || q.includes("waiver")) {
      navigate("/admissions/scholarships");
    } else if (q.includes("apply") || q.includes("registration") || q.includes("enrol")) {
      navigate("/admissions/apply");
    } else if (q.includes("hostel") || q.includes("room") || q.includes("accommodation") || q.includes("dorm")) {
      navigate("/campus-life/hostels");
    } else if (q.includes("library") || q.includes("book") || q.includes("study")) {
      navigate("/campus-life/library");
    } else if (q.includes("sports") || q.includes("gym") || q.includes("play") || q.includes("cricket")) {
      navigate("/campus-life/sports");
    } else if (q.includes("club") || q.includes("society") || q.includes("extracurricular")) {
      navigate("/campus-life/clubs");
    } else if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("map") || q.includes("address")) {
      navigate("/contact");
    } else if (q.includes("admission")) {
      navigate("/admissions");
    } else {
      navigate("/academics");
    }
    setSearchQuery("");
    setSearchOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileAcademicsOpen(false);
    setMobileManagementOpen(false);
    setMobileCampusLifeOpen(false);
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
    { label: "Rules & Regulations", to: "/academics/rules" },
    { label: "Teaching & Evaluation", to: "/academics/teaching" },
    { label: "BOS Members", to: "/academics/bos" }
  ];

  const managementItems = [
    { label: "Board Members", to: "/management/board-members" },
    { label: "Faculty", to: "/management/faculty" },
    { label: "Staff", to: "/management/staff" }
  ];

  const campusLifeItems = [
    { label: "Campus Overview", to: "/campus-life" },
    { label: "Central Library", to: "/campus-life/library" },
    { label: "Smart Classrooms", to: "/campus-life/smart-classrooms" },
    { label: "Laboratories", to: "/campus-life/laboratories" },
    { label: "Hostel Facilities", to: "/campus-life/hostels" },
    { label: "Sports & Fitness", to: "/campus-life/sports" },
    { label: "Cafeteria", to: "/campus-life/cafeteria" },
    { label: "Transportation", to: "/campus-life/transportation" },
    { label: "Wi-Fi Campus", to: "/campus-life/wifi" },
    { label: "Health Centre", to: "/campus-life/health-centre" },
    { label: "Student Clubs", to: "/campus-life/clubs" },
    { label: "Events & Festivals", to: "/campus-life/events" },
    { label: "Innovation Hub", to: "/campus-life/innovation-hub" },
    { label: "Campus Safety", to: "/campus-life/safety" },
    { label: "NSS & NCC", to: "/campus-life/nss-ncc" },
    { label: "Grievance Cell", to: "/campus-life/grievance-cell" }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        } h-[80px]`}
        style={{ borderBottom: "1px solid #E8E8E8" }}
      >
        <div className="max-w-[1440px] mx-auto h-full px-5 flex items-center justify-between gap-6 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 py-1">
            <img
              src="/logo.png"
              alt="City Chalapathi Institute of Technology"
              className="h-14 w-auto object-contain transition-all"
            />
          </Link>

          {/* Center nav */}
          <nav className="hidden xl:flex items-center gap-1 h-full">
            {navLinks.map((name) => {
              if (name === "Academics") {
                return (
                  <div
                    key={name}
                    className="h-full flex items-center"
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
                      <div 
                        className="absolute left-5 right-5 top-full mt-0 w-auto bg-white border border-gray-200/80 rounded-[20px] shadow-2xl p-6 z-50 flex gap-6 animate-fade-in text-left font-[var(--font-poppins)]"
                        onMouseEnter={() => setAcademicsOpen(true)}
                        onMouseLeave={() => setAcademicsOpen(false)}
                      >
                        {/* Column 1: Academic Categories */}
                        <div className="w-[200px] border-r border-gray-100 pr-5 flex flex-col gap-1 shrink-0">
                          <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-2">Academics</span>
                          {[
                            { label: "Programmes Offered", to: "/academics/programmes" },
                            { label: "Academic Calendar", to: "/academics/calendar" },
                            { label: "Flexibilities", to: "/academics/flexibilities" },
                            { label: "Grading System", to: "/academics/grading" },
                            { label: "Award of Degrees", to: "/academics/degrees" },
                            { label: "Rules & Regulations", to: "/academics/rules" },
                            { label: "Teaching & Evaluation", to: "/academics/teaching" },
                            { label: "BOS Members", to: "/academics/bos" }
                          ].map((item) => (
                            <Link
                              key={item.label}
                              to={item.to}
                              className={`px-3 py-2 text-[12px] font-bold rounded-lg transition-all ${
                                location.pathname === item.to
                                  ? "text-[#D71920] bg-[#D71920]/5"
                                  : "text-gray-700 hover:text-[#D71920] hover:bg-gray-50"
                              }`}
                              onClick={() => setAcademicsOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>

                        {/* Column 2: Program Levels */}
                        <div className="w-[180px] border-r border-gray-100 pr-5 flex flex-col gap-1 shrink-0">
                          <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-2">Levels</span>
                          {Object.keys(MEGA_MENU_PROGRAMS).map((level) => (
                            <button
                              key={level}
                              type="button"
                              onMouseEnter={() => setActiveLevel(level)}
                              onClick={() => setActiveLevel(level)}
                              className={`px-3 py-2 text-[12px] font-bold rounded-lg text-left transition-all cursor-pointer outline-none ${
                                activeLevel === level
                                  ? "text-[#D71920] bg-[#D71920]/5"
                                  : "text-gray-600 hover:text-[#D71920] hover:bg-gray-50"
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>

                        {/* Column 3 & 4: Specific Programs List */}
                        <div className="flex-1 pl-2">
                          <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-3 block">
                            Programs ({activeLevel})
                          </span>
                          
                          {activeLevel === "Undergraduate (UG)" ? (
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4 max-h-[360px] overflow-y-auto pr-2">
                              {Object.entries(UNDERGRADUATE_GROUPS).map(([dept, courses]) => (
                                <div key={dept} className="space-y-1.5">
                                  <h5 className="text-[11px] font-extrabold text-[#072A6C] tracking-wide border-b border-gray-100 pb-1">{dept}</h5>
                                  <div className="flex flex-col gap-1">
                                    {courses.map((course) => (
                                      <Link
                                        key={course.slug}
                                        to={`/academics/${course.slug}`}
                                        className="text-[11px] font-medium text-gray-600 hover:text-[#D71920] transition-colors leading-relaxed"
                                        onClick={() => setAcademicsOpen(false)}
                                      >
                                        • {course.title}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                              {MEGA_MENU_PROGRAMS[activeLevel].map((course) => (
                                <Link
                                  key={course.label}
                                  to={course.to}
                                  className="px-3 py-1.5 text-[11.5px] font-medium text-gray-600 hover:text-[#D71920] hover:bg-gray-50 rounded-md transition-all flex items-center gap-1"
                                  onClick={() => setAcademicsOpen(false)}
                                >
                                  • {course.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
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

              if (name === "Campus Life") {
                return (
                  <div
                    key={name}
                    className="relative"
                    onMouseEnter={() => setCampusLifeOpen(true)}
                    onMouseLeave={() => setCampusLifeOpen(false)}
                  >
                    <button
                      type="button"
                      className="px-3.5 py-2 text-[14px] font-medium text-[#222222] hover:text-[#D71920] transition-colors whitespace-nowrap font-[var(--font-poppins)] inline-flex items-center gap-1 cursor-pointer outline-none"
                    >
                      {name} <ChevronDown size={14} className={`transition-transform duration-200 ${campusLifeOpen ? "rotate-180" : ""}`} />
                    </button>
                    {campusLifeOpen && (
                      <div className="absolute top-full left-0 mt-0 w-[240px] max-h-[380px] overflow-y-auto bg-white border border-gray-200/80 rounded-[12px] shadow-lg py-2.5 z-50 flex flex-col gap-0.5 animate-fade-in font-[var(--font-poppins)]">
                        <style dangerouslySetInnerHTML={{__html: `
                          .campus-menu-item {
                            transition: all 280ms cubic-bezier(0.4, 0, 0.2, 1);
                            position: relative;
                            padding-left: 20px;
                          }
                          .campus-menu-item::before {
                            content: '';
                            position: absolute;
                            left: 0;
                            top: 0;
                            bottom: 0;
                            width: 3px;
                            background-color: #D4AF37;
                            transform: scaleY(0);
                            transition: transform 280ms ease;
                          }
                          .campus-menu-item:hover {
                            background-color: #D71920 !important;
                            color: white !important;
                            transform: translateX(8px);
                          }
                          .campus-menu-item:hover::before {
                            transform: scaleY(1);
                          }
                        `}} />
                        {campusLifeItems.map((item) => (
                          <Link
                            key={item.label}
                            to={item.to}
                            className="campus-menu-item px-4 py-2 text-[12.5px] font-medium text-[#222222] transition-all"
                            onClick={() => setCampusLifeOpen(false)}
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

        {searchOpen && (
          <div className="absolute top-full left-0 w-full bg-[#072A6C] p-4 shadow-xl z-50 animate-slide-down">
            <div className="max-w-2xl mx-auto flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                placeholder="Search programs, faculty, events..."
                className="flex-1 bg-white/10 text-white border border-white/20 rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#D71920] placeholder:text-white/50 font-[var(--font-poppins)]"
              />
              <button 
                onClick={handleSearchSubmit}
                className="bg-[#D71920] text-white font-bold px-6 py-2.5 rounded-[12px] text-sm hover:bg-[#b71217] transition-colors font-[var(--font-poppins)]"
              >
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

            if (name === "Campus Life") {
              return (
                <div key={name} className="flex flex-col border-b border-gray-100 py-3">
                  <button
                    type="button"
                    onClick={() => setMobileCampusLifeOpen(!mobileCampusLifeOpen)}
                    className="w-full flex items-center justify-between text-[15px] font-semibold text-[#222222] hover:text-[#D71920] transition-colors font-[var(--font-poppins)] text-left outline-none cursor-pointer"
                  >
                    <span>{name}</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${mobileCampusLifeOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileCampusLifeOpen && (
                    <div className="pl-4 flex flex-col gap-2 mt-2 pt-2 border-t border-gray-50 max-h-[260px] overflow-y-auto">
                      {campusLifeItems.map((item) => (
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
