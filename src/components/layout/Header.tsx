import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, ChevronDown, ArrowRight, Megaphone } from "lucide-react";
import { useData } from "../../context/DataContext";

export const ACADEMIC_PROGRAMS_STRUCTURE: Record<string, Record<string, { label: string; to: string }[]>> = {
  "School of Computing Sciences": {
    "Computer Science & Engineering": [
      { label: "B.Tech. Computer Science & Engineering", to: "/academics/btech-cse" },
      { label: "M.Tech. Computer Science & Engineering", to: "/academics/mtech-cse" },
      { label: "MCA", to: "/academics/mca" },
      { label: "Ph.D. Computer Science & Engineering", to: "/academics/phd-cse" }
    ],
    "Artificial Intelligence": [
      { label: "B.Tech. CSE (Artificial Intelligence)", to: "/academics/btech-cse-ai-ml" },
      { label: "B.Tech. Artificial Intelligence & Machine Learning", to: "/academics/btech-aiml" },
      { label: "M.Tech. CSE (AI & ML)", to: "/academics/mtech-aiml" }
    ],
    "Data Science": [
      { label: "B.Tech. CSE (Data Science)", to: "/academics/btech-cse-data-science" }
    ],
    "Cyber Security": [
      { label: "B.Tech. CSE (Cyber Security)", to: "/academics/btech-cse-cyber-security" }
    ]
  },
  "School of Engineering": {
    "Electronics and Communication Engineering": [
      { label: "B.Tech. Electronics and Communication Engineering", to: "/academics/btech-ece" },
      { label: "M.Tech. VLSI and Embedded Systems Design", to: "/academics/mtech-vlsi" },
      { label: "Ph.D. Electronics and Communication Engineering", to: "/academics/phd-ece" }
    ],
    "Civil Engineering": [
      { label: "B.Tech. Civil Engineering", to: "/academics/btech-civil" },
      { label: "M.Tech. Structural Engineering", to: "/academics/mtech-structural" },
      { label: "Ph.D. Structural Engineering", to: "/academics/phd-structural" }
    ]
  },
  "School of Business & Management": {
    "Business and Management": [
      { label: "MBA", to: "/academics/mba" }
    ]
  }
};

const CATEGORY_INFO: Record<string, { desc: string; linkText: string; to: string; title: string }> = {
  "Academic Calendar": {
    title: "Academic Calendar",
    desc: "Plan your semester ahead. View critical academic timelines, examination blocks, holidays, and key milestones.",
    linkText: "View Calendar",
    to: "/academics/calendar"
  },
  "Flexibilities": {
    title: "Academic Flexibilities",
    desc: "Customize your learning path. Explore options for minor specializations, honors tracks, and flexible credit transfers.",
    linkText: "Explore Flexibilities",
    to: "/academics/flexibilities"
  },
  "Grading System": {
    title: "Grading System",
    desc: "Understand evaluation metrics. Access information about CGPA/SGPA calculation, credit weightages, and passing criteria.",
    linkText: "View Grading Policy",
    to: "/academics/grading"
  },
  "Award of Degrees": {
    title: "Award of Degrees",
    desc: "Graduation and compliance. Check eligibility criteria for degree awards, convocation schedules, and transcript requests.",
    linkText: "Read Degree Guidelines",
    to: "/academics/degrees"
  },
  "Rules & Regulations": {
    title: "Rules & Regulations",
    desc: "Campus compliance. Learn about attendance requirements, credit minimums, and code of conduct.",
    linkText: "Read Rules Handbook",
    to: "/academics/rules"
  },
  "Teaching & Evaluation": {
    title: "Teaching & Evaluation",
    desc: "Outcome-Based Education. Discover our pedagogy, continuous internal assessment schemes, and evaluation standards.",
    linkText: "View Teaching & Evaluation",
    to: "/academics/teaching"
  },
  "Global Certifications": {
    title: "Global Certifications",
    desc: "Graduate with internationally respected certifications that complement your academic degree and prepare you for leadership.",
    linkText: "View Certifications",
    to: "/academics/certifications"
  }
};

export default function Header({ onToggleAi }: { onToggleAi?: () => void } = {}) {
  const { announcements, showAnnouncementsDrawer, setShowAnnouncementsDrawer } = useData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [mobileAcademicsOpen, setMobileAcademicsOpen] = useState(false);
  const [mobileProgrammesOpen, setMobileProgrammesOpen] = useState(false);
  const [managementOpen, setManagementOpen] = useState(false);
  const [mobileManagementOpen, setMobileManagementOpen] = useState(false);
  const [campusLifeOpen, setCampusLifeOpen] = useState(false);
  const [mobileCampusLifeOpen, setMobileCampusLifeOpen] = useState(false);
  const [newsEventsOpen, setNewsEventsOpen] = useState(false);
  const [mobileNewsEventsOpen, setMobileNewsEventsOpen] = useState(false);
  const [activeSchool, setActiveSchool] = useState("School of Computing Sciences");
  const [hoveredCategory, setHoveredCategory] = useState("Programmes Offered");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();

    if (q.includes("computer") || q.includes("cse") || q.includes("software") || q.includes("b.tech")) {
      navigate("/academics/btech-cse");
    } else if (q.includes("ai") || q.includes("ml") || q.includes("artificial") || q.includes("intelligence")) {
      navigate("/academics/btech-cse-ai-ml");
    } else if (q.includes("data") || q.includes("ds")) {
      navigate("/academics/btech-cse-data-science");
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
    } else if (q.includes("hostel") || q.includes("room") || q.includes("accommodation") || q.includes("dorm") || q.includes("lunch") || q.includes("food") || q.includes("mess") || q.includes("dining") || q.includes("canteen") || q.includes("breakfast") || q.includes("dinner")) {
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
    setMobileProgrammesOpen(false);
    setMobileAboutOpen(false);
    setMobileCampusLifeOpen(false);
    setMobileNewsEventsOpen(false);
  }, [location.pathname]);

  const aboutItems = [
    { label: "Genesis", to: "/about/genesis" },
    { label: "Vision & Mission", to: "/about/vision" },
    { label: "Leadership", to: "/about/leadership" },
    { label: "Chalapathi Advantage", to: "/about/advantage" }
  ];

  const navLinks = [
    "About Us", "Academics", "Admissions", "Research", "Management",
    "Campus Life", "Placements", "News & Events", "Contact",
  ];

  const navHrefs: Record<string, string> = {
    "About Us": "/about",
    "Academics": "/academics",
    "Admissions": "/admissions",
    "Research": "/research",
    "Management": "/management",
    "Campus Life": "/campus-life",
    "Placements": "/placements",
    "Contact": "/contact",
  };

  const newsEventsItems = [
    { label: "News", to: "/news" },
    { label: "Events", to: "/news/events" }
  ];

  const academicsItems = [
    { label: "Programmes Offered", to: "/academics/programmes" },
    { label: "Global Certifications", to: "/academics/certifications" },
    { label: "Academic Calendar", to: "/academics/calendar" },
    { label: "Flexibilities", to: "/academics/flexibilities" },
    { label: "Grading System", to: "/academics/grading" },
    { label: "Award of Degrees", to: "/academics/degrees" },
    { label: "Rules & Regulations", to: "/academics/rules" },
    { label: "Teaching & Evaluation", to: "/academics/teaching" }
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
          <Link to="/" className="flex items-center shrink-0 py-1">
            <img
              src="/logo.png?v=3"
              alt="Chalapathi University"
              className="h-16 w-auto object-contain no-lift"
            />
          </Link>

          {/* Center nav */}
          <nav className="hidden xl:flex items-center gap-1 h-full">
            {navLinks.map((name) => {
              if (name === "About Us") {
                return (
                  <div
                    key={name}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => setAboutOpen(true)}
                    onMouseLeave={() => setAboutOpen(false)}
                  >
                    <button
                      type="button"
                      className="px-3.5 py-2 text-[14px] font-medium text-[#222222] hover:text-[#D71920] transition-colors whitespace-nowrap font-[var(--font-poppins)] inline-flex items-center gap-1 cursor-pointer outline-none"
                    >
                      {name} <ChevronDown size={14} className={`transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`} />
                    </button>
                    {aboutOpen && (
                      <div className="absolute top-full left-0 mt-0 w-[180px] bg-white border border-gray-200/80 rounded-[12px] shadow-lg py-2.5 z-50 flex flex-col gap-0.5 animate-fade-in font-[var(--font-poppins)]">
                        {aboutItems.map((item) => (
                          <Link
                            key={item.label}
                            to={item.to}
                            className="px-4 py-2 text-[13px] font-medium text-[#222222] hover:text-[#D71920] hover:bg-[#D71920]/5 transition-all text-left"
                            onClick={() => setAboutOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (name === "Academics") {
                return (
                  <div
                    key={name}
                    className="h-full flex items-center"
                    onMouseEnter={() => {
                      setAcademicsOpen(true);
                      setHoveredCategory("Programmes Offered");
                    }}
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
                            { label: "Global Certifications", to: "/academics/certifications" },
                            { label: "Academic Calendar", to: "/academics/calendar" },
                            { label: "Flexibilities", to: "/academics/flexibilities" },
                            { label: "Grading System", to: "/academics/grading" },
                            { label: "Award of Degrees", to: "/academics/degrees" },
                            { label: "Rules & Regulations", to: "/academics/rules" },
                            { label: "Teaching & Evaluation", to: "/academics/teaching" }
                          ].map((item) => (
                            <Link
                              key={item.label}
                              to={item.to}
                              className={`px-3 py-2 text-[12px] font-bold rounded-lg transition-all ${
                                location.pathname === item.to || (item.label === "Grading System" && location.pathname === "/academics/grading")
                                  ? "text-[#D71920] bg-[#D71920]/5"
                                  : "text-gray-700 hover:text-[#D71920] hover:bg-gray-50"
                              }`}
                              onMouseEnter={() => setHoveredCategory(item.label)}
                              onClick={() => setAcademicsOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>

                        {/* Column 2: Schools Selection */}
                        {hoveredCategory === "Programmes Offered" ? (
                          <>
                            <div className="w-[200px] border-r border-gray-100 pr-5 flex flex-col gap-1 shrink-0 bg-[#fbfbfb] -my-6 py-6 pl-4">
                              <span className="text-[10px] text-gray-800 font-extrabold uppercase tracking-wider mb-2">Schools</span>
                              {Object.keys(ACADEMIC_PROGRAMS_STRUCTURE).map((school) => (
                                <button
                                  key={school}
                                  type="button"
                                  onMouseEnter={() => setActiveSchool(school)}
                                  onClick={() => setActiveSchool(school)}
                                  className={`px-3 py-3 text-[12px] font-bold rounded-lg text-left transition-all cursor-pointer outline-none ${
                                    activeSchool === school
                                      ? "text-[#D71920] bg-red-50/50"
                                      : "text-gray-600 hover:text-[#D71920] hover:bg-gray-50"
                                  }`}
                                >
                                  {school}
                                </button>
                              ))}
                            </div>

                            {/* Column 3 & 4: Specific Departments and Programs */}
                            <div className="flex-1 pl-4 flex flex-col pt-1">
                              <span className="text-[10px] text-gray-800 font-extrabold uppercase tracking-wider mb-4 block">
                                Departments & Programs
                              </span>
                              
                              <div className="grid grid-cols-2 gap-x-12 gap-y-6 max-h-[360px] overflow-y-auto pr-4">
                                {Object.entries(ACADEMIC_PROGRAMS_STRUCTURE[activeSchool] || {}).map(([dept, courses]) => (
                                  <div key={dept} className="space-y-2">
                                    <h5 className="text-[12px] font-bold text-[#072A6C] tracking-wide">{dept}</h5>
                                    <div className="flex flex-col gap-1.5">
                                      {courses.map((course) => (
                                        <Link
                                          key={course.label}
                                          to={course.to}
                                          className="text-[12px] font-medium text-gray-500 hover:text-[#D71920] transition-colors leading-snug flex items-center gap-1.5 py-0.5 group"
                                          onClick={() => setAcademicsOpen(false)}
                                        >
                                          <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-[#D71920] transition-colors shrink-0" />
                                          {course.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          CATEGORY_INFO[hoveredCategory] && (
                            <div className="flex-1 pl-8 flex flex-col justify-between max-w-xl">
                              <div>
                                <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-2 block">Quick Info</span>
                                <h4 className="text-[#072A6C] text-lg font-extrabold mb-3">
                                  {CATEGORY_INFO[hoveredCategory].title}
                                </h4>
                                <p className="text-gray-500 text-xs leading-relaxed font-light mb-6">
                                  {CATEGORY_INFO[hoveredCategory].desc}
                                </p>
                              </div>
                              <Link
                                to={CATEGORY_INFO[hoveredCategory].to}
                                onClick={() => setAcademicsOpen(false)}
                                className="w-fit h-9 px-5 bg-[#D71920] hover:bg-[#b71217] text-white text-[11px] font-bold rounded-[8px] inline-flex items-center justify-center gap-1.5 transition-colors font-[var(--font-poppins)]"
                              >
                                {CATEGORY_INFO[hoveredCategory].linkText} <ArrowRight size={12} />
                              </Link>
                            </div>
                          )
                        )}
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
                      <div 
                        className="absolute left-0 mt-0 w-[240px] max-h-[380px] overflow-y-auto bg-white border border-gray-200/80 rounded-[20px] shadow-2xl p-4 z-50 flex flex-col gap-1 animate-fade-in text-left font-[var(--font-poppins)]"
                        style={{ overscrollBehavior: "contain", scrollPaddingTop: "16px", scrollPaddingBottom: "16px" }}
                        onMouseEnter={() => setCampusLifeOpen(true)}
                        onMouseLeave={() => setCampusLifeOpen(false)}
                      >
                        {campusLifeItems.map((item) => (
                          <Link
                            key={item.label}
                            to={item.to}
                            className={`px-3 py-2 text-[12px] font-bold rounded-lg transition-all ${
                              location.pathname === item.to
                                ? "text-[#D71920] bg-[#D71920]/5"
                                : "text-gray-700 hover:text-[#D71920] hover:bg-gray-50"
                            }`}
                            onMouseEnter={(e) => {
                              e.currentTarget.scrollIntoView({ block: "nearest", behavior: "smooth" });
                            }}
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

              if (name === "News & Events") {
                return (
                  <div
                    key={name}
                    className="relative"
                    onMouseEnter={() => setNewsEventsOpen(true)}
                    onMouseLeave={() => setNewsEventsOpen(false)}
                  >
                    <button
                      type="button"
                      className="px-3.5 py-2 text-[14px] font-medium text-[#222222] hover:text-[#D71920] transition-colors whitespace-nowrap font-[var(--font-poppins)] inline-flex items-center gap-1 cursor-pointer outline-none"
                    >
                      {name} <ChevronDown size={14} className={`transition-transform duration-200 ${newsEventsOpen ? "rotate-180" : ""}`} />
                    </button>
                    {newsEventsOpen && (
                      <div className="absolute top-full left-0 mt-0 w-[150px] bg-white border border-gray-200/80 rounded-[12px] shadow-lg py-2.5 z-50 flex flex-col gap-0.5 animate-fade-in font-[var(--font-poppins)]">
                        {newsEventsItems.map((item) => (
                          <Link
                            key={item.label}
                            to={item.to}
                            className="px-4 py-2 text-[13px] font-medium text-[#222222] hover:text-[#D71920] hover:bg-[#D71920]/5 transition-all"
                            onClick={() => setNewsEventsOpen(false)}
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
              onClick={() => setShowAnnouncementsDrawer(!showAnnouncementsDrawer)}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#222222] hover:text-[#D71920] hover:border-[#D71920] transition-colors cursor-pointer relative"
              title="View Announcements"
            >
              <Megaphone size={16} />
              {announcements.length > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[#D71920] w-2.5 h-2.5 rounded-full border-2 border-white" />
              )}
            </button>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#222222] hover:text-[#D71920] hover:border-[#D71920] transition-colors cursor-pointer"
            >
              <Search size={16} />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex xl:hidden items-center gap-2">
            <button 
              onClick={() => setShowAnnouncementsDrawer(!showAnnouncementsDrawer)} 
              className="p-2 text-[#222222] relative"
              title="View Announcements"
            >
              <Megaphone size={18} />
              {announcements.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#D71920] w-2 h-2 rounded-full border border-white" />
              )}
            </button>
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
            if (name === "About Us") {
              return (
                <div key={name} className="flex flex-col border-b border-gray-100 py-3">
                  <button
                    type="button"
                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                    className="w-full flex items-center justify-between text-[15px] font-semibold text-[#222222] hover:text-[#D71920] transition-colors font-[var(--font-poppins)] text-left outline-none cursor-pointer"
                  >
                    <span>{name}</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${mobileAboutOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileAboutOpen && (
                    <div className="pl-4 flex flex-col gap-2 mt-2 pt-2 border-t border-gray-50 text-left">
                      {aboutItems.map((item) => (
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
                      {academicsItems.map((item) => {
                        if (item.label === "Programmes Offered") {
                          return (
                            <div key={item.label} className="flex flex-col">
                              <div className="w-full flex items-center justify-between">
                                <Link
                                  to={item.to}
                                  className="text-[13px] font-medium text-gray-600 hover:text-[#D71920] py-1.5 transition-colors font-[var(--font-poppins)]"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {item.label}
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => setMobileProgrammesOpen(!mobileProgrammesOpen)}
                                  className="p-1.5 text-gray-500 hover:text-[#D71920] transition-colors cursor-pointer outline-none"
                                >
                                  <ChevronDown size={14} className={`transition-transform duration-200 ${mobileProgrammesOpen ? "rotate-180" : ""}`} />
                                </button>
                              </div>
                              {mobileProgrammesOpen && (
                                <div className="pl-3 flex flex-col gap-3 mt-1.5 pb-2 border-l border-gray-100">
                                  {Object.entries(ACADEMIC_PROGRAMS_STRUCTURE).map(([school, depts]) => (
                                    <div key={school} className="flex flex-col gap-2">
                                      <span className="text-[11px] font-extrabold text-[#072A6C] uppercase tracking-wider">{school}</span>
                                      <div className="flex flex-col gap-3 pl-2 border-l border-gray-50">
                                        {Object.entries(depts).map(([dept, courses]) => (
                                          <div key={dept} className="flex flex-col gap-1">
                                            <span className="text-[10px] font-bold text-gray-500">{dept}</span>
                                            <div className="flex flex-col gap-1 pl-1">
                                              {courses.map((course) => (
                                                <Link
                                                  key={course.label}
                                                  to={course.to}
                                                  className="text-[11px] font-medium text-gray-600 hover:text-[#D71920] py-0.5 transition-colors"
                                                  onClick={() => {
                                                    setMobileOpen(false);
                                                    setMobileAcademicsOpen(false);
                                                  }}
                                                >
                                                  • {course.label}
                                                </Link>
                                              ))}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        }
                        return (
                          <Link
                            key={item.label}
                            to={item.to}
                            className="text-[13px] font-medium text-gray-600 hover:text-[#D71920] py-1.5 transition-colors font-[var(--font-poppins)]"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
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

            if (name === "News & Events") {
              return (
                <div key={name} className="flex flex-col border-b border-gray-100 py-3">
                  <button
                    type="button"
                    onClick={() => setMobileNewsEventsOpen(!mobileNewsEventsOpen)}
                    className="w-full flex items-center justify-between text-[15px] font-semibold text-[#222222] hover:text-[#D71920] transition-colors font-[var(--font-poppins)] text-left outline-none cursor-pointer"
                  >
                    <span>{name}</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${mobileNewsEventsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileNewsEventsOpen && (
                    <div className="pl-4 flex flex-col gap-2 mt-2 pt-2 border-t border-gray-50 text-left">
                      {newsEventsItems.map((item) => (
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
