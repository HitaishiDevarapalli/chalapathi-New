import React, { useState } from "react";
import { useData, Announcement, ProgramDetail, NewsArticle, EventItem, AboutUsContent, MonthCalendarData, PlacementsContent, PlacedStudent, Recruiter, SuccessStory } from "../context/DataContext";
import { 
  Lock, LayoutDashboard, Megaphone, BookOpen, Calendar, FileText, 
  Settings, LogOut, Plus, Trash2, Edit3, CheckCircle, UploadCloud, Info, Users, Briefcase, Globe,
  User, Eye, EyeOff, ArrowRight, ShieldCheck, Shield, BarChart3, Menu, ChevronDown, ChevronRight,
  Bell, TrendingUp, UserPlus, CheckSquare, FileSpreadsheet, Building, CreditCard, MessageSquare,
  Library, BarChart2, CheckCircle2, Clock, Search, Filter, Image, Sparkles, Layers, RefreshCw, GraduationCap
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
    placementsContent,
    successStories,
    updateSuccessStories
  } = useData();

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [authError, setAuthError] = useState("");

  // Tab navigation & layout states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "homepage-sections" | "marquee-ticker" | "announcements" | "about" | "academics" | 
    "calendar" | "news-events" | "directories" | "placements" | "campus-life" | 
    "users" | "admissions" | "examinations" | "finance" | "communication" | "library" | "reports" | "settings" | "leads"
  >("dashboard");
  const [newsEventsSection, setNewsEventsSection] = useState<"news" | "events" | "video">("news");
  
  // Homepage Section Enable/Disable Toggles
  const [sectionToggles, setSectionToggles] = useState(() => {
    const saved = localStorage.getItem("chalapathi_section_toggles");
    return saved ? JSON.parse(saved) : {
      heroVideo: true,
      announcements: true,
      programs: true,
      chairmanMessage: true,
      campusLife: true,
      newsEvents: true,
      placements: true,
      certifications: true,
      virtualTour: true
    };
  });

  // Marquee Ticker Items state
  const [marqueeItems, setMarqueeItems] = useState<{ text: string; link: string }[]>(() => {
    try {
      const saved = localStorage.getItem("chalapathi_marquee_items");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { text: "Admissions Open for Academic Year 2026–27", link: "" },
      { text: "Applications Closing Soon", link: "" },
      { text: "Apply Now", link: "/admissions" },
      { text: "Limited Seats", link: "" },
      { text: "Register Today", link: "/admissions" },
      { text: "Highest Placement Opportunities", link: "/placements" },
      { text: "Admissions Open for 2026–27", link: "" }
    ];
  });

  const handleToggleSection = (key: string) => {
    const updated = { ...sectionToggles, [key]: !sectionToggles[key as keyof typeof sectionToggles] };
    setSectionToggles(updated);
    localStorage.setItem("chalapathi_section_toggles", JSON.stringify(updated));
    showNotification();
  };
  
  // Video States
  const [campusVideoUrl, setCampusVideoUrl] = useState(() => localStorage.getItem("chalapathi_campus_video") || "/chalapathi_logo_intro.mp4");
  const [campusVideoText, setCampusVideoText] = useState(() => localStorage.getItem("chalapathi_campus_video_text") || "Explore Chalapathi Campus");
  const [campusVideoSubtext, setCampusVideoSubtext] = useState(() => localStorage.getItem("chalapathi_campus_video_subtext") || "Experience innovation, research, smart classrooms and vibrant student life.");

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

  // Homepage Chairman states
  const [hChairmanHeading, setHChairmanHeading] = useState(() => localStorage.getItem("chalapathi_chairman_heading") || "A Vision. A Commitment. A Legacy.");
  const [hChairmanSubtitle, setHChairmanSubtitle] = useState(() => localStorage.getItem("chalapathi_chairman_subtitle") || "Guiding generations through excellence, innovation, integrity, and student success.");
  const [hChairmanName, setHChairmanName] = useState(() => localStorage.getItem("chalapathi_chairman_name") || "Dr. Y. V Anjaneyulu");
  const [hChairmanDesignation, setHChairmanDesignation] = useState(() => localStorage.getItem("chalapathi_chairman_designation") || "Chairman");
  const [hChairmanGroup, setHChairmanGroup] = useState(() => localStorage.getItem("chalapathi_chairman_group") || "Chalapathi Group of Institutions");
  const [hChairmanMessage, setHChairmanMessage] = useState(() => localStorage.getItem("chalapathi_chairman_message") || `At Chalapathi University, we believe education is the most powerful transformer of lives and the key to building a better society. Our mission is to empower young minds with knowledge, values, and innovation to help them lead with purpose and create a lasting impact on the world.\n\nWe are committed to providing a nurturing environment, world-class infrastructure, and industry-oriented education to shape future leaders and responsible citizens.`);
  const [hChairmanVideoUrl, setHChairmanVideoUrl] = useState(() => localStorage.getItem("chalapathi_chairman_video") || "/chalapathi_logo_intro.mp4");
  const [hChairmanImage, setHChairmanImage] = useState(() => localStorage.getItem("chalapathi_chairman_image") || "/chairman_v4.png");
  const [hChairmanBtnText, setHChairmanBtnText] = useState(() => localStorage.getItem("chalapathi_chairman_btn") || "Watch Chairman's Message");

  // Homepage Campus Life states
  const [campusLabel, setCampusLabel] = useState(() => localStorage.getItem("chalapathi_campus_label") || "CAMPUS LIFE");
  const [campusSubtitle, setCampusSubtitle] = useState(() => localStorage.getItem("chalapathi_campus_subtitle") || "A vibrant campus where students learn, innovate, explore, compete, and create unforgettable memories.");
  const [campusCardsRaw, setCampusCardsRaw] = useState(() => {
    return localStorage.getItem("chalapathi_campus_cards") || JSON.stringify([
      { title: "Vibrant Community", desc: "A diverse and inclusive campus with students from across India and the world.", icon: "Users" },
      { title: "Clubs & Activities", desc: "50+ student clubs to explore passions and build leadership skills.", icon: "GraduationCap" },
      { title: "Sports & Fitness", desc: "World-class sports facilities to keep you active, healthy and motivated.", icon: "Trophy" },
      { title: "Arts & Culture", desc: "Celebrate creativity with events, fests, and cultural extravaganzas.", icon: "Sparkles" },
      { title: "Smart Learning Spaces", desc: "Modern classrooms, advanced labs, and digital resources for future-ready learning.", icon: "Building2" },
      { title: "Hostel Life", desc: "Safe, comfortable and modern hostels that feel like a second home.", icon: "Landmark" },
      { title: "Food & Cafeteria", desc: "Hygienic, affordable and variety-rich meals for every taste.", icon: "Coffee" },
      { title: "Transport Facility", desc: "Convenient and reliable transportation across city routes.", icon: "Bus" }
    ], null, 2);
  });
  const [campusVideosRaw, setCampusVideosRaw] = useState(() => {
    return localStorage.getItem("chalapathi_campus_videos") || JSON.stringify([
      { url: "/chalapathi_logo_intro.mp4", title: "Campus Overview" },
      { url: "https://assets.mixkit.co/videos/preview/mixkit-drones-eye-view-of-a-modern-university-campus-41555-large.mp4", title: "Smart Classrooms & Labs" },
      { url: "https://assets.mixkit.co/videos/preview/mixkit-group-of-students-walking-on-college-campus-41553-large.mp4", title: "Student Life & Clubs" }
    ], null, 2);
  });
  const [campusGalleryRaw, setCampusGalleryRaw] = useState(() => {
    return localStorage.getItem("chalapathi_campus_gallery") || JSON.stringify([
      { title: "Annual Fest", image: "/media__1783770842966.png" },
      { title: "Sports Meet", image: "/media__1783771619196.png" },
      { title: "Tech Events", image: "/media__1783772591375.png" },
      { title: "NSS Activities", image: "/media__1783774201695.png" },
      { title: "Cultural Events", image: "/media__1783775062821.png" },
      { title: "Workshops", image: "/media__1783776081975.png" },
      { title: "Student Clubs", image: "/media__1783776395046.png" },
      { title: "Innovation Expo", image: "/media__1783777762350.png" }
    ], null, 2);
  });

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
  const [placementsSection, setPlacementsSection] = useState<"content" | "students" | "recruiters" | "stories">("content");
  const [editStoryIdx, setEditStoryIdx] = useState<number | "new" | null>(null);
  const [storyForm, setStoryForm] = useState<SuccessStory>({
    id: Date.now(),
    studentName: "",
    studentImage: "",
    department: "",
    batch: "",
    companyName: "",
    companyLogo: "",
    packageOffered: "",
    description: "",
    skills: [],
    internshipExp: "",
    achievement: "",
    milestones: {
      learningTitle: "",
      learningDesc: "",
      internshipTitle: "",
      internshipDesc: "",
      placementTitle: "",
      placementDesc: "",
      careerTitle: "",
      careerDesc: ""
    }
  });

  // Sync placements form when context changes
  React.useEffect(() => {
    setPlacementsForm({ ...placementsContent });
  }, [placementsContent]);

  // Handle Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123" || passcode === "admin" || (username.trim().toLowerCase() === "admin" && passcode)) {
      setIsAuthenticated(true);
      setAuthError("");
    } else if (!passcode) {
      setAuthError("Please enter password to sign in.");
    } else {
      setAuthError("Invalid credentials! Default passcode: admin123");
    }
  };

  const showNotification = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Marquee Ticker Handlers
  const handleAddMarqueeItem = () => {
    const updated = [...marqueeItems, { text: "", link: "" }];
    setMarqueeItems(updated);
  };

  const handleUpdateMarqueeItem = (index: number, field: "text" | "link", value: string) => {
    const updated = [...marqueeItems];
    updated[index] = { ...updated[index], [field]: value };
    setMarqueeItems(updated);
  };

  const handleDeleteMarqueeItem = (index: number) => {
    const updated = marqueeItems.filter((_, i) => i !== index);
    setMarqueeItems(updated);
  };

  const handleSaveMarqueeItems = () => {
    localStorage.setItem("chalapathi_marquee_items", JSON.stringify(marqueeItems));
    showNotification();
  };

  const handleMoveMarqueeItem = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === marqueeItems.length - 1) return;
    const updated = [...marqueeItems];
    const swapIdx = direction === "up" ? index - 1 : index + 1;
    [updated[index], updated[swapIdx]] = [updated[swapIdx], updated[index]];
    setMarqueeItems(updated);
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

  // Save Campus Life Settings
  const handleSaveCampusLife = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      JSON.parse(campusCardsRaw);
      JSON.parse(campusVideosRaw);
      JSON.parse(campusGalleryRaw);
      
      localStorage.setItem("chalapathi_campus_label", campusLabel);
      localStorage.setItem("chalapathi_campus_subtitle", campusSubtitle);
      localStorage.setItem("chalapathi_campus_cards", campusCardsRaw);
      localStorage.setItem("chalapathi_campus_videos", campusVideosRaw);
      localStorage.setItem("chalapathi_campus_gallery", campusGalleryRaw);
      showNotification();
    } catch (err) {
      alert("Invalid JSON structure. Please verify details!");
    }
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
    localStorage.setItem("chalapathi_chairman_heading", hChairmanHeading);
    localStorage.setItem("chalapathi_chairman_subtitle", hChairmanSubtitle);
    localStorage.setItem("chalapathi_chairman_name", hChairmanName);
    localStorage.setItem("chalapathi_chairman_designation", hChairmanDesignation);
    localStorage.setItem("chalapathi_chairman_group", hChairmanGroup);
    localStorage.setItem("chalapathi_chairman_message", hChairmanMessage);
    localStorage.setItem("chalapathi_chairman_video", hChairmanVideoUrl);
    localStorage.setItem("chalapathi_chairman_image", hChairmanImage);
    localStorage.setItem("chalapathi_chairman_btn", hChairmanBtnText);
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
    const slug = newEventTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newEv: EventItem = {
      id: nextId,
      slug,
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

  // Login view matching exact reference screenshot
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F8F9FD] font-[var(--font-poppins)] overflow-x-hidden selection:bg-[#071A3A] selection:text-white">
        
        {/* ======================================================== */}
        {/* LEFT PANEL: Dark Navy Slanted Hero Branding             */}
        {/* ======================================================== */}
        <div className="w-full lg:w-[50%] xl:w-[52%] relative min-h-[480px] lg:min-h-screen bg-[#071A3A] text-white flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden">
          
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/campus_hero.png" 
              alt="Chalapathi Campus" 
              className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#030E22] via-[#071A3A]/95 to-[#0B2550]/90" />
          </div>

          {/* Slanted Right Edge Divider with Gold Accent Line */}
          <div className="hidden lg:block absolute -right-1 top-0 bottom-0 w-24 sm:w-32 z-20 pointer-events-none">
            <svg className="w-full h-full text-[#F8F9FD] fill-current" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="100,0 100,100 0,100" />
              <line x1="0" y1="100" x2="100" y2="0" stroke="#D4AF37" strokeWidth="2.5" />
            </svg>
          </div>

          {/* Top Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <img 
              src="/logo.svg" 
              alt="Chalapathi University" 
              className="h-12 sm:h-14 w-auto object-contain brightness-0 invert drop-shadow-md" 
            />
          </div>

          {/* Center Banner Content */}
          <div className="relative z-10 my-auto pt-10 pb-6 max-w-lg">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
              <span className="font-serif font-normal block text-2xl sm:text-3xl text-gray-200 mb-1">Welcome to</span>
              Chalapathi University
              <span className="block text-[#D4AF37] mt-1.5 drop-shadow-sm font-black">Admin Portal</span>
            </h1>
            <p className="mt-5 text-sm sm:text-base text-blue-100/80 font-normal leading-relaxed max-w-md">
              Empowering excellence in education through technology and innovation.
            </p>
          </div>

          {/* Bottom Feature Badges */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 mt-6">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                <Shield size={18} />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-extrabold text-white leading-tight">Secure Access</div>
                <div className="text-[9px] text-gray-400 font-medium">Encrypted System</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                <Users size={18} />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-extrabold text-white leading-tight">Role Based</div>
                <div className="text-[9px] text-gray-400 font-medium">Custom Control</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                <BarChart3 size={18} />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-extrabold text-white leading-tight">Real-time</div>
                <div className="text-[9px] text-gray-400 font-medium">Live Analytics</div>
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* RIGHT PANEL: Floating Login Card                         */}
        {/* ======================================================== */}
        <div className="w-full lg:w-[50%] xl:w-[48%] min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-12 z-10 relative bg-[#F8F9FD]">
          
          {/* Top Right Branding */}
          <div className="flex justify-end items-center">
            <div className="flex items-center gap-2.5">
              <img 
                src="/logo.svg" 
                alt="Chalapathi University" 
                className="h-10 sm:h-12 w-auto object-contain" 
              />
            </div>
          </div>

          {/* Center Floating White Login Card */}
          <div className="my-auto max-w-[440px] w-full mx-auto bg-white rounded-[32px] p-8 sm:p-10 shadow-[0_20px_60px_rgba(7,26,58,0.07)] border border-gray-100/80 text-left font-[var(--font-poppins)]">
            
            {/* Circular Crest Badge */}
            <div className="w-20 h-20 rounded-full bg-white border border-gray-200/90 shadow-md flex items-center justify-center mx-auto mb-5 p-3">
              <img 
                src="/logo.svg" 
                alt="Chalapathi Crest" 
                className="w-full h-full object-contain" 
              />
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A3A] text-center tracking-tight">
              Admin Login
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 text-center mt-1.5 mb-8 font-medium">
              Sign in to access the admin portal
            </p>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Username / Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                  Username / Email
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your username or email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm font-medium focus:bg-white focus:outline-none focus:border-[#071A3A] focus:ring-2 focus:ring-[#071A3A]/10 transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full h-12 pl-11 pr-11 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm font-medium focus:bg-white focus:outline-none focus:border-[#071A3A] focus:ring-2 focus:ring-[#071A3A]/10 transition-all placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors outline-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1 pb-2">
                <label className="flex items-center gap-2 text-gray-600 font-medium cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#071A3A] focus:ring-[#071A3A] cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert("Please contact system administrator to reset password.")}
                  className="text-blue-600 hover:text-[#071A3A] font-semibold transition-colors cursor-pointer outline-none"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Error notification */}
              {authError && (
                <p className="text-xs font-bold text-rose-600 text-center bg-rose-50 border border-rose-200 py-2.5 px-3 rounded-xl">
                  {authError}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 bg-[#041638] hover:bg-[#07255c] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#041638]/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Sign In</span>
                <ArrowRight size={16} />
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200/80" />
                </div>
                <span className="relative bg-white px-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  or
                </span>
              </div>

              {/* SSO Button */}
              <button
                type="button"
                onClick={() => {
                  setIsAuthenticated(true);
                  setAuthError("");
                }}
                className="w-full h-11 bg-white hover:bg-slate-50 border border-gray-200 text-[#071A3A] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
              >
                <ShieldCheck size={16} className="text-[#071A3A]" />
                <span>Login with SSO</span>
              </button>

            </form>
          </div>

          {/* Footer Copyright */}
          <div className="text-center text-[11px] text-gray-400 font-medium mt-6">
            © 2026 Chalapathi University. All rights reserved.
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA] text-left font-[var(--font-poppins)] flex flex-col selection:bg-[#071A3A] selection:text-white">
      
      {/* ======================================================== */}
      {/* TOP HEADER NAVIGATION BAR (Exact match to reference)     */}
      {/* ======================================================== */}
      <header className="h-16 bg-white border-b border-gray-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        {/* Left Branding & Menu Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <img 
            src="/logo.svg" 
            alt="Chalapathi University" 
            className="h-9 sm:h-10 w-auto object-contain cursor-pointer" 
            onClick={() => setActiveTab("dashboard")}
          />
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer outline-none"
            title="Toggle Sidebar"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Center Top Nav Menu Dropdowns */}
        <nav className="hidden xl:flex items-center gap-1">
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "academics", label: "Academics" },
            { id: "admissions", label: "Admissions" },
            { id: "examinations", label: "Examinations" },
            { id: "placements", label: "Placements" },
            { id: "campus-life", label: "Campus Life" },
            { id: "finance", label: "Finance" },
            { id: "reports", label: "Reports" }
          ].map(menu => {
            const isActive = activeTab === menu.id;
            return (
              <button
                key={menu.id}
                onClick={() => setActiveTab(menu.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer outline-none ${
                  isActive 
                    ? "text-[#D71920] font-extrabold bg-red-50/50" 
                    : "text-gray-700 hover:text-[#071A3A] hover:bg-slate-50"
                }`}
              >
                <span>{menu.label}</span>
                {menu.id !== "dashboard" && <ChevronDown size={13} className="text-gray-400" />}
              </button>
            );
          })}
        </nav>

        {/* Right Quick Action & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Action Button */}
          <div className="relative">
            <button 
              onClick={() => setActiveTab("announcements")}
              className="h-9 px-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>+ Quick Action</span>
              <ChevronDown size={13} />
            </button>
          </div>

          {/* Notification Bell */}
          <button 
            onClick={() => setActiveTab("announcements")}
            className="relative p-2 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer outline-none"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
              6
            </span>
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2.5 pl-1.5 border-l border-gray-200">
            <img 
              src="/chairman_portrait.png" 
              alt="Admin Profile" 
              className="w-9 h-9 rounded-full object-cover border-2 border-[#071A3A]/20 shadow-xs" 
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-extrabold text-gray-900 leading-tight">Dr. Admin Kumar</span>
              <span className="text-[10px] text-gray-500 font-medium">Super Administrator</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar + Workplace Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR PANEL */}
        {sidebarOpen && (
          <aside className="w-64 bg-white border-r border-gray-200/80 shrink-0 flex flex-col justify-between select-none z-30 transition-all duration-300">
            <div>
              <div className="px-5 pt-5 pb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
                  ADMIN PORTAL
                </span>
              </div>

              <nav className="p-3 space-y-1">
                {[
                  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                  { id: "directories", label: "Users & Faculty", icon: Users },
                  { id: "academics", label: "Academic Programs", icon: BookOpen },
                  { id: "admissions", label: "Admissions", icon: UserPlus },
                  { id: "examinations", label: "Examinations", icon: CheckSquare },
                  { id: "placements", label: "Placements", icon: Briefcase },
                  { id: "campus-life", label: "Campus Life", icon: Building },
                  { id: "leads", label: "Leads Manager", icon: FileSpreadsheet },
                  { id: "finance", label: "Finance", icon: CreditCard },
                  { id: "communication", label: "Communication", icon: MessageSquare },
                  { id: "news-events", label: "Events & News", icon: Calendar },
                  { id: "library", label: "Library", icon: Library },
                  { id: "reports", label: "Reports", icon: BarChart2 },
                  { id: "homepage-sections", label: "Homepage Control", icon: Layers },
                  { id: "marquee-ticker", label: "Marquee Ticker", icon: Megaphone },
                  { id: "settings", label: "Settings", icon: Settings }
                ].map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full h-10 px-3.5 rounded-xl flex items-center justify-between text-xs font-bold transition-all text-left outline-none cursor-pointer ${
                        isActive
                          ? "bg-blue-50 text-blue-700 font-extrabold shadow-2xs"
                          : "text-gray-600 hover:bg-slate-50 hover:text-gray-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} className={isActive ? "text-blue-600" : "text-gray-400"} />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight size={14} className="text-blue-600" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Profile Footer inside Sidebar */}
            <div className="p-4 border-t border-gray-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    src="/chairman_portrait.png" 
                    alt="Admin Avatar" 
                    className="w-10 h-10 rounded-full object-cover border border-gray-200" 
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-extrabold text-gray-900 leading-tight">Dr. Admin Kumar</span>
                  <span className="text-[10px] text-gray-500">Super Administrator</span>
                  <span className="text-[9px] text-emerald-600 font-bold mt-0.5">● Online</span>
                </div>
              </div>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="mt-3 w-full h-8 bg-white hover:bg-rose-50 border border-gray-200 text-rose-600 font-bold text-[11px] rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        )}

        {/* Main Administrative Workplace Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-[1550px] mx-auto text-left">
          {saveSuccess && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold animate-fade-in shadow-xs">
              <CheckCircle size={18} className="text-emerald-600" />
              <span>Settings and website data updated successfully across all pages!</span>
            </div>
          )}

          {/* Dynamic Panel rendering */}
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 shadow-xs">
            {/* Homepage Sections Manager Tab */}
            {activeTab === "homepage-sections" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">Homepage Control & Photo Manager</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Enable/disable homepage sections and change main hero photos, videos, and titles.</p>
                </div>
              </div>

              {/* Section Enable/Disable Toggles Grid */}
              <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-2xs space-y-4">
                <h3 className="text-sm font-extrabold text-gray-900 border-b border-gray-100 pb-3">Enable / Disable Main Page Sections</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { key: "heroVideo", label: "Hero Intro Video Banner" },
                    { key: "announcements", label: "Announcements Drawer & Ticker" },
                    { key: "programs", label: "Academic Programs Cards" },
                    { key: "chairmanMessage", label: "Chairman's Vision & Message" },
                    { key: "campusLife", label: "Campus Life & Video Tour" },
                    { key: "newsEvents", label: "Latest News & Events Section" },
                    { key: "placements", label: "Placements & Recruiters" },
                    { key: "certifications", label: "Global Certifications" },
                    { key: "virtualTour", label: "360 Virtual Tour Banner" }
                  ].map((item) => {
                    const isEnabled = sectionToggles[item.key as keyof typeof sectionToggles] !== false;
                    return (
                      <div key={item.key} className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-100 rounded-xl">
                        <span className="text-xs font-bold text-gray-800">{item.label}</span>
                        <button
                          type="button"
                          onClick={() => handleToggleSection(item.key)}
                          className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer outline-none ${isEnabled ? "bg-emerald-500" : "bg-gray-300"}`}
                        >
                          <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${isEnabled ? "translate-x-6" : ""}`} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Photo & Main Banner Content Editor */}
              <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-2xs space-y-6">
                <h3 className="text-sm font-extrabold text-gray-900 border-b border-gray-100 pb-3">Main Campus Photos & Video Settings</h3>
                
                <form onSubmit={handleSaveAbout} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Campus Intro Video File/URL</label>
                      <input 
                        type="text" 
                        value={campusVideoUrl} 
                        onChange={(e) => setCampusVideoUrl(e.target.value)} 
                        className="w-full h-10 px-3 border border-gray-200 rounded-xl text-xs font-medium" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">Chairman Portrait Photo URL</label>
                      <input 
                        type="text" 
                        value={hChairmanImage} 
                        onChange={(e) => setHChairmanImage(e.target.value)} 
                        className="w-full h-10 px-3 border border-gray-200 rounded-xl text-xs font-medium" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Chairman Message Heading</label>
                    <input 
                      type="text" 
                      value={hChairmanHeading} 
                      onChange={(e) => setHChairmanHeading(e.target.value)} 
                      className="w-full h-10 px-3 border border-gray-200 rounded-xl text-xs font-medium" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Chairman Full Message Text</label>
                    <textarea 
                      rows={4} 
                      value={hChairmanMessage} 
                      onChange={(e) => setHChairmanMessage(e.target.value)} 
                      className="w-full p-3 border border-gray-200 rounded-xl text-xs font-medium" 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="h-10 px-6 bg-[#071A3A] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow transition-colors cursor-pointer"
                  >
                    Save Photo & Banner Changes
                  </button>
                </form>
              </div>
            </div>
          )}

            {/* ═══ Marquee Ticker Manager Tab ═══ */}
            {activeTab === "marquee-ticker" && (
              <div className="space-y-6 animate-fade-in text-left">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-extrabold text-gray-900">Marquee Ticker Manager</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Add, edit, reorder, and link marquee ticker items. Each item scrolls across the homepage banner — click text opens its link.</p>
                  </div>
                  <button
                    onClick={handleAddMarqueeItem}
                    className="h-10 px-5 bg-[#071A3A] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <Plus size={14} /> Add Item
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h3 className="text-sm font-extrabold text-gray-900">Ticker Items ({marqueeItems.length})</h3>
                    <span className="text-[10px] text-gray-400 font-medium">Drag numbered items to reorder • leave Link empty for non-clickable text</span>
                  </div>

                  {marqueeItems.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                      <Megaphone size={40} className="mx-auto mb-3 opacity-30" />
                      <p className="text-sm font-bold">No ticker items yet</p>
                      <p className="text-xs mt-1">Click "Add Item" to create your first marquee message.</p>
                    </div>
                  )}

                  {marqueeItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl group hover:border-blue-200 transition-colors">
                      {/* Number Badge */}
                      <div className="flex flex-col items-center gap-1 pt-2">
                        <span className="w-7 h-7 rounded-lg bg-[#071A3A] text-white text-xs font-black flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleMoveMarqueeItem(index, "up")}
                          disabled={index === 0}
                          className="text-gray-400 hover:text-blue-600 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
                          title="Move up"
                        >
                          <ChevronDown size={14} className="rotate-180" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveMarqueeItem(index, "down")}
                          disabled={index === marqueeItems.length - 1}
                          className="text-gray-400 hover:text-blue-600 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
                          title="Move down"
                        >
                          <ChevronDown size={14} />
                        </button>
                      </div>

                      {/* Text & Link Fields */}
                      <div className="flex-1 space-y-2">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Ticker Text</label>
                          <input
                            type="text"
                            value={item.text}
                            onChange={(e) => handleUpdateMarqueeItem(index, "text", e.target.value)}
                            placeholder="Enter ticker message..."
                            className="w-full h-10 px-3 border border-gray-200 rounded-xl text-xs font-medium focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Link URL <span className="text-gray-300 font-normal">(optional — e.g. /admissions or https://...)</span></label>
                          <input
                            type="text"
                            value={item.link}
                            onChange={(e) => handleUpdateMarqueeItem(index, "link", e.target.value)}
                            placeholder="/admissions or https://example.com"
                            className="w-full h-10 px-3 border border-gray-200 rounded-xl text-xs font-medium focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteMarqueeItem(index)}
                        className="mt-2 p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                        title="Delete item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Save Button */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleSaveMarqueeItems}
                    className="h-11 px-8 bg-[#071A3A] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <CheckCircle size={16} /> Save Ticker Changes
                  </button>
                  <span className="text-[10px] text-gray-400">Changes are saved to the homepage marquee banner instantly.</span>
                </div>
              </div>
            )}

          {/* 🌟 Tab 1: Dashboard Overview matching reference image */}
          {activeTab === "dashboard" && (
              <div className="space-y-6 animate-fade-in">
                
                {/* 1. Greeting & Date Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                      Welcome back, Admin!
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                      Here's what's happening at Chalapathi University today.
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200/90 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-2xs shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Calendar size={16} />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-extrabold text-gray-900 leading-none">20 May 2025</span>
                      <span className="text-[10px] text-gray-400 font-medium mt-1">Tuesday</span>
                    </div>
                  </div>
                </div>

                {/* 2. Row of 5 Key Stat Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  
                  {/* Card 1: Total Students */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-500">Total Students</span>
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <GraduationCap size={18} />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-gray-900">15,642</div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <TrendingUp size={13} />
                      <span>12.5% from last month</span>
                    </div>
                  </div>

                  {/* Card 2: New Admissions */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-500">New Admissions</span>
                      <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                        <UserPlus size={18} />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-gray-900">1,248</div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <TrendingUp size={13} />
                      <span>8.3% from last month</span>
                    </div>
                  </div>

                  {/* Card 3: Faculty Members */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-500">Faculty Members</span>
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Users size={18} />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-gray-900">1,032</div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <TrendingUp size={13} />
                      <span>4.7% from last month</span>
                    </div>
                  </div>

                  {/* Card 4: Active Courses */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-500">Active Courses</span>
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <BookOpen size={18} />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-gray-900">286</div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <TrendingUp size={13} />
                      <span>2.1% from last month</span>
                    </div>
                  </div>

                  {/* Card 5: Placements (This Year) */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-500">Placements (This Year)</span>
                      <div className="w-9 h-9 rounded-xl bg-[#071A3A]/10 text-[#071A3A] flex items-center justify-center">
                        <Briefcase size={18} />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-gray-900">98.6%</div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <TrendingUp size={13} />
                      <span>3.2% from last year</span>
                    </div>
                  </div>

                </div>

                {/* 3. Middle Charts & Quick Actions Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Admissions Overview Donut Chart Card */}
                  <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-150 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-extrabold text-gray-900">Admissions Overview</h3>
                      <select className="h-8 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 bg-gray-50 outline-none cursor-pointer">
                        <option>2025-26</option>
                        <option>2024-25</option>
                      </select>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
                      {/* SVG Donut Graphic */}
                      <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path className="text-gray-100" strokeWidth="4.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          {/* UG (47.4%) - Blue */}
                          <path className="text-blue-600" strokeDasharray="47.4, 100" strokeWidth="4.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          {/* PG (31.3%) - Orange */}
                          <path className="text-orange-500" strokeDasharray="31.3, 100" strokeDashoffset="-47.4" strokeWidth="4.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          {/* PhD (12.4%) - Yellow */}
                          <path className="text-amber-400" strokeDasharray="12.4, 100" strokeDashoffset="-78.7" strokeWidth="4.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          {/* Diploma (8.9%) - Purple */}
                          <path className="text-purple-500" strokeDasharray="8.9, 100" strokeDashoffset="-91.1" strokeWidth="4.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total</span>
                          <span className="text-lg font-black text-gray-900">6,842</span>
                        </div>
                      </div>

                      {/* Donut Legend List */}
                      <div className="space-y-2.5 w-full text-xs font-semibold">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                            <span className="text-gray-700">Undergraduate</span>
                          </div>
                          <span className="font-extrabold text-gray-900">3,245 <span className="text-[10px] text-gray-400 font-normal">(47.4%)</span></span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                            <span className="text-gray-700">Postgraduate</span>
                          </div>
                          <span className="font-extrabold text-gray-900">2,142 <span className="text-[10px] text-gray-400 font-normal">(31.3%)</span></span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                            <span className="text-gray-700">Ph.D.</span>
                          </div>
                          <span className="font-extrabold text-gray-900">845 <span className="text-[10px] text-gray-400 font-normal">(12.4%)</span></span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                            <span className="text-gray-700">Diploma</span>
                          </div>
                          <span className="font-extrabold text-gray-900">610 <span className="text-[10px] text-gray-400 font-normal">(8.9%)</span></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Student Enrollments Line Graph Card */}
                  <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-150 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-extrabold text-gray-900">Student Enrollments</h3>
                      <select className="h-8 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 bg-gray-50 outline-none cursor-pointer">
                        <option>This Year</option>
                        <option>Last Year</option>
                      </select>
                    </div>

                    <div className="relative h-44 w-full flex items-end pt-4 pb-2">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path fill="url(#enrollGrad)" d="M 0,90 Q 50,70 100,50 T 200,40 T 300,10 L 300,120 L 0,120 Z" />
                        <path fill="none" stroke="#3B82F6" strokeWidth="3" d="M 0,90 Q 50,70 100,50 T 200,40 T 300,10" />
                        <circle cx="300" cy="10" r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
                      </svg>
                    </div>

                    <div className="grid grid-cols-6 gap-1 text-[9px] text-gray-400 font-bold text-center border-t border-gray-100 pt-2">
                      <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
                    </div>
                  </div>

                  {/* Quick Actions Card */}
                  <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-gray-150 shadow-2xs flex flex-col justify-between">
                    <h3 className="text-sm font-extrabold text-gray-900 mb-3">Quick Actions</h3>
                    <div className="space-y-1.5 flex-1">
                      {[
                        { label: "Add New User", tab: "directories", icon: UserPlus },
                        { label: "Create Announcement", tab: "announcements", icon: Megaphone },
                        { label: "Manage Admissions", tab: "admissions", icon: FileText },
                        { label: "Academic Calendar", tab: "calendar", icon: Calendar },
                        { label: "Generate Reports", tab: "reports", icon: BarChart2 },
                        { label: "System Settings", tab: "settings", icon: Settings }
                      ].map((action, idx) => {
                        const ActionIcon = action.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => setActiveTab(action.tab as any)}
                            className="w-full py-2 px-3 rounded-xl hover:bg-slate-50 text-xs font-bold text-gray-700 hover:text-blue-600 transition-colors flex items-center justify-between text-left cursor-pointer outline-none"
                          >
                            <div className="flex items-center gap-2.5">
                              <ActionIcon size={14} className="text-gray-400" />
                              <span>{action.label}</span>
                            </div>
                            <ChevronRight size={14} className="text-gray-400" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* 4. Bottom Data Cards Row: Recent Admissions, Announcements, & System Status */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Table: Recent Admissions */}
                  <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-150 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-extrabold text-gray-900">Recent Admissions</h3>
                      <button onClick={() => setActiveTab("admissions")} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                        View All
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-medium">
                        <thead>
                          <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase tracking-wider">
                            <th className="pb-2">Name</th>
                            <th className="pb-2">Program</th>
                            <th className="pb-2">Department</th>
                            <th className="pb-2">Status</th>
                            <th className="pb-2">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {[
                            { name: "Rohit Sharma", prog: "B.Tech", dept: "Computer Science", status: "Confirmed", statusBg: "bg-emerald-50 text-emerald-700", date: "20 May 2025" },
                            { name: "Ananya Reddy", prog: "BBA", dept: "Management", status: "Confirmed", statusBg: "bg-emerald-50 text-emerald-700", date: "19 May 2025" },
                            { name: "Vishal Patil", prog: "M.Tech", dept: "AI & ML", status: "Pending", statusBg: "bg-amber-50 text-amber-700", date: "19 May 2025" },
                            { name: "Sneha Iyer", prog: "B.Sc", dept: "Data Science", status: "Confirmed", statusBg: "bg-emerald-50 text-emerald-700", date: "18 May 2025" },
                            { name: "Karthik Babu", prog: "MBA", dept: "Management", status: "Confirmed", statusBg: "bg-emerald-50 text-emerald-700", date: "18 May 2025" }
                          ].map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50">
                              <td className="py-2.5 font-bold text-gray-900">{row.name}</td>
                              <td className="py-2.5 text-gray-600">{row.prog}</td>
                              <td className="py-2.5 text-gray-600">{row.dept}</td>
                              <td className="py-2.5">
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${row.statusBg}`}>
                                  {row.status}
                                </span>
                              </td>
                              <td className="py-2.5 text-gray-400 text-[11px]">{row.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Announcements Feed Card */}
                  <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-150 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-extrabold text-gray-900">Announcements</h3>
                      <button onClick={() => setActiveTab("announcements")} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                        View All
                      </button>
                    </div>

                    <div className="space-y-3">
                      {announcements.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="p-3 bg-gray-50/70 border border-gray-100 rounded-xl space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-extrabold text-[#071A3A] line-clamp-1">{item.title}</span>
                            <span className="text-[10px] text-gray-400 shrink-0 ml-2">{item.date}</span>
                          </div>
                          <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* System Status Card */}
                  <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-gray-150 shadow-2xs flex flex-col justify-between space-y-4">
                    <h3 className="text-sm font-extrabold text-gray-900">System Status</h3>
                    <div className="space-y-3 text-xs font-semibold">
                      <div className="flex items-center justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-600">Server Status</span>
                        <span className="text-emerald-600 font-bold flex items-center gap-1">Online <CheckCircle2 size={13} /></span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-600">Database</span>
                        <span className="text-emerald-600 font-bold flex items-center gap-1">Online <CheckCircle2 size={13} /></span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-600">Backup Status</span>
                        <span className="text-emerald-600 font-bold flex items-center gap-1">Successful <CheckCircle2 size={13} /></span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-600">Email Service</span>
                        <span className="text-emerald-600 font-bold flex items-center gap-1">Online <CheckCircle2 size={13} /></span>
                      </div>
                    </div>
                    <button 
                      onClick={() => showNotification()}
                      className="w-full h-9 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      View System Logs
                    </button>
                  </div>

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
                    className="w-full h-10 bg-[#D4AF37] hover:bg-[#C9A84C] text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer inline-flex items-center justify-center gap-1.5"
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

              {/* Homepage Chairman Section Settings */}
              <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-6 text-left">
                <span className="text-xs font-black uppercase text-[#072A6C] tracking-wider block border-b border-gray-100 pb-2">
                  Homepage Chairman Section Settings
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">Section Label</label>
                    <input
                      type="text"
                      value={localStorage.getItem("chalapathi_chairman_label") || "FROM THE CHAIRMAN"}
                      onChange={(e) => {
                        localStorage.setItem("chalapathi_chairman_label", e.target.value);
                        setHChairmanHeading(e.target.value);
                      }}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">Section Subtitle</label>
                    <input
                      type="text"
                      value={hChairmanSubtitle}
                      onChange={(e) => setHChairmanSubtitle(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">Chairman Name</label>
                    <input
                      type="text"
                      value={hChairmanName}
                      onChange={(e) => setHChairmanName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">Designation</label>
                    <input
                      type="text"
                      value={hChairmanDesignation}
                      onChange={(e) => setHChairmanDesignation(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">Institution Group / Info</label>
                    <input
                      type="text"
                      value={hChairmanGroup}
                      onChange={(e) => setHChairmanGroup(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Chairman Message</label>
                  <textarea
                    rows={4}
                    value={hChairmanMessage}
                    onChange={(e) => setHChairmanMessage(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">Chairman Photo URL</label>
                    <input
                      type="text"
                      value={hChairmanImage}
                      onChange={(e) => setHChairmanImage(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">Watch Video URL</label>
                    <input
                      type="text"
                      value={hChairmanVideoUrl}
                      onChange={(e) => setHChairmanVideoUrl(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">Watch Button Text</label>
                    <input
                      type="text"
                      value={hChairmanBtnText}
                      onChange={(e) => setHChairmanBtnText(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                    />
                  </div>
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
                    className="h-10 px-8 bg-[#D4AF37] hover:bg-[#C9A84C] text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
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

          {activeTab === "news-events" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-xl font-black text-[#072A6C] uppercase tracking-wider">News, Events & Video Editor</h1>
                <p className="text-xs text-gray-500 font-light mt-0.5">Manage articles, campus video overlays, and upcoming events displayed on the homepage.</p>
              </div>

              {/* Sub-section toggles */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "news", label: "News Articles" },
                  { id: "events", label: "Upcoming Events" },
                  { id: "video", label: "Campus Video" }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setNewsEventsSection(s.id as any)}
                    className={`h-9 rounded-xl border text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      newsEventsSection === s.id
                        ? "bg-[#072A6C] border-[#072A6C] text-white shadow-sm"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Section A: News Articles */}
              {newsEventsSection === "news" && (
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
              )}

              {/* Section B: Events */}
              {newsEventsSection === "events" && (
                <div className="space-y-6">
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
                      className="h-10 px-8 bg-[#D4AF37] hover:bg-[#C9A84C] text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
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
              )}

              {/* Section C: Campus Video Settings */}
              {newsEventsSection === "video" && (
                <div className="space-y-6 text-left">
                  <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                    <span className="text-xs font-black uppercase text-[#072A6C] tracking-wider block border-b border-gray-100 pb-2">Campus Video Player Settings</span>
                    
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-gray-500">Video File URL / Path</label>
                        <input 
                          type="text" 
                          value={campusVideoUrl} 
                          onChange={(e) => setCampusVideoUrl(e.target.value)} 
                          className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                          placeholder="/chalapathi_logo_intro.mp4"
                        />
                        <p className="text-[10px] text-gray-400 font-light">Provide the URL or relative path to the MP4 campus tour video. Default is `/chalapathi_logo_intro.mp4`.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-500">Overlay Card Header Text</label>
                          <input 
                            type="text" 
                            value={campusVideoText} 
                            onChange={(e) => setCampusVideoText(e.target.value)} 
                            className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                            placeholder="Explore Chalapathi Campus"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-500">Overlay Card Subtext</label>
                          <input 
                            type="text" 
                            value={campusVideoSubtext} 
                            onChange={(e) => setCampusVideoSubtext(e.target.value)} 
                            className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium"
                            placeholder="Experience innovation, research, smart classrooms and vibrant student life."
                          />
                        </div>
                      </div>
                    </div>

                    <button 
                      type="button" 
                      onClick={() => {
                        localStorage.setItem("chalapathi_campus_video", campusVideoUrl);
                        localStorage.setItem("chalapathi_campus_video_text", campusVideoText);
                        localStorage.setItem("chalapathi_campus_video_subtext", campusVideoSubtext);
                        showNotification();
                      }}
                      className="w-full h-11 bg-[#072A6C] hover:bg-[#072A6C]/90 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors cursor-pointer mt-4"
                    >
                      Save Video Settings
                    </button>
                  </div>
                </div>
              )}
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
                        className="h-8 px-3 rounded-lg bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
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
                            <div key={idx} className="p-3.5 rounded-xl bg-white border border-gray-100 flex justify-between items-center text-xs shadow-sm hover:border-[#D4AF37]/20 transition-colors">
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
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "content", label: "Content & Stats" },
                  { id: "students", label: "Placed Students" },
                  { id: "stories", label: "Success Stories" },
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
                      <button type="button" onClick={() => setPlacementsForm({ ...placementsForm, careerPrograms: [...placementsForm.careerPrograms, ""] })} className="h-7 px-2 rounded-lg bg-[#D4AF37] text-white text-[10px] font-bold uppercase flex items-center gap-1 cursor-pointer"><Plus size={12} /> Add</button>
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
                      <button type="button" onClick={() => setPlacementsForm({ ...placementsForm, industryConnectItems: [...placementsForm.industryConnectItems, ""] })} className="h-7 px-2 rounded-lg bg-[#D4AF37] text-white text-[10px] font-bold uppercase flex items-center gap-1 cursor-pointer"><Plus size={12} /> Add</button>
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
                      <button type="button" onClick={() => setPlacementsForm({ ...placementsForm, placementCellItems: [...placementsForm.placementCellItems, { t: "", d: "" }] })} className="h-7 px-2 rounded-lg bg-[#D4AF37] text-white text-[10px] font-bold uppercase flex items-center gap-1 cursor-pointer"><Plus size={12} /> Add</button>
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
                        <button type="button" onClick={() => { setEditStudentIdx("new"); setStudentForm({ name: "", branch: "", company: "", ctc: "", img: "" }); }} className="h-8 px-3 rounded-lg bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"><Plus size={12} /> Add Student</button>
                      </div>
                      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                        {placementsContent.placedStudents.map((s, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-white border border-gray-100 flex justify-between items-center text-xs shadow-sm hover:border-[#D4AF37]/20 transition-colors">
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

              {/* Success Stories Sub-section */}
              {placementsSection === "stories" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-xs font-extrabold uppercase text-gray-500 tracking-wider">Success Stories ({successStories.length})</span>
                        <button 
                          type="button" 
                          onClick={() => { 
                            setEditStoryIdx("new"); 
                            setStoryForm({ 
                              id: Date.now(), 
                              studentName: "", 
                              studentImage: "", 
                              department: "", 
                              batch: "", 
                              companyName: "", 
                              companyLogo: "", 
                              packageOffered: "", 
                              description: "", 
                              skills: [],
                              internshipExp: "",
                              achievement: "",
                              milestones: { 
                                learningTitle: "", 
                                learningDesc: "", 
                                internshipTitle: "", 
                                internshipDesc: "", 
                                placementTitle: "", 
                                placementDesc: "", 
                                careerTitle: "", 
                                careerDesc: "" 
                              } 
                            }); 
                          }} 
                          className="h-8 px-3 rounded-lg bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Plus size={12} /> Add Story
                        </button>
                      </div>
                      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                        {successStories.map((story, idx) => (
                          <div key={story.id} className="p-3.5 rounded-xl bg-white border border-gray-100 flex justify-between items-center text-xs shadow-sm hover:border-[#D4AF37]/20 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                                <img src={story.studentImage} alt={story.studentName} className="w-full h-full object-cover" />
                              </div>
                              <div className="text-left">
                                <span className="font-bold text-gray-700 block">{story.studentName}</span>
                                <span className="text-[10px] text-gray-400 block">{story.companyName} • {story.packageOffered}</span>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <button type="button" onClick={() => { setEditStoryIdx(idx); setStoryForm({ ...story }); }} className="text-blue-600 hover:text-blue-800 font-bold uppercase text-[10px] cursor-pointer">Edit</button>
                              <button type="button" onClick={() => { const arr = successStories.filter((_, i) => i !== idx); updateSuccessStories(arr); showNotification(); }} className="text-rose-500 hover:text-rose-700 font-bold uppercase text-[10px] cursor-pointer">Delete</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    {editStoryIdx !== null ? (
                      <form onSubmit={(e) => { 
                        e.preventDefault(); 
                        const arr = [...successStories]; 
                        if (editStoryIdx === "new") { 
                          arr.push({ ...storyForm, id: Date.now() }); 
                        } else { 
                          arr[editStoryIdx] = storyForm; 
                        } 
                        updateSuccessStories(arr); 
                        setEditStoryIdx(null); 
                        showNotification(); 
                      }} className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4 text-left">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                          <span className="text-xs font-black uppercase text-[#072A6C] tracking-wider">{editStoryIdx === "new" ? "Add Success Story" : "Edit Story"}</span>
                          <button type="button" onClick={() => setEditStoryIdx(null)} className="text-gray-400 hover:text-gray-600 text-xs font-bold uppercase tracking-wider cursor-pointer">Cancel</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-gray-500">Student Name</label>
                            <input type="text" required value={storyForm.studentName} onChange={(e) => setStoryForm({ ...storyForm, studentName: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-gray-500">Department</label>
                            <input type="text" required value={storyForm.department} onChange={(e) => setStoryForm({ ...storyForm, department: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-gray-500">Batch</label>
                            <input type="text" required value={storyForm.batch} onChange={(e) => setStoryForm({ ...storyForm, batch: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-gray-500">Company Name</label>
                            <input type="text" required value={storyForm.companyName} onChange={(e) => setStoryForm({ ...storyForm, companyName: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-gray-500">Company Logo URL</label>
                            <input type="text" required value={storyForm.companyLogo} onChange={(e) => setStoryForm({ ...storyForm, companyLogo: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-gray-500">Package Offered</label>
                            <input type="text" required value={storyForm.packageOffered} onChange={(e) => setStoryForm({ ...storyForm, packageOffered: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-500">Student Photo URL</label>
                          <input type="text" required value={storyForm.studentImage} onChange={(e) => setStoryForm({ ...storyForm, studentImage: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-500">Testimonial Description</label>
                          <textarea required rows={3} value={storyForm.description} onChange={(e) => setStoryForm({ ...storyForm, description: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium resize-none" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-gray-500">Skills Acquired (comma separated)</label>
                            <input type="text" value={storyForm.skills?.join(", ") || ""} onChange={(e) => setStoryForm({ ...storyForm, skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-gray-500">Internship Term / Experience</label>
                            <input type="text" value={storyForm.internshipExp || ""} onChange={(e) => setStoryForm({ ...storyForm, internshipExp: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-500">Top Career Achievement</label>
                          <input type="text" value={storyForm.achievement || ""} onChange={(e) => setStoryForm({ ...storyForm, achievement: e.target.value })} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                        </div>

                        {/* Milestones Edit */}
                        <div className="border-t border-gray-100 pt-4 space-y-4">
                          <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block">Milestones Setup</span>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold uppercase text-gray-500">Step 1 Title</label>
                              <input type="text" required value={storyForm.milestones.learningTitle} onChange={(e) => setStoryForm({ ...storyForm, milestones: { ...storyForm.milestones, learningTitle: e.target.value } })} className="w-full h-9 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold uppercase text-gray-500">Step 1 Details</label>
                              <input type="text" required value={storyForm.milestones.learningDesc} onChange={(e) => setStoryForm({ ...storyForm, milestones: { ...storyForm.milestones, learningDesc: e.target.value } })} className="w-full h-9 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold uppercase text-gray-500">Step 2 Title</label>
                              <input type="text" required value={storyForm.milestones.internshipTitle} onChange={(e) => setStoryForm({ ...storyForm, milestones: { ...storyForm.milestones, internshipTitle: e.target.value } })} className="w-full h-9 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold uppercase text-gray-500">Step 2 Details</label>
                              <input type="text" required value={storyForm.milestones.internshipDesc} onChange={(e) => setStoryForm({ ...storyForm, milestones: { ...storyForm.milestones, internshipDesc: e.target.value } })} className="w-full h-9 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold uppercase text-gray-500">Step 3 Title</label>
                              <input type="text" required value={storyForm.milestones.placementTitle} onChange={(e) => setStoryForm({ ...storyForm, milestones: { ...storyForm.milestones, placementTitle: e.target.value } })} className="w-full h-9 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold uppercase text-gray-500">Step 3 Details</label>
                              <input type="text" required value={storyForm.milestones.placementDesc} onChange={(e) => setStoryForm({ ...storyForm, milestones: { ...storyForm.milestones, placementDesc: e.target.value } })} className="w-full h-9 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold uppercase text-gray-500">Step 4 Title</label>
                              <input type="text" required value={storyForm.milestones.careerTitle} onChange={(e) => setStoryForm({ ...storyForm, milestones: { ...storyForm.milestones, careerTitle: e.target.value } })} className="w-full h-9 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold uppercase text-gray-500">Step 4 Details</label>
                              <input type="text" required value={storyForm.milestones.careerDesc} onChange={(e) => setStoryForm({ ...storyForm, milestones: { ...storyForm.milestones, careerDesc: e.target.value } })} className="w-full h-9 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-medium" />
                            </div>
                          </div>
                        </div>

                        <button type="submit" className="w-full h-11 bg-[#072A6C] hover:bg-[#072A6C]/90 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors cursor-pointer mt-4">Save Story</button>
                      </form>
                    ) : (
                      <div className="bg-gray-50 border border-dashed border-gray-200 p-8 rounded-2xl flex flex-col items-center justify-center text-center min-h-[300px]">
                        <Users className="text-gray-300 mb-3" size={40} />
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">No Story Selected</span>
                        <p className="text-[11px] text-gray-400 font-light mt-1 max-w-[280px]">Select a success story from the list to edit, or click Add Story to add a new student achievement.</p>
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
                        <button type="button" onClick={() => { setEditRecruiterIdx("new"); setRecruiterForm({ name: "", logo: "" }); }} className="h-8 px-3 rounded-lg bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"><Plus size={12} /> Add Recruiter</button>
                      </div>
                      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                        {placementsContent.recruiters.map((r, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-white border border-gray-100 flex justify-between items-center text-xs shadow-sm hover:border-[#D4AF37]/20 transition-colors">
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
          {activeTab === "leads" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">Admissions Lead Manager</h2>
                  <p className="text-xs text-gray-500 mt-0.5">View, filter, and export leads collected from the admissions enquiry forms.</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      if (window.confirm("Are you sure you want to clear all leads? This action cannot be undone.")) {
                        localStorage.removeItem("chalapathi_enquiry_leads");
                        window.location.reload();
                      }
                    }}
                    className="h-10 px-4 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>Clear All</span>
                  </button>
                  <button 
                    onClick={() => {
                      const leads = JSON.parse(localStorage.getItem("chalapathi_enquiry_leads") || "[]");
                      if (leads.length === 0) {
                        alert("No leads available to export!");
                        return;
                      }
                      const headers = ["ID", "Timestamp", "Name", "Mobile", "Email", "City", "State", "Qualification", "Year of Passing", "Program", "Query"];
                      const csvRows = [headers.join(",")];
                      leads.forEach((lead: any) => {
                        const values = [
                          lead.id || "",
                          lead.timestamp || "",
                          `"${(lead.name || "").replace(/"/g, '""')}"`,
                          lead.mobile || "",
                          lead.email || "",
                          `"${(lead.city || "").replace(/"/g, '""')}"`,
                          lead.state || "",
                          lead.qualification || "",
                          lead.yearOfPassing || "",
                          `"${(lead.program || "").replace(/"/g, '""')}"`,
                          `"${(lead.query || "").replace(/"/g, '""')}"`
                        ];
                        csvRows.push(values.join(","));
                      });
                      const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", `chalapathi_leads_${new Date().toISOString().split('T')[0]}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="h-10 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <FileSpreadsheet size={14} />
                    <span>Export to CSV</span>
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-white rounded-2xl border border-gray-150 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-medium">
                    <thead>
                      <tr className="border-b border-gray-200 text-[10px] text-gray-400 uppercase tracking-wider bg-gray-50/50">
                        <th className="py-3.5 px-4">Date</th>
                        <th className="py-3.5 px-4">Name</th>
                        <th className="py-3.5 px-4">Contact</th>
                        <th className="py-3.5 px-4">Location</th>
                        <th className="py-3.5 px-4">Qualification</th>
                        <th className="py-3.5 px-4">Interested Program</th>
                        <th className="py-3.5 px-4">Query</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                      {(() => {
                        const leads = JSON.parse(localStorage.getItem("chalapathi_enquiry_leads") || "[]");
                        if (leads.length === 0) {
                          return (
                            <tr>
                              <td colSpan={7} className="py-12 text-center text-gray-400 font-light">
                                No leads have been submitted yet.
                              </td>
                            </tr>
                          );
                        }
                        return leads.map((lead: any, i: number) => (
                          <tr key={i} className="hover:bg-slate-50/50">
                            <td className="py-3.5 px-4 whitespace-nowrap text-gray-400 font-mono text-[10px]">
                              {lead.timestamp ? new Date(lead.timestamp).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit"
                              }) : "N/A"}
                            </td>
                            <td className="py-3.5 px-4 font-bold text-gray-900">{lead.name}</td>
                            <td className="py-3.5 px-4 space-y-0.5">
                              <span className="block font-bold text-gray-800">{lead.mobile}</span>
                              <span className="block text-[10px] text-gray-400">{lead.email}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="block text-gray-800">{lead.city}</span>
                              <span className="block text-[10px] text-gray-400 font-bold uppercase">{lead.state}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="block text-gray-800">{lead.qualification}</span>
                              <span className="block text-[10px] text-gray-400">Class of {lead.yearOfPassing}</span>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-blue-900">{lead.program}</td>
                            <td className="py-3.5 px-4 max-w-[200px] truncate text-gray-500 italic" title={lead.query}>
                              {lead.query || "-"}
                            </td>
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

                    {activeTab === "campus-life" && (
            <form onSubmit={handleSaveCampusLife} className="space-y-6">
              <div>
                <h1 className="text-xl font-black text-[#072A6C] uppercase tracking-wider">Campus Life Editor</h1>
                <p className="text-xs text-gray-500 font-light mt-0.5">Modify headers, interactive feature cards grid, HTML5 campus tour videos, and carousel gallery content.</p>
              </div>

              {/* Title & Headers */}
              <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4 text-left">
                <span className="text-xs font-black uppercase text-[#072A6C] tracking-wider block border-b border-gray-100 pb-2">Headers & Subtitles</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">Section Label</label>
                    <input
                      type="text"
                      value={campusLabel}
                      onChange={(e) => setCampusLabel(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">Section Subtitle</label>
                    <input
                      type="text"
                      value={campusSubtitle}
                      onChange={(e) => setCampusSubtitle(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Feature Cards Raw Config JSON */}
              <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4 text-left">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-xs font-black uppercase text-[#072A6C] tracking-wider">Interactive Feature Cards (2x4 Grid JSON)</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Must be a valid JSON array</span>
                </div>
                <textarea
                  rows={8}
                  value={campusCardsRaw}
                  onChange={(e) => setCampusCardsRaw(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-mono"
                />
              </div>

              {/* Campus Videos List JSON */}
              <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4 text-left">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-xs font-black uppercase text-[#072A6C] tracking-wider">Campus Tour Sliding Videos JSON</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Must be a valid JSON array</span>
                </div>
                <textarea
                  rows={6}
                  value={campusVideosRaw}
                  onChange={(e) => setCampusVideosRaw(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-mono"
                />
              </div>

              {/* Gallery Images List JSON */}
              <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4 text-left">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-xs font-black uppercase text-[#072A6C] tracking-wider">Campus Gallery Carousel Items (Memories) JSON</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Must be a valid JSON array</span>
                </div>
                <textarea
                  rows={8}
                  value={campusGalleryRaw}
                  onChange={(e) => setCampusGalleryRaw(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#072A6C] text-xs font-mono"
                />
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="h-11 px-8 bg-[#072A6C] hover:bg-[#051c4a] text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md transition-colors"
                >
                  Save Campus Life Changes
                </button>
              </div>
            </form>
          )}

          {/* Generic Management View for remaining tabs */}
          {["users", "admissions", "examinations", "finance", "communication", "library", "reports", "settings"].includes(activeTab) && (
            <div className="space-y-6 animate-fade-in text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 capitalize">{activeTab} Management</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Manage records, configurations, and data for {activeTab}.</p>
                </div>
                <button 
                  onClick={() => showNotification()}
                  className="h-10 px-5 bg-[#071A3A] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add New Entry</span>
                </button>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-medium">
                  <thead>
                    <tr className="border-b border-gray-200 text-[10px] text-gray-400 uppercase tracking-wider bg-gray-50">
                      <th className="py-3 px-4">ID</th>
                      <th className="py-3 px-4">Record Title / Name</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Last Updated</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { id: "REC-101", title: `Standard ${activeTab.toUpperCase()} Record`, cat: activeTab.toUpperCase(), status: "Active", date: "20 May 2025" },
                      { id: "REC-102", title: "Central System Configuration", cat: activeTab.toUpperCase(), status: "Verified", date: "19 May 2025" },
                      { id: "REC-103", title: "Departmental Operation Data", cat: activeTab.toUpperCase(), status: "Active", date: "18 May 2025" }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono font-bold text-blue-600">{row.id}</td>
                        <td className="py-3 px-4 font-bold text-gray-900">{row.title}</td>
                        <td className="py-3 px-4 text-gray-600">{row.cat}</td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-400">{row.date}</td>
                        <td className="py-3 px-4 text-right">
                          <button onClick={() => showNotification()} className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer">
                            <Edit3 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  </div>
);
}
