import React, { useState } from "react";
import { useData, Announcement, ProgramDetail, NewsArticle, EventItem, AboutUsContent, MonthCalendarData, PlacementsContent, PlacedStudent, Recruiter } from "../context/DataContext";
import { 
  Lock, LayoutDashboard, Megaphone, BookOpen, Calendar, FileText, 
  Settings, LogOut, Plus, Trash2, Edit3, CheckCircle, UploadCloud, Info, Users, Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPortal() {
  const {
    announcements,
    programs,
    news,
    events,
    aboutContent,
    calendarData,
    facultyData,
    boardData,
    staffData,
    updateAnnouncements,
    updatePrograms,
    updateNews,
    updateEvents,
    updateAboutContent,
    updateCalendarData,
    updateFacultyData,
    updateBoardData,
    updateStaffData,
    updatePlacementsContent,
    placementsContent
  } = useData();

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Tab navigation states
  const [activeTab, setActiveTab] = useState<"dashboard" | "announcements" | "about" | "academics" | "calendar" | "news-events" | "directories" | "placements">("dashboard");

  // Notification helpers
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states - Announcements
  const [newAnnTitle, setNewAnnTitle] = useState("");
  const [newAnnDesc, setNewAnnDesc] = useState("");
  const [newAnnDate, setNewAnnDate] = useState("");
  const [newAnnIcon, setNewAnnIcon] = useState("GraduationCap");

  // Form states - About Us
  const [aboutHistoryIntro, setAboutHistoryIntro] = useState(aboutContent.history.introText);
  const [aboutHistoryQuote, setAboutHistoryQuote] = useState(aboutContent.history.quoteText);
  const [aboutVisionText, setAboutVisionText] = useState(aboutContent.vision.visionText);
  const [aboutChairmanName, setAboutChairmanName] = useState(aboutContent.leadership.chairmanName);
  const [aboutChairmanTitle, setAboutChairmanTitle] = useState(aboutContent.leadership.designation);
  const [aboutChairmanQuote, setAboutChairmanQuote] = useState(aboutContent.leadership.messageQuote);

  // Form states - Academics
  const [selectedProgSlug, setSelectedProgSlug] = useState(programs[0]?.slug || "");
  const currentProg = programs.find(p => p.slug === selectedProgSlug) || programs[0];
  
  const [progTitle, setProgTitle] = useState(currentProg?.title || "");
  const [progDesc, setProgDesc] = useState(currentProg?.desc || "");
  const [progOverview, setProgOverview] = useState(currentProg?.overview || "");
  const [progCurriculum, setProgCurriculum] = useState(currentProg?.curriculum.join(", ") || "");
  const [curriculumFile, setCurriculumFile] = useState<File | null>(null);
  const [curriculumFileName, setCurriculumFileName] = useState(localStorage.getItem(`syllabus_${selectedProgSlug}`) || "None uploaded");
  const [flowchartY1, setFlowchartY1] = useState("");
  const [flowchartY2, setFlowchartY2] = useState("");
  const [flowchartY3, setFlowchartY3] = useState("");
  const [flowchartY4, setFlowchartY4] = useState("");

  // Sync academics form when program selection changes
  React.useEffect(() => {
    if (currentProg) {
      setProgTitle(currentProg.title);
      setProgDesc(currentProg.desc);
      setProgOverview(currentProg.overview);
      setProgCurriculum(currentProg.curriculum.join(", "));
      setCurriculumFileName(localStorage.getItem(`syllabus_${currentProg.slug}`) || "None uploaded");
      setFlowchartY1(localStorage.getItem(`flowchart_${currentProg.slug}_y1`) || "");
      setFlowchartY2(localStorage.getItem(`flowchart_${currentProg.slug}_y2`) || "");
      setFlowchartY3(localStorage.getItem(`flowchart_${currentProg.slug}_y3`) || "");
      setFlowchartY4(localStorage.getItem(`flowchart_${currentProg.slug}_y4`) || "");
    }
  }, [selectedProgSlug, currentProg]);

  // Form states - Calendar
  const [calMonthIdx, setCalMonthIdx] = useState(0);
  const [calDay, setCalDay] = useState(1);
  const [calEventText, setCalEventText] = useState("");

  // Form states - News & Events
  const [newNewsTitle, setNewNewsTitle] = useState("");
  const [newNewsCategory, setNewNewsCategory] = useState("Innovation");
  const [newNewsExcerpt, setNewNewsExcerpt] = useState("");
  const [newNewsBody, setNewNewsBody] = useState("");
  const [newNewsLoc, setNewNewsLoc] = useState("");
  const [newNewsTime, setNewNewsTime] = useState("");
  const [newNewsSourceUrl, setNewNewsSourceUrl] = useState("");
  
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventCategory, setNewEventCategory] = useState("Workshop");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventTime, setNewEventTime] = useState("09:30 AM");
  const [newEventLoc, setNewEventLoc] = useState("");
  const [newEventBody, setNewEventBody] = useState("");
  // Form states - Directories
  const [selectedDir, setSelectedDir] = useState<"faculty" | "board" | "staff">("faculty");
  const [selectedDirDept, setSelectedDirDept] = useState("Computer Science & Engineering");
  const [editMemberIdx, setEditMemberIdx] = useState<number | "hod" | "new" | null>(null);
  
  const [memberForm, setMemberForm] = useState({
    name: "",
    title: "",
    edu: "",
    interests: "",
    phone: "",
    email: "",
    avatar: "",
    age: "",
    experience: "",
    idNo: "",
    department: ""
  });

  // Reset department selection on directory type switch
  React.useEffect(() => {
    if (selectedDir === "faculty") {
      setSelectedDirDept("Computer Science & Engineering");
    } else if (selectedDir === "board") {
      setSelectedDirDept("Governing Council");
    } else if (selectedDir === "staff") {
      setSelectedDirDept("Registrar Office");
    }
    setEditMemberIdx(null);
  }, [selectedDir]);

  // Placements page edit states
  const [placementsForm, setPlacementsForm] = useState({ ...placementsContent });
  const [editStudentIdx, setEditStudentIdx] = useState<number | "new" | null>(null);
  const [studentForm, setStudentForm] = useState<PlacedStudent>({ name: "", branch: "", company: "", ctc: "", img: "" });
  const [editRecruiterIdx, setEditRecruiterIdx] = useState<number | "new" | null>(null);
  const [recruiterForm, setRecruiterForm] = useState<Recruiter>({ name: "", logo: "" });
  const [placementsSection, setPlacementsSection] = useState<"content" | "students" | "recruiters">("content");

  // Sync placements form when context changes
  React.useEffect(() => {
    setPlacementsForm({ ...placementsContent });
  }, [placementsContent]);

  // Handle Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid admin passcode! Please try again.");
    }
  };

  const showNotification = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Add Announcement
  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle || !newAnnDesc) return;
    const newAnn: Announcement = {
      title: newAnnTitle,
      desc: newAnnDesc,
      date: newAnnDate || new Date().toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' }),
      iconName: newAnnIcon
    };
    updateAnnouncements([newAnn, ...announcements]);
    setNewAnnTitle("");
    setNewAnnDesc("");
    setNewAnnDate("");
    showNotification();
  };

  // Delete Announcement
  const handleDeleteAnnouncement = (index: number) => {
    const updated = announcements.filter((_, i) => i !== index);
    updateAnnouncements(updated);
    showNotification();
  };

  // Save About Us Changes
  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AboutUsContent = {
      ...aboutContent,
      history: {
        ...aboutContent.history,
        introText: aboutHistoryIntro,
        quoteText: aboutHistoryQuote
      },
      vision: {
        ...aboutContent.vision,
        visionText: aboutVisionText
      },
      leadership: {
        ...aboutContent.leadership,
        chairmanName: aboutChairmanName,
        designation: aboutChairmanTitle,
        messageQuote: aboutChairmanQuote
      }
    };
    updateAboutContent(updated);
    showNotification();
  };

  // Save Program Changes
  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = programs.map(p => {
      if (p.slug === selectedProgSlug) {
        return {
          ...p,
          title: progTitle,
          desc: progDesc,
          overview: progOverview,
          curriculum: progCurriculum.split(",").map(item => item.trim()).filter(Boolean)
        };
      }
      return p;
    });
    updatePrograms(updated);
    
    // Save year-wise flowchart
    localStorage.setItem(`flowchart_${selectedProgSlug}_y1`, flowchartY1);
    localStorage.setItem(`flowchart_${selectedProgSlug}_y2`, flowchartY2);
    localStorage.setItem(`flowchart_${selectedProgSlug}_y3`, flowchartY3);
    localStorage.setItem(`flowchart_${selectedProgSlug}_y4`, flowchartY4);
    
    showNotification();
  };

  // Mock Curriculum PDF Uploader
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCurriculumFile(file);
      setCurriculumFileName(file.name);
      localStorage.setItem(`syllabus_${selectedProgSlug}`, file.name);
      alert(`Syllabus Curriculum file "${file.name}" uploaded successfully!`);
    }
  };

  // Save Calendar Changes
  const handleSaveCalendar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calEventText) return;
    const updated = calendarData.map((m, idx) => {
      if (idx === calMonthIdx) {
        return {
          ...m,
          events: {
            ...m.events,
            [calDay]: calEventText
          }
        };
      }
      return m;
    });
    updateCalendarData(updated);
    setCalEventText("");
    showNotification();
  };

  // Delete Calendar Event
  const handleDeleteCalendarEvent = (monthIdx: number, day: number) => {
    const updated = calendarData.map((m, idx) => {
      if (idx === monthIdx) {
        const nextEvents = { ...m.events };
        delete nextEvents[day];
        return {
          ...m,
          events: nextEvents
        };
      }
      return m;
    });
    updateCalendarData(updated);
    showNotification();
  };

  // Add News Article
  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitle || !newNewsBody) return;
    const nextId = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1;
    const slug = newNewsTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
      
    const newArt: NewsArticle = {
      id: nextId,
      title: newNewsTitle,
      date: new Date().toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' }),
      time: newNewsTime || "11:00 AM",
      location: newNewsLoc || "Main Campus Complex",
      category: newNewsCategory,
      excerpt: newNewsExcerpt || newNewsBody.substring(0, 120) + "...",
      bodyText: newNewsBody,
      image: "/prog_computer.png",
      slug: slug,
      sourceUrl: newNewsSourceUrl || undefined
    };
    updateNews([newArt, ...news]);
    setNewNewsTitle("");
    setNewNewsExcerpt("");
    setNewNewsBody("");
    setNewNewsLoc("");
    setNewNewsTime("");
    setNewNewsSourceUrl("");
    showNotification();
  };

  // Delete News Article
  const handleDeleteNews = (id: number) => {
    const updated = news.filter(n => n.id !== id);
    updateNews(updated);
    showNotification();
  };

  // Add Event Item
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle || !newEventBody) return;
    const nextId = events.length > 0 ? Math.max(...events.map(ev => ev.id)) + 1 : 1;
    const newEv: EventItem = {
      id: nextId,
      title: newEventTitle,
      date: newEventDate || new Date().toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' }),
      time: newEventTime,
      location: newEventLoc || "MBA Seminar Gardens",
      category: newEventCategory,
      image: "/prog_engineering.png",
      bodyText: newEventBody
    };
    updateEvents([newEv, ...events]);
    setNewEventTitle("");
    setNewEventDate("");
    setNewEventLoc("");
    setNewEventBody("");
    showNotification();
  };

  // Delete Event Item
  const handleDeleteEvent = (id: number) => {
    const updated = events.filter(ev => ev.id !== id);
    updateEvents(updated);
    showNotification();
  };

  // Save Directory Member (HOD or Other)
  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Choose which target we are editing
    let currentData = { ...facultyData };
    let updater = updateFacultyData;
    if (selectedDir === "board") {
      currentData = { ...boardData };
      updater = updateBoardData;
    } else if (selectedDir === "staff") {
      currentData = { ...staffData };
      updater = updateStaffData;
    }

    const deptGroup = { ...(currentData[selectedDirDept] || { hod: {} as any, others: [] }) };
    deptGroup.others = [...(deptGroup.others || [])];

    if (editMemberIdx === "hod") {
      deptGroup.hod = { ...memberForm, department: selectedDirDept };
    } else if (typeof editMemberIdx === "number") {
      deptGroup.others[editMemberIdx] = { ...memberForm, department: selectedDirDept };
    } else if (editMemberIdx === "new") {
      deptGroup.others.push({ ...memberForm, department: selectedDirDept });
    }

    currentData[selectedDirDept] = deptGroup;
    updater(currentData);
    setEditMemberIdx(null);
    showNotification();
  };

  // Delete Directory Member (from others list)
  const handleDeleteMember = (idx: number) => {
    let currentData = { ...facultyData };
    let updater = updateFacultyData;
    if (selectedDir === "board") {
      currentData = { ...boardData };
      updater = updateBoardData;
    } else if (selectedDir === "staff") {
      currentData = { ...staffData };
      updater = updateStaffData;
    }

    const deptGroup = { ...currentData[selectedDirDept] };
    if (deptGroup) {
      deptGroup.others = (deptGroup.others || []).filter((_, i) => i !== idx);
      currentData[selectedDirDept] = deptGroup;
      updater(currentData);
      showNotification();
    }
  };

  // Start editing a member
  const startEditMember = (idx: number | "hod" | "new", member?: any) => {
    setEditMemberIdx(idx);
    if (idx === "new") {
      setMemberForm({
        name: "",
        title: "",
        edu: "",
        interests: "",
        phone: "",
        email: "",
        avatar: "",
        age: "",
        experience: "",
        idNo: "",
        department: selectedDirDept
      });
    } else if (member) {
      setMemberForm({
        name: member.name || "",
        title: member.title || "",
        edu: member.edu || "",
        interests: member.interests || "",
        phone: member.phone || "",
        email: member.email || "",
        avatar: member.avatar || "",
        age: member.age || "",
        experience: member.experience || "",
        idNo: member.idNo || "",
        department: member.department || selectedDirDept
      });
    }
  };

  // Login view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#020B18] via-[#081A36] to-[#072A6C] px-4 py-16 font-[var(--font-poppins)]">
        <div className="relative w-full max-w-[420px] bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl text-left text-white">
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-full bg-[#D4AF37] flex items-center justify-center mb-3 shadow-md">
              <Lock className="text-gray-900" size={24} />
            </div>
            <h2 className="text-xl font-black uppercase tracking-wider text-center">Chalapathi Admin Portal</h2>
            <p className="text-xs text-gray-400 text-center mt-1">Please enter passcode to gain editor access</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5">Passcode</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-all text-center text-lg tracking-widest"
              />
            </div>
            {authError && <p className="text-xs font-bold text-[#D71920] text-center">{authError}</p>}
            <button
              type="submit"
              className="w-full h-11 bg-[#D4AF37] hover:bg-[#c29e28] text-gray-900 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all cursor-pointer"
            >
              Sign In ➔
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-left font-[var(--font-poppins)] flex">
      {/* Sidebar Panel */}
      <aside className="w-[260px] bg-gradient-to-b from-[#081A36] to-[#020B18] text-white flex flex-col justify-between shrink-0 shadow-lg">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-white/10 flex items-center gap-2">
            <LayoutDashboard className="text-[#D4AF37]" size={20} />
            <h2 className="text-sm font-extrabold uppercase tracking-widest">CU Admin Suite</h2>
          </div>
          {/* Navigation link list */}
          <nav className="p-4 space-y-1">
            {[
              { id: "dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
              { id: "announcements", label: "Announcements Drawer", icon: Megaphone },
              { id: "about", label: "About Us Pages", icon: Info },
              { id: "academics", label: "Academic Programs", icon: BookOpen },
              { id: "calendar", label: "Academic Calendar", icon: Calendar },
              { id: "news-events", label: "News & Events", icon: FileText },
              { id: "directories", label: "Faculty & Directories", icon: Users },
              { id: "placements", label: "Placements Page", icon: Briefcase }
            ].map(link => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id as any)}
                  className={`w-full h-10 px-4 rounded-xl flex items-center gap-3 text-xs font-bold transition-all text-left outline-none cursor-pointer ${
                    activeTab === link.id
                      ? "bg-[#D4AF37] text-gray-900"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        {/* Logout action */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full h-10 px-4 rounded-xl flex items-center gap-3 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all text-left cursor-pointer outline-none"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Administrative Workplace */}
      <main className="flex-grow p-8 max-w-[1200px] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D71920]">University Central Settings</span>
            <h1 className="text-2xl font-black uppercase text-[#072A6C] tracking-tight">{activeTab} Workspace</h1>
          </div>
          {/* Quick info notification popups */}
          <AnimatePresence>
            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <CheckCircle size={16} />
                <span>Changes saved successfully!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Panel rendering */}
        <div className="bg-white border border-gray-200/80 rounded-3xl p-6 shadow-sm">
          {/* 🌟 Tab 1: Dashboard Overview */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h3 className="text-base font-extrabold text-[#072A6C] uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Status Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: "Active Programs", count: programs.length, color: "text-[#072A6C]" },
                  { label: "Announcements Drawer", count: announcements.length, color: "text-[#D4AF37]" },
                  { label: "News Articles", count: news.length, color: "text-[#D71920]" },
                  { label: "Upcoming Events", count: events.length, color: "text-emerald-600" }
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 p-5 rounded-2xl flex flex-col justify-between">
                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">{stat.label}</span>
                    <span className={`text-4xl font-black ${stat.color} mt-2`}>{stat.count}</span>
                  </div>
                ))}
              </div>
              <div className="p-5 bg-[#072A6C]/5 border-l-4 border-[#072A6C] rounded-r-2xl mt-6 text-xs text-gray-600 space-y-1">
                <p className="font-bold text-[#072A6C]">Welcome to the Chalapathi University Administrative Panel.</p>
                <p>Select any category from the sidebar navigation to edit vision statements, program details, post announcements, or manage upcoming events in real-time.</p>
              </div>
            </div>
          )}

          {/* 🌟 Tab 2: Announcements */}
          {activeTab === "announcements" && (
            <div className="space-y-8">
              <form onSubmit={handleAddAnnouncement} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-gray-50 border border-gray-100 p-5 rounded-2xl">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Announcement Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Admissions 2026 Open"
                    value={newAnnTitle}
                    onChange={(e) => setNewAnnTitle(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Icon Choice</label>
                  <select
                    value={newAnnIcon}
                    onChange={(e) => setNewAnnIcon(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                  >
                    <option value="GraduationCap">Graduation Cap</option>
                    <option value="Calendar">Calendar</option>
                    <option value="FileText">File timelimit</option>
                    <option value="Award">Award Shield</option>
                    <option value="BookOpen">Open Book</option>
                  </select>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full h-10 bg-[#D71920] hover:bg-[#b71217] text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer inline-flex items-center justify-center gap-1.5"
                  >
                    <Plus size={14} /> Add Announcement
                  </button>
                </div>
                <div className="md:col-span-4 space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Announcement Description</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Provide short detailed description about this notice..."
                    value={newAnnDesc}
                    onChange={(e) => setNewAnnDesc(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-light"
                  />
                </div>
              </form>

              <div className="space-y-3">
                <h3 className="text-xs font-extrabold text-[#072A6C] uppercase tracking-wider mb-2">Current Announcements</h3>
                <div className="divide-y divide-gray-100">
                  {announcements.map((ann, idx) => (
                    <div key={idx} className="py-4 flex justify-between items-center gap-4 text-xs">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-[#072A6C]">{ann.title}</span>
                          <span className="text-[9px] text-[#D4AF37] border border-[#D4AF37]/30 px-1.5 py-0.5 rounded-full font-bold uppercase">{ann.iconName}</span>
                        </div>
                        <p className="text-gray-500 font-light">{ann.desc}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteAnnouncement(idx)}
                        className="w-8 h-8 rounded-xl hover:bg-rose-50 text-rose-500 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 🌟 Tab 3: About Us */}
          {activeTab === "about" && (
            <form onSubmit={handleSaveAbout} className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xs font-extrabold text-[#072A6C] uppercase tracking-wider mb-2">History View Content</h3>
                <label className="text-[10px] font-bold uppercase text-gray-500">Heritage Introduction Text</label>
                <textarea
                  rows={3}
                  value={aboutHistoryIntro}
                  onChange={(e) => setAboutHistoryIntro(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-light leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-500">Core Quote / Mission Statement</label>
                <input
                  type="text"
                  value={aboutHistoryQuote}
                  onChange={(e) => setAboutHistoryQuote(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold text-gray-700"
                />
              </div>

              <div className="space-y-1 pt-4 border-t border-gray-100">
                <h3 className="text-xs font-extrabold text-[#072A6C] uppercase tracking-wider mb-2">Vision View Content</h3>
                <label className="text-[10px] font-bold uppercase text-gray-500">Our Vision Statement</label>
                <textarea
                  rows={2}
                  value={aboutVisionText}
                  onChange={(e) => setAboutVisionText(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-light"
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-xs font-extrabold text-[#072A6C] uppercase tracking-wider mb-2">Leadership View Content</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">Chairman Name</label>
                    <input
                      type="text"
                      value={aboutChairmanName}
                      onChange={(e) => setAboutChairmanName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">Designation / Title</label>
                    <input
                      type="text"
                      value={aboutChairmanTitle}
                      onChange={(e) => setAboutChairmanTitle(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Chairman Quote / Message</label>
                  <input
                    type="text"
                    value={aboutChairmanQuote}
                    onChange={(e) => setAboutChairmanQuote(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="h-11 px-8 bg-[#072A6C] hover:bg-[#051c4a] text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  Save About Us Changes
                </button>
              </div>
            </form>
          )}

          {/* 🌟 Tab 4: Academics & Programs */}
          {activeTab === "academics" && (
            <form onSubmit={handleSaveProgram} className="space-y-6">
              <div className="space-y-1 bg-gray-50 border border-gray-100 p-4 rounded-2xl mb-6">
                <label className="text-[10px] font-black uppercase text-gray-500 block mb-1">Select Program to Modify</label>
                <select
                  value={selectedProgSlug}
                  onChange={(e) => setSelectedProgSlug(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                >
                  {programs.map(p => (
                    <option key={p.slug} value={p.slug}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Program Title</label>
                  <input
                    type="text"
                    required
                    value={progTitle}
                    onChange={(e) => setProgTitle(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Short Tagline</label>
                  <input
                    type="text"
                    required
                    value={progDesc}
                    onChange={(e) => setProgDesc(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-500">Overview / Introduction</label>
                <textarea
                  rows={3}
                  required
                  value={progOverview}
                  onChange={(e) => setProgOverview(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-light leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-500">Curriculum Subjects (comma separated list)</label>
                <textarea
                  rows={2}
                  required
                  value={progCurriculum}
                  onChange={(e) => setProgCurriculum(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Flowchart Year 1 Courses (comma separated)</label>
                  <input
                    type="text"
                    value={flowchartY1}
                    onChange={(e) => setFlowchartY1(e.target.value)}
                    placeholder="e.g. Python Programming, Computational Mathematics"
                    className="w-full h-10 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Flowchart Year 2 Courses (comma separated)</label>
                  <input
                    type="text"
                    value={flowchartY2}
                    onChange={(e) => setFlowchartY2(e.target.value)}
                    placeholder="e.g. Data Structures, Database Systems"
                    className="w-full h-10 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Flowchart Year 3 Courses (comma separated)</label>
                  <input
                    type="text"
                    value={flowchartY3}
                    onChange={(e) => setFlowchartY3(e.target.value)}
                    placeholder="e.g. Operating Systems, Computer Networks"
                    className="w-full h-10 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Flowchart Year 4 Courses (comma separated)</label>
                  <input
                    type="text"
                    value={flowchartY4}
                    onChange={(e) => setFlowchartY4(e.target.value)}
                    placeholder="e.g. Capstone Project, Cloud Infrastructure"
                    className="w-full h-10 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                  />
                </div>
              </div>

              {/* Syllabus / Curriculum File Uploader */}
              <div className="space-y-2 p-5 border border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center bg-gray-50/50">
                <UploadCloud className="text-[#072A6C]/40 mb-1" size={32} />
                <span className="text-[11px] font-bold uppercase text-gray-600">Upload Program Syllabus / Curriculum PDF</span>
                <span className="text-[10px] text-gray-400 font-light">Current: {curriculumFileName}</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="syllabus-file-input"
                />
                <label
                  htmlFor="syllabus-file-input"
                  className="h-9 px-6 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl font-bold text-[10px] uppercase tracking-wider inline-flex items-center justify-center cursor-pointer shadow-sm transition-colors"
                >
                  Choose File
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="h-11 px-8 bg-[#072A6C] hover:bg-[#051c4a] text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  Save Program Details
                </button>
              </div>
            </form>
          )}

          {/* 🌟 Tab 5: Academic Calendar */}
          {activeTab === "calendar" && (
            <div className="space-y-8">
              <form onSubmit={handleSaveCalendar} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-gray-50 border border-gray-100 p-5 rounded-2xl">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Month</label>
                  <select
                    value={calMonthIdx}
                    onChange={(e) => setCalMonthIdx(parseInt(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                  >
                    {calendarData.map((m, idx) => (
                      <option key={idx} value={idx}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Day (1-31)</label>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    value={calDay}
                    onChange={(e) => setCalDay(parseInt(e.target.value))}
                    className="w-full h-10 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Milestone / Event Text</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. First Mid-Term Examinations"
                    value={calEventText}
                    onChange={(e) => setCalEventText(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-semibold"
                  />
                </div>
                <div className="md:col-span-4 flex justify-end">
                  <button
                    type="submit"
                    className="h-10 px-8 bg-[#D71920] hover:bg-[#b71217] text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                  >
                    Set Calendar Milestone
                  </button>
                </div>
              </form>

              <div className="space-y-4">
                <h3 className="text-xs font-extrabold text-[#072A6C] uppercase tracking-wider mb-2">Active Milestones</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {calendarData.map((month, mIdx) => (
                    <div key={mIdx} className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 space-y-2">
                      <span className="text-[10px] font-black uppercase text-[#D4AF37] tracking-wider">{month.name} milestones</span>
                      {Object.keys(month.events).length === 0 ? (
                        <p className="text-[11px] text-gray-400 italic">No milestones set</p>
                      ) : (
                        <div className="divide-y divide-gray-100">
                          {Object.entries(month.events).map(([day, text]) => (
                            <div key={day} className="py-2 flex justify-between items-center text-xs">
                              <span className="font-bold text-gray-700">Day {day}: <span className="font-light text-gray-500">{text}</span></span>
                              <button
                                onClick={() => handleDeleteCalendarEvent(mIdx, parseInt(day))}
                                className="text-rose-500 hover:text-rose-700 cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 🌟 Tab 6: News & Events */}
          {activeTab === "news-events" && (
            <div className="space-y-12">
              {/* Section A: News Articles */}
              <div className="space-y-6">
                <h3 className="text-sm font-extrabold text-[#072A6C] uppercase tracking-wider pb-1 border-b border-gray-100">Post New News Article</h3>
                <form onSubmit={handleAddNews} className="space-y-4 bg-gray-50/60 border border-gray-100 p-5 rounded-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[10px] font-bold uppercase text-gray-500">News Title</label>
                      <input
                        type="text"
                        required
                        value={newNewsTitle}
                        onChange={(e) => setNewNewsTitle(e.target.value)}
                        className="w-full h-10 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-500">Category</label>
                      <select
                        value={newNewsCategory}
                        onChange={(e) => setNewNewsCategory(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                      >
                        <option value="Innovation">Innovation</option>
                        <option value="Achievement">Achievement</option>
                        <option value="Corporate Link">Corporate Link</option>
                        <option value="Research">Research</option>
                        <option value="Campus Life">Campus Life</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Events">Events</option>
                        <option value="Sports">Sports</option>
                        <option value="Admissions">Admissions</option>
                        <option value="Placements">Placements</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">Body Text</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write full article body details here..."
                      value={newNewsBody}
                      onChange={(e) => setNewNewsBody(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-light leading-relaxed"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-500">Source URL / Online Link (Optional)</label>
                      <input
                        type="url"
                        placeholder="e.g. https://www.thehindu.com/... or https://www.eenadu.net/..."
                        value={newNewsSourceUrl}
                        onChange={(e) => setNewNewsSourceUrl(e.target.value)}
                        className="w-full h-10 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-500">News Location (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Main Auditorium"
                        value={newNewsLoc}
                        onChange={(e) => setNewNewsLoc(e.target.value)}
                        className="w-full h-10 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-semibold"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="h-10 px-8 bg-[#072A6C] hover:bg-[#051c4a] text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                    >
                      Publish News Article
                    </button>
                  </div>
                </form>

                {/* News listing */}
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold text-[#072A6C] uppercase tracking-wider mb-2">Current News Articles</h4>
                  <div className="divide-y divide-gray-100 max-h-[250px] overflow-y-auto pr-2">
                    {news.map((item) => (
                      <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                        <div className="space-y-0.5">
                          <span className="font-extrabold text-[#072A6C]">{item.title}</span>
                          <p className="text-gray-400 text-[10px]">{item.date} — {item.category}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteNews(item.id)}
                          className="text-rose-500 hover:text-rose-700 cursor-pointer font-bold"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section B: Events */}
              <div className="space-y-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-extrabold text-[#072A6C] uppercase tracking-wider pb-1 border-b border-gray-100">Create New Event</h3>
                <form onSubmit={handleAddEvent} className="space-y-4 bg-gray-50/60 border border-gray-100 p-5 rounded-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[10px] font-bold uppercase text-gray-500">Event Title</label>
                      <input
                        type="text"
                        required
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                        className="w-full h-10 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-500">Event Date</label>
                      <input
                        type="text"
                        placeholder="e.g. 15 Aug 2026"
                        required
                        value={newEventDate}
                        onChange={(e) => setNewEventDate(e.target.value)}
                        className="w-full h-10 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-500">Category</label>
                      <select
                        value={newEventCategory}
                        onChange={(e) => setNewEventCategory(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                      >
                        <option value="Aerospace">Aerospace</option>
                        <option value="Summit">Summit</option>
                        <option value="Research">Research</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Alumni Connect">Alumni Connect</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-500">Venue</label>
                      <input
                        type="text"
                        placeholder="e.g., Aeronautics Hangar"
                        value={newEventLoc}
                        onChange={(e) => setNewEventLoc(e.target.value)}
                        className="w-full h-10 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-500">Time</label>
                      <input
                        type="text"
                        value={newEventTime}
                        onChange={(e) => setNewEventTime(e.target.value)}
                        className="w-full h-10 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">Description</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Write full event schedule details here..."
                      value={newEventBody}
                      onChange={(e) => setNewEventBody(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-light leading-relaxed"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="h-10 px-8 bg-[#D71920] hover:bg-[#b71217] text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                    >
                      Publish Event
                    </button>
                  </div>
                </form>

                {/* Events listing */}
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold text-[#072A6C] uppercase tracking-wider mb-2">Current Events</h4>
                  <div className="divide-y divide-gray-100 max-h-[250px] overflow-y-auto pr-2">
                    {events.map((item) => (
                      <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                        <div className="space-y-0.5">
                          <span className="font-extrabold text-[#072A6C]">{item.title}</span>
                          <p className="text-gray-400 text-[10px]">{item.date} — {item.location}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteEvent(item.id)}
                          className="text-rose-500 hover:text-rose-700 cursor-pointer font-bold"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "directories" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-black text-[#072A6C] uppercase tracking-wider">Directories & Faculty Hub</h1>
                <p className="text-xs text-gray-500 font-light mt-0.5">Manage teaching faculty, university board deans, and administrative office staff.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left side: Selector & List */}
                <div className="lg:col-span-6 space-y-6">
                  {/* Category selectors */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-500">Select Directory Category</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "faculty", label: "Teaching Faculty" },
                          { id: "board", label: "Board & Deans" },
                          { id: "staff", label: "Admin Staff" }
                        ].map((d) => (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => setSelectedDir(d.id as any)}
                            className={`h-9 rounded-xl border text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              selectedDir === d.id
                                ? "bg-[#072A6C] border-[#072A6C] text-white shadow-sm"
                                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-500">Select Department / Wing</label>
                      <select
                        value={selectedDirDept}
                        onChange={(e) => {
                          setSelectedDirDept(e.target.value);
                          setEditMemberIdx(null);
                        }}
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium bg-white"
                      >
                        {Object.keys(
                          selectedDir === "faculty"
                            ? facultyData
                            : selectedDir === "board"
                            ? boardData
                            : staffData
                        ).map((key) => (
                          <option key={key} value={key}>
                            {key}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* List of Members */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-5">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                      <span className="text-xs font-extrabold uppercase text-gray-500 tracking-wider">Directory Members</span>
                      <button
                        type="button"
                        onClick={() => startEditMember("new")}
                        className="h-8 px-3 rounded-lg bg-[#D71920] hover:bg-[#D71920]/90 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Plus size={12} /> Add Member
                      </button>
                    </div>

                    {/* HOD Card */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-rose-500 block">Department Head / Lead</span>
                      {(() => {
                        const target = selectedDir === "faculty" ? facultyData : selectedDir === "board" ? boardData : staffData;
                        const deptInfo = target[selectedDirDept] || { hod: null, others: [] };
                        const hod = deptInfo.hod;
                        if (!hod || !hod.name) return <p className="text-xs text-gray-400 font-light italic">No head assigned</p>;
                        return (
                          <div className="p-3.5 rounded-xl bg-gray-50/70 border border-gray-100 flex justify-between items-center text-xs">
                            <div>
                              <span className="font-extrabold text-[#072A6C] block">{hod.name}</span>
                              <span className="text-[10px] text-gray-400 font-medium block">{hod.title}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => startEditMember("hod", hod)}
                              className="text-blue-600 hover:text-blue-800 font-bold uppercase text-[10px] cursor-pointer"
                            >
                              Edit Profile
                            </button>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Others list */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block">Other Members / Faculty</span>
                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                        {(() => {
                          const target = selectedDir === "faculty" ? facultyData : selectedDir === "board" ? boardData : staffData;
                          const deptInfo = target[selectedDirDept] || { hod: null, others: [] };
                          const others = deptInfo.others || [];
                          if (others.length === 0) return <p className="text-xs text-gray-400 font-light italic">No other members listed</p>;
                          return others.map((member, idx) => (
                            <div key={idx} className="p-3.5 rounded-xl bg-white border border-gray-100 flex justify-between items-center text-xs shadow-sm hover:border-[#D71920]/20 transition-colors">
                              <div>
                                <span className="font-bold text-gray-700 block">{member.name}</span>
                                <span className="text-[10px] text-gray-400 font-medium block">{member.title}</span>
                              </div>
                              <div className="flex gap-3">
                                <button
                                  type="button"
                                  onClick={() => startEditMember(idx, member)}
                                  className="text-blue-600 hover:text-blue-800 font-bold uppercase text-[10px] cursor-pointer"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMember(idx)}
                                  className="text-rose-500 hover:text-rose-700 font-bold uppercase text-[10px] cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side: Editor Form */}
                <div className="lg:col-span-6">
                  {editMemberIdx !== null ? (
                    <form onSubmit={handleSaveMember} className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-xs font-black uppercase text-[#072A6C] tracking-wider">
                          {editMemberIdx === "new" ? "Add Directory Member" : `Edit Member: ${editMemberIdx === "hod" ? "Head" : "Staff"}`}
                        </span>
                        <button
                          type="button"
                          onClick={() => setEditMemberIdx(null)}
                          className="text-gray-400 hover:text-gray-600 text-xs font-bold uppercase tracking-wider cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-500">Full Name</label>
                          <input
                            type="text"
                            required
                            value={memberForm.name}
                            onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-500">Title / Designation</label>
                          <input
                            type="text"
                            required
                            value={memberForm.title}
                            onChange={(e) => setMemberForm({ ...memberForm, title: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-500">Education Details</label>
                          <input
                            type="text"
                            required
                            value={memberForm.edu}
                            onChange={(e) => setMemberForm({ ...memberForm, edu: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-500">Expertise / Interests</label>
                          <input
                            type="text"
                            value={memberForm.interests}
                            onChange={(e) => setMemberForm({ ...memberForm, interests: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-500">Phone</label>
                          <input
                            type="text"
                            value={memberForm.phone}
                            onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-500">Email Address</label>
                          <input
                            type="email"
                            required
                            value={memberForm.email}
                            onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-500">Avatar Initials</label>
                          <input
                            type="text"
                            required
                            value={memberForm.avatar}
                            onChange={(e) => setMemberForm({ ...memberForm, avatar: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-500">Age</label>
                          <input
                            type="text"
                            value={memberForm.age}
                            onChange={(e) => setMemberForm({ ...memberForm, age: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-500">Experience</label>
                          <input
                            type="text"
                            value={memberForm.experience}
                            onChange={(e) => setMemberForm({ ...memberForm, experience: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-500">ID Number / Code</label>
                          <input
                            type="text"
                            required
                            value={memberForm.idNo}
                            onChange={(e) => setMemberForm({ ...memberForm, idNo: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full h-11 bg-[#072A6C] hover:bg-[#072A6C]/90 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors cursor-pointer mt-2"
                      >
                        Save Profile Details
                      </button>
                    </form>
                  ) : (
                    <div className="bg-gray-50 border border-dashed border-gray-200 p-8 rounded-2xl flex flex-col items-center justify-center text-center min-h-[300px]">
                      <Users className="text-gray-300 mb-3" size={40} />
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">No Member Selected</span>
                      <p className="text-[11px] text-gray-400 font-light mt-1 max-w-[280px]">Select any department head or faculty member from the directory list on the left to edit their details.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeTab === "placements" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-black text-[#072A6C] uppercase tracking-wider">Placements Page Editor</h1>
                <p className="text-xs text-gray-500 font-light mt-0.5">Edit all placements page content — hero text, statistics, placed students, career programs, and recruiters.</p>
              </div>

              {/* Sub-section toggles */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "content", label: "Content & Stats" },
                  { id: "students", label: "Placed Students" },
                  { id: "recruiters", label: "Top Recruiters" }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setPlacementsSection(s.id as any)}
                    className={`h-9 rounded-xl border text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      placementsSection === s.id
                        ? "bg-[#072A6C] border-[#072A6C] text-white shadow-sm"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Content & Stats Sub-section */}
              {placementsSection === "content" && (
                <div className="space-y-6">
                  {/* Hero Text */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                    <span className="text-xs font-black uppercase text-[#072A6C] tracking-wider block border-b border-gray-100 pb-2">Hero Section</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-gray-500">Hero Title</label>
                        <input type="text" value={placementsForm.heroTitle} onChange={(e) => setPlacementsForm({ ...placementsForm, heroTitle: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-gray-500">Hero Subtitle</label>
                        <input type="text" value={placementsForm.heroSubtitle} onChange={(e) => setPlacementsForm({ ...placementsForm, heroSubtitle: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-500">Hero Description</label>
                      <textarea rows={4} value={placementsForm.heroDescription} onChange={(e) => setPlacementsForm({ ...placementsForm, heroDescription: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium resize-none" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                    <span className="text-xs font-black uppercase text-[#072A6C] tracking-wider block border-b border-gray-100 pb-2">Statistics</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-gray-500">Highest Package</label>
                        <input type="text" value={placementsForm.highestPackage} onChange={(e) => setPlacementsForm({ ...placementsForm, highestPackage: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-gray-500">Average Package</label>
                        <input type="text" value={placementsForm.averagePackage} onChange={(e) => setPlacementsForm({ ...placementsForm, averagePackage: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-gray-500">Placement %</label>
                        <input type="text" value={placementsForm.placementPercent} onChange={(e) => setPlacementsForm({ ...placementsForm, placementPercent: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                      </div>
                    </div>
                  </div>

                  {/* Philosophy */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                    <span className="text-xs font-black uppercase text-[#072A6C] tracking-wider block border-b border-gray-100 pb-2">Placement Philosophy</span>
                    <textarea rows={4} value={placementsForm.philosophyText} onChange={(e) => setPlacementsForm({ ...placementsForm, philosophyText: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium resize-none" />
                  </div>

                  {/* Career Programs */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-xs font-black uppercase text-[#072A6C] tracking-wider">Career Development Programs</span>
                      <button type="button" onClick={() => setPlacementsForm({ ...placementsForm, careerPrograms: [...placementsForm.careerPrograms, ""] })} className="h-7 px-2 rounded-lg bg-[#D71920] text-white text-[10px] font-bold uppercase flex items-center gap-1 cursor-pointer"><Plus size={12} /> Add</button>
                    </div>
                    {placementsForm.careerPrograms.map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input type="text" value={item} onChange={(e) => { const arr = [...placementsForm.careerPrograms]; arr[idx] = e.target.value; setPlacementsForm({ ...placementsForm, careerPrograms: arr }); }} className="flex-1 h-9 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                        <button type="button" onClick={() => { const arr = placementsForm.careerPrograms.filter((_, i) => i !== idx); setPlacementsForm({ ...placementsForm, careerPrograms: arr }); }} className="text-rose-500 hover:text-rose-700 text-[10px] font-bold cursor-pointer">✕</button>
                      </div>
                    ))}
                  </div>

                  {/* Industry Connect */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                    <span className="text-xs font-black uppercase text-[#072A6C] tracking-wider block border-b border-gray-100 pb-2">Industry Connect</span>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-500">Description</label>
                      <textarea rows={2} value={placementsForm.industryConnectDesc} onChange={(e) => setPlacementsForm({ ...placementsForm, industryConnectDesc: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium resize-none" />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold uppercase text-gray-500">Items</label>
                      <button type="button" onClick={() => setPlacementsForm({ ...placementsForm, industryConnectItems: [...placementsForm.industryConnectItems, ""] })} className="h-7 px-2 rounded-lg bg-[#D71920] text-white text-[10px] font-bold uppercase flex items-center gap-1 cursor-pointer"><Plus size={12} /> Add</button>
                    </div>
                    {placementsForm.industryConnectItems.map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input type="text" value={item} onChange={(e) => { const arr = [...placementsForm.industryConnectItems]; arr[idx] = e.target.value; setPlacementsForm({ ...placementsForm, industryConnectItems: arr }); }} className="flex-1 h-9 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                        <button type="button" onClick={() => { const arr = placementsForm.industryConnectItems.filter((_, i) => i !== idx); setPlacementsForm({ ...placementsForm, industryConnectItems: arr }); }} className="text-rose-500 hover:text-rose-700 text-[10px] font-bold cursor-pointer">✕</button>
                      </div>
                    ))}
                  </div>

                  {/* Placement Cell */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                    <span className="text-xs font-black uppercase text-[#072A6C] tracking-wider block border-b border-gray-100 pb-2">Placement Cell Responsibilities</span>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-500">Description</label>
                      <textarea rows={2} value={placementsForm.placementCellDesc} onChange={(e) => setPlacementsForm({ ...placementsForm, placementCellDesc: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium resize-none" />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold uppercase text-gray-500">Responsibility Cards</label>
                      <button type="button" onClick={() => setPlacementsForm({ ...placementsForm, placementCellItems: [...placementsForm.placementCellItems, { t: "", d: "" }] })} className="h-7 px-2 rounded-lg bg-[#D71920] text-white text-[10px] font-bold uppercase flex items-center gap-1 cursor-pointer"><Plus size={12} /> Add</button>
                    </div>
                    {placementsForm.placementCellItems.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                        <input type="text" placeholder="Title" value={item.t} onChange={(e) => { const arr = [...placementsForm.placementCellItems]; arr[idx] = { ...arr[idx], t: e.target.value }; setPlacementsForm({ ...placementsForm, placementCellItems: arr }); }} className="col-span-4 h-9 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                        <input type="text" placeholder="Description" value={item.d} onChange={(e) => { const arr = [...placementsForm.placementCellItems]; arr[idx] = { ...arr[idx], d: e.target.value }; setPlacementsForm({ ...placementsForm, placementCellItems: arr }); }} className="col-span-7 h-9 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                        <button type="button" onClick={() => { const arr = placementsForm.placementCellItems.filter((_, i) => i !== idx); setPlacementsForm({ ...placementsForm, placementCellItems: arr }); }} className="col-span-1 text-rose-500 hover:text-rose-700 text-[10px] font-bold cursor-pointer text-center">✕</button>
                      </div>
                    ))}
                  </div>

                  {/* Save Content */}
                  <button
                    type="button"
                    onClick={() => {
                      updatePlacementsContent(placementsForm);
                      showNotification();
                    }}
                    className="w-full h-11 bg-[#072A6C] hover:bg-[#072A6C]/90 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors cursor-pointer"
                  >
                    Save All Placements Content
                  </button>
                </div>
              )}

              {/* Placed Students Sub-section */}
              {placementsSection === "students" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-xs font-extrabold uppercase text-gray-500 tracking-wider">Placed Students ({placementsContent.placedStudents.length})</span>
                        <button type="button" onClick={() => { setEditStudentIdx("new"); setStudentForm({ name: "", branch: "", company: "", ctc: "", img: "" }); }} className="h-8 px-3 rounded-lg bg-[#D71920] hover:bg-[#D71920]/90 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"><Plus size={12} /> Add Student</button>
                      </div>
                      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                        {placementsContent.placedStudents.map((s, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-white border border-gray-100 flex justify-between items-center text-xs shadow-sm hover:border-[#D71920]/20 transition-colors">
                            <div>
                              <span className="font-bold text-gray-700 block">{s.name}</span>
                              <span className="text-[10px] text-gray-400 font-medium block">{s.company} — {s.ctc}</span>
                            </div>
                            <div className="flex gap-3">
                              <button type="button" onClick={() => { setEditStudentIdx(idx); setStudentForm({ ...s }); }} className="text-blue-600 hover:text-blue-800 font-bold uppercase text-[10px] cursor-pointer">Edit</button>
                              <button type="button" onClick={() => { const arr = placementsContent.placedStudents.filter((_, i) => i !== idx); updatePlacementsContent({ ...placementsContent, placedStudents: arr }); showNotification(); }} className="text-rose-500 hover:text-rose-700 font-bold uppercase text-[10px] cursor-pointer">Delete</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    {editStudentIdx !== null ? (
                      <form onSubmit={(e) => { e.preventDefault(); const arr = [...placementsContent.placedStudents]; if (editStudentIdx === "new") { arr.push(studentForm); } else { arr[editStudentIdx] = studentForm; } updatePlacementsContent({ ...placementsContent, placedStudents: arr }); setEditStudentIdx(null); showNotification(); }} className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                          <span className="text-xs font-black uppercase text-[#072A6C] tracking-wider">{editStudentIdx === "new" ? "Add Placed Student" : "Edit Student"}</span>
                          <button type="button" onClick={() => setEditStudentIdx(null)} className="text-gray-400 hover:text-gray-600 text-xs font-bold uppercase tracking-wider cursor-pointer">Cancel</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-gray-500">Student Name</label><input type="text" required value={studentForm.name} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" /></div>
                          <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-gray-500">Branch</label><input type="text" required value={studentForm.branch} onChange={(e) => setStudentForm({ ...studentForm, branch: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" /></div>
                          <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-gray-500">Company</label><input type="text" required value={studentForm.company} onChange={(e) => setStudentForm({ ...studentForm, company: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" /></div>
                          <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-gray-500">CTC / Package</label><input type="text" required value={studentForm.ctc} onChange={(e) => setStudentForm({ ...studentForm, ctc: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" /></div>
                        </div>
                        <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-gray-500">Photo URL</label><input type="text" required value={studentForm.img} onChange={(e) => setStudentForm({ ...studentForm, img: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" /></div>
                        <button type="submit" className="w-full h-11 bg-[#072A6C] hover:bg-[#072A6C]/90 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors cursor-pointer mt-2">Save Student</button>
                      </form>
                    ) : (
                      <div className="bg-gray-50 border border-dashed border-gray-200 p-8 rounded-2xl flex flex-col items-center justify-center text-center min-h-[300px]">
                        <Briefcase className="text-gray-300 mb-3" size={40} />
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">No Student Selected</span>
                        <p className="text-[11px] text-gray-400 font-light mt-1 max-w-[280px]">Select a placed student from the list to edit their details, or click Add Student.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Recruiters Sub-section */}
              {placementsSection === "recruiters" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-xs font-extrabold uppercase text-gray-500 tracking-wider">Recruiters ({placementsContent.recruiters.length})</span>
                        <button type="button" onClick={() => { setEditRecruiterIdx("new"); setRecruiterForm({ name: "", logo: "" }); }} className="h-8 px-3 rounded-lg bg-[#D71920] hover:bg-[#D71920]/90 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"><Plus size={12} /> Add Recruiter</button>
                      </div>
                      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                        {placementsContent.recruiters.map((r, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-white border border-gray-100 flex justify-between items-center text-xs shadow-sm hover:border-[#D71920]/20 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden"><img src={r.logo} alt={r.name} className="w-6 h-6 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${r.name}&background=072A6C&color=fff&size=32`; }} /></div>
                              <span className="font-bold text-gray-700">{r.name}</span>
                            </div>
                            <div className="flex gap-3">
                              <button type="button" onClick={() => { setEditRecruiterIdx(idx); setRecruiterForm({ ...r }); }} className="text-blue-600 hover:text-blue-800 font-bold uppercase text-[10px] cursor-pointer">Edit</button>
                              <button type="button" onClick={() => { const arr = placementsContent.recruiters.filter((_, i) => i !== idx); updatePlacementsContent({ ...placementsContent, recruiters: arr }); showNotification(); }} className="text-rose-500 hover:text-rose-700 font-bold uppercase text-[10px] cursor-pointer">Delete</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    {editRecruiterIdx !== null ? (
                      <form onSubmit={(e) => { e.preventDefault(); const arr = [...placementsContent.recruiters]; if (editRecruiterIdx === "new") { arr.push(recruiterForm); } else { arr[editRecruiterIdx] = recruiterForm; } updatePlacementsContent({ ...placementsContent, recruiters: arr }); setEditRecruiterIdx(null); showNotification(); }} className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                          <span className="text-xs font-black uppercase text-[#072A6C] tracking-wider">{editRecruiterIdx === "new" ? "Add Recruiter" : "Edit Recruiter"}</span>
                          <button type="button" onClick={() => setEditRecruiterIdx(null)} className="text-gray-400 hover:text-gray-600 text-xs font-bold uppercase tracking-wider cursor-pointer">Cancel</button>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-gray-500">Company Name</label><input type="text" required value={recruiterForm.name} onChange={(e) => setRecruiterForm({ ...recruiterForm, name: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" /></div>
                          <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-gray-500">Logo URL</label><input type="text" required value={recruiterForm.logo} onChange={(e) => setRecruiterForm({ ...recruiterForm, logo: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" /></div>
                        </div>
                        <button type="submit" className="w-full h-11 bg-[#072A6C] hover:bg-[#072A6C]/90 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors cursor-pointer mt-2">Save Recruiter</button>
                      </form>
                    ) : (
                      <div className="bg-gray-50 border border-dashed border-gray-200 p-8 rounded-2xl flex flex-col items-center justify-center text-center min-h-[300px]">
                        <Briefcase className="text-gray-300 mb-3" size={40} />
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">No Recruiter Selected</span>
                        <p className="text-[11px] text-gray-400 font-light mt-1 max-w-[280px]">Select a recruiter from the list to edit, or click Add Recruiter to add a new company.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
