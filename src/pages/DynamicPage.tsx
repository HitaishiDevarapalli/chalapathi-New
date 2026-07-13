"use client";

import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronDown, Home, Calendar, BookOpen, Landmark, Info, Phone, ShieldCheck, UserPlus, FileText, UploadCloud, CreditCard, Clock, ShieldAlert, UserCheck, Scale, CalendarRange, GraduationCap, Mail, User, X, Globe } from "lucide-react";
import { PROGRAMS_DATA } from "../data/programsData";


const getProgramTimeline = (title: string) => {
  const isCse = title.toLowerCase().includes("cse") || title.toLowerCase().includes("computer") || title.toLowerCase().includes("intelligence") || title.toLowerCase().includes("data science");
  const isEce = title.toLowerCase().includes("ece") || title.toLowerCase().includes("electronics") || title.toLowerCase().includes("vlsi") || title.toLowerCase().includes("embedded");
  const isEee = title.toLowerCase().includes("eee") || title.toLowerCase().includes("electrical") || title.toLowerCase().includes("power") || title.toLowerCase().includes("grid");
  const isMech = title.toLowerCase().includes("mechanical") || title.toLowerCase().includes("mechatronics") || title.toLowerCase().includes("automobile") || title.toLowerCase().includes("manufacturing");
  const isCivil = title.toLowerCase().includes("civil") || title.toLowerCase().includes("structure") || title.toLowerCase().includes("construction");
  
  let coreYear1 = ["Engineering Math I & II", "Programming Fundamentals", "Applied Sciences", "Design Thinking & CAD"];
  let coreYear2 = ["Data Structures & Logic", "Circuit Theory & Devices", "Digital Electronics", "Object Oriented Paradigm"];
  let coreYear3 = ["Advanced Database Systems", "Network Communications", "Professional Core Electives", "Mini Project Lab"];
  let coreYear4 = ["Major Capstone Project", "Industrial Internships", "Global Immersion", "Corporate Placement Placement"];

  if (isCse) {
    coreYear1 = ["Python Programming", "Computational Mathematics", "Engineering Physics", "Creative Design thinking"];
    coreYear2 = ["Data Structures & Algorithms", "Computer Organization & Architecture", "Database Systems", "Discrete Mathematics"];
    coreYear3 = ["Operating Systems & Virtualization", "Computer Networks", "Software Engineering & QA", "Artificial Intelligence Core"];
    coreYear4 = ["Capstone Project & Research Thesis", "Full-stack Web Deployment", "Cloud Infrastructure Interfacing", "Secure Coding Practices"];
  } else if (isEce) {
    coreYear1 = ["Electric Circuit Analysis", "Applied Physics", "Differential Equations", "Electronic Workshops"];
    coreYear2 = ["Electronic Devices & Circuits", "Signals & Systems", "Digital Logic Design", "Electromagnetic Fields"];
    coreYear3 = ["Microcontrollers & Interfacing", "Digital Signal Processing", "Analog & Digital Communications", "VLSI Design Basics"];
    coreYear4 = ["Embedded System Design Lab", "Antenna & Microwave Systems", "Optical & Wireless Networks", "Major Industrial Project"];
  } else if (isEee) {
    coreYear1 = ["Fundamentals of Electric Circuits", "Engineering Chemistry", "Matrix Algebra & Calculus", "Basic Workshops"];
    coreYear2 = ["DC & AC Machines", "Power Systems Generation", "Electrical Measurements", "Network Analysis & Synthesis"];
    coreYear3 = ["Power Electronics & Converters", "Control Systems Engineering", "Power System Transmission", "Microprocessors"];
    coreYear4 = ["Smart Grid Systems & Integration", "Renewable Energy Systems", "High Voltage Engineering", "Major Project"];
  } else if (isMech) {
    coreYear1 = ["Engineering Drawing & Graphics", "Basic Thermodynamics", "Calculus & Geometry", "Materials Workshop"];
    coreYear2 = ["Strength of Materials", "Kinematics of Machinery", "Fluid Mechanics & Turbines", "Manufacturing Processes"];
    coreYear3 = ["Design of Machine Elements", "Heat & Mass Transfer", "Dynamics of Machinery", "CAD/CAM Integrated Systems"];
    coreYear4 = ["Mechatronics & Control Lab", "Automobile Engineering Systems", "Production & Operations Management", "Major Capstone Project"];
  } else if (isCivil) {
    coreYear1 = ["Engineering Mechanics", "Applied Geology & Soil", "Surveying & Mapping Basics", "Calculus & Physics"];
    coreYear2 = ["Strength of Materials", "Fluid Mechanics & Hydraulics", "Concrete Technology", "Structural Analysis I"];
    coreYear3 = ["Geotechnical Engineering", "Design of Reinforced Concrete Structures", "Environmental Engineering", "Transportation Infrastructure"];
    coreYear4 = ["Construction Planning & Estimating", "Design of Steel Structures", "Foundation Design & Analysis", "Major Capstone Project"];
  }

  return [
    {
      year: "Year 1",
      focus: "Foundational Skills",
      badges: ["Skill Courses", "Foundations"],
      courses: coreYear1,
      immersions: ["Social Internship", "Design Thinking Workshop", "Creative Communication"]
    },
    {
      year: "Year 2",
      focus: "Core Disciplines",
      badges: ["Major Core", "Minor Electives"],
      courses: coreYear2,
      immersions: ["Community Project", "Corporate Immersion Days", "Industry Internships"]
    },
    {
      year: "Year 3",
      focus: "Advanced Tracks",
      badges: ["Specialization", "Open Electives"],
      courses: coreYear3,
      immersions: ["Research Publications", "Professional Seminars", "Pre-Placement Training"]
    },
    {
      year: "Year 4",
      focus: "Capstone & Placement",
      badges: ["Major Projects", "Thesis / Placement"],
      courses: coreYear4,
      immersions: ["Capstone Project (6 Months)", "Global Immersion Track", "Corporate Placement Preparation"]
    }
  ];
};

// Helper to generate dynamic, rich content based on current path
const getPageContent = (path: string) => {
  const cleanPath = path.toLowerCase().replace(/\/$/, "");

  // News Article Pages
  if (cleanPath.startsWith("/news/")) {
    const article = [
      {
        slug: "ai-research-lab",
        title: "AI Research Lab Inaugurated on Campus",
        category: "Innovation",
        desc: "In partnership with global tech giants, the new laboratory features advanced machine learning compute nodes for research projects.",
        bodyText: "Today marks a historic milestone for City Chalapathi Institute of Technology as we formally inaugurate our state-of-the-art Artificial Intelligence and Machine Learning Research Laboratory. Developed in close collaboration with global technology leaders, this research center is equipped with high-throughput multi-GPU processing systems and next-generation compute environments designed specifically for heavy workload deep learning and neural network model training. Under the direction of our senior AI research staff, undergraduate and doctoral scholars will collaborate on active research papers, smart industrial solutions, and healthcare diagnostics automation projects. Student cohorts will have access to real-time research fellowships, academic grants, and direct mentoring pipelines to build future computing technologies."
      },
      {
        slug: "smart-hackathon",
        title: "Engineering Students Win Smart Hackathon 2025",
        category: "Achievement",
        desc: "Our team developed a decentralized IoT mesh network algorithm to win first prize at the national technology showcase competition.",
        bodyText: "We are extremely proud to announce that the student research team from our Electronics and Computer Science Engineering departments has won the prestigious National Smart Systems Hackathon 2025. Over a grueling 36-hour continuous sprint in New Delhi, the team designed and prototyped a self-healing, decentralized IoT mesh network framework tailored for real-time disaster management communication. The algorithm maintains high packet-delivery rates even during severe node disruptions. The project won first prize, carrying a gold trophy and a cash reward of ₹1,00,000, standing out among 250 participating institutions nationwide."
      },
      {
        slug: "mou-signed",
        title: "MoU Signed with Top Global Corporations for Placements",
        category: "Corporate Link",
        desc: "Enabling direct internship allocations, corporate-readiness workshops, and accelerated final semester student placements.",
        bodyText: "City Chalapathi Institute of Technology has officially entered into a strategic Memorandum of Understanding (MoU) with leading multinational software and core engineering firms. This collaboration significantly strengthens our training and placement initiatives. Beginning this academic term, corporate mentors will conduct regular guest workshops on enterprise architectures and cloud DevOps technologies. The agreement also establishes a dedicated early-internship pipeline, allowing final-year engineering and management students to undertake structured industrial projects directly at corporate campuses, paving a fast-track pathway for high-compensation final placements."
      },
      {
        slug: "pharmacy-formulations",
        title: "New Pharmacy Research Formulations Published",
        category: "Research",
        desc: "Our department has published groundbreaking formulations on nano-carrier systems in high-impact medical journals.",
        bodyText: "The Department of Pharmaceutics at City Chalapathi has published a research breakthrough regarding target-oriented drug delivery systems. The research details a novel nano-carrier formulation that significantly increases the solubility and bioavailability of therapeutic drugs, offering potential applications for targeted anti-inflammatory treatments. Published in a highly respected international pharmaceutical journal, the research is the culmination of three years of rigorous laboratory analysis led by our postgraduate research scholars and senior faculty. This publication underscores our commitment to advancing pharmaceutical sciences on a global stage."
      },
      {
        slug: "global-education-fair",
        title: "Global Education Fair and Career Expo Hosts 30+ Universities",
        category: "International",
        desc: "Students interacted directly with global admission directors from US, UK, and European universities for postgraduate guidance.",
        bodyText: "We successfully hosted the annual Global Education fair and Career Expo on our central campus yesterday. The event hosted admissions directors and official representatives from over 30 leading universities across the United States, United Kingdom, Australia, and European Union countries. Hundreds of undergraduate students from final and pre-final semesters attended the fair to discuss entry requirements, IELTS/GRE waivers, postgraduate research opportunities, and scholarship applications directly with the university officials, opening new international education horizons for our graduates."
      },
      {
        slug: "annual-sports-meet",
        title: "Annual Sports Meet Kickstarts with Inter-Department Matches",
        category: "Campus Life",
        desc: "The campus cricket and basketball tournaments kicked off with participation from over 500 student athletes.",
        bodyText: "The annual campus sports tournament commenced yesterday with a spectacular torch run and flag hoisting ceremony at the main sports complex. Over 500 student athletes representing all engineering, pharmacy, and science departments are participating in active inter-department tournaments spanning cricket, football, basketball, track & field events, and indoor sports. The opening matches saw high-energy contests, fostering team spirit and sportsmanship across the campus community."
      },
      {
        slug: "sustainable-construction",
        title: "Workshop on Sustainable Construction Materials Conducted",
        category: "Workshop",
        desc: "Civil engineering experts held a hands-on session demonstrating self-healing concrete applications.",
        bodyText: "A comprehensive technical workshop on modern green construction materials was held by our Civil Engineering Department. Industry practitioners and structural engineers attended to demonstrate application techniques for self-healing concrete and fly-ash geopolymer composites. Students participated in concrete casting laboratories and stress testing, gaining valuable insight into eco-friendly engineering practices."
      },
      {
        slug: "alumni-meet",
        title: "Alumni Meet 2025 Welcomes Back Distinguished Graduates",
        category: "Alumni Connect",
        desc: "Over 200 alumni reconnected on campus, sharing industry insights and instituting new scholarship grants.",
        bodyText: "The campus yesterday welcomed back more than 200 distinguished alumni representing graduates from the past two decades. The meet provided a platform for alumni to interact with current student cohorts, share industrial insights, and discuss mentorship opportunities. The alumni association announced the setup of a new student innovation fund to support budding startup projects on campus."
      }
    ].find(x => cleanPath.endsWith(x.slug));

    if (article) {
      return {
        title: article.title,
        category: article.category,
        desc: article.desc,
        body: (
          <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
            <p>{article.bodyText}</p>
            <div className="bg-[#072A6C]/5 border-l-4 border-[#072A6C] p-4 rounded-r-[8px] text-[12px] text-gray-700 italic">
              "We congratulate all participants, sponsors, and faculty members involved in this milestone announcement. Stay tuned for further updates."
            </div>
            <Link to="/news" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D71920] hover:text-[#072A6C] transition-colors mt-6">
              ← Back to News Center
            </Link>
          </div>
        )
      };
    }
  }

  // Event Detail Pages
  if (cleanPath.startsWith("/news/events/")) {
    const eventItem = [
      {
        slug: "air-taxi-demonstration",
        title: "Air Taxi Demonstration & Aviation Forum",
        category: "Aerospace",
        date: "17 Jul 2026",
        time: "09:30 AM Onwards",
        venue: "Aeronautics Hangar & Airfield Complex",
        desc: "An exclusive exhibition showcasing autonomous vertical take-off and landing (eVTOL) systems and the future of urban air mobility.",
        bodyText: "In collaboration with global aerospace research institutions and pioneering aviation companies, City Chalapathi Institute of Technology is proud to host the Air Taxi Demonstration and Aviation Forum. This event features real-world test flights and static exhibitions of cutting-edge electric Vertical Take-Off and Landing (eVTOL) air taxi models. Attendees will engage with senior flight control engineers, software architects, and regulators discussing flight path safety, battery technology, and battery charging infrastructure. The afternoon panel sessions will cover career pathways in modern avionics, autonomous navigation algorithms, and smart city infrastructure integration."
      },
      {
        slug: "innovation-summit",
        title: "Annual Innovation & Entrepreneurship Summit",
        category: "Summit",
        date: "05 Aug 2026",
        time: "10:00 AM Onwards",
        venue: "Campus Incubation & Startup Block",
        desc: "Empowering student founders, early-stage startups, and venture capitalists to collaborate on next-generation software and product solutions.",
        bodyText: "The Annual Innovation & Entrepreneurship Summit at City Chalapathi stands as our premier event dedicated to building startup ecosystems. Student groups will pitch prototypes directly to angel investors, regional venture capital firms, and incubator heads. Keynote addresses from successful startup founders will share lessons on scaling, raising capital, and validating target markets. The summit hosts hands-on product design thinking sessions, intellectual property workshops for patent registrations, and networking tables connecting developers with business mentors."
      },
      {
        slug: "research-expo",
        title: "National Research Expo & Patent Showcase",
        category: "Research",
        date: "12 Sep 2026",
        time: "11:00 AM Onwards",
        venue: "Bio-Sciences Laboratory & Exhibition Hall",
        desc: "Showcasing student and faculty scientific publications, patent filings, and industry-sponsored research breakthroughs.",
        bodyText: "The National Research Expo is a celebrate-science event displaying active publications, doctoral research posters, and student innovations. Exhibitions cover structural engineering geopolymer research, target-oriented nano-carrier drug formulations, DST-funded smart irrigation devices, and artificial intelligence diagnostic apps. Senior scientists from national research institutes will evaluate student models and deliver talks on funding applications and research methodology."
      },
      {
        slug: "industry-connect",
        title: "Industry Connect: Corporate Leadership Panel",
        category: "Corporate",
        date: "03 Oct 2026",
        time: "10:00 AM Onwards",
        venue: "MBA Seminar Block Center",
        desc: "A networking panel hosting HR directors and tech executives to discuss recruitment trends and corporate-readiness skills.",
        bodyText: "Connecting student skills with market needs, the Industry Connect hosts executive panels from software, finance, and core manufacturing companies. Panel discussions will cover high-growth career tracks in artificial intelligence, full-stack architectures, and supply chain logistics. Representatives will detail summer internship opportunities and direct corporate placement guidelines."
      },
      {
        slug: "alumni-reunion",
        title: "Global Alumni Reunion & Endowment Gala",
        category: "Alumni Connect",
        date: "14 Nov 2026",
        time: "06:00 PM Onwards",
        venue: "University Grand Lawn Area",
        desc: "A formal dinner hosting alumni from top organizations globally, establishing student incubation and scholarship programs.",
        bodyText: "The Global Alumni Reunion welcomes back our distinguished graduates to campus for a formal evening of networking and celebration. Alumni will interact with faculty members and student groups to share career paths and industry trends. The evening will host the announcement of the Alumni Endowment Fund to support underprivileged student scholarships."
      }
    ].find(x => cleanPath.endsWith(x.slug));

    if (eventItem) {
      return {
        title: eventItem.title,
        category: eventItem.category,
        desc: eventItem.desc,
        body: (
          <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
            <div className="bg-[#072A6C]/5 border-l-4 border-[#072A6C] p-5 rounded-r-[16px] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-[#072A6C] mb-6">
              <div>
                <span className="block text-gray-400 font-semibold uppercase text-[9px] mb-0.5">Date & Time</span>
                <span>{eventItem.date} — {eventItem.time}</span>
              </div>
              <div>
                <span className="block text-gray-400 font-semibold uppercase text-[9px] mb-0.5">Venue</span>
                <span>{eventItem.venue}</span>
              </div>
              <div>
                <span className="block text-gray-400 font-semibold uppercase text-[9px] mb-0.5">Category</span>
                <span className="text-[#F97316]">{eventItem.category}</span>
              </div>
            </div>

            <p>{eventItem.bodyText}</p>

            <div className="pt-6 border-t border-gray-100 flex gap-4">
              <button 
                onClick={() => alert(`Registration details for "${eventItem.title}" sent to counselor office.`)}
                className="h-11 px-8 bg-gradient-to-r from-[#D71920] to-[#b71217] text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 hover:shadow-md transition-all cursor-pointer"
              >
                Register For Event <ArrowRight size={14} />
              </button>
              <Link to="/news/events" className="h-11 px-6 border border-gray-200 hover:border-gray-300 text-gray-600 text-xs font-bold rounded-xl inline-flex items-center transition-all">
                Back to Events
              </Link>
            </div>
          </div>
        )
      };
    }
  }

  // About Pages
  if (cleanPath.startsWith("/about")) {
    if (cleanPath.includes("history")) {
      return {
        title: "Our History & Heritage",
        category: "About Us",
        desc: "Established with a vision to nurture innovators, City Chalapathi Institute of Technology has a rich heritage of educational brilliance dating back over 25 years.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm">
            <p>Founded in Guntur, Andhra Pradesh, our institution was established to bridge the gap between academic education and industry requirements. Over the past two and a half decades, we have evolved from a local college into a premier autonomous research university of national reputation.</p>
            <div className="border-l-4 border-[#D71920] pl-4 my-6 italic text-gray-700 font-medium">
              "To provide value-based quality technical education and produce competent engineers who can contribute to the progress of the society."
            </div>
            <h3 className="text-lg font-bold text-[#072A6C] mt-6">Milestones Journey</h3>
            <ul className="space-y-3 list-disc pl-5 mt-2">
              <li><strong>2001:</strong> Inception of the college with three basic undergraduate branches.</li>
              <li><strong>2008:</strong> Accredited by NBA for all core engineering departments.</li>
              <li><strong>2015:</strong> Conferred Autonomous Status, allowing custom industry-driven curricula.</li>
              <li><strong>2021:</strong> Awarded NAAC A+ accreditation for excellence in infrastructure and academics.</li>
            </ul>
          </div>
        )
      };
    }
    if (cleanPath.includes("vision")) {
      return {
        title: "Vision & Mission",
        category: "About Us",
        desc: "Our core beliefs and guiding stars directing our future pathways of excellence.",
        body: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="bg-white border border-gray-100 rounded-[16px] p-6 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#072A6C] mb-4 flex items-center gap-2">
                <Info className="text-[#D71920]" size={20} /> OUR VISION
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To emerge as a premier destination for value-based technical education and research, creating globally competent leaders who drive social and technological progress through innovation.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-[16px] p-6 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#072A6C] mb-4 flex items-center gap-2">
                <ShieldCheck className="text-[#D71920]" size={20} /> OUR MISSION
              </h3>
              <ul className="space-y-3 text-gray-600 text-sm list-disc pl-5">
                <li>Impart high-quality, practical technical education through modern teaching methodologies.</li>
                <li>Foster an environment of innovation, research, and entrepreneurship.</li>
                <li>Collaborate with top industries and global universities to keep learning current.</li>
                <li>Nurture ethical, empathetic values alongside technical competency.</li>
              </ul>
            </div>
          </div>
        )
      };
    }
    if (cleanPath.includes("leadership")) {
      return {
        title: "Leadership & Governing Body",
        category: "About Us",
        desc: "Meet the visionary leaders directing the strategic progress of City Chalapathi Institute of Technology.",
        body: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              { name: "Sri Y. V. Anjaneyulu", role: "Chairman & President", desc: "A visionary educationist leading multiple initiatives in Guntur district." },
              { name: "Dr. K. Chandrasekhar", role: "Principal", desc: "Bringing over 30 years of academic and administrative engineering excellence." },
              { name: "Prof. P. V. Ramana", role: "Dean Academics", desc: "Ensuring industry-current curricular updates across all departments." }
            ].map((leader, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-[16px] p-6 shadow-sm text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-xl text-[#072A6C]">
                  {leader.name.split(" ").slice(-1)[0][0]}
                </div>
                <h4 className="font-extrabold text-[#072A6C] text-sm">{leader.name}</h4>
                <p className="text-xs text-[#D71920] font-semibold mt-1">{leader.role}</p>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed">{leader.desc}</p>
              </div>
            ))}
          </div>
        )
      };
    }
    return {
      title: "About Our Institution",
      category: "About Us",
      desc: "City Chalapathi Institute of Technology is a leading autonomous engineering college dedicated to empowering tomorrow's innovators.",
      body: (
        <div className="space-y-6 text-gray-600 text-sm">
          <p>We believe in imparting hands-on, practical knowledge that equips our students to address real-world challenges. Explore our links to learn more about our vision, leadership, and glorious heritage.</p>
          <div className="grid grid-cols-3 gap-4 my-8">
            <Link to="/about/history" className="bg-white border border-gray-100 rounded-[16px] p-4 text-center hover:border-[#072A6C] transition-all">
              <span className="block font-bold text-[#072A6C] text-sm">History</span>
            </Link>
            <Link to="/about/vision" className="bg-white border border-gray-100 rounded-[16px] p-4 text-center hover:border-[#072A6C] transition-all">
              <span className="block font-bold text-[#072A6C] text-sm">Vision</span>
            </Link>
            <Link to="/about/leadership" className="bg-white border border-gray-100 rounded-[16px] p-4 text-center hover:border-[#072A6C] transition-all">
              <span className="block font-bold text-[#072A6C] text-sm">Leadership</span>
            </Link>
          </div>
        </div>
      )
    };
  }

  // Academics Pages
  if (cleanPath.startsWith("/academics")) {
    const matchedProgram = PROGRAMS_DATA.find(p => cleanPath.endsWith(p.slug));
    if (matchedProgram) {
      return {
        title: matchedProgram.title,
        category: "Academics",
        desc: matchedProgram.desc,
        body: (
          <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
            <div className="bg-[#072A6C]/5 border border-gray-100 p-5 rounded-r-[16px] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-[#072A6C] mb-6">
              <div>
                <span className="block text-gray-400 font-semibold uppercase text-[9px] mb-0.5">Duration</span>
                <span>{matchedProgram.duration}</span>
              </div>
              <div>
                <span className="block text-gray-400 font-semibold uppercase text-[9px] mb-0.5">Department</span>
                <span>{matchedProgram.department}</span>
              </div>
              <div>
                <span className="block text-gray-400 font-semibold uppercase text-[9px] mb-0.5">Degree Type</span>
                <span>{matchedProgram.degreeType}</span>
              </div>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-[#072A6C] mb-2">Course Overview</h3>
              <p className="font-light">{matchedProgram.overview}</p>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-[#072A6C] mb-3">Core Focus Modules</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {matchedProgram.curriculum.map((item, idx) => (
                  <div key={idx} className="bg-white border border-gray-200/80 rounded-xl p-3 text-center text-xs font-semibold text-gray-700 shadow-sm hover:border-[#D71920]/45 transition-colors">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-[#072A6C] mb-3">Career Prospects</h3>
              <div className="space-y-3">
                {matchedProgram.careers.map((career, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                    <h4 className="font-bold text-[#D71920] text-xs">{career.title}</h4>
                    <p className="text-[11px] text-gray-500 mt-1 leading-normal font-light">{career.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Visual Timeline Section */}
            <div className="pt-8 border-t border-gray-100">
              <h3 className="text-lg font-extrabold text-[#072A6C] mb-1">Course Structure & Year-Wise Timeline</h3>
              <p className="text-xs text-gray-500 mb-6 font-light">Explore your multi-year learning trajectory, core specializations, and mandatory internship milestones.</p>
              
              {/* Colored Degree Bar */}
              <div className="bg-gradient-to-r from-[#D71920] to-[#072A6C] text-white text-[10px] uppercase font-bold tracking-widest px-4 py-2.5 rounded-full mb-6 text-center select-none shadow-sm">
                4-Year Integrated Program structure: {matchedProgram.degreeType} Honors Degree
              </div>

              {/* 4 Columns Year-wise Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                {getProgramTimeline(matchedProgram.title).map((step, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                    {/* Top red bar hover effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 group-hover:bg-[#D71920] transition-colors" />
                    
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-extrabold text-[#072A6C]">{step.year}</span>
                        <span className="text-[9px] text-[#D71920] font-extrabold uppercase bg-[#D71920]/5 px-2 py-0.5 rounded-full">{step.focus}</span>
                      </div>
                      
                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {step.badges.map((b, i) => (
                          <span key={i} className="text-[9.5px] font-semibold text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                            {b}
                          </span>
                        ))}
                      </div>

                      {/* Course list */}
                      <div className="space-y-1.5 mb-4">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Academics</span>
                        {step.courses.map((course, i) => (
                          <div key={i} className="text-[11.5px] font-medium text-gray-700 leading-snug">
                            • {course}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100/60 mt-4">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1.5">Immersion</span>
                      {step.immersions.map((imm, i) => (
                        <div key={i} className="text-[11px] text-gray-500 font-light leading-normal italic">
                          - {imm}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Exit Options Alert */}
              <div className="bg-[#072A6C]/5 border border-[#072A6C]/10 rounded-xl p-4 mt-6">
                <span className="text-xs font-bold text-[#072A6C] block mb-1">🎓 Flexible Learning Pathways & Exit Points</span>
                <p className="text-[11px] text-gray-500 leading-normal font-light">
                  Aligning with National Education Policy (NEP) guidelines, scholars can choose to exit at varied points:
                  <br />• Exit after 3 Years: Eligible to graduate with a standard Degree in the respective major category.
                  <br />• Completion of 4 Years: Graduate with an Integrated Honours Degree with minor specialization certifications.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-[8px] text-[11px] text-blue-900 font-light mt-6">
              This curriculum is aligned with the outcome-based education (OBE) model. Regular updates are carried out via the Board of Studies (BOS) incorporating direct inputs from industry veterans.
            </div>
          </div>
        )
      };
    }

    if (cleanPath.includes("calendar")) {
      return {
        title: "Academic Calendar",
        category: "Academics",
        desc: "Schedule of semesters, internal assessments, holidays, and examination blocks for the academic term.",
        body: <AcademicCalendar />
      };
    }
    if (cleanPath.includes("flexibilities")) {
      return {
        title: "Academic Flexibilities",
        category: "Academics",
        desc: "Autonomous credit choices, minor streams, honors degrees, and student transfers.",
        body: <AcademicFlexibilities />
      };
    }
    if (cleanPath.includes("programmes")) {
      return {
        title: "Programmes Offered",
        category: "Academics",
        desc: "List of approved B.Tech, M.Tech, MCA, MBA, and Pharmacy programs.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm">
            <p>We offer undergraduate and postgraduate courses affiliated and accredited for premium industrial placements.</p>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>B.Tech:</strong> Computer Science, AI & ML, Data Science, ECE, EEE, Mechanical, Civil.</li>
              <li><strong>M.Tech:</strong> Computer Science, Power Systems, VLSI & Embedded Systems.</li>
              <li><strong>Pharmacy:</strong> B.Pharm, M.Pharm, D.Pharm.</li>
              <li><strong>Management:</strong> MBA, MCA.</li>
            </ul>
          </div>
        )
      };
    }
    if (cleanPath.includes("grading")) {
      return {
        title: "Grading System",
        category: "Academics",
        desc: "Cumulative Grade Point Average (CGPA) scale and credit evaluation metrics.",
        body: <AcademicGradingSystem />
      };
    }
    if (cleanPath.includes("degrees")) {
      return {
        title: "Award of Degrees",
        category: "Academics",
        desc: "Eligibility conditions for degree distributions, graduation convocations, and transcripts.",
        body: <AwardOfDegrees />
      };
    }
    if (cleanPath.includes("rules")) {
      return {
        title: "Rules & Regulations",
        category: "Academics",
        desc: "Academic code of conduct, attendance thresholds, and campus compliance standards.",
        body: <AcademicRulesRegulations />
      };
    }
    if (cleanPath.includes("teaching")) {
      return {
        title: "Teaching & Evaluation",
        category: "Academics",
        desc: "Outcome-based education framework, continuous assessment marks, and end exams.",
        body: <TeachingEvaluation />
      };
    }
    if (cleanPath.startsWith("/academics/bos/")) {
      const slug = cleanPath.replace("/academics/bos/", "");
      return {
        title: "Department Faculty List",
        category: "Academics",
        desc: "Department Board of Studies Members and Faculty Directory.",
        body: <DepartmentFacultyView slug={slug} />
      };
    }
    if (cleanPath.includes("bos")) {
      return {
        title: "Board of Studies (BOS)",
        category: "Academics",
        desc: "Academic advisory council consisting of university deans, industry veterans, and subject experts.",
        body: <BOSMembers />
      };
    }

    if (cleanPath.includes("computer-science")) {
      return {
        title: "Computer Science & Engineering",
        category: "Academics",
        desc: "Empowering next-generation developers, software engineers, and technology leaders.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm">
            <p>Our curriculum covers fundamental computation structures, databases, algorithms, web dev, and distributed networks. We feature advanced labs with dedicated high-performance workstations.</p>
            <h4 className="text-[#072A6C] font-extrabold text-sm">Core Focus Areas</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              <div className="bg-gray-100 rounded-lg p-3 text-center text-xs font-semibold text-gray-700">Full Stack Dev</div>
              <div className="bg-gray-100 rounded-lg p-3 text-center text-xs font-semibold text-gray-700">Cloud Computing</div>
              <div className="bg-gray-100 rounded-lg p-3 text-center text-xs font-semibold text-gray-700">Cybersecurity</div>
              <div className="bg-gray-100 rounded-lg p-3 text-center text-xs font-semibold text-gray-700">Database Systems</div>
            </div>
          </div>
        )
      };
    }
    if (cleanPath.includes("artificial-intelligence")) {
      return {
        title: "Artificial Intelligence & ML",
        category: "Academics",
        desc: "Unlocking automation, predictive modeling, and intelligent agent systems.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm">
            <p>Learn machine learning, neural networks, natural language processing, and deep learning libraries. Guided research under professors actively published in IEEE conferences.</p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-xs text-blue-800">
              Note: This program requires mathematical aptitude in Linear Algebra and Probability.
            </div>
          </div>
        )
      };
    }
    if (cleanPath.includes("data-science")) {
      return {
        title: "Data Science",
        category: "Academics",
        desc: "Transforming big data into actionable insights and strategic decisions.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm">
            <p>Curriculum structured around statistics, data visualization, Hadoop pipelines, and predictive analytics modeling using Python and R.</p>
          </div>
        )
      };
    }
    return {
      title: "Academics & Schools",
      category: "Academics",
      desc: "Comprehensive engineering, science, and diploma training pathways.",
      body: (
        <div className="space-y-6">
          <p className="text-gray-600 text-sm">Choose from our specialized undergraduate and postgraduate branches of study designed to secure industry placement.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <Link to="/academics/computer-science" className="bg-white border border-gray-100 p-5 rounded-[16px] shadow-sm hover:-translate-y-1 transition-all block">
              <h4 className="font-extrabold text-[#072A6C] text-sm">Computer Science & Engineering</h4>
              <p className="text-xs text-gray-500 mt-2">Explore algorithms, development, and network systems.</p>
            </Link>
            <Link to="/academics/artificial-intelligence" className="bg-white border border-gray-100 p-5 rounded-[16px] shadow-sm hover:-translate-y-1 transition-all block">
              <h4 className="font-extrabold text-[#072A6C] text-sm">AI & Machine Learning</h4>
              <p className="text-xs text-gray-500 mt-2">Train intelligent models and predictive automated systems.</p>
            </Link>
            <Link to="/academics/data-science" className="bg-white border border-gray-100 p-5 rounded-[16px] shadow-sm hover:-translate-y-1 transition-all block">
              <h4 className="font-extrabold text-[#072A6C] text-sm">Data Science</h4>
              <p className="text-xs text-gray-500 mt-2">Mine data streams and generate critical business analytics.</p>
            </Link>
          </div>
        </div>
      )
    };
  }

  // Admissions Pages
  if (cleanPath.startsWith("/admissions")) {
    if (cleanPath.includes("undergraduate")) {
      return {
        title: "Undergraduate Admissions (B.Tech / B.Pharm)",
        category: "Admissions",
        desc: "Build a solid engineering or pharmacy foundation with our premium 4-year undergraduate programs.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm mt-4">
            <p>We offer undergraduate programs designed to cultivate critical thinking, technical expertise, and leadership skills.</p>
            <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
              <h4 className="font-extrabold text-[#072A6C] mb-2">Eligibility Criteria</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Candidates must have completed 10+2 with Physics, Chemistry, and Mathematics (or Biology for Pharmacy) with a minimum of 50% marks. Admissions are based on merit ranks in state-level or national engineering/pharmacy entrance exams.</p>
            </div>
            <Link to="/admissions/apply" className="h-10 px-6 bg-[#D71920] hover:bg-[#b71217] text-white text-xs font-bold rounded-xl inline-flex items-center gap-2 shadow-sm transition-all w-fit">Apply Online <ArrowRight size={14} /></Link>
          </div>
        )
      };
    }
    if (cleanPath.includes("postgraduate")) {
      return {
        title: "Postgraduate Admissions (M.Tech / MBA / MCA)",
        category: "Admissions",
        desc: "Specialize and accelerate your career with our industry-aligned PG curricula.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm mt-4">
            <p>Advance your professional journey with our tailored postgraduate engineering, computer application, and business management courses.</p>
            <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
              <h4 className="font-extrabold text-[#072A6C] mb-2">Eligibility Criteria</h4>
              <p className="text-xs text-gray-500 leading-relaxed">A Bachelor's degree (B.Tech, BCA, B.Sc, B.Com, or B.A) in relevant streams with at least 50% marks is required. Admission is granted based on qualifying scores in national or university-level PG entrance tests.</p>
            </div>
            <Link to="/admissions/apply" className="h-10 px-6 bg-[#D71920] hover:bg-[#b71217] text-white text-xs font-bold rounded-xl inline-flex items-center gap-2 shadow-sm transition-all w-fit">Apply Online <ArrowRight size={14} /></Link>
          </div>
        )
      };
    }
    if (cleanPath.includes("apply")) {
      return {
        title: "Apply Online",
        category: "Admissions",
        desc: "Start your journey today. Fill out our online application form to secure your seat.",
        body: (
          <form className="space-y-4 max-w-lg mt-4 bg-white border border-gray-100 p-6 rounded-[16px] shadow-sm">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-xs outline-none focus:ring-1 focus:ring-[#072A6C]" placeholder="Enter full name" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
              <input type="email" className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-xs outline-none focus:ring-1 focus:ring-[#072A6C]" placeholder="Enter email" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Selected Program</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-xs outline-none focus:ring-1 focus:ring-[#072A6C]">
                <option>Engineering (B.Tech)</option>
                <option>Computer Applications (MCA)</option>
                <option>Management (MBA)</option>
                <option>Pharmacy (B.Pharm)</option>
              </select>
            </div>
            <button type="button" onClick={() => alert("Application Saved! Registration details sent to email.")} className="w-full py-2.5 bg-[#D71920] hover:bg-[#b71217] text-white font-bold text-xs rounded-[8px] transition-colors">
              Submit Registration
            </button>
          </form>
        )
      };
    }
    if (cleanPath.includes("fees")) {
      return {
        title: "Academic Fee Structure",
        category: "Admissions",
        desc: "Transparent and competitive tuition fee details across all core streams.",
        body: (
          <div className="bg-white border border-gray-100 rounded-[16px] overflow-hidden shadow-sm mt-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                  <th className="p-4">Program Stream</th>
                  <th className="p-4">Annual Tuition Fee</th>
                  <th className="p-4">Exam Cell Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                <tr>
                  <td className="p-4 font-semibold text-[#072A6C]">B.Tech (Computer Science / AI)</td>
                  <td className="p-4">₹90,000 / Year</td>
                  <td className="p-4">₹5,000 / Year</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#072A6C]">B.Tech (ECE / Mech / EEE)</td>
                  <td className="p-4">₹75,000 / Year</td>
                  <td className="p-4">₹5,000 / Year</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#072A6C]">MCA (Computer Applications)</td>
                  <td className="p-4">₹55,000 / Year</td>
                  <td className="p-4">₹4,000 / Year</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#072A6C]">MBA (Management)</td>
                  <td className="p-4">₹65,000 / Year</td>
                  <td className="p-4">₹4,000 / Year</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      };
    }
    if (cleanPath.includes("scholarships")) {
      return {
        title: "Scholarships & Merit Schemes",
        category: "Admissions",
        desc: "Ensuring financial need never deters brilliant academic potential.",
        body: (
          <div className="space-y-4 text-gray-600 text-sm mt-4">
            <div className="bg-white border border-gray-100 p-5 rounded-[16px] shadow-sm">
              <h4 className="font-extrabold text-[#072A6C] text-sm mb-2">1. Merit Scholarship</h4>
              <p className="text-xs">Students securing top 100 ranks in entrance exams are eligible for a 50% tuition waiver.</p>
            </div>
            <div className="bg-white border border-gray-100 p-5 rounded-[16px] shadow-sm">
              <h4 className="font-extrabold text-[#072A6C] text-sm mb-2">2. Sports & Athletic Waiver</h4>
              <p className="text-xs">State or National level athletes receive up to 100% hostel and fee exemptions.</p>
            </div>
          </div>
        )
      };
    }
    return {
      title: "Admissions Portal",
      category: "Admissions",
      desc: "Enrollment processes, eligibility guidelines, fee charts, and student aids.",
      body: (
        <div className="space-y-12 mt-4 font-[var(--font-poppins)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/admissions/apply" className="bg-[#072A6C] text-white p-6 rounded-[16px] shadow-sm flex flex-col justify-between min-h-[140px] hover:translate-y-[-2px] transition-transform text-left">
              <h4 className="font-bold text-sm">Start Application</h4>
              <span className="text-xs text-blue-200 flex items-center gap-1">Online Application Form <ArrowRight size={12} /></span>
            </Link>
            <Link to="/admissions/fees" className="bg-white border border-gray-100 p-6 rounded-[16px] shadow-sm flex flex-col justify-between min-h-[140px] hover:translate-y-[-2px] transition-transform text-left">
              <h4 className="font-bold text-[#072A6C] text-sm">Fee Structure</h4>
              <span className="text-xs text-[#D71920] flex items-center gap-1">View Stream Details <ArrowRight size={12} /></span>
            </Link>
            <Link to="/admissions/scholarships" className="bg-white border border-gray-100 p-6 rounded-[16px] shadow-sm flex flex-col justify-between min-h-[140px] hover:translate-y-[-2px] transition-transform text-left">
              <h4 className="font-bold text-[#072A6C] text-sm">Scholarships</h4>
              <span className="text-xs text-[#D71920] flex items-center gap-1">Apply for Waivers <ArrowRight size={12} /></span>
            </Link>
          </div>

          {/* Steps to Follow timeline */}
          <div className="pt-8 border-t border-gray-100 space-y-8 text-center">
            <div className="inline-flex flex-col items-center">
              <span className="px-5 py-2 bg-[#D71920] text-[#D4AF37] text-xs font-extrabold tracking-[2px] rounded-full uppercase shadow-sm border border-[#D4AF37]/20">
                Steps To Follow
              </span>
              <h3 className="text-xl md:text-2xl font-[900] text-[#072A6C] mt-4">
                Admissions Process 2026
              </h3>
              <div className="w-16 h-1 bg-[#D4AF37] mt-3 rounded" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch relative">
              {[
                { id: 1, label: "Register Yourself", desc: "Create your admission account.", icon: UserPlus },
                { id: 2, label: "Verify Email / Mobile", desc: "Confirm your contact details.", icon: ShieldCheck },
                { id: 3, label: "Fill Online Application", desc: "Enter academic and personal information.", icon: FileText },
                { id: 4, label: "Upload Required Documents", desc: "Upload certificates and supporting documents.", icon: UploadCloud },
                { id: 5, label: "Pay Application Fee", desc: "Complete the payment and submit the application.", icon: CreditCard }
              ].map((step) => {
                const StepIcon = step.icon;
                return (
                  <div key={step.id} className="bg-white border border-gray-100 rounded-[20px] p-6 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-between text-center min-h-[220px] relative group h-full">
                    <div className="w-12 h-12 rounded-full bg-[#072A6C]/5 flex items-center justify-center text-[#D71920] mb-4 group-hover:bg-[#D71920] group-hover:text-white transition-colors duration-300">
                      <StepIcon size={20} />
                    </div>
                    <div className="space-y-2 flex-grow flex flex-col justify-center">
                      <h4 className="text-sm font-[800] text-[#072A6C] tracking-tight">{step.label}</h4>
                      <p className="text-[11px] text-gray-500 font-light leading-relaxed">{step.desc}</p>
                    </div>
                    <span className="absolute top-4 right-4 text-[10px] font-extrabold text-gray-300">0{step.id}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <Link
                to="/admissions/apply"
                className="h-11 px-8 bg-[#D71920] hover:bg-[#b71217] text-white text-xs font-bold rounded-xl inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
              >
                Apply Now <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )
    };
  }

  // Management Pages
  if (cleanPath.startsWith("/management")) {
    if (cleanPath.includes("board-members")) {
      return {
        title: "Board of Governors",
        category: "Management",
        desc: "Meet the visionary trustees and governing council driving Chalapathi's strategic excellence.",
        body: <BoardDirectory />
      };
    }
    if (cleanPath.includes("faculty")) {
      return {
        title: "Our Esteemed Faculty",
        category: "Management",
        desc: "Experienced professors, industry scholars, and dedicated research guides.",
        body: <FacultyDirectory />
      };
    }
    if (cleanPath.includes("staff")) {
      return {
        title: "Administrative & Technical Staff",
        category: "Management",
        desc: "Our supportive team ensuring smooth administrative operations and advanced laboratory maintenance.",
        body: <StaffDirectory />
      };
    }
    return {
      title: "Management Directory",
      category: "Management",
      desc: "Access details regarding Chalapathi's governing body, faculty members, and campus administrative staff.",
      body: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <Link to="/management/board-members" className="bg-white border border-gray-100 p-6 rounded-[16px] shadow-sm flex flex-col justify-between min-h-[140px] hover:translate-y-[-2px] transition-transform text-left">
            <h4 className="font-bold text-[#072A6C] text-sm">Board Members</h4>
            <span className="text-xs text-[#D71920] flex items-center gap-1">Governing council trustees <ArrowRight size={12} /></span>
          </Link>
          <Link to="/management/faculty" className="bg-white border border-gray-100 p-6 rounded-[16px] shadow-sm flex flex-col justify-between min-h-[140px] hover:translate-y-[-2px] transition-transform text-left">
            <h4 className="font-bold text-[#072A6C] text-sm">Faculty Members</h4>
            <span className="text-xs text-[#D71920] flex items-center gap-1">Professors & researchers <ArrowRight size={12} /></span>
          </Link>
          <Link to="/management/staff" className="bg-white border border-gray-100 p-6 rounded-[16px] shadow-sm flex flex-col justify-between min-h-[140px] hover:translate-y-[-2px] transition-transform text-left">
            <h4 className="font-bold text-[#072A6C] text-sm">Administrative Staff</h4>
            <span className="text-xs text-[#D71920] flex items-center gap-1">Technical & office support <ArrowRight size={12} /></span>
          </Link>
        </div>
      )
    };
  }

  // Placements Pages
  if (cleanPath.startsWith("/placements")) {
    return {
      title: "Placements & Careers Cell",
      category: "Placements",
      desc: "Bridging campus learning with career placement inside global MNC tech giants.",
      body: (
        <div className="space-y-6 text-gray-600 text-sm">
          <p>Our dedicated placement cell hosts campus interviews, provides aptitude workshops, and guides internship allocations during the final semesters.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            <div className="bg-white border border-gray-100 p-5 rounded-[16px] text-center shadow-sm">
              <span className="block text-2xl font-extrabold text-[#072A6C]">₹18 LPA</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase mt-1 block">Highest Package</span>
            </div>
            <div className="bg-white border border-gray-100 p-5 rounded-[16px] text-center shadow-sm">
              <span className="block text-2xl font-extrabold text-[#072A6C]">₹5.5 LPA</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase mt-1 block">Average Package</span>
            </div>
            <div className="bg-white border border-gray-100 p-5 rounded-[16px] text-center shadow-sm">
              <span className="block text-2xl font-extrabold text-[#072A6C]">95%</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase mt-1 block">Placement Record</span>
            </div>
          </div>
        </div>
      )
    };
  }

  // Research Pages
  if (cleanPath.startsWith("/research")) {
    return {
      title: "Research & Innovation",
      category: "Research",
      desc: "Driving patent submissions, research sponsorships, and scientific breakthroughs.",
      body: (
        <div className="space-y-6 text-gray-600 text-sm">
          <p>We support active research communities. Faculty members are currently guiding projects funded by DST, AICTE, and local government departments.</p>
        </div>
      )
    };
  }

  // Campus Life Pages
  if (cleanPath.startsWith("/campus-life")) {
    if (cleanPath.includes("hostels")) {
      return {
        title: "University Hostels & Accommodation",
        category: "Campus Life",
        desc: "Comfortable, safe, and modern residential facilities for students.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm mt-4">
            <p>City Chalapathi University provides excellent residential facilities with home-like comfort, strict security, and nutritious dining options.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
                <h4 className="font-extrabold text-[#072A6C] mb-2">Boys Hostel</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Spacious rooms, high-speed Wi-Fi, recreation hall, and dedicated warden. Gym and sports facilities are situated nearby.</p>
              </div>
              <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
                <h4 className="font-extrabold text-[#072A6C] mb-2">Girls Hostel</h4>
                <p className="text-xs text-gray-500 leading-relaxed">24/7 security surveillance, cozy study spaces, laundry services, and healthcare facilities with an on-call doctor.</p>
              </div>
            </div>
          </div>
        )
      };
    }
    if (cleanPath.includes("library")) {
      return {
        title: "Central Library & Information Center",
        category: "Campus Life",
        desc: "A vast repository of knowledge featuring digital archives, journals, and study wings.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm mt-4">
            <p>Our state-of-the-art Central Library spans multiple floors and hosts thousands of print books, national/international journals, and digital research databases.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm text-center">
                <h5 className="font-bold text-[#072A6C] text-lg">50,000+</h5>
                <p className="text-xs text-gray-400">Printed Volumes</p>
              </div>
              <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm text-center">
                <h5 className="font-bold text-[#072A6C] text-lg">200+</h5>
                <p className="text-xs text-gray-400">Journal Subscriptions</p>
              </div>
              <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm text-center">
                <h5 className="font-bold text-[#072A6C] text-lg">1,500+</h5>
                <p className="text-xs text-gray-400">E-Journals (IEEE/Elsevier)</p>
              </div>
            </div>
          </div>
        )
      };
    }
    if (cleanPath.includes("sports")) {
      return {
        title: "Sports & Physical Education",
        category: "Campus Life",
        desc: "Nurturing fitness, teamwork, and athletic excellence through state-of-the-art sports facilities.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm mt-4">
            <p>We encourage student fitness with indoor and outdoor complexes, expert coaching staff, and regular inter-college tournaments.</p>
            <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
              <h4 className="font-extrabold text-[#072A6C] mb-2">Our Sports Facilities Include:</h4>
              <ul className="list-disc list-inside space-y-2 text-xs text-gray-500">
                <li>Athletic Track & Football Ground</li>
                <li>Standard Basketball & Tennis Courts</li>
                <li>Cricket Practice Nets</li>
                <li>Indoor Badminton courts & Table Tennis Arena</li>
                <li>Modern Gymnasium with certified trainers</li>
              </ul>
            </div>
          </div>
        )
      };
    }
    if (cleanPath.includes("clubs")) {
      return {
        title: "Student Clubs & Societies",
        category: "Campus Life",
        desc: "Fostering creativity, leadership, and personal growth outside the classroom.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm mt-4">
            <p>From technical coding clubs to vibrant theater and art societies, students have many options to express their passions and develop leadership skills.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                <h5 className="font-bold text-[#072A6C] text-xs">Coding & Robotics Club</h5>
                <p className="text-[11px] text-gray-400 mt-1">Hackathons, build competitions, and artificial intelligence workshops.</p>
              </div>
              <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                <h5 className="font-bold text-[#072A6C] text-xs">Cultural & Arts Association</h5>
                <p className="text-[11px] text-gray-400 mt-1">Music bands, traditional dance groups, theater clubs, and annual festival organization.</p>
              </div>
            </div>
          </div>
        )
      };
    }
    return {
      title: "Campus Life & Amenities",
      category: "Campus Life",
      desc: "Explore details of hostels, libraries, dining halls, and student activity clubs.",
      body: (
        <div className="space-y-6 text-gray-600 text-sm mt-4">
          <p>A balanced academic life requires dynamic extracurricular involvement. We feature hostels, dining amenities, athletic playgrounds, and student association programs.</p>
        </div>
      )
    };
  }

  // Contact Pages
  if (cleanPath.startsWith("/contact")) {
    return {
      title: "Contact Our Office",
      category: "Support",
      desc: "Get in touch with admissions, administration, and campus security staff.",
      body: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="space-y-4">
            <h4 className="font-extrabold text-[#072A6C] text-sm">Office Address</h4>
            <p className="text-xs text-gray-600 leading-relaxed">City Chalapathi Institute of Technology<br />A.R. Nagar, Mothadaka, Guntur District,<br />Andhra Pradesh - 522034</p>
            <h4 className="font-extrabold text-[#072A6C] text-sm pt-2">Admission Hotlines</h4>
            <p className="text-xs text-gray-600">Mobile: +91 88866 30355, 88866 30356<br />Email: admissions@city.ac.in</p>
          </div>
          <div className="h-60 rounded-[16px] overflow-hidden border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.974950454796!2d80.28581691486445!3d16.375218788685984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a79679802cfad%3A0xe67e2a901bbd33fe!2sChalapathi%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1657523129846!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )
    };
  }

  // Legal / Policy Pages
  if (cleanPath.startsWith("/privacy-policy")) {
    return {
      title: "Privacy Policy",
      category: "Legal & Policies",
      desc: "City Chalapathi University's policies on data protection and student privacy.",
      body: (
        <div className="space-y-4 text-gray-600 text-sm mt-4 leading-relaxed">
          <p>City Chalapathi University is committed to protecting the privacy of its students, faculty, staff, and visitors. This Privacy Policy details how we collect, use, and safeguard personal information.</p>
          <h4 className="font-extrabold text-[#072A6C] text-sm mt-4">1. Data Collection</h4>
          <p className="text-xs">We collect academic, enrollment, contact, and portal login logs strictly to provide university services, admissions counseling, and educational resources.</p>
          <h4 className="font-extrabold text-[#072A6C] text-sm mt-4">2. Security Compliance</h4>
          <p className="text-xs">All database transmissions utilize secure socket layer encryption (SSL/TLS) and are hosted within state-compliant data centers to ensure zero breach vulnerabilities.</p>
        </div>
      )
    };
  }

  if (cleanPath.startsWith("/terms-conditions")) {
    return {
      title: "Terms & Conditions",
      category: "Legal & Policies",
      desc: "Governing terms, codes of conduct, and terms of service for university portals.",
      body: (
        <div className="space-y-4 text-gray-600 text-sm mt-4 leading-relaxed">
          <p>By accessing the portals and digital platforms of City Chalapathi University, users agree to comply with the following regulations.</p>
          <h4 className="font-extrabold text-[#072A6C] text-sm mt-4">1. Academic Conduct</h4>
          <p className="text-xs">All online submissions, grading assessments, and student actions must align with our academic integrity and anti-plagiarism framework.</p>
          <h4 className="font-extrabold text-[#072A6C] text-sm mt-4">2. Usage Limitations</h4>
          <p className="text-xs">University network assets, computing resources, and campus portal access must not be used for unauthorized downloading or third-party credential distribution.</p>
        </div>
      )
    };
  }

  if (cleanPath.startsWith("/sitemap")) {
    return {
      title: "University Sitemap",
      category: "Navigation",
      desc: "An index structure of all accessible academic, administrative, and research directories.",
      body: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 text-xs font-[var(--font-poppins)]">
          <div className="space-y-2">
            <h4 className="font-extrabold text-[#072A6C] uppercase">About</h4>
            <ul className="space-y-1 text-gray-500 font-medium">
              <li><Link to="/about" className="hover:text-[#D71920]">About Us</Link></li>
              <li><Link to="/about/history" className="hover:text-[#D71920]">History & Heritage</Link></li>
              <li><Link to="/about/vision" className="hover:text-[#D71920]">Vision & Mission</Link></li>
              <li><Link to="/about/leadership" className="hover:text-[#D71920]">University Leadership</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-extrabold text-[#072A6C] uppercase">Academics</h4>
            <ul className="space-y-1 text-gray-500 font-medium">
              <li><Link to="/academics" className="hover:text-[#D71920]">Programs Portal</Link></li>
              <li><Link to="/academics/computer-science" className="hover:text-[#D71920]">Computer Science & Eng</Link></li>
              <li><Link to="/academics/artificial-intelligence" className="hover:text-[#D71920]">AI & Machine Learning</Link></li>
              <li><Link to="/academics/data-science" className="hover:text-[#D71920]">Data Science</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-extrabold text-[#072A6C] uppercase">Admissions</h4>
            <ul className="space-y-1 text-gray-500 font-medium">
              <li><Link to="/admissions" className="hover:text-[#D71920]">Admissions Portal</Link></li>
              <li><Link to="/admissions/fees" className="hover:text-[#D71920]">Academic Fee Structure</Link></li>
              <li><Link to="/admissions/scholarships" className="hover:text-[#D71920]">Scholarships & Waivers</Link></li>
              <li><Link to="/admissions/apply" className="hover:text-[#D71920]">Apply Registration Form</Link></li>
            </ul>
          </div>
        </div>
      )
    };
  }

  // Default fallback
  return {
    title: "University Information Page",
    category: "Information",
    desc: "Discover details, academic programs, and announcements from City Chalapathi Institute of Technology.",
    body: <p className="text-gray-600 text-sm">Please select a topic from the main navigation menu or search directory.</p>
  };
};

function AcademicCalendar() {
  const [selectedYear, setSelectedYear] = React.useState("2026-27");
  const [activeCourse, setActiveCourse] = React.useState<string | null>(null);

  const years = ["2026-27", "2025-26", "2024-25", "2023-24", "2022-23"];

  const collegesData: Record<string, Record<string, { label: string; key: string }[]>> = {
    "2026-27": {
      "College of Engineering": [
        { label: "B.Tech. I Year (All Specializations)", key: "btech-1" },
        { label: "B.Tech. II, III & IV Year (Regular)", key: "btech-2-3-4" },
        { label: "B.Tech. Lateral Entry (UG Engineering)", key: "btech-lateral" },
        { label: "M.Tech. I & II Year Programs", key: "mtech" }
      ],
      "College of Management": [
        { label: "MBA I & II Year Programs", key: "mba" },
        { label: "MCA I & II Year Programs", key: "mca" },
        { label: "BBA Undergraduate Programs", key: "bba" }
      ],
      "College of Pharmacy": [
        { label: "B.Pharm I Year Coursework", key: "bpharm-1" },
        { label: "B.Pharm II, III & IV Year", key: "bpharm-2-3-4" },
        { label: "M.Pharm & Pharm.D Programs", key: "mpharm" }
      ]
    },
    "2025-26": {
      "College of Engineering": [
        { label: "B.Tech. I Year (All Specializations)", key: "btech-1" },
        { label: "B.Tech. II, III & IV Year (Regular)", key: "btech-2-3-4" },
        { label: "M.Tech. Programs", key: "mtech" }
      ],
      "College of Management": [
        { label: "MBA & MCA Programs", key: "mgmt" }
      ],
      "College of Pharmacy": [
        { label: "B.Pharm Programs", key: "bpharm" }
      ]
    }
  };

  // Pre-fill previous years dynamically so we have 5 years covered
  years.forEach(y => {
    if (!collegesData[y]) {
      collegesData[y] = {
        "College of Engineering": [
          { label: `B.Tech. Programs (${y})`, key: `btech-${y}` },
          { label: `M.Tech. Programs (${y})`, key: `mtech-${y}` }
        ],
        "College of Management": [
          { label: `MBA & MCA Programs (${y})`, key: `mgmt-${y}` }
        ],
        "College of Pharmacy": [
          { label: `B.Pharm & M.Pharm (${y})`, key: `pharm-${y}` }
        ]
      };
    }
  });

function InteractiveCalendarWidget({ year, courseKey }: { year: string; courseKey: string }) {
  const monthsData = [
    { name: "July", yearOffset: 0, startDay: 2, totalDays: 31, events: { 15: "Commencement of Classwork" } },
    { name: "August", yearOffset: 0, startDay: 5, totalDays: 31, events: {} },
    { name: "September", yearOffset: 0, startDay: 1, totalDays: 30, events: { 5: "First Mid-Term Examinations" } },
    { name: "October", yearOffset: 0, startDay: 3, totalDays: 31, events: {} },
    { name: "November", yearOffset: 0, startDay: 6, totalDays: 30, events: { 14: "Second Mid-Term Examinations" } },
    { name: "December", yearOffset: 0, startDay: 1, totalDays: 31, events: { 3: "Practical Examinations", 15: "End Semester Theory Exams" } },
    { name: "January", yearOffset: 1, startDay: 4, totalDays: 31, events: { 5: "Commencement of Next Semester" } }
  ];

  const [monthIndex, setMonthIndex] = React.useState(0);
  const [selectedDay, setSelectedDay] = React.useState<number | null>(15);

  const currentMonth = monthsData[monthIndex];
  
  const yStart = parseInt(year.split("-")[0]);
  const yEnd = parseInt("20" + year.split("-")[1]);
  const displayYear = currentMonth.yearOffset === 0 ? yStart : yEnd;

  const prevMonth = () => {
    setMonthIndex((prev) => (prev > 0 ? prev - 1 : monthsData.length - 1));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setMonthIndex((prev) => (prev < monthsData.length - 1 ? prev + 1 : 0));
    setSelectedDay(null);
  };

  // Generate day cells including empty offsets
  const dayCells = [];
  for (let i = 0; i < currentMonth.startDay; i++) {
    dayCells.push(null);
  }
  for (let i = 1; i <= currentMonth.totalDays; i++) {
    dayCells.push(i);
  }

  // Get active event for selected day
  const activeEvent = selectedDay && currentMonth.events[selectedDay as keyof typeof currentMonth.events];

  return (
    <div className="p-4 bg-gray-50/70 border-t border-gray-100 animate-slide-down">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-bold text-[#072A6C] uppercase tracking-wider">Visual Academic Calendar ({year})</span>
        <button 
          onClick={() => alert(`Academic Calendar PDF for ${year} is queued for download.`)}
          className="text-[10px] font-bold text-[#D71920] hover:text-[#072A6C] transition-colors"
        >
          📥 Download Calendar PDF
        </button>
      </div>

      {/* Main split box matching reference visual styling */}
      <div className="flex flex-col md:flex-row rounded-3xl border border-gray-200 overflow-hidden shadow-md">
        {/* Left Side: Calendar Grid */}
        <div className="w-full md:w-3/5 bg-gray-50/80 p-6 flex flex-col justify-between min-h-[320px]">
          {/* Header Month/Year Selection */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-bold text-[#D71920] uppercase tracking-widest">{displayYear - 1}</span>
            <h5 className="text-sm font-extrabold text-[#072A6C] uppercase tracking-widest">
              {currentMonth.name}, {displayYear}
            </h5>
            <span className="text-[10px] font-bold text-[#D71920] uppercase tracking-widest">{displayYear + 1}</span>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] font-bold text-[#072A6C]/70 uppercase mb-4 tracking-wider">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thur</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Grid Cells */}
          <div className="grid grid-cols-7 gap-y-2 text-center items-center relative">
            {/* Left Month navigation arrow */}
            <button 
              onClick={prevMonth}
              className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-gray-100 hover:bg-gray-50 flex items-center justify-center shadow-sm text-[#072A6C] hover:text-[#D71920] transition-colors cursor-pointer outline-none"
            >
              ◀
            </button>

            {dayCells.map((day, idx) => {
              if (day === null) return <div key={`empty-${idx}`} />;
              
              const hasEvent = currentMonth.events[day as keyof typeof currentMonth.events] !== undefined;
              const isSelected = selectedDay === day;

              return (
                <button
                  key={`day-${day}`}
                  onClick={() => setSelectedDay(day)}
                  className={`w-8 h-8 mx-auto rounded-full flex flex-col items-center justify-center text-xs font-bold transition-all relative cursor-pointer outline-none ${
                    isSelected 
                      ? "bg-[#D71920] text-white shadow-sm scale-110" 
                      : "text-[#072A6C] hover:bg-[#072A6C]/10"
                  }`}
                >
                  <span>{day}</span>
                  {/* Underline matching reference screenshot */}
                  {hasEvent && (
                    <span className={`w-3.5 h-[2px] rounded absolute bottom-1.5 ${isSelected ? "bg-white" : "bg-[#D71920]"}`} />
                  )}
                </button>
              );
            })}

            {/* Right Month navigation arrow */}
            <button 
              onClick={nextMonth}
              className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-gray-100 hover:bg-gray-50 flex items-center justify-center shadow-sm text-[#072A6C] hover:text-[#D71920] transition-colors cursor-pointer outline-none"
            >
              ▶
            </button>
          </div>

          {/* Bottom actions */}
          <div className="flex gap-2 mt-6">
            <button 
              onClick={() => alert(`Full events roster for ${currentMonth.name} is displayed on the sidebar.`)}
              className="flex-1 py-2.5 bg-[#072A6C] hover:bg-[#072A6C]/90 text-white text-[9.5px] font-bold rounded-lg tracking-widest uppercase transition-colors outline-none cursor-pointer"
            >
              See Planned Events
            </button>
            <button 
              onClick={() => alert("Notification reminder has been registered successfully.")}
              className="flex-1 py-2.5 bg-[#D71920] hover:bg-[#D71920]/95 text-white text-[9.5px] font-bold rounded-lg tracking-widest uppercase transition-colors outline-none cursor-pointer"
            >
              Set Reminder
            </button>
          </div>
        </div>

        {/* Right Side: University Blue Events Panel */}
        <div className="w-full md:w-2/5 bg-[#072A6C] p-6 text-white flex flex-col justify-between min-h-[320px]">
          <div>
            <span className="text-[10px] font-extrabold text-[#D71920] uppercase tracking-widest block mb-1">Schedule</span>
            <h5 className="text-xs font-extrabold uppercase tracking-widest pb-2 border-b border-white/10 mb-4">
              Events
            </h5>

            <div className="space-y-4">
              {/* Display specific event if selected date has one */}
              {activeEvent ? (
                <div className="space-y-1.5 animate-slide-down">
                  <div className="text-yellow-300 text-[11px] font-extrabold uppercase tracking-wider leading-snug">
                    {activeEvent}
                  </div>
                  <div className="w-16 h-[2px] bg-[#D71920] rounded" />
                  <div className="text-[9.5px] text-gray-300 font-light">
                    Scheduled on {currentMonth.name} {selectedDay}, {displayYear}
                  </div>
                </div>
              ) : selectedDay ? (
                <div className="text-gray-300 text-xs font-light italic">
                  No academic events scheduled on {currentMonth.name} {selectedDay}.
                </div>
              ) : (
                <div className="text-gray-300 text-xs font-light italic">
                  Click a highlighted date in the calendar to view scheduled milestones.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 space-y-2">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Month Summary:</span>
            {Object.keys(currentMonth.events).length > 0 ? (
              Object.entries(currentMonth.events).map(([day, evName]) => (
                <div key={day} className="text-[10px] text-gray-200 flex items-center justify-between">
                  <span>• {evName}</span>
                  <span className="text-gray-400 shrink-0 ml-2">{currentMonth.name.substring(0, 3)} {day}</span>
                </div>
              ))
            ) : (
              <div className="text-[10px] text-gray-400 italic">No events scheduled in {currentMonth.name}.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="space-y-6">
      {/* 5-Year Selection Pills */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-100">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => {
              setSelectedYear(year);
              setActiveCourse(null);
            }}
            className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer outline-none ${
              selectedYear === year
                ? "bg-[#D71920] text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
            }`}
          >
            {year} {year === "2026-27" && "(Present)"}
          </button>
        ))}
      </div>

      {/* College Categories & Course Lists */}
      <div className="space-y-6">
        {Object.entries(collegesData[selectedYear] || {}).map(([collegeName, courses]) => (
          <div key={collegeName} className="bg-white border border-gray-200/60 rounded-[16px] p-5 shadow-sm">
            <h4 className="text-xs font-extrabold text-[#072A6C] mb-4 border-l-4 border-[#D71920] pl-3 tracking-wide uppercase">
              {collegeName}
            </h4>
            <div className="flex flex-col gap-2">
              {courses.map((course) => {
                const uniqueKey = `${selectedYear}-${course.key}`;
                const isExpanded = activeCourse === uniqueKey;
                return (
                  <div key={course.key} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-blue-100 transition-all duration-300">
                    <button
                      onClick={() => setActiveCourse(isExpanded ? null : uniqueKey)}
                      className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-gray-700 hover:text-[#D71920] bg-white transition-colors text-left outline-none cursor-pointer"
                    >
                      <span>• {course.label}</span>
                      <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-[#D71920]" : "text-gray-400"}`} />
                    </button>
                    {isExpanded && <InteractiveCalendarWidget year={selectedYear} courseKey={course.key} />}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AcademicFlexibilities() {
  const [activeItem, setActiveItem] = React.useState<string | null>(null);

  const flexibilities = [
    {
      title: "Acceleration and Deceleration",
      key: "acceleration",
      desc: "Allows students to adjust their academic pace. Capable students can accelerate their degree program by taking extra credits (up to 28 per semester) to graduate in 3.5 years or opt for deceleration (fewer credits) to spread the load without failing grades.",
      highlights: ["Fast-track graduation in 3.5 years", "Decelerated paths to manage complex core modules", "Credit load variance between 16 to 28 credits per term"]
    },
    {
      title: "Change of Branch",
      key: "change-branch",
      desc: "Offers a second chance to slide into a branch of choice. High-performing students (typically top 10% based on first-year CGPA) with no backlogs can apply for branch transfer after completing their second semester.",
      highlights: ["Merit-based allocations after Year 1", "CGPA threshold of 8.5 or above", "Zero pending backlogs constraint"]
    },
    {
      title: "Choice Based Credit System (CBCS)",
      key: "cbcs",
      desc: "Gives students the freedom to choose their own curriculum paths. Under the Choice Based Credit System, scholars can choose professional core electives, interdisciplinary open electives, and humanities courses across departments.",
      highlights: ["Choice-driven learning framework", "Interdisciplinary open electives basket", "Syllabus aligned with global Credit accumulation systems"]
    },
    {
      title: "Double Major",
      key: "double-major",
      desc: "Enables students to gain multi-disciplinary expertise. An engineering student can earn a Double Major by acquiring additional credits in a second engineering discipline, broadening career horizons significantly.",
      highlights: ["Degrees in two distinct major categories", "Extended credit scope", "Enhances placement prospects in hybrid sectors"]
    },
    {
      title: "Dual Degree",
      key: "dual-degree",
      desc: "Fast-tracks higher education. Students can enroll in integrated dual-degree programs to complete a B.Tech + M.Tech in 5 years or BBA + MBA in a structured, accelerated timeline, saving one full academic year.",
      highlights: ["B.Tech + M.Tech in 5 years", "Integrated course structures", "Saves time and fee costs"]
    },
    {
      title: "Honors Degree",
      key: "honors",
      desc: "Promotes advanced study and research. Outstanding students can opt for an Honors track in their parent department. This requires completing additional advanced theory courses and a minor research dissertation.",
      highlights: ["Awarded as 'B.Tech (Honours)'", "Dedicated advanced research dissertation", "High eligibility threshold (CGPA > 8.0)"]
    },
    {
      title: "Minor Degree",
      key: "minor",
      desc: "Adds a secondary stream of expertise. Students can take a set of 5-6 courses from another department (e.g. ECE student completing minor in CSE) to gain a minor degree along with their primary branch.",
      highlights: ["Cross-discipline skillset certification", "Prepares students for hybrid jobs (e.g. Bio-informatics)", "Structured credit tracks alongside primary majors"]
    },
    {
      title: "Special Purpose Semesters",
      key: "special-sem",
      desc: "Dedicated time for out-of-classroom learning. Students can spend a complete semester (typically in Year 4) doing a full-time Industry Internship, a Semester Abroad Program (SAP) at a global university, or incubating a startup on campus.",
      highlights: ["6-Month full-time industrial placement", "Semester Abroad programs (SAP) at partner universities", "Campus startup incubator support credits"]
    },
    {
      title: "Specialization",
      key: "specialization",
      desc: "Deepens focus in high-demand fields. CSE students can choose targeted specializations (like Cyber Security, Data Science, AI & ML) by taking a set of matching elective courses and lab projects starting in their third year.",
      highlights: ["Focused tracks within parent branch", "Industry-aligned specific curricula", "Prepares for specialized roles directly out of college"]
    },
    {
      title: "Summer Term Registration",
      key: "summer-term",
      desc: "Provides a credit recovery pathway. Conducted during the summer break, this term allows students with backlogs or missed attendance to re-register for courses, complete examinations, and catch up with their cohorts.",
      highlights: ["Fast-track backlog clearance", "Accelerated credit recovery", "Regular classes and laboratory cycles over 6 weeks"]
    }
  ];

  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-sm leading-relaxed">
        City Chalapathi Institute of Technology offers several academic flexibilities for students at both Undergraduate and Postgraduate levels. Click on any of the flexibilities below to view full details:
      </p>

      <div className="space-y-3">
        {flexibilities.map((item) => {
          const isExpanded = activeItem === item.key;
          return (
            <div key={item.key} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-[#D71920]/20 transition-all duration-300">
              <button
                onClick={() => setActiveItem(isExpanded ? null : item.key)}
                className="w-full px-5 py-4 flex items-center justify-between text-xs font-bold text-gray-700 hover:text-[#D71920] bg-white transition-colors text-left outline-none cursor-pointer"
              >
                <span>• {item.title}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-[#D71920]" : "text-gray-400"}`} />
              </button>
              
              {isExpanded && (
                <div className="px-5 pb-5 pt-3 bg-gray-50/50 border-t border-gray-100 animate-slide-down space-y-4">
                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    {item.desc}
                  </p>
                  
                  <div className="space-y-2">
                    <span className="text-[10px] text-[#072A6C] font-extrabold uppercase tracking-wider block">Key Highlights:</span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-1">
                      {item.highlights.map((h, idx) => (
                        <li key={idx} className="text-[11.5px] text-gray-500 font-medium flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AcademicGradingSystem() {
  const isAdmin = false;
  const [activeTab, setActiveTab] = React.useState("btech");

  const defaultGradingData = {
    btech: {
      title: "B.Tech. Grading Schema",
      absolute: [
        { perf: "Outstanding", grade: "O", gp: "10", range: "90 - 100" },
        { perf: "Excellent", grade: "A+", gp: "9", range: "80 - 89" },
        { perf: "Very Good", grade: "A", gp: "8", range: "70 - 79" },
        { perf: "Good", grade: "B+", gp: "7", range: "60 - 69" },
        { perf: "Above Average", grade: "B", gp: "6", range: "50 - 59" },
        { perf: "Average", grade: "C", gp: "5", range: "46 - 49" },
        { perf: "Pass", grade: "P", gp: "4", range: "40 - 45" },
        { perf: "Fail", grade: "F", gp: "0", range: "0 - 39" },
        { perf: "Absent", grade: "AB", gp: "0", range: "Absent" }
      ],
      relative: [
        { grade: "O", gp: "10", calc: "total marks >= 90% and total marks >= mean + 1.50σ" },
        { grade: "A+", gp: "9", calc: "µ+0.50σ <= total marks < µ+1.50σ" },
        { grade: "A", gp: "8", calc: "µ <= total marks < µ+0.50σ" },
        { grade: "B+", gp: "7", calc: "µ-0.50σ <= total marks < µ" },
        { grade: "B", gp: "6", calc: "µ-1.00σ <= total marks < µ-0.50σ" },
        { grade: "C", gp: "5", calc: "µ-1.25σ <= total marks < µ-1.00σ" },
        { grade: "P", gp: "4", calc: "µ-1.50σ <= total marks < µ-1.25σ or >= 40" },
        { grade: "F", gp: "0", calc: "total marks < µ-1.50σ or total marks <= 39" },
        { grade: "AB", gp: "0", calc: "Absent" }
      ]
    },
    pg: {
      title: "M.Tech, MSc, M.A, MCA, MBA Grading Schema",
      absolute: [
        { perf: "Outstanding", grade: "O", gp: "10", range: "90 - 100" },
        { perf: "Excellent", grade: "A+", gp: "9", range: "80 - 89" },
        { perf: "Very Good", grade: "A", gp: "8", range: "70 - 79" },
        { perf: "Good", grade: "B+", gp: "7", range: "60 - 69" },
        { perf: "Above Average", grade: "B", gp: "6", range: "50 - 59" },
        { perf: "Fail", grade: "F", gp: "0", range: "0 - 49" },
        { perf: "Absent", grade: "AB", gp: "0", range: "Absent" }
      ],
      relative: [
        { grade: "O", gp: "10", calc: "total marks >= 90% and total marks >= mean + 1.50σ" },
        { grade: "A+", gp: "9", calc: "µ+0.50σ <= total marks < µ+1.50σ" },
        { grade: "A", gp: "8", calc: "µ <= total marks < µ+0.50σ" },
        { grade: "B+", gp: "7", calc: "µ-0.50σ <= total marks < µ" },
        { grade: "B", gp: "6", calc: "µ-1.00σ <= total marks < µ-0.50σ" },
        { grade: "F", gp: "0", calc: "total marks < µ-1.50σ or total marks <= 49" },
        { grade: "AB", gp: "0", calc: "Absent" }
      ]
    },
    barch: {
      title: "B.Arch. Grading Schema",
      absolute: [
        { perf: "Outstanding", grade: "O", gp: "10", range: "90 - 100" },
        { perf: "Excellent", grade: "A+", gp: "9", range: "80 - 89" },
        { perf: "Very Good", grade: "A", gp: "8", range: "70 - 79" },
        { perf: "Good", grade: "B+", gp: "7", range: "60 - 69" },
        { perf: "Above Average", grade: "B", gp: "6", range: "56 - 59" },
        { perf: "Pass", grade: "P", gp: "5", range: "50 - 55" },
        { perf: "Fail", grade: "F", gp: "0", range: "0 - 49" },
        { perf: "Absent", grade: "AB", gp: "0", range: "Absent" }
      ]
    },
    bpharm: {
      title: "B.Pharmacy Grading Schema",
      absolute: [
        { perf: "Outstanding", grade: "O", gp: "10", range: "90 - 100" },
        { perf: "Excellent", grade: "A", gp: "9", range: "80 - 89" },
        { perf: "Good", grade: "B", gp: "8", range: "70 - 79" },
        { perf: "Fair", grade: "C", gp: "7", range: "60 - 69" },
        { perf: "Average", grade: "D", gp: "6", range: "50 - 59" },
        { perf: "Fail", grade: "F", gp: "0", range: "0 - 49" },
        { perf: "Absent", grade: "AB", gp: "0", range: "Absent" }
      ]
    },
    bballb: {
      title: "BBA-LL.B. Grading Schema",
      relative: [
        { perf: "Excellent", grade: "X", gp: "10", calc: "Top Tier performance" },
        { perf: "Very Good", grade: "A", gp: "9", calc: "Highly Commendable" },
        { perf: "Good", grade: "B", gp: "8", calc: "Competent Standard" },
        { perf: "Fair", grade: "C", gp: "7", calc: "Average standard" },
        { perf: "Satisfactory", grade: "D", gp: "6", calc: "Satisfactory standard" },
        { perf: "Pass", grade: "E", gp: "5", calc: "Passing threshold" },
        { perf: "Fail", grade: "F", gp: "0", calc: "Failing standard" },
        { perf: "Absent", grade: "AB", gp: "0", calc: "Absent" }
      ]
    }
  };

  const [gradingData, setGradingData] = React.useState(() => {
    const saved = localStorage.getItem("chalapathy_grading_config");
    return saved ? JSON.parse(saved) : defaultGradingData;
  });
  const currentProgram = gradingData[activeTab];

  return (
    <div className="space-y-6">
      {/* Top Header Controls */}
      <div className="flex justify-start items-center bg-gray-50 border border-gray-100 p-4 rounded-2xl">
        <div className="flex gap-2">
          {Object.entries(gradingData).map(([key, data]: [string, any]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer outline-none ${
                activeTab === key
                  ? "bg-[#072A6C] text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {key === "btech" && "B.Tech"}
              {key === "pg" && "PG (M.Tech/MBA/MCA)"}
              {key === "barch" && "B.Arch"}
              {key === "bpharm" && "B.Pharmacy"}
              {key === "bballb" && "BBA-LL.B."}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-lg font-extrabold text-[#072A6C]">{currentProgram.title}</h3>
        
        {/* Render Absolute Grading if it exists */}
        {currentProgram.absolute && (
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-extrabold text-[#D71920] uppercase tracking-wider">Absolute Grading System</span>
              {isAdmin && <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-100">Click any field to edit</span>}
            </div>
            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm bg-white">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#072A6C] text-white font-extrabold border-b-2 border-[#D71920]">
                    <th className="p-3.5 text-[10px] font-extrabold uppercase tracking-widest text-white/95">Performance</th>
                    <th className="p-3.5 text-[10px] font-extrabold uppercase tracking-widest text-white/95">Letter Grade</th>
                    <th className="p-3.5 text-[10px] font-extrabold uppercase tracking-widest text-white/95">Grade Point</th>
                    <th className="p-3.5 text-[10px] font-extrabold uppercase tracking-widest text-white/95">Percentage of Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentProgram.absolute.map((row: any, idx: number) => (
                    <tr key={idx} className="hover:bg-red-50/20 odd:bg-gray-50/40 transition-colors">
                      <td className="p-3.5 font-medium text-gray-800">{row.perf}</td>
                      <td className="p-3.5 font-extrabold text-[#D71920] text-sm">{row.grade}</td>
                      <td className="p-3.5 font-bold text-[#072A6C] text-xs">{row.gp}</td>
                      <td className="p-3.5 text-gray-500 font-light">{row.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Render Relative Grading if it exists */}
        {currentProgram.relative && (
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-extrabold text-[#072A6C] uppercase tracking-wider">Relative Grading System</span>
            </div>
            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm bg-white">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#072A6C] text-white font-extrabold border-b-2 border-[#D71920]">
                    {activeTab === "bballb" && <th className="p-3.5 text-[10px] font-extrabold uppercase tracking-widest text-white/95">Performance</th>}
                    <th className="p-3.5 text-[10px] font-extrabold uppercase tracking-widest text-white/95">Letter Grade</th>
                    <th className="p-3.5 text-[10px] font-extrabold uppercase tracking-widest text-white/95">Grade Point</th>
                    <th className="p-3.5 text-[10px] font-extrabold uppercase tracking-widest text-white/95">{activeTab === "bballb" ? "Descriptor" : "Grade Calculation Formula"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentProgram.relative.map((row: any, idx: number) => (
                    <tr key={idx} className="hover:bg-red-50/20 odd:bg-gray-50/40 transition-colors">
                      {activeTab === "bballb" && (
                        <td className="p-3.5 font-medium text-gray-800">{row.perf}</td>
                      )}
                      <td className="p-3.5 font-extrabold text-[#D71920] text-sm">{row.grade}</td>
                      <td className="p-3.5 font-bold text-[#072A6C] text-xs">{row.gp}</td>
                      <td className="p-3.5 text-gray-600 font-mono text-[11px]">{row.calc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl text-[11px] text-yellow-900 font-light leading-relaxed">
        <strong>Definitions:</strong>
        <br />• <strong>Mean (µ):</strong> The average score of all passing students in the specific subject class.
        <br />• <strong>Standard Deviation (σ):</strong> Represents the variance / score distribution of the student cohort.
        <br />• <strong>Relative Grading:</strong> Used selectively for large core classes to ensure a fair normal distribution curve across multiple branches.
      </div>
    </div>
  );
}

function AwardOfDegrees() {
  const [activeCategory, setActiveCategory] = React.useState("btech");
  const [testCgpa, setTestCgpa] = React.useState<number>(7.5);

  const categories = {
    btech: {
      title: "B.Tech., B.Sc., B.Com., BBA, BCA",
      desc: "Degree classification requirements for undergraduate streams:",
      grades: [
        { min: 5.25, max: 5.75, class: "Pass Class", color: "bg-gray-50 border-gray-200 text-gray-700", glow: "hover:bg-gray-100/50 hover:border-gray-300" },
        { min: 5.75, max: 6.75, class: "Second Class", color: "bg-blue-50/40 border-blue-100 text-blue-800", glow: "hover:bg-blue-50 hover:border-blue-300" },
        { min: 6.75, max: 7.75, class: "First Class", color: "bg-indigo-50/40 border-indigo-100 text-indigo-800", glow: "hover:bg-indigo-50 hover:border-indigo-300" },
        { min: 7.75, max: 10.0, class: "First Class with Distinction", color: "bg-rose-50/40 border-rose-100 text-[#D71920]", glow: "hover:bg-rose-50 hover:border-[#D71920]", note: "Fulfill all program requirements in specified minimum years duration and pass all courses in first attempt." }
      ]
    },
    barch: {
      title: "B.Arch. (Bachelor of Architecture)",
      desc: "Degree classification requirements for architectural courses:",
      grades: [
        { min: 5.75, max: 6.25, class: "Pass Class", color: "bg-gray-50 border-gray-200 text-gray-700", glow: "hover:bg-gray-100/50 hover:border-gray-300" },
        { min: 6.25, max: 6.75, class: "Second Class", color: "bg-blue-50/40 border-blue-100 text-blue-800", glow: "hover:bg-blue-50 hover:border-blue-300" },
        { min: 6.75, max: 7.75, class: "First Class", color: "bg-indigo-50/40 border-indigo-100 text-indigo-800", glow: "hover:bg-indigo-50 hover:border-indigo-300" },
        { min: 7.75, max: 10.0, class: "First Class with Distinction", color: "bg-rose-50/40 border-rose-100 text-[#D71920]", glow: "hover:bg-rose-50 hover:border-[#D71920]", note: "Fulfill all program requirements in specified minimum years duration and pass all courses in first attempt." }
      ]
    },
    pg: {
      title: "M.Tech., M.Sc., M.A., MCA, MBA",
      desc: "Degree classification requirements for all postgraduate programs:",
      grades: [
        { min: 5.5, max: 5.75, class: "Pass Class", color: "bg-gray-50 border-gray-200 text-gray-700", glow: "hover:bg-gray-100/50 hover:border-gray-300" },
        { min: 5.75, max: 6.75, class: "Second Class", color: "bg-blue-50/40 border-blue-100 text-blue-800", glow: "hover:bg-blue-50 hover:border-blue-300" },
        { min: 6.75, max: 7.75, class: "First Class", color: "bg-indigo-50/40 border-indigo-100 text-indigo-800", glow: "hover:bg-indigo-50 hover:border-indigo-300" },
        { min: 7.75, max: 10.0, class: "First Class with Distinction", color: "bg-rose-50/40 border-rose-100 text-[#D71920]", glow: "hover:bg-rose-50 hover:border-[#D71920]", note: "Fulfill all program requirements in specified minimum years duration and pass all courses in first attempt." }
      ]
    }
  };

  const selectedData = categories[activeCategory as keyof typeof categories];

  // Helper to determine active range based on slider CGPA value
  const getActiveGradeIndex = () => {
    return selectedData.grades.findIndex(
      (g) => testCgpa >= g.min && testCgpa < g.max
    );
  };

  const activeGradeIndex = getActiveGradeIndex();

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex gap-2 pb-2 border-b border-gray-100">
        {Object.entries(categories).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer outline-none ${
              activeCategory === key
                ? "bg-[#072A6C] text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
            }`}
          >
            {key === "btech" && "UG (B.Tech, B.Sc, B.Com, BBA, BCA)"}
            {key === "barch" && "B.Arch"}
            {key === "pg" && "PG (M.Tech, MBA, MCA, M.Sc)"}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-extrabold text-[#072A6C] uppercase tracking-wider">
          {selectedData.title}
        </h4>
        <p className="text-xs text-gray-500 font-light leading-relaxed">{selectedData.desc}</p>
      </div>

      {/* Degree Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedData.grades.map((grade, index) => {
          const isActive = index === activeGradeIndex;
          return (
            <div
              key={grade.class}
              className={`p-5 rounded-2xl border-2 transition-all duration-300 select-none hover:-translate-y-1 hover:shadow-md ${grade.color} ${grade.glow} ${
                isActive
                  ? "ring-4 ring-offset-2 ring-[#072A6C] border-[#072A6C] scale-[1.02] shadow-md"
                  : "scale-100 shadow-sm"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-extrabold tracking-wide block uppercase">
                  {grade.class}
                </span>
                <span className="text-[10px] font-bold bg-white/70 px-2 py-0.5 rounded border border-gray-200">
                  {grade.min} ≤ CGPA &lt; {grade.max === 10.0 ? "10.00" : grade.max}
                </span>
              </div>
              <p className="text-[11.5px] leading-relaxed text-gray-600 font-light">
                Awarded to students finishing all academic credits and clearing modules with a cumulative GPA of {grade.min} to {grade.max}.
              </p>
              {grade.note && (
                <div className="mt-3 pt-3 border-t border-red-200/50 text-[10px] text-red-600 font-medium leading-relaxed">
                  ⚠️ <strong>Note:</strong> {grade.note}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive CGPA Classification Slider */}
      <div className="bg-[#072A6C]/5 border border-[#072A6C]/10 rounded-2xl p-5 shadow-sm space-y-4 mt-6">
        <h5 className="text-xs font-extrabold text-[#072A6C] uppercase tracking-wider">
          🎓 Interactive Degree Classifier
        </h5>
        <p className="text-[11.5px] text-gray-500 font-light">
          Drag the slider to select a target CGPA and view your expected graduation classification.
        </p>
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-3/5 space-y-2">
            <input
              type="range"
              min="5.0"
              max="10.0"
              step="0.05"
              value={testCgpa}
              onChange={(e) => setTestCgpa(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D71920]"
            />
            <div className="flex justify-between text-[10px] font-bold text-gray-400">
              <span>5.0 CGPA</span>
              <span>7.5 CGPA</span>
              <span>10.0 CGPA</span>
            </div>
          </div>

          <div className="w-full md:w-2/5 bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Target CGPA</span>
            <div className="text-[26px] font-[800] text-[#072A6C] leading-none mb-2">{testCgpa.toFixed(2)}</div>
            <div className="inline-block px-3 py-1 bg-[#D71920]/10 text-[#D71920] text-[10.5px] font-extrabold rounded-full uppercase tracking-wider">
              {activeGradeIndex !== -1 ? selectedData.grades[activeGradeIndex].class : "Does Not Qualify"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AcademicRulesRegulations() {
  const rules = [
    {
      title: "Attendance",
      desc: "Minimum 75% attendance is compulsory in each subject to qualify for final theory/laboratory exams.",
      icon: Clock
    },
    {
      title: "Dress Code",
      desc: "Proper formal attire and mandatory wearing of ID cards at all times inside campus blocks.",
      icon: UserCheck
    },
    {
      title: "Integrity",
      desc: "Zero tolerance for cheating, plagiarism, copying lab reports, or possessing prohibited devices in test halls.",
      icon: ShieldAlert
    },
    {
      title: "Conduct",
      desc: "Absolute zero-tolerance ragging policy on campus. Offenders face immediate suspension/legal actions.",
      icon: Scale
    },
    {
      title: "Deadlines",
      desc: "Course registration and examination enrollments must be completed before the semester commencement deadlines.",
      icon: CalendarRange
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h3 className="text-base font-extrabold text-[#072A6C] uppercase tracking-wider">
          5 Focal Points of Student Compliance
        </h3>
        <p className="text-xs text-gray-500 font-light leading-relaxed">
          Standard academic rules and discipline parameters to be strictly adhered to by all scholars at City Chalapathi Institute.
        </p>
      </div>

      {/* 5-Column Grid with Individual hover-raising cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {rules.map((item, idx) => {
          const IconComponent = item.icon;
          const bgClass = idx % 2 === 1 ? "bg-gray-50/80" : "bg-white";
          
          return (
            <div
              key={item.title}
              className={`flex flex-col items-center p-6 text-center border border-gray-100 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-md hover:border-[#D71920]/30 group ${bgClass}`}
            >
              {/* Icon Container with subtle animation */}
              <div className="w-16 h-16 rounded-full bg-blue-50/80 text-[#072A6C] flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#072A6C]/10">
                <IconComponent size={24} className="stroke-[1.5]" />
              </div>

              {/* Bold Title */}
              <h4 className="text-xs font-extrabold text-gray-800 mb-2.5 uppercase tracking-widest group-hover:text-[#D71920] transition-colors">
                {item.title}
              </h4>

              {/* Description Sentence */}
              <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TeachingEvaluation() {
  const evaluations = [
    {
      title: "Mid-Term Examinations",
      weight: "20%",
      desc: "Two centralized internal exams per semester testing core subject knowledge blocks.",
      glow: "hover:border-blue-200"
    },
    {
      title: "Continuous Assessment",
      weight: "10%",
      desc: "Regular assignments, classroom quizzes, case-studies, and active seminar participations.",
      glow: "hover:border-indigo-200"
    },
    {
      title: "Laboratory & Internals",
      weight: "10%",
      desc: "Hands-on lab evaluations, project progress reviews, and viva-voce assessments.",
      glow: "hover:border-teal-200"
    },
    {
      title: "Semester End Examinations",
      weight: "60%",
      desc: "Centralized final examinations testing comprehensive curriculum mastery at the end of each term.",
      glow: "hover:border-red-200"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h4 className="text-xs font-extrabold text-[#072A6C] mb-3 uppercase tracking-wider">Evaluation Framework (CIE vs SEE)</h4>
        <p className="text-xs text-gray-500 font-light leading-relaxed mb-6">
          CCIT follows an Outcome-Based Education (OBE) system with a structured evaluation plan divided into Continuous Internal Evaluation (CIE) and Semester End Examinations (SEE).
        </p>

        {/* Visual Progress split */}
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-bold text-gray-600">
            <span>Continuous Internal Evaluation (CIE) - 40%</span>
            <span>Semester End Exam (SEE) - 60%</span>
          </div>
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
            <div className="h-full bg-[#072A6C]" style={{ width: "40%" }} />
            <div className="h-full bg-[#D71920]" style={{ width: "60%" }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {evaluations.map((item) => (
          <div
            key={item.title}
            className={`bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between ${item.glow}`}
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-extrabold text-[#072A6C] uppercase tracking-wider">{item.title}</span>
                <span className="text-xs font-bold text-[#D71920] bg-red-50 px-2 py-0.5 rounded-full border border-red-100">{item.weight} Weight</span>
              </div>
              <p className="text-xs text-gray-500 font-light leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const BOS_DEPARTMENTS = [
  {
    name: "Agriculture",
    faculty: [
      { name: "Dr. B. Ramanjaneyulu", role: "Chairman (BOS)", desc: "M.Sc. (Agri), Ph.D." },
      { name: "Dr. A. Sravani", role: "Subject Expert (Professor)", desc: "Ph.D. in Agronomy" },
      { name: "Mr. K. Sai Kumar", role: "Industry Representative", desc: "Lead Agtech Scientist, AgriSolutions" },
      { name: "Mrs. M. Vasantha", role: "Assistant Professor", desc: "M.Sc. in Soil Science" }
    ]
  },
  {
    name: "Architecture",
    faculty: [
      { name: "Dr. G. Lakshmi Prasanna", role: "Chairman (BOS)", desc: "M.Arch, Ph.D." },
      { name: "Mr. R. Dinesh Kumar", role: "Industry Expert", desc: "Principal Architect, DesignStudio" },
      { name: "Dr. V. Satish", role: "Professor", desc: "Ph.D. in Urban Planning" },
      { name: "Ms. P. Haritha", role: "Assistant Professor", desc: "M.Arch (Landscape)" }
    ]
  },
  {
    name: "Arts & Sciences",
    faculty: [
      { name: "Dr. K. Srinivasa Rao", role: "Chairman (BOS)", desc: "M.A, Ph.D. in English Literature" },
      { name: "Dr. M. Sunitha", role: "Professor", desc: "Ph.D. in Environmental Sciences" },
      { name: "Mr. T. Naveen", role: "Assistant Professor", desc: "M.Sc. in Statistics" },
      { name: "Dr. G. Swetha", role: "Assistant Professor", desc: "Ph.D. in Humanities" }
    ]
  },
  {
    name: "Biotechnology",
    faculty: [
      { name: "Dr. P. V. Ramana", role: "Chairman (BOS)", desc: "M.Tech, Ph.D. in Biotech" },
      { name: "Dr. S. Madhavi", role: "Subject Expert", desc: "Professor of Bioinformatics, JNTU" },
      { name: "Mr. V. Suresh Kumar", role: "Industry Expert", desc: "Senior Researcher, BioPharm Labs" },
      { name: "Mrs. K. Kalyani", role: "Assistant Professor", desc: "M.Tech (Bioprocess Engineering)" }
    ]
  },
  {
    name: "Civil Engineering",
    faculty: [
      { name: "Dr. M. Rajasekhar", role: "Chairman (BOS)", desc: "M.Tech, Ph.D." },
      { name: "Dr. K. R. C. Reddy", role: "Professor", desc: "Ph.D. in Structural Engineering" },
      { name: "Mr. L. Venkat", role: "Industry Representative", desc: "Chief Engineer, L&T Infrastructure" },
      { name: "Mrs. N. Anusha", role: "Assistant Professor", desc: "M.Tech (Geotechnical)" }
    ]
  },
  {
    name: "Chemistry",
    faculty: [
      { name: "Dr. T. Venkatappa Rao", role: "Chairman (BOS)", desc: "M.Sc., Ph.D." },
      { name: "Dr. S. Anuradha", role: "Professor", desc: "Ph.D. in Organic Chemistry" },
      { name: "Dr. P. Rajesh", role: "Assistant Professor", desc: "Ph.D. in Analytical Chemistry" }
    ]
  },
  {
    name: "Computer Science And Application",
    faculty: [
      { name: "Dr. K. Kiran Kumar", role: "Chairman (BOS)", desc: "MCA, Ph.D." },
      { name: "Dr. P. Swathi", role: "Professor", desc: "Ph.D. in Data Analytics" },
      { name: "Mr. G. Ravindra", role: "Industry Representative", desc: "Principal Architect, TechMahindra" },
      { name: "Mrs. B. Kavitha", role: "Assistant Professor", desc: "MCA, M.Tech" }
    ]
  },
  {
    name: "Computer Science And Engineering",
    faculty: [
      { name: "Dr. C. Naga Raju", role: "Chairman (BOS)", desc: "M.Tech, Ph.D." },
      { name: "Dr. T. Sreenivasulu", role: "Professor", desc: "Ph.D. in Cloud Computing" },
      { name: "Mr. S. Karthik", role: "Industry Expert", desc: "Senior Architect, Amazon Web Services" },
      { name: "Mrs. V. Sireesha", role: "Assistant Professor", desc: "M.Tech (AI & ML)" }
    ]
  },
  {
    name: "Electronics And Communication Engineering",
    faculty: [
      { name: "Dr. K. Chandrasekhara Rao", role: "Chairman (BOS)", desc: "M.Tech, Ph.D." },
      { name: "Dr. J. Ravindranath", role: "Professor", desc: "Ph.D. in VLSI Systems" },
      { name: "Mr. P. Praveen Kumar", role: "Industry Expert", desc: "Senior Hardware Engineer, Qualcomm" },
      { name: "Mrs. D. Prasanthi", role: "Assistant Professor", desc: "M.Tech (Embedded Systems)" }
    ]
  },
  {
    name: "Electrical And Electronics Engineering",
    faculty: [
      { name: "Dr. G. Srinivasa Rao", role: "Chairman (BOS)", desc: "M.Tech, Ph.D." },
      { name: "Dr. V. Bala Raju", role: "Professor", desc: "Ph.D. in Power Systems" },
      { name: "Mr. K. Anil Kumar", role: "Industry Representative", desc: "Electrical Grid Manager, APTransco" },
      { name: "Mr. M. Gopi", role: "Assistant Professor", desc: "M.Tech (Power Electronics)" }
    ]
  },
  {
    name: "Business School",
    faculty: [
      { name: "Dr. M. Sreenivasulu", role: "Chairman (BOS)", desc: "MBA, Ph.D. in Marketing" },
      { name: "Dr. B. K. Durga", role: "Professor", desc: "Ph.D. in Finance Management" },
      { name: "Mr. R. Siva Sankar", role: "Industry Expert", desc: "HR Manager, Cognizant Business Services" },
      { name: "Mrs. T. Rajeswari", role: "Assistant Professor", desc: "MBA (Human Resource)" }
    ]
  },
  {
    name: "LAW",
    faculty: [
      { name: "Dr. G. V. R. Prasad", role: "Chairman (BOS)", desc: "LL.M, Ph.D." },
      { name: "Dr. P. Radhika", role: "Professor", desc: "Ph.D. in Constitutional Law" },
      { name: "Mr. D. Hari Prasad", role: "Subject Expert", desc: "Senior Counsel, High Court of AP" }
    ]
  },
  {
    name: "Maths",
    faculty: [
      { name: "Dr. A. S. Ramakrishna", role: "Chairman (BOS)", desc: "M.Sc., Ph.D." },
      { name: "Dr. P. Nagamani", role: "Professor", desc: "Ph.D. in Fluid Dynamics" },
      { name: "Mrs. G. Sunanda", role: "Assistant Professor", desc: "M.Sc. (Mathematics)" }
    ]
  },
  {
    name: "Mechanical Engineering",
    faculty: [
      { name: "Dr. K. Srinivasa Rao", role: "Chairman (BOS)", desc: "M.Tech, Ph.D." },
      { name: "Dr. G. Prasada Rao", role: "Professor", desc: "Ph.D. in Thermal Science" },
      { name: "Mr. T. Shiva Shankar", role: "Industry Representative", desc: "Lead Engineer, Tata Motors" },
      { name: "Mr. B. Rajesh Kumar", role: "Assistant Professor", desc: "M.Tech (CAD/CAM)" }
    ]
  },
  {
    name: "Pharmacy",
    faculty: [
      { name: "Dr. B. Madhava Reddy", role: "Chairman (BOS)", desc: "M.Pharm, Ph.D." },
      { name: "Dr. K. Venkata Ramana", role: "Professor", desc: "Ph.D. in Pharmaceutics" },
      { name: "Mr. G. Sai Krishna", role: "Industry Expert", desc: "Quality Assurance Lead, Aurobindo Pharma" },
      { name: "Mrs. N. Swetha", role: "Assistant Professor", desc: "M.Pharm (Pharmacology)" }
    ]
  },
  {
    name: "Physics",
    faculty: [
      { name: "Dr. S. K. Mastan", role: "Chairman (BOS)", desc: "M.Sc., Ph.D." },
      { name: "Dr. P. Srinivasa Rao", role: "Professor", desc: "Ph.D. in Condensed Matter Physics" },
      { name: "Mr. D. Nagaraju", role: "Assistant Professor", desc: "M.Sc. in Physics" }
    ]
  }
];

function BOSMembers() {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-sm leading-relaxed">
        The Board of Studies (BOS) at City Chalapathi meets annually to review and approve academic curriculum layouts, ensuring modern alignment with industrial needs. Click any department below to view its Board Members and key faculty on their dedicated department directory page:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {BOS_DEPARTMENTS.map((dept) => {
          const slug = dept.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
          return (
            <Link 
              key={dept.name} 
              to={`/academics/bos/${slug}`}
              className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-[#D71920]/20 transition-all duration-300 flex items-center justify-between text-xs font-bold text-gray-700 hover:text-[#D71920] cursor-pointer"
            >
              <span>• Department of {dept.name}</span>
              <ChevronRight size={14} className="text-gray-400" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function DepartmentFacultyView({ slug }: { slug: string }) {
  const dept = BOS_DEPARTMENTS.find(
    (d) => d.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === slug
  );

  if (!dept) {
    return (
      <div className="text-center py-10 space-y-4">
        <p className="text-gray-600 text-sm">Department records not found.</p>
        <Link to="/academics/bos" className="text-xs font-bold text-[#D71920] hover:underline">
          Back to BOS Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
        <Link to="/academics/bos" className="text-xs font-bold text-[#072A6C] hover:text-[#D71920] transition-colors flex items-center gap-1">
          ◀ Back to BOS Directory
        </Link>
        <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
          Faculty Directory
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-extrabold text-[#072A6C]">
          Department of {dept.name}
        </h3>
        <p className="text-xs text-gray-500 font-light leading-relaxed">
          List of Board of Studies (BOS) members, curriculum advisors, and designated faculty specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dept.faculty.map((member, idx) => (
          <div 
            key={idx} 
            className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-[#D71920]/25 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-extrabold text-[#072A6C]">{member.name}</div>
              <div className="text-[10px] text-[#D71920] font-bold uppercase tracking-wider mt-0.5">{member.role}</div>
              <p className="text-xs text-gray-500 font-light leading-relaxed mt-2.5 pt-2.5 border-t border-gray-50">
                {member.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DynamicPage() {
  const { pathname } = useLocation();
  const content = getPageContent(pathname);
  const isManagement = pathname.toLowerCase().startsWith("/management");

  useEffect(() => {
    document.title = `${content.title} | City Chalapathi Institute of Technology`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, content.title]);

  // Generate breadcrumb links based on path segments
  const pathSegments = pathname.split("/").filter((x) => x);

  return (
    <div className="flex-1 w-full bg-[#F7F8FC] py-10 font-[var(--font-poppins)]">
      <div className="max-w-[1440px] mx-auto px-5">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 bg-white py-2.5 px-4 rounded-full border border-gray-100 shadow-sm w-fit">
          <Link to="/" className="hover:text-[#D71920] flex items-center gap-1 transition-colors">
            <Home size={12} /> Home
          </Link>
          {pathSegments.map((segment, index) => {
            const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const isLast = index === pathSegments.length - 1;
            const cleanLabel = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

            return (
              <React.Fragment key={url}>
                <ChevronRight size={10} className="text-gray-300 shrink-0" />
                {isLast ? (
                  <span className="text-gray-600 font-semibold truncate max-w-[150px]">{cleanLabel}</span>
                ) : (
                  <Link to={url} className="hover:text-[#D71920] transition-colors shrink-0">
                    {cleanLabel}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Layout Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Info */}
          <div className={`${isManagement ? "lg:col-span-12" : "lg:col-span-8"} bg-white border border-gray-200/60 rounded-[16px] p-8 shadow-sm w-full`}>
            <span className="text-[11px] font-bold text-[#D71920] uppercase tracking-wider block mb-1">{content.category}</span>
            <h1 className="text-[28px] md:text-[34px] font-[800] text-[#072A6C] leading-snug tracking-tight mb-4">
              {content.title}
            </h1>
            <p className="text-[14px] text-gray-500 leading-relaxed font-light mb-8 pb-6 border-b border-gray-100">
              {content.desc}
            </p>
            <div>
              {content.body}
            </div>
          </div>

          {/* Quick Info Sidebar */}
          {!isManagement && (
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#072A6C] text-white rounded-[16px] p-6 shadow-sm">
                <h3 className="font-bold text-sm mb-3">Quick Navigation</h3>
                <ul className="space-y-2 text-xs text-blue-200">
                  <li><Link to="/about" className="hover:text-white transition-colors flex items-center justify-between">About Institution <ArrowRight size={10} /></Link></li>
                  <li><Link to="/academics" className="hover:text-white transition-colors flex items-center justify-between">Academic Programs <ArrowRight size={10} /></Link></li>
                  <li><Link to="/admissions" className="hover:text-white transition-colors flex items-center justify-between">Enrollment & Fees <ArrowRight size={10} /></Link></li>
                  <li><Link to="/placements" className="hover:text-white transition-colors flex items-center justify-between">Placements & Statistics <ArrowRight size={10} /></Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors flex items-center justify-between">Contact Support <ArrowRight size={10} /></Link></li>
                </ul>
              </div>

              <div className="bg-white border border-gray-100 rounded-[16px] p-6 shadow-sm">
                <h3 className="font-bold text-sm text-[#072A6C] mb-3">Admission Helpdesk</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">Have questions about registration, courses, or hostels? Reach our advisors directly.</p>
                <a href="tel:8886630355" className="h-10 w-full bg-[#D71920] hover:bg-[#b71217] text-white font-bold text-xs rounded-[8px] flex items-center justify-center gap-1.5 transition-colors">
                  <Phone size={13} /> Call Counselor
                </a>
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Artificial Intelligence & ML",
  "Data Science",
  "School of Pharmacy",
  "School of Management"
];

interface FacultyMember {
  name: string;
  title: string;
  edu: string;
  interests: string;
  phone: string;
  email: string;
  avatar: string;
  age: string;
  experience: string;
  idNo: string;
  department: string;
}

const getAvatarUrl = (initials: string): string => {
  const avatarMap: Record<string, string> = {
    "YVA": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    "YSK": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    "KPR": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    "TS": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    "PVR": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    "AKK": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    "KJ": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    "BS": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    "DSR": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    "KC": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    "SV": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    "PR": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    "SK": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    "MH": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    "GM": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    "RK": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    "YVK": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    "TA": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    "VS": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    "SKR": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    "NL": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    "LRK": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    "SL": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    "PSM": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    "GR": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    "MSR": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    "KR": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    "VP": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    "GS": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    "PN": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    "KSR": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    "KA": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    "MR": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    "PK": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    "KHP": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    "KS": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    "TK": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    "KV": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    "MRK": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    "BR": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    "PSR": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    "KN": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    "TP": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    "SR": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    "KP": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  };

  return avatarMap[initials] || `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=072A6C&color=fff&size=256&font-size=0.35&bold=true`;
};

const FACULTY_DATA: Record<string, {
  hod: FacultyMember;
  others: Array<FacultyMember>;
}> = {
  "Computer Science & Engineering": {
    hod: {
      name: "Prof. P. V. Ramana",
      title: "HOD & Professor",
      edu: "Ph.D - Indian Institute of Technology Madras, India",
      interests: "Algorithms, Distributed Networks, Database Optimization",
      phone: "0863 2345432",
      email: "hod.cse@city.ac.in",
      avatar: "PVR",
      age: "52 Years",
      experience: "24 Years of Teaching & Research",
      idNo: "CCIT-CSE-001",
      department: "Computer Science & Engineering"
    },
    others: [
      {
        name: "Dr. A. Kiran Kumar",
        title: "Professor",
        edu: "Ph.D - National Institute of Technology Warangal, India",
        interests: "Cyber Security, Network Architectures & Trust Models",
        phone: "0863 2345433",
        email: "kiran.cse@city.ac.in",
        avatar: "AKK",
        age: "45 Years",
        experience: "16 Years",
        idNo: "CCIT-CSE-002",
        department: "Computer Science & Engineering"
      },
      {
        name: "Mrs. K. Jhansi",
        title: "Assistant Professor",
        edu: "M.Tech - JNTU, Kakinada",
        interests: "Software Engineering & Object Oriented Designs",
        phone: "0863 2345434",
        email: "jhansi.cse@city.ac.in",
        avatar: "KJ",
        age: "34 Years",
        experience: "8 Years",
        idNo: "CCIT-CSE-003",
        department: "Computer Science & Engineering"
      },
      {
        name: "Dr. B. Satyanarayana",
        title: "Associate Professor",
        edu: "Ph.D - Osmania University, Hyderabad",
        interests: "Cloud Architectures, Virtualization & High Compute Networks",
        phone: "0863 2345435",
        email: "satya.cse@city.ac.in",
        avatar: "BS",
        age: "41 Years",
        experience: "14 Years",
        idNo: "CCIT-CSE-004",
        department: "Computer Science & Engineering"
      },
      {
        name: "Mr. D. Srinivasa Rao",
        title: "Assistant Professor",
        edu: "M.Tech - Andhra University",
        interests: "Data Warehousing, Data Mining & SQL Engines",
        phone: "0863 2345436",
        email: "srinu.cse@city.ac.in",
        avatar: "DSR",
        age: "36 Years",
        experience: "10 Years",
        idNo: "CCIT-CSE-005",
        department: "Computer Science & Engineering"
      }
    ]
  },
  "Artificial Intelligence & ML": {
    hod: {
      name: "Dr. K. Chandrasekhar",
      title: "Principal & Professor",
      edu: "Ph.D - Indian Institute of Technology Delhi, India",
      interests: "Machine Learning, Natural Language Processing, AI Ethics",
      phone: "0863 2345430",
      email: "principal@city.ac.in",
      avatar: "KC",
      age: "48 Years",
      experience: "20 Years",
      idNo: "CCIT-AIML-001",
      department: "Artificial Intelligence & ML"
    },
    others: [
      {
        name: "Dr. S. Vignesh",
        title: "Associate Professor",
        edu: "Ph.D - IIIT Hyderabad",
        interests: "Computer Vision, Neural Networks, Image Restoration",
        phone: "0863 2345451",
        email: "vignesh.aiml@city.ac.in",
        avatar: "SV",
        age: "39 Years",
        experience: "12 Years",
        idNo: "CCIT-AIML-002",
        department: "Artificial Intelligence & ML"
      },
      {
        name: "Mr. P. Rajesh",
        title: "Assistant Professor",
        edu: "M.Tech - Indian Institute of Technology Bombay, India",
        interests: "Deep Learning, Reinforcement Learning, Robot Navigation",
        phone: "0863 2345452",
        email: "rajesh.aiml@city.ac.in",
        avatar: "PR",
        age: "31 Years",
        experience: "6 Years",
        idNo: "CCIT-AIML-003",
        department: "Artificial Intelligence & ML"
      },
      {
        name: "Dr. S. Kavitha",
        title: "Associate Professor",
        edu: "Ph.D - JNTU Hyderabad",
        interests: "Cognitive Computing, Human-Machine Interface, Robotics",
        phone: "0863 2345453",
        email: "kavitha.aiml@city.ac.in",
        avatar: "SK",
        age: "43 Years",
        experience: "15 Years",
        idNo: "CCIT-AIML-004",
        department: "Artificial Intelligence & ML"
      },
      {
        name: "Mrs. M. Harika",
        title: "Assistant Professor",
        edu: "M.Tech - IIIT Bangalore",
        interests: "Natural Language Processing, Sentiment Models & Transformers",
        phone: "0863 2345454",
        email: "harika.aiml@city.ac.in",
        avatar: "MH",
        age: "29 Years",
        experience: "4 Years",
        idNo: "CCIT-AIML-005",
        department: "Artificial Intelligence & ML"
      }
    ]
  },
  "Data Science": {
    hod: {
      name: "Dr. G. Madhavi",
      title: "HOD & Associate Professor",
      edu: "Ph.D - Andhra University, Visakhapatnam, India",
      interests: "Big Data Analytics, Statistical Modeling, Predictive Mining",
      phone: "0863 2345460",
      email: "hod.ds@city.ac.in",
      avatar: "GM",
      age: "42 Years",
      experience: "15 Years",
      idNo: "CCIT-DS-001",
      department: "Data Science"
    },
    others: [
      {
        name: "Dr. R. Karthik",
        title: "Professor",
        edu: "Ph.D - National Institute of Technology Trichy, India",
        interests: "Cloud Computing, Parallel Databases, Hadoop Infrastructures",
        phone: "0863 2345461",
        email: "karthik.ds@city.ac.in",
        avatar: "RK",
        age: "40 Years",
        experience: "13 Years",
        idNo: "CCIT-DS-002",
        department: "Data Science"
      },
      {
        name: "Dr. Y. V. Koteswara Rao",
        title: "Professor",
        edu: "Ph.D - IIT Madras",
        interests: "Information Retrieval, Data Visualisation, Pattern Recognition",
        phone: "0863 2345462",
        email: "koteswar.ds@city.ac.in",
        avatar: "YVK",
        age: "46 Years",
        experience: "19 Years",
        idNo: "CCIT-DS-003",
        department: "Data Science"
      },
      {
        name: "Mrs. P. Radhika",
        title: "Assistant Professor",
        edu: "M.Tech - JNTU Kakinada",
        interests: "Predictive Analytics, Python Data Pipelines, Statistics",
        phone: "0863 2345463",
        email: "radhika.ds@city.ac.in",
        avatar: "PR",
        age: "32 Years",
        experience: "7 Years",
        idNo: "CCIT-DS-004",
        department: "Data Science"
      }
    ]
  },
  "School of Pharmacy": {
    hod: {
      name: "Dr. T. Anuradha",
      title: "HOD & Professor",
      edu: "Ph.D - BITS Pilani, India",
      interests: "Pharmaceutics, Target-oriented nano-carrier formulations",
      phone: "0863 2345470",
      email: "hod.pharm@city.ac.in",
      avatar: "TA",
      age: "47 Years",
      experience: "18 Years",
      idNo: "CCIT-PHAR-001",
      department: "School of Pharmacy"
    },
    others: [
      {
        name: "Dr. V. Satish",
        title: "Associate Professor",
        edu: "Ph.D - JNTU, Hyderabad",
        interests: "Pharmacology, Drug toxicity screenings, Clinical Trials",
        phone: "0863 2345471",
        email: "satish.pharm@city.ac.in",
        avatar: "VS",
        age: "38 Years",
        experience: "11 Years",
        idNo: "CCIT-PHAR-002",
        department: "School of Pharmacy"
      },
      {
        name: "Dr. S. K. Rahaman",
        title: "Professor",
        edu: "Ph.D - Andhra University",
        interests: "Pharmaceutical Chemistry, Drug Synthesis, Molecular Design",
        phone: "0863 2345472",
        email: "rahaman.pharm@city.ac.in",
        avatar: "SKR",
        age: "49 Years",
        experience: "21 Years",
        idNo: "CCIT-PHAR-003",
        department: "School of Pharmacy"
      },
      {
        name: "Mrs. N. Lakshmi",
        title: "Assistant Professor",
        edu: "M.Pharm - Acharya Nagarjuna University",
        interests: "Pharmacognosy, Natural product extraction, Phytochemistry",
        phone: "0863 2345473",
        email: "lakshmi.pharm@city.ac.in",
        avatar: "NL",
        age: "31 Years",
        experience: "6 Years",
        idNo: "CCIT-PHAR-004",
        department: "School of Pharmacy"
      }
    ]
  },
  "School of Management": {
    hod: {
      name: "Dr. L. Rama Krishna",
      title: "HOD & Professor",
      edu: "Ph.D - Osmania University, Hyderabad, India",
      interests: "Financial Management, Investment portfolios, Venture Cap",
      phone: "0863 2345480",
      email: "hod.mba@city.ac.in",
      avatar: "LRK",
      age: "51 Years",
      experience: "22 Years",
      idNo: "CCIT-MGMT-001",
      department: "School of Management"
    },
    others: [
      {
        name: "Mrs. S. Lakshmi",
        title: "Assistant Professor",
        edu: "MBA - ANU, Guntur, India",
        interests: "Human Resource Management, Industrial Relations, Ethics",
        phone: "0863 2345481",
        email: "lakshmi.mba@city.ac.in",
        avatar: "SL",
        age: "35 Years",
        experience: "9 Years",
        idNo: "CCIT-MGMT-002",
        department: "School of Management"
      },
      {
        name: "Dr. P. S. R. Murthy",
        title: "Associate Professor",
        edu: "Ph.D - Andhra University",
        interests: "Marketing Management, Consumer Behaviour, Digital Retail",
        phone: "0863 2345482",
        email: "murthy.mba@city.ac.in",
        avatar: "PSM",
        age: "44 Years",
        experience: "17 Years",
        idNo: "CCIT-MGMT-003",
        department: "School of Management"
      },
      {
        name: "Mr. G. Ravindra",
        title: "Assistant Professor",
        edu: "MBA - Acharya Nagarjuna University",
        interests: "Operations Management, Supply Chain Logistics, Quality Auditing",
        phone: "0863 2345483",
        email: "ravi.mba@city.ac.in",
        avatar: "GR",
        age: "33 Years",
        experience: "8 Years",
        idNo: "CCIT-MGMT-004",
        department: "School of Management"
      }
    ]
  }
};

const BOARD_DEPARTMENTS = [
  "Governing Council",
  "Chancellor",
  "Pro Chancellor",
  "Vice Chancellor",
  "Registrar",
  "Dean – Academic Affairs",
  "Dean – Research & Innovation",
  "Dean – Student Affairs",
  "Dean – Faculty Affairs",
  "Dean – Admissions",
  "Dean – Placements & Relations",
  "Finance Officer",
  "Controller of Examinations"
];

const BOARD_DATA: Record<string, {
  hod: FacultyMember;
  others: Array<FacultyMember>;
}> = {
  "Governing Council": {
    hod: {
      name: "Sri Y. V. Anjaneyulu",
      title: "Chairman & President",
      edu: "Graduate in Engineering & Humanities",
      interests: "Administration, institutional strategy, policy planning, and infrastructure development.",
      phone: "0863 2345401",
      email: "chairman@city.ac.in",
      avatar: "YVA",
      age: "65 Years",
      experience: "35 Years of Administrative Leadership",
      idNo: "CUB-GC-001",
      department: "Governing Council"
    },
    others: []
  },
  "Chancellor": {
    hod: {
      name: "Sri Y. V. Anjaneyulu",
      title: "Chancellor",
      edu: "Renowned Educationist & Founder Sponsor Representative",
      interests: "Strategic leadership, academic governance, public relations, and legal policies.",
      phone: "0863 2345401",
      email: "chancellor@city.ac.in",
      avatar: "YVA",
      age: "65 Years",
      experience: "35 Years",
      idNo: "CUB-CH-001",
      department: "Office of the Chancellor"
    },
    others: []
  },
  "Pro Chancellor": {
    hod: {
      name: "Sri Y. Sujit Kumar",
      title: "Pro Chancellor",
      edu: "M.Tech & MBA - Executive Education",
      interests: "Institutional progress planning, modernization initiatives, and industry collaborations.",
      phone: "0863 2345402",
      email: "prochan@city.ac.in",
      avatar: "YSK",
      age: "42 Years",
      experience: "18 Years",
      idNo: "CUB-PC-001",
      department: "Office of the Pro Chancellor"
    },
    others: []
  },
  "Vice Chancellor": {
    hod: {
      name: "Dr. K. Prasad Rao",
      title: "Vice Chancellor",
      edu: "Ph.D., Former Senior Professor - Administration & Research",
      interests: "Curriculum planning coordination, academic excellence, and international relations.",
      phone: "0863 2345403",
      email: "vc@city.ac.in",
      avatar: "KPR",
      age: "58 Years",
      experience: "30 Years",
      idNo: "CUB-VC-001",
      department: "Office of the Vice Chancellor"
    },
    others: []
  },
  "Registrar": {
    hod: {
      name: "Prof. T. Sivaramaiah",
      title: "Registrar",
      edu: "M.Tech, Ph.D. - Computer Networks",
      interests: "General administration, statutory records management, and legal affairs compliance.",
      phone: "0863 2345404",
      email: "registrar@city.ac.in",
      avatar: "TS",
      age: "53 Years",
      experience: "25 Years",
      idNo: "CUB-RG-001",
      department: "Registrar Office"
    },
    others: []
  },
  "Dean – Academic Affairs": {
    hod: {
      name: "Prof. P. V. Ramana",
      title: "Dean – Academic Affairs",
      edu: "Ph.D - Indian Institute of Technology Madras, India",
      interests: "Academic planning, curriculum development, and examinations coordination.",
      phone: "0863 2345432",
      email: "dean.academics@city.ac.in",
      avatar: "PVR",
      age: "52 Years",
      experience: "24 Years",
      idNo: "CUB-DA-001",
      department: "Academic Affairs Office"
    },
    others: []
  },
  "Dean – Research & Innovation": {
    hod: {
      name: "Dr. K. Chandrasekhar",
      title: "Dean – Research & Innovation",
      edu: "Ph.D - Indian Institute of Technology Delhi, India",
      interests: "Research ecosystem governance, patent filing, sponsored grants, and innovations.",
      phone: "0863 2345430",
      email: "dean.research@city.ac.in",
      avatar: "KC",
      age: "48 Years",
      experience: "20 Years",
      idNo: "CUB-DR-001",
      department: "Research & Development Cell"
    },
    others: []
  },
  "Dean – Student Affairs": {
    hod: {
      name: "Dr. G. Madhavi",
      title: "Dean – Student Affairs",
      edu: "Ph.D - Andhra University",
      interests: "Student welfare guidelines, professional clubs, and hostel supervision.",
      phone: "0863 2345460",
      email: "dean.students@city.ac.in",
      avatar: "GM",
      age: "42 Years",
      experience: "15 Years",
      idNo: "CUB-DS-001",
      department: "Student Affairs Cell"
    },
    others: []
  },
  "Dean – Faculty Affairs": {
    hod: {
      name: "Dr. T. Anuradha",
      title: "Dean – Faculty Affairs",
      edu: "Ph.D - BITS Pilani",
      interests: "Faculty recruitment, performance reviews, and professional development programs.",
      phone: "0863 2345470",
      email: "dean.faculty@city.ac.in",
      avatar: "TA",
      age: "47 Years",
      experience: "18 Years",
      idNo: "CUB-DF-001",
      department: "Faculty Affairs Office"
    },
    others: []
  },
  "Dean – Admissions": {
    hod: {
      name: "Dr. L. Rama Krishna",
      title: "Dean – Admissions",
      edu: "Ph.D - Osmania University",
      interests: "Admissions operations, merit scholarships, and student enrollment support.",
      phone: "0863 2345480",
      email: "dean.admissions@city.ac.in",
      avatar: "LRK",
      age: "51 Years",
      experience: "22 Years",
      idNo: "CUB-DAD-001",
      department: "Admissions Office"
    },
    others: []
  },
  "Dean – Placements & Relations": {
    hod: {
      name: "Dr. R. Karthik",
      title: "Dean – Placements & Relations",
      edu: "Ph.D - NIT Trichy",
      interests: "Industry relations, placements campaigns, and placement coordinates.",
      phone: "0863 2345461",
      email: "dean.placements@city.ac.in",
      avatar: "RK",
      age: "40 Years",
      experience: "13 Years",
      idNo: "CUB-DP-001",
      department: "Placement Office"
    },
    others: []
  },
  "Finance Officer": {
    hod: {
      name: "Sri G. Ravindra",
      title: "Finance Officer",
      edu: "MBA & Chartered Accountant",
      interests: "Finance supervision, budgeting audits, cash logs, and payroll systems.",
      phone: "0863 2345483",
      email: "finance@city.ac.in",
      avatar: "GR",
      age: "33 Years",
      experience: "8 Years",
      idNo: "CUB-FO-001",
      department: "Finance & Accounts Department"
    },
    others: []
  },
  "Controller of Examinations": {
    hod: {
      name: "Dr. V. Satish",
      title: "Controller of Examinations",
      edu: "Ph.D - JNTU Hyderabad",
      interests: "Examinations conduction, grading papers, and degree certification.",
      phone: "0863 2345471",
      email: "coe@city.ac.in",
      avatar: "VS",
      age: "38 Years",
      experience: "11 Years",
      idNo: "CUB-COE-001",
      department: "Examination Cell"
    },
    others: []
  }
};

const BOARD_MODAL_DETAILS: Record<string, {
  office: string;
  specialization: string;
  officeLocation: string;
  leadershipSince: string;
  reportingOffice: string;
  about: string;
  responsibilities: string[];
  initiatives: string[];
}> = {
  "Governing Council": {
    office: "Apex Governance Suite, CCU Admin Block",
    specialization: "Educational Leadership & Strategic Management",
    officeLocation: "Suite 501, 5th Floor, Main Building",
    leadershipSince: "2018",
    reportingOffice: "Supreme Governing Body",
    about: "The Governing Council is the apex policy-making body of City Chalapathi University, responsible for defining the institution's long-term vision, governance framework, academic excellence, financial oversight, and strategic growth. The council ensures that the university maintains the highest standards in education, research, innovation, industry collaboration, and social responsibility while aligning with national and international higher education practices.",
    responsibilities: ["Strategic Planning", "University Governance", "Financial Oversight", "Policy Development", "Institutional Expansion", "Stakeholder Relations", "Regulatory Compliance", "Accreditation Oversight"],
    initiatives: ["Accreditation Milestones", "Infrastructure Modernization", "Financial Sustainability Plan"]
  },
  "Chancellor": {
    office: "Chancellor's Secretariat, CCU Campus",
    specialization: "Corporate Governance & Higher Education Strategy",
    officeLocation: "Executive Wing, Ground Floor, Admin Block",
    leadershipSince: "2018",
    reportingOffice: "Board of Trustees",
    about: "The Chancellor serves as the ceremonial head and guiding authority of City Chalapathi University, providing strategic leadership and preserving the institution's vision and values. The Chancellor inspires academic excellence, innovation, ethical governance, and global collaborations while supporting the university's mission of creating future-ready graduates and advancing impactful research.",
    responsibilities: ["Academic Leadership", "Strategic Visioning", "Preservation of Values", "Global Collaborations", "Ethical Governance", "Honorary Degrees Approval", "Convocation Presiding", "Institutional Advisory"],
    initiatives: ["Global Partnerships Alliance", "Research Endowment Fund", "Green Campus Master Plan"]
  },
  "Pro Chancellor": {
    office: "Office of the Pro Chancellor",
    specialization: "Academic Administration & Institutional Growth",
    officeLocation: "Executive Wing, 1st Floor, Admin Block",
    leadershipSince: "2019",
    reportingOffice: "Chancellor's Office",
    about: "The Pro Chancellor assists the Chancellor in steering the university's long-term development and institutional expansion. Working closely with university leadership, the Pro Chancellor promotes academic innovation, infrastructure growth, industry partnerships, and international collaborations while ensuring that the university continues to achieve excellence in higher education.",
    responsibilities: ["Infrastructure Growth", "Industry Partnerships", "Strategic Expansion Liaison", "Academic Innovation Advocacy", "Leadership Support", "Policy Implementation Coordination", "Development Projects Review"],
    initiatives: ["Smart Classroom Initiative", "Industry-Immersion Labs", "Alumni Connect Drive"]
  },
  "Vice Chancellor": {
    office: "Vice Chancellor's Office",
    specialization: "Institutional Leadership & Research Planning",
    officeLocation: "First Floor, Admin Block",
    leadershipSince: "2020",
    reportingOffice: "Chancellor / Governing Council",
    about: "The Vice Chancellor is the chief executive and academic leader of City Chalapathi University, responsible for the overall administration, academic planning, research initiatives, faculty development, and institutional governance. The Vice Chancellor leads the university toward academic distinction by fostering innovation, interdisciplinary learning, quality assurance, and global engagement.",
    responsibilities: ["Overall Administration", "Academic Planning", "Research Ecosystem Promotion", "Faculty Development", "Institutional Governance Leadership", "Interdisciplinary Learning Advocacy", "Quality Assurance", "Internationalization"],
    initiatives: ["Curriculum Revamp (OBE)", "Center for AI Innovation", "Faculty Research Grant Program"]
  },
  "Registrar": {
    office: "Registrar Secretariat",
    specialization: "Statutory Governance & Compliance Management",
    officeLocation: "Ground Floor, Registrar Wing, Admin Block",
    leadershipSince: "2020",
    reportingOffice: "Vice Chancellor",
    about: "The Registrar oversees the administrative and statutory operations of the university while ensuring compliance with academic regulations and government policies. The office manages institutional records, university communications, legal documentation, governance processes, examinations administration, and student services to maintain efficient and transparent university operations.",
    responsibilities: ["Statutory Compliance Operations", "University Records Custodian", "Legal Affairs Management", "Administrative Coordination", "Academic Registries Oversight", "Communications and Publications", "Official Seal Custody"],
    initiatives: ["Digital Paperless Administration", "Legal Framework Overhaul", "Statutory Archive Portal"]
  },
  "Dean – Academic Affairs": {
    office: "Academic Affairs Cell",
    specialization: "Curriculum Design & Quality Assurance",
    officeLocation: "Academic Wing, 2nd Floor, Main Block",
    leadershipSince: "2021",
    reportingOffice: "Vice Chancellor",
    about: "The Dean of Academic Affairs is responsible for curriculum planning, academic regulations, teaching quality, Outcome-Based Education (OBE), examination coordination, and continuous academic improvement. The office ensures that all academic programs meet national accreditation standards while delivering a modern, industry-oriented learning experience.",
    responsibilities: ["Curriculum Development", "Academic Calendar Management", "Teaching Quality Auditing", "Outcome-Based Education Framework", "Accreditation Alignment (NAAC/NBA)", "Board of Studies Coordination", "Academic Audit Processes"],
    initiatives: ["Outcome-Based Assessment Model", "Multi-Disciplinary Electives Program", "Digital Exam Management Suite"]
  },
  "Dean – Research & Innovation": {
    office: "Research & Development Center",
    specialization: "IPR, Technology Transfer & Sponsored Research",
    officeLocation: "R&D Block, 3rd Floor",
    leadershipSince: "2021",
    reportingOffice: "Vice Chancellor",
    about: "The Dean of Research & Innovation leads the university's research ecosystem by encouraging interdisciplinary research, sponsored projects, patents, technology transfer, entrepreneurship, innovation, and incubation activities. The office actively supports faculty and students in creating impactful research that addresses real-world challenges.",
    responsibilities: ["Research Ecosystem Guidance", "IPR & Patent Filing", "Sponsored Projects Funding", "Start-up Incubation Mentorship", "Seed Grant Approvals", "Ethics Committee Convener", "Journal Indexing Standards"],
    initiatives: ["Patent Incubation Lab", "Interdisciplinary Research Clusters", "Research Incentive Framework"]
  },
  "Dean – Student Affairs": {
    office: "Student Welfare Office",
    specialization: "Student Development & Community Engagement",
    officeLocation: "Student Center, Room 102",
    leadershipSince: "2022",
    reportingOffice: "Vice Chancellor",
    about: "The Dean of Student Affairs oversees student welfare, leadership development, cultural activities, sports, professional societies, clubs, hostels, counselling services, and alumni engagement. The office is committed to creating a vibrant campus environment that supports holistic development beyond academics.",
    responsibilities: ["Student Welfare Coordination", "Cultural and Sports Events Coordination", "Professional Clubs Guidance", "Hostel Management Coordination", "Anti-Ragging Compliance", "Counselling and Support Services", "Alumni Association Engagement"],
    initiatives: ["Annual Tech-Cultural Fest", "Campus Wellness & Fitness Initiative", "Alumni Mentorship Network"]
  },
  "Dean – Faculty Affairs": {
    office: "Faculty Welfare & Development Wing",
    specialization: "Talent Acquisition & Performance Metrics",
    officeLocation: "Admin Block, Suite 203",
    leadershipSince: "2021",
    reportingOffice: "Vice Chancellor",
    about: "The Dean of Faculty Affairs manages faculty recruitment, professional development, performance evaluation, promotions, research support, and academic leadership initiatives. The office works toward building a highly qualified faculty community dedicated to excellence in teaching, research, innovation, and mentorship.",
    responsibilities: ["Faculty Recruitment Drives", "Performance Evaluation Framework", "Professional Development Camps", "Faculty Welfare Schemes", "Research Fellowships Allocation", "Conflict Resolution", "Academic Promotions Advisory"],
    initiatives: ["Faculty Induction Program", "Pedagogical Training Camps", "Dean's Excellence Awards"]
  },
  "Dean – Admissions": {
    office: "Admissions Center",
    specialization: "Enrollment Management & Outreach Campaigns",
    officeLocation: "Ground Floor, Entrance Wing, Admin Block",
    leadershipSince: "2021",
    reportingOffice: "Vice Chancellor",
    about: "The Dean of Admissions supervises the university's admission process, scholarship programs, student enrollment, counseling activities, international admissions, and outreach initiatives. The office ensures a transparent, merit-based admission system while attracting talented students from across India and abroad.",
    responsibilities: ["Admissions Strategy & Campaigns", "Enrollment Processing", "Scholarship Allocation Schemes", "Outreach Program Coordination", "International Applications Counseling", "Merit List Computations", "Helpdesk Operations Support"],
    initiatives: ["National Admissions Expo Tour", "Merit Scholarship Portal", "Instant Verification Desks"]
  },
  "Dean – Placements & Relations": {
    office: "Placement & Corporate Relations Cell",
    specialization: "Corporate Engagement, Placement Drives & Soft Skills Training",
    officeLocation: "Placement Block, 2nd Floor",
    leadershipSince: "2022",
    reportingOffice: "Vice Chancellor",
    about: "The Dean of Placements & Corporate Relations develops strong partnerships with industries, multinational companies, startups, and research organizations. The office coordinates internships, campus recruitment drives, career guidance, skill development programs, industry interactions, and placement training to enhance student employability.",
    responsibilities: ["Placement Campaigns & Recruitment Drive Coordination", "Industry MoUs & Strategic Alliances", "Career Guidance Support", "Soft Skills Training Programs", "Internship Drives Coordination", "Alumni Network Placements Link", "Employability Assessment Tools"],
    initiatives: ["Mega Campus Hiring Fair", "Corporate Advisory Committee", "Pre-Placement Bootcamps"]
  },
  "Finance Officer": {
    office: "Finance Office",
    specialization: "Fiscal Planning, Audits & Regulatory Accounts",
    officeLocation: "Accounts Wing, Ground Floor, Admin Block",
    leadershipSince: "2023",
    reportingOffice: "Vice Chancellor / Registrar",
    about: "The Finance Officer manages the university's financial planning, budgeting, auditing, accounting operations, payroll administration, procurement oversight, and regulatory compliance. The office ensures responsible financial governance while supporting the university's academic, research, and infrastructure development goals.",
    responsibilities: ["Annual Budget Formulation", "Accounting Operations Oversight", "Regulatory Accounts Auditing", "Payroll Processing Coordination", "Procurement Committee Audit", "Fund Management & Investments", "Grant Funding Compliance"],
    initiatives: ["ERP-based Financial Operations", "Online Student Fees Portal", "Energy-Cost Rationalization Audit"]
  },
  "Controller of Examinations": {
    office: "Office of the COE",
    specialization: "Confidential Assessment Systems & Grading Frameworks",
    officeLocation: "COE Block, Secured Wing",
    leadershipSince: "2023",
    reportingOffice: "Vice Chancellor",
    about: "The Controller of Examinations is responsible for conducting examinations, evaluation processes, result publication, academic records, degree certifications, transcripts, and examination policies. The office ensures confidentiality, transparency, fairness, and efficiency throughout the university's assessment and certification system.",
    responsibilities: ["Examinations Conduction Oversight", "Evaluation Coordination & Processing", "Result Publication Framework", "Grade Sheets & Degree Certificates Delivery", "Assessment Standards Control", "Confidential Printing Operations", "Student Evaluation Grievance Desk"],
    initiatives: ["Secure Digital Evaluation Portal", "Quick Grade Card Dispatch", "CCTV Examination Surveillance Suite"]
  }
};

function BoardDirectory() {
  const [selectedDept, setSelectedDept] = React.useState("Governing Council");
  const [selectedFaculty, setSelectedFaculty] = React.useState<FacultyMember | null>(null);
  
  const activeDept = BOARD_DATA[selectedDept] || BOARD_DATA["Governing Council"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-[var(--font-poppins)] text-left w-full mt-4">
      {/* Left Sidebar */}
      <div className="lg:col-span-4 flex flex-col border border-gray-200 bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100 p-2 min-h-[580px] justify-between">
        <div>
          <h4 className="text-xs font-black text-[#072A6C] tracking-widest uppercase p-4 border-b border-gray-100">UNIVERSITY BOARD</h4>
          <div className="flex flex-col gap-1 mt-2">
            {BOARD_DEPARTMENTS.map((dept) => {
              const isActive = dept === selectedDept;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`w-full text-left px-5 py-3.5 text-xs font-extrabold transition-all outline-none cursor-pointer flex items-center justify-between border-l-4 rounded-xl ${
                    isActive 
                      ? "bg-[#D71920]/5 text-[#D71920] border-[#D4AF37] shadow-sm" 
                      : "text-[#072A6C] hover:bg-gray-50 border-transparent"
                  }`}
                >
                  <span>{dept}</span>
                  <ChevronRight size={14} className={isActive ? "text-[#D4AF37]" : "text-gray-300"} />
                </button>
              );
            })}
          </div>
        </div>
        <div className="p-4 bg-gray-50/50 rounded-xl text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center border-t border-gray-100">
          Board of Governors Directory
        </div>
      </div>

      {/* Right Content */}
      <div className="lg:col-span-8 flex flex-col items-center justify-start min-h-[500px]">
        {activeDept.hod && (
          <div className="space-y-4 flex flex-col items-center w-full">
            <h4 className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-wider text-center">Board Profile</h4>
            <div 
              onClick={() => setSelectedFaculty(activeDept.hod)}
              className="bg-white border-2 border-[#D4AF37] rounded-[20px] p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer relative group w-full max-w-[480px] min-h-[480px]"
            >
              <div className="absolute top-4 right-4 bg-[#D4AF37] text-gray-900 font-extrabold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                Board Member
              </div>

              <div className="w-72 h-72 rounded-xl border-2 border-gray-100 bg-[#072A6C]/5 flex items-center justify-center font-black text-5xl text-[#072A6C] shadow-inner mb-6 group-hover:border-[#D4AF37] transition-all select-none overflow-hidden">
                <img src={getAvatarUrl(activeDept.hod.avatar)} alt={activeDept.hod.name} className="w-full h-full object-cover" />
              </div>

              <h5 className="font-extrabold text-[#072A6C] text-base md:text-lg leading-snug tracking-tight">
                {activeDept.hod.name}
              </h5>
              <span className="text-xs text-[#D71920] font-bold uppercase tracking-wider mt-1.5 block">
                {activeDept.hod.title}
              </span>

              {/* Yellow shade description box */}
              <div className="mt-4 bg-amber-50/70 border border-amber-200/60 p-4.5 rounded-xl text-[12px] text-gray-700 font-medium leading-relaxed text-left w-full shadow-inner">
                {activeDept.hod.interests}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Details Modal */}
      {selectedFaculty && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedFaculty(null)}
        >
          <div 
            className="bg-white w-full max-w-[500px] rounded-[24px] overflow-hidden shadow-2xl relative flex flex-col text-left border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedFaculty(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer outline-none border-none"
            >
              <X size={18} />
            </button>

            <div className="bg-[#072A6C] text-white py-8 px-6 text-center relative border-b-4 border-[#D4AF37]">
              <div className="w-20 h-20 rounded-lg border-2 border-[#D4AF37] bg-white text-[#072A6C] flex items-center justify-center font-black text-2xl shadow-md mx-auto mb-3 select-none overflow-hidden">
                <img src={getAvatarUrl(selectedFaculty.avatar)} alt={selectedFaculty.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg md:text-xl font-black tracking-tight">{selectedFaculty.name}</h3>
              <p className="text-[10px] text-[#D4AF37] mt-1 font-black uppercase tracking-widest">{selectedFaculty.title}</p>
            </div>

            <div className="p-6 space-y-4 text-xs text-gray-600">
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-b border-gray-100 pb-4">
                <div>
                  <span className="text-[9px] text-[#D71920] font-black uppercase tracking-wider block">University ID</span>
                  <span className="font-bold text-gray-700">{selectedFaculty.idNo}</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#D71920] font-black uppercase tracking-wider block">Department / Office</span>
                  <span className="font-bold text-gray-700">{selectedFaculty.department}</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#D71920] font-black uppercase tracking-wider block">Years of Experience</span>
                  <span className="font-bold text-gray-700">{selectedFaculty.experience}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] text-[#D71920] font-black uppercase tracking-wider block">Education</span>
                <p className="font-medium bg-gray-50 p-3 rounded-xl border border-gray-100 leading-relaxed text-[11px] text-gray-700">
                  {selectedFaculty.edu}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] text-[#D71920] font-black uppercase tracking-wider block">Responsibilities</span>
                <p className="font-light bg-amber-50/40 p-3 rounded-xl border border-amber-100/50 leading-relaxed text-[11px] text-gray-700">
                  {selectedFaculty.interests}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100 flex justify-start items-center text-[11px] text-gray-500 font-semibold">
                <div className="flex items-center gap-2 truncate">
                  <Mail size={13} className="text-[#D4AF37] shrink-0" />
                  <span className="truncate" title={selectedFaculty.email}>{selectedFaculty.email}</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedFaculty(null)}
                className="h-9 px-6 bg-[#072A6C] hover:bg-[#072A6C]/90 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const STAFF_DEPARTMENTS = [
  "Registrar Office",
  "Academic Affairs",
  "Finance & Accounts",
  "General Administration",
  "Establishment",
  "Admissions Office",
  "Examination Cell",
  "Placement Office",
  "Library",
  "Computer Centre",
  "Research Office",
  "Purchase & Stores",
  "Estate Office",
  "Public Relations",
  "Student Affairs",
  "Transport",
  "Health Centre",
  "Guest House",
  "Sports Office"
];

const STAFF_DATA: Record<string, {
  hod: FacultyMember;
  others: Array<FacultyMember>;
}> = {
  "Registrar Office": {
    hod: {
      name: "Sri M. Srinivasa Rao",
      title: "Assistant Registrar",
      edu: "M.A. in Public Administration - Andhra University",
      interests: "General administration, statutory records maintenance, legal compliances support.",
      phone: "0863 2345530",
      email: "registrar.office@city.ac.in",
      avatar: "MSR",
      age: "48 Years",
      experience: "18 Years",
      idNo: "CUS-REG-001",
      department: "Registrar Office"
    },
    others: [
      {
        name: "Sri K. Ramu",
        title: "Section Officer",
        edu: "B.Com - Acharya Nagarjuna University",
        interests: "Files registry, letters cataloging, statutory documentation records.",
        phone: "0863 2345531",
        email: "ramu.reg@city.ac.in",
        avatar: "KR",
        age: "42 Years",
        experience: "13 Years",
        idNo: "CUS-REG-002",
        department: "Registrar Office"
      },
      {
        name: "Smt. G. Mary",
        title: "Senior Assistant",
        edu: "B.Sc - JNTU Kakinada",
        interests: "Inward outward dispatch, student data catalog entries.",
        phone: "0863 2345532",
        email: "mary.reg@city.ac.in",
        avatar: "GM",
        age: "36 Years",
        experience: "9 Years",
        idNo: "CUS-REG-003",
        department: "Registrar Office"
      }
    ]
  },
  "Academic Affairs": {
    hod: {
      name: "Sri V. Prasad",
      title: "Academic Coordinator",
      edu: "M.Tech in CSE",
      interests: "Academic registers compilation, class logs allocation support.",
      phone: "0863 2345540",
      email: "academic.office@city.ac.in",
      avatar: "VP",
      age: "40 Years",
      experience: "12 Years",
      idNo: "CUS-ACAD-001",
      department: "Academic Affairs"
    },
    others: []
  },
  "Finance & Accounts": {
    hod: {
      name: "Sri G. Suresh",
      title: "Accounts Officer",
      edu: "M.Com & MBA Finance",
      interests: "Accounts logs entry, financial audits review, cash books.",
      phone: "0863 2345550",
      email: "accounts@city.ac.in",
      avatar: "GS",
      age: "45 Years",
      experience: "16 Years",
      idNo: "CUS-FIN-001",
      department: "Finance & Accounts"
    },
    others: [
      {
        name: "Sri P. Naidu",
        title: "Senior Accountant",
        edu: "B.Com - ANU",
        interests: "Bank reconciliation, audit vouchers compilation.",
        phone: "0863 2345551",
        email: "naidu.fin@city.ac.in",
        avatar: "PN",
        age: "38 Years",
        experience: "10 Years",
        idNo: "CUS-FIN-002",
        department: "Finance & Accounts"
      }
    ]
  },
  "General Administration": {
    hod: {
      name: "Sri T. Satish",
      title: "Administrative Officer",
      edu: "M.A. - Public Admin",
      interests: "Daily campus operations management, logistic arrangements.",
      phone: "0863 2345560",
      email: "ao.admin@city.ac.in",
      avatar: "TS",
      age: "46 Years",
      experience: "17 Years",
      idNo: "CUS-ADM-001",
      department: "General Administration"
    },
    others: []
  },
  "Establishment": {
    hod: {
      name: "Sri K. Subba Rao",
      title: "Establishment Head",
      edu: "M.B.A. HR",
      interests: "Leaves records entry, promotion database, service logs.",
      phone: "0863 2345570",
      email: "estab@city.ac.in",
      avatar: "KSR",
      age: "52 Years",
      experience: "22 Years",
      idNo: "CUS-EST-001",
      department: "Establishment"
    },
    others: []
  },
  "Admissions Office": {
    hod: {
      name: "Smt. K. Aruna",
      title: "Admission Officer",
      edu: "MBA - Guntur",
      interests: "Counseling support, digital portal checks, certificate verification.",
      phone: "0863 2345580",
      email: "admissions.office@city.ac.in",
      avatar: "KA",
      age: "38 Years",
      experience: "11 Years",
      idNo: "CUS-ADM-001",
      department: "Admissions Office"
    },
    others: [
      {
        name: "Sri M. Ravi",
        title: "Verification Officer",
        edu: "B.Tech - JNTU",
        interests: "Academic marks verification and entry verification.",
        phone: "0863 2345581",
        email: "ravi.admissions@city.ac.in",
        avatar: "MR",
        age: "33 Years",
        experience: "7 Years",
        idNo: "CUS-ADM-002",
        department: "Admissions Office"
      }
    ]
  },
  "Examination Cell": {
    hod: {
      name: "Sri D. Srinivasa Rao",
      title: "Assistant COE",
      edu: "M.Tech - Andhra University",
      interests: "Grade books processing, certificate logs, seating layouts.",
      phone: "0863 2345590",
      email: "exams.office@city.ac.in",
      avatar: "DSR",
      age: "43 Years",
      experience: "14 Years",
      idNo: "CUS-EXAM-001",
      department: "Examination Cell"
    },
    others: [
      {
        name: "Smt. P. Kavitha",
        title: "Evaluation Assistant",
        edu: "B.Sc - ANU",
        interests: "Paper marks entries, dispatch queues, certification database.",
        phone: "0863 2345591",
        email: "kavitha.exams@city.ac.in",
        avatar: "PK",
        age: "34 Years",
        experience: "8 Years",
        idNo: "CUS-EXAM-002",
        department: "Examination Cell"
      }
    ]
  },
  "Placement Office": {
    hod: {
      name: "Sri K. Hari Prasad",
      title: "Placement Officer",
      edu: "M.B.A. HR & Marketing",
      interests: "Recruiter relations, coordinate placement schedules, training camps.",
      phone: "0863 2345600",
      email: "placements.office@city.ac.in",
      avatar: "KHP",
      age: "39 Years",
      experience: "12 Years",
      idNo: "CUS-PLC-001",
      department: "Placement Office"
    },
    others: [
      {
        name: "Smt. G. Swathi",
        title: "Corporate Relations Executive",
        edu: "M.A. English - Guntur",
        interests: "Corporate placement communication, resumes collection support.",
        phone: "0863 2345601",
        email: "swathi.plc@city.ac.in",
        avatar: "GS",
        age: "31 Years",
        experience: "6 Years",
        idNo: "CUS-PLC-002",
        department: "Placement Office"
      }
    ]
  },
  "Library": {
    hod: {
      name: "Dr. K. Swathi",
      title: "Chief Librarian",
      edu: "Ph.D. in Library Sciences",
      interests: "Index registries compilation, online journal accesses, purchase catalogs.",
      phone: "0863 2345610",
      email: "library@city.ac.in",
      avatar: "KS",
      age: "47 Years",
      experience: "18 Years",
      idNo: "CUS-LIB-001",
      department: "Library"
    },
    others: [
      {
        name: "Sri T. Kumar",
        title: "Library Assistant",
        edu: "M.Lib.Sc - ANU",
        interests: "Book registry circulation, digital logs tracking.",
        phone: "0863 2345611",
        email: "kumar.lib@city.ac.in",
        avatar: "TK",
        age: "35 Years",
        experience: "9 Years",
        idNo: "CUS-LIB-002",
        department: "Library"
      }
    ]
  },
  "Computer Centre": {
    hod: {
      name: "Sri K. Venkatesh",
      title: "System Administrator",
      edu: "M.Tech in Computer Networks",
      interests: "Laboratory support, LAN firewalls, network monitoring.",
      phone: "0863 2345620",
      email: "sysadmin@city.ac.in",
      avatar: "KV",
      age: "41 Years",
      experience: "15 Years",
      idNo: "CUS-COMP-001",
      department: "Computer Centre"
    },
    others: [
      {
        name: "Sri M. Ravi Kumar",
        title: "Network Engineer",
        edu: "B.Tech in CSE",
        interests: "Fiber router access points configurations, server updates.",
        phone: "0863 2345621",
        email: "network@city.ac.in",
        avatar: "MRK",
        age: "32 Years",
        experience: "6 Years",
        idNo: "CUS-COMP-002",
        department: "Computer Centre"
      }
    ]
  },
  "Research Office": {
    hod: {
      name: "Sri S. Venkatesh",
      title: "Research Coordinator",
      edu: "M.Tech - Research Associate",
      interests: "Filing patent archives, project grants tracker coordination.",
      phone: "0863 2345630",
      email: "research.office@city.ac.in",
      avatar: "SV",
      age: "37 Years",
      experience: "10 Years",
      idNo: "CUS-RES-001",
      department: "Research Office"
    },
    others: []
  },
  "Purchase & Stores": {
    hod: {
      name: "Sri B. Rajesh",
      title: "Purchase Superintendent",
      edu: "B.Tech - Mechanical",
      interests: "Stores ledger tracking, inventory checks, vendor bills log.",
      phone: "0863 2345640",
      email: "stores@city.ac.in",
      avatar: "BR",
      age: "45 Years",
      experience: "16 Years",
      idNo: "CUS-PUR-001",
      department: "Purchase & Stores"
    },
    others: []
  },
  "Estate Office": {
    hod: {
      name: "Sri P. S. Rao",
      title: "Estate Officer",
      edu: "B.Tech in Civil Engineering",
      interests: "Campus utilities, maintenance supervisor, green cover records.",
      phone: "0863 2345650",
      email: "estate@city.ac.in",
      avatar: "PSR",
      age: "50 Years",
      experience: "21 Years",
      idNo: "CUS-EST-001",
      department: "Estate Office"
    },
    others: []
  },
  "Public Relations": {
    hod: {
      name: "Sri K. Naidu",
      title: "PRO Head",
      edu: "M.A. in Journalism",
      interests: "Press drafting, news releases, hospitality services logs.",
      phone: "0863 2345660",
      email: "pro@city.ac.in",
      avatar: "KN",
      age: "44 Years",
      experience: "15 Years",
      idNo: "CUS-PR-001",
      department: "Public Relations"
    },
    others: []
  },
  "Student Affairs": {
    hod: {
      name: "Sri G. Ravindra",
      title: "Student Welfare Assistant",
      edu: "MBA - Student Coordinator",
      interests: "Club registrations support, coordinate sports events, hostel rosters.",
      phone: "0863 2345670",
      email: "student.office@city.ac.in",
      avatar: "GR",
      age: "36 Years",
      experience: "8 Years",
      idNo: "CUS-SA-001",
      department: "Student Affairs"
    },
    others: []
  },
  "Transport": {
    hod: {
      name: "Sri T. Prasad",
      title: "Transport Supervisor",
      edu: "Diploma in Mech Engineering",
      interests: "Bus driver log records, route planning registers, fuel logs.",
      phone: "0863 2345680",
      email: "transport@city.ac.in",
      avatar: "TP",
      age: "48 Years",
      experience: "20 Years",
      idNo: "CUS-TR-001",
      department: "Transport"
    },
    others: []
  },
  "Health Centre": {
    hod: {
      name: "Dr. S. Radha",
      title: "Medical Officer",
      edu: "M.B.B.S. - GMC",
      interests: "First-aid, diagnostics logs, medical inventory support.",
      phone: "0863 2345690",
      email: "health@city.ac.in",
      avatar: "SR",
      age: "42 Years",
      experience: "14 Years",
      idNo: "CUS-MED-001",
      department: "Health Centre"
    },
    others: []
  },
  "Guest House": {
    hod: {
      name: "Sri M. Ravi",
      title: "Guest House Warden",
      edu: "B.Sc - Hotel Management",
      interests: "Room booking entries, inventory audit logs, pantry check.",
      phone: "0863 2345700",
      email: "guesthouse@city.ac.in",
      avatar: "MR",
      age: "35 Years",
      experience: "9 Years",
      idNo: "CUS-GST-001",
      department: "Guest House"
    },
    others: []
  },
  "Sports Office": {
    hod: {
      name: "Sri K. Prasad",
      title: "Physical Director",
      edu: "M.P.Ed - Acharya Nagarjuna University",
      interests: "Inventory coordinates, athletic roster planning, equipment audit.",
      phone: "0863 2345710",
      email: "sports.pd@city.ac.in",
      avatar: "KP",
      age: "43 Years",
      experience: "15 Years",
      idNo: "CUS-SPO-001",
      department: "Sports Office"
    },
    others: []
  }
};

function StaffDirectory() {
  const [selectedDept, setSelectedDept] = React.useState("Registrar Office");
  const [selectedFaculty, setSelectedFaculty] = React.useState<FacultyMember | null>(null);
  
  const activeDept = STAFF_DATA[selectedDept] || STAFF_DATA["Registrar Office"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-[var(--font-poppins)] text-left w-full mt-4">
      {/* Left Sidebar */}
      <div className="lg:col-span-4 flex flex-col border border-gray-200 bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100 p-2 min-h-[580px] justify-between">
        <div>
          <h4 className="text-xs font-black text-[#072A6C] tracking-widest uppercase p-4 border-b border-gray-100">Administrative Staff</h4>
          <div className="flex flex-col gap-1 mt-2">
            {STAFF_DEPARTMENTS.map((dept) => {
              const isActive = dept === selectedDept;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`w-full text-left px-5 py-3 text-xs font-extrabold transition-all outline-none cursor-pointer flex items-center justify-between border-l-4 rounded-xl ${
                    isActive 
                      ? "bg-[#D71920]/5 text-[#D71920] border-[#D4AF37] shadow-sm" 
                      : "text-[#072A6C] hover:bg-gray-50 border-transparent"
                  }`}
                >
                  <span>{dept}</span>
                  <ChevronRight size={14} className={isActive ? "text-[#D4AF37]" : "text-gray-300"} />
                </button>
              );
            })}
          </div>
        </div>
        <div className="p-4 bg-gray-50/50 rounded-xl text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center border-t border-gray-100">
          City Chalapathi Staff Directory
        </div>
      </div>

      {/* Right Content */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Unit Head */}
        {activeDept.hod && (
          <div className="space-y-4 flex flex-col items-center">
            <h4 className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-wider text-center">Unit Head</h4>
            <div 
              onClick={() => setSelectedFaculty(activeDept.hod)}
              className="bg-white border-2 border-[#D4AF37] rounded-[16px] p-6 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer relative group w-full max-w-[340px] min-h-[300px]"
            >
              <div className="absolute top-3 right-3 bg-[#D4AF37] text-gray-900 font-extrabold text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-sm">
                Head
              </div>

              <div className="w-48 h-48 rounded-lg border-2 border-gray-100 bg-[#072A6C]/5 flex items-center justify-center font-black text-4xl text-[#072A6C] shadow-inner mb-4 group-hover:border-[#D4AF37] transition-all select-none overflow-hidden">
                <img src={getAvatarUrl(activeDept.hod.avatar)} alt={activeDept.hod.name} className="w-full h-full object-cover" />
              </div>

              <h5 className="font-extrabold text-[#072A6C] text-sm leading-snug tracking-tight">
                {activeDept.hod.name}
              </h5>
              <span className="text-[10px] text-[#D71920] font-bold uppercase tracking-wider mt-1 block">
                {activeDept.hod.title}
              </span>
            </div>
          </div>
        )}

        {/* Other Unit Members */}
        {activeDept.others && activeDept.others.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-[#072A6C] uppercase tracking-wider">Unit Staff Members</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {activeDept.others.map((faculty, fIdx) => (
                <div 
                  key={fIdx}
                  onClick={() => setSelectedFaculty(faculty)}
                  className="bg-white border border-gray-200/80 rounded-[16px] p-6 shadow-sm hover:border-[#D4AF37] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer group min-h-[260px]"
                >
                  <div className="w-40 h-40 rounded-lg border-2 border-gray-100 bg-[#072A6C]/5 flex items-center justify-center font-black text-3xl text-[#072A6C] shadow-inner mb-4 group-hover:border-[#D4AF37] transition-all select-none overflow-hidden">
                    <img src={getAvatarUrl(faculty.avatar)} alt={faculty.name} className="w-full h-full object-cover" />
                  </div>

                  <h5 className="font-extrabold text-[#072A6C] text-xs leading-snug tracking-tight">
                    {faculty.name}
                  </h5>
                  <span className="text-[9px] text-[#D71920] font-bold uppercase tracking-wider mt-1 block">
                    {faculty.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Staff Details Modal */}
      {selectedFaculty && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedFaculty(null)}
        >
          <div 
            className="bg-white w-full max-w-[500px] rounded-[24px] overflow-hidden shadow-2xl relative flex flex-col text-left border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedFaculty(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer outline-none border-none"
            >
              <X size={18} />
            </button>

            <div className="bg-[#072A6C] text-white py-8 px-6 text-center relative border-b-4 border-[#D4AF37]">
              <div className="w-20 h-20 rounded-lg border-2 border-[#D4AF37] bg-white text-[#072A6C] flex items-center justify-center font-black text-2xl shadow-md mx-auto mb-3 select-none overflow-hidden">
                <img src={getAvatarUrl(selectedFaculty.avatar)} alt={selectedFaculty.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg md:text-xl font-black tracking-tight">{selectedFaculty.name}</h3>
              <p className="text-[10px] text-[#D4AF37] mt-1 font-black uppercase tracking-widest">{selectedFaculty.title}</p>
            </div>

            <div className="p-6 space-y-4 text-xs text-gray-600">
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-b border-gray-100 pb-4">
                <div>
                  <span className="text-[9px] text-[#D71920] font-black uppercase tracking-wider block">Employee ID</span>
                  <span className="font-bold text-gray-700">{selectedFaculty.idNo}</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#D71920] font-black uppercase tracking-wider block">Office Department</span>
                  <span className="font-bold text-gray-700">{selectedFaculty.department}</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#D71920] font-black uppercase tracking-wider block">Experience</span>
                  <span className="font-bold text-gray-700">{selectedFaculty.experience}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] text-[#D71920] font-black uppercase tracking-wider block">Qualification</span>
                <p className="font-medium bg-gray-50 p-3 rounded-xl border border-gray-100 leading-relaxed text-[11px] text-gray-700">
                  {selectedFaculty.edu}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] text-[#D71920] font-black uppercase tracking-wider block">Responsibilities</span>
                <p className="font-light bg-amber-50/40 p-3 rounded-xl border border-amber-100/50 leading-relaxed text-[11px] text-gray-700">
                  {selectedFaculty.interests}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100 flex justify-start items-center text-[11px] text-gray-500 font-semibold">
                <div className="flex items-center gap-2 truncate">
                  <Mail size={13} className="text-[#D4AF37] shrink-0" />
                  <span className="truncate" title={selectedFaculty.email}>{selectedFaculty.email}</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedFaculty(null)}
                className="h-9 px-6 bg-[#072A6C] hover:bg-[#072A6C]/90 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FacultyDirectory() {
  const [selectedDept, setSelectedDept] = React.useState("Computer Science & Engineering");
  const [selectedFaculty, setSelectedFaculty] = React.useState<FacultyMember | null>(null);
  
  const activeDept = FACULTY_DATA[selectedDept] || FACULTY_DATA["Computer Science & Engineering"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-[var(--font-poppins)] text-left w-full mt-4">
      {/* Left Sidebar (Wide, Taller Card Layout to fill vertical space) */}
      <div className="lg:col-span-4 flex flex-col border border-gray-200 bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100 p-2 min-h-[580px] justify-between">
        <div>
          <h4 className="text-xs font-black text-[#072A6C] tracking-widest uppercase p-4 border-b border-gray-100">Departments</h4>
          <div className="flex flex-col gap-1 mt-2">
            {DEPARTMENTS.map((dept) => {
              const isActive = dept === selectedDept;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`w-full text-left px-5 py-6 text-xs font-extrabold transition-all outline-none cursor-pointer flex items-center justify-between border-l-4 rounded-xl ${
                    isActive 
                      ? "bg-[#D71920]/5 text-[#D71920] border-[#D4AF37] shadow-sm" 
                      : "text-[#072A6C] hover:bg-gray-50 border-transparent"
                  }`}
                >
                  <span>{dept}</span>
                  <ChevronRight size={14} className={isActive ? "text-[#D4AF37]" : "text-gray-300"} />
                </button>
              );
            })}
          </div>
        </div>
        {/* Placeholder bottom element to help elongate layout */}
        <div className="p-4 bg-gray-50/50 rounded-xl text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center border-t border-gray-100">
          City Chalapathi Directory
        </div>
      </div>

      {/* Right Content (Faculty Cards Grid) */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Head of Department Centered Layout */}
        {activeDept.hod && (
          <div className="space-y-4 flex flex-col items-center">
            <h4 className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-wider text-center">Head of Department</h4>
            <div 
              onClick={() => setSelectedFaculty(activeDept.hod)}
              className="bg-white border-2 border-[#D4AF37] rounded-[16px] p-6 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer relative group w-full max-w-[340px] min-h-[300px]"
            >
              {/* HOD Gold Tag */}
              <div className="absolute top-3 right-3 bg-[#D4AF37] text-gray-900 font-extrabold text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-sm">
                HOD
              </div>

              {/* Square Avatar Photo Box (3x Bigger) */}
              <div className="w-48 h-48 rounded-lg border-2 border-gray-100 bg-[#072A6C]/5 flex items-center justify-center font-black text-4xl text-[#072A6C] shadow-inner mb-4 group-hover:border-[#D4AF37] transition-all select-none overflow-hidden">
                <img src={getAvatarUrl(activeDept.hod.avatar)} alt={activeDept.hod.name} className="w-full h-full object-cover" />
              </div>

              <h5 className="font-extrabold text-[#072A6C] text-sm leading-snug tracking-tight">
                {activeDept.hod.name}
              </h5>
            </div>
          </div>
        )}

        {/* Other Faculty Members Grid (3-column layout) */}
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold text-[#072A6C] uppercase tracking-wider">Department Faculty</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {activeDept.others.map((faculty, fIdx) => (
              <div 
                key={fIdx}
                onClick={() => setSelectedFaculty(faculty)}
                className="bg-white border border-gray-200/80 rounded-[16px] p-6 shadow-sm hover:border-[#D4AF37] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer group min-h-[260px]"
              >
                {/* Square Avatar Photo Box (3x Bigger) */}
                <div className="w-40 h-40 rounded-lg border-2 border-gray-100 bg-[#072A6C]/5 flex items-center justify-center font-black text-3xl text-[#072A6C] shadow-inner mb-4 group-hover:border-[#D4AF37] transition-all select-none overflow-hidden">
                  <img src={getAvatarUrl(faculty.avatar)} alt={faculty.name} className="w-full h-full object-cover" />
                </div>

                <h5 className="font-extrabold text-[#072A6C] text-xs leading-snug tracking-tight">
                  {faculty.name}
                </h5>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 🌟 FACULTY DETAILS MODAL POPUP (CENTERED LAYOUT)          */}
      {/* ======================================================== */}
      {selectedFaculty && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedFaculty(null)}
        >
          <div 
            className="bg-white w-full max-w-[500px] rounded-[24px] overflow-hidden shadow-2xl relative flex flex-col text-left border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedFaculty(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer outline-none border-none"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Header Banner (Navy & Gold Accents) */}
            <div className="bg-[#072A6C] text-white py-8 px-6 text-center relative border-b-4 border-[#D4AF37]">
              {/* Square Avatar Photo */}
              <div className="w-20 h-20 rounded-lg border-2 border-[#D4AF37] bg-white text-[#072A6C] flex items-center justify-center font-black text-2xl shadow-md mx-auto mb-3 select-none overflow-hidden">
                <img src={getAvatarUrl(selectedFaculty.avatar)} alt={selectedFaculty.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg md:text-xl font-black tracking-tight">{selectedFaculty.name}</h3>
              <p className="text-[10px] text-[#D4AF37] mt-1 font-black uppercase tracking-widest">{selectedFaculty.title}</p>
            </div>

            {/* Details Content */}
            <div className="p-6 space-y-4 text-xs text-gray-600">
              
              {/* Details Table Grid */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-b border-gray-100 pb-4">
                <div>
                  <span className="text-[9px] text-[#D71920] font-black uppercase tracking-wider block">Department ID</span>
                  <span className="font-bold text-gray-700">{selectedFaculty.idNo}</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#D71920] font-black uppercase tracking-wider block">Department</span>
                  <span className="font-bold text-gray-700">{selectedFaculty.department}</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#D71920] font-black uppercase tracking-wider block">Experience</span>
                  <span className="font-bold text-gray-700">{selectedFaculty.experience}</span>
                </div>
              </div>

              {/* Education block */}
              <div className="space-y-1">
                <span className="text-[9px] text-[#D71920] font-black uppercase tracking-wider block">Education Background</span>
                <p className="font-medium bg-gray-50 p-3 rounded-xl border border-gray-100 leading-relaxed text-[11px] text-gray-700">
                  {selectedFaculty.edu}
                </p>
              </div>

              {/* Research/Interest block */}
              <div className="space-y-1">
                <span className="text-[9px] text-[#D71920] font-black uppercase tracking-wider block">Areas of Interest</span>
                <p className="font-light bg-amber-50/40 p-3 rounded-xl border border-amber-100/50 leading-relaxed text-[11px] text-gray-700">
                  {selectedFaculty.interests}
                </p>
              </div>

              {/* Contact grid */}
              <div className="pt-2 border-t border-gray-100 flex justify-start items-center text-[11px] text-gray-500 font-semibold">
                <div className="flex items-center gap-2 truncate">
                  <Mail size={13} className="text-[#D4AF37] shrink-0" />
                  <span className="truncate" title={selectedFaculty.email}>{selectedFaculty.email}</span>
                </div>
              </div>
            </div>

            {/* Close footer button */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedFaculty(null)}
                className="h-9 px-6 bg-[#072A6C] hover:bg-[#072A6C]/90 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
