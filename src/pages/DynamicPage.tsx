"use client";

import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronDown, Home, Calendar, BookOpen, Landmark, Info, Phone, ShieldCheck, UserPlus, FileText, UploadCloud, CreditCard, Clock, ShieldAlert, UserCheck, Scale, CalendarRange } from "lucide-react";
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
        title: "Board of Directors",
        category: "Management",
        desc: "Meet the visionary trustees and governing council driving Chalapathi's strategic excellence.",
        body: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              { name: "Sri Y. V. Anjaneyulu", role: "Chairman & President", desc: "Visionary leader driving the growth and standards of Chalapathi educational institutions." },
              { name: "Sri Y. Sujit Kumar", role: "Vice Chairman", desc: "Overseeing operations, strategic partnerships, and structural modernization programs." },
              { name: "Smt. Y. Samrajyam", role: "Director", desc: "Promoting community learning and student-centric academic scholarship programs." }
            ].map((member, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-[20px] p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-[#072A6C]/5 rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-lg text-[#072A6C]">
                  {member.name.split(" ").slice(-1)[0][0]}
                </div>
                <h4 className="font-extrabold text-[#072A6C] text-sm">{member.name}</h4>
                <p className="text-xs text-[#D71920] font-semibold mt-1">{member.role}</p>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        )
      };
    }
    if (cleanPath.includes("faculty")) {
      return {
        title: "Our Esteemed Faculty",
        category: "Management",
        desc: "Experienced professors, industry scholars, and dedicated research guides.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm">
            <p>Our professors bring a rich blend of research publications, patents, and industrial consultancy experience to guide student achievements.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Dr. K. Chandrasekhar", dept: "Principal & Professor (CSE)", edu: "Ph.D. in Computer Science & Engineering" },
                { name: "Prof. P. V. Ramana", dept: "Dean Academics & Head of CSE", edu: "M.Tech, Ph.D. Scholar" },
                { name: "Dr. M. Sridhar", dept: "Professor (ECE)", edu: "Ph.D. in Signal Processing" },
                { name: "Dr. T. Anuradha", dept: "Professor (Pharmacy)", edu: "Ph.D. in Pharmaceutics" }
              ].map((faculty, i) => (
                <div key={i} className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D71920]/5 flex items-center justify-center text-[#D71920] font-bold text-xs">
                    Prof
                  </div>
                  <div>
                    <h5 className="font-bold text-[#072A6C] text-xs">{faculty.name}</h5>
                    <p className="text-[10px] text-gray-500 font-semibold mt-0.5">{faculty.dept}</p>
                    <p className="text-[9px] text-gray-400 font-medium">{faculty.edu}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      };
    }
    if (cleanPath.includes("staff")) {
      return {
        title: "Administrative & Technical Staff",
        category: "Management",
        desc: "Our supportive team ensuring smooth administrative operations and advanced laboratory maintenance.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm">
            <p>From admissions counselors to expert lab technicians, our staff ensures a secure, resource-rich, and smooth daily learning environment.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Sri M. Srinivasa Rao", role: "Registrar / Office Head" },
                { name: "Smt. G. Swathi", role: "Librarian & Catalog Administrator" },
                { name: "Sri K. Venkatesh", role: "System Administrator & Network Engineer" },
                { name: "Sri T. Prasad", role: "Senior Laboratory Assistant" }
              ].map((staff, i) => (
                <div key={i} className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-[#072A6C] text-xs">{staff.name}</h5>
                    <p className="text-[10px] text-gray-500 font-semibold mt-0.5">{staff.role}</p>
                  </div>
                  <span className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-bold uppercase">Staff</span>
                </div>
              ))}
            </div>
          </div>
        )
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
    return {
      title: "Campus Life & Amenities",
      category: "Campus Life",
      desc: "Explore details of hostels, libraries, dining halls, and student activity clubs.",
      body: (
        <div className="space-y-6 text-gray-600 text-sm">
          <p>A balanced academic life requires dynamic extracurricular involvement. We feature multi-court sports facilities and comfortable hostel options.</p>
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
        <div className="w-full md:w-3/5 bg-[#B2C9CE] p-6 flex flex-col justify-between min-h-[320px]">
          {/* Header Month/Year Selection */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{displayYear - 1}</span>
            <h5 className="text-sm font-extrabold text-[#2C3E50] uppercase tracking-widest">
              {currentMonth.name}, {displayYear}
            </h5>
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{displayYear + 1}</span>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] font-bold text-[#4B6584] uppercase mb-4 tracking-wider">
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
              className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm text-gray-600 hover:text-red-500 transition-colors cursor-pointer outline-none"
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
                      : "text-[#2C3E50] hover:bg-white/40"
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
              className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm text-gray-600 hover:text-red-500 transition-colors cursor-pointer outline-none"
            >
              ▶
            </button>
          </div>

          {/* Bottom actions */}
          <div className="flex gap-2 mt-6">
            <button 
              onClick={() => alert(`Full events roster for ${currentMonth.name} is displayed on the sidebar.`)}
              className="flex-1 py-2 bg-[#2C3E50] hover:bg-[#1A252F] text-white text-[9.5px] font-bold rounded-lg tracking-widest uppercase transition-colors outline-none cursor-pointer"
            >
              See Planned Events
            </button>
            <button 
              onClick={() => alert("Notification reminder has been registered successfully.")}
              className="flex-1 py-2 bg-[#2C3E50] hover:bg-[#1A252F] text-white text-[9.5px] font-bold rounded-lg tracking-widest uppercase transition-colors outline-none cursor-pointer"
            >
              Set Reminder
            </button>
          </div>
        </div>

        {/* Right Side: Slate Events Panel */}
        <div className="w-full md:w-2/5 bg-[#2B3542] p-6 text-white flex flex-col justify-between min-h-[320px]">
          <div>
            <span className="text-[10px] font-extrabold text-red-400 uppercase tracking-widest block mb-1">Schedule</span>
            <h5 className="text-xs font-extrabold uppercase tracking-widest pb-2 border-b border-white/10 mb-4">
              Events
            </h5>

            <div className="space-y-4">
              {/* Display specific event if selected date has one */}
              {activeEvent ? (
                <div className="space-y-1.5 animate-slide-down">
                  <div className="text-[#00FCFF] text-[11px] font-extrabold uppercase tracking-wider leading-snug">
                    {activeEvent}
                  </div>
                  <div className="w-16 h-[2px] bg-[#00FCFF] rounded" />
                  <div className="text-[9.5px] text-gray-400 font-light">
                    Scheduled on {currentMonth.name} {selectedDay}, {displayYear}
                  </div>
                </div>
              ) : selectedDay ? (
                <div className="text-gray-400 text-xs font-light italic">
                  No academic events scheduled on {currentMonth.name} {selectedDay}.
                </div>
              ) : (
                <div className="text-gray-400 text-xs font-light italic">
                  Click a highlighted date in the calendar to view scheduled milestones.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 space-y-2">
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">Month Summary:</span>
            {Object.keys(currentMonth.events).length > 0 ? (
              Object.entries(currentMonth.events).map(([day, evName]) => (
                <div key={day} className="text-[10px] text-gray-300 flex items-center justify-between">
                  <span>• {evName}</span>
                  <span className="text-gray-500 shrink-0 ml-2">{currentMonth.name.substring(0, 3)} {day}</span>
                </div>
              ))
            ) : (
              <div className="text-[10px] text-gray-500 italic">No events scheduled in {currentMonth.name}.</div>
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
                  <tr className="bg-gray-100/60 border-b border-gray-200/60 text-gray-700 font-bold">
                    <th className="p-3">Performance</th>
                    <th className="p-3">Letter Grade</th>
                    <th className="p-3">Grade Point</th>
                    <th className="p-3">Percentage of Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentProgram.absolute.map((row: any, idx: number) => (
                    <tr key={idx} className="hover:bg-gray-50/20">
                      <td className="p-3 font-medium text-gray-800">{row.perf}</td>
                      <td className="p-3 font-semibold text-[#072A6C]">{row.grade}</td>
                      <td className="p-3 font-semibold text-[#072A6C]">{row.gp}</td>
                      <td className="p-3 text-gray-600">{row.range}</td>
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
                  <tr className="bg-gray-100/60 border-b border-gray-200/60 text-gray-700 font-bold">
                    {activeTab === "bballb" && <th className="p-3">Performance</th>}
                    <th className="p-3">Letter Grade</th>
                    <th className="p-3">Grade Point</th>
                    <th className="p-3">{activeTab === "bballb" ? "Descriptor" : "Grade Calculation Formula"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentProgram.relative.map((row: any, idx: number) => (
                    <tr key={idx} className="hover:bg-gray-50/20">
                      {activeTab === "bballb" && (
                        <td className="p-3 font-medium text-gray-800">{row.perf}</td>
                      )}
                      <td className="p-3 font-semibold text-[#072A6C]">{row.grade}</td>
                      <td className="p-3 font-semibold text-[#072A6C]">{row.gp}</td>
                      <td className="p-3 text-gray-600 font-mono text-[11px]">{row.calc}</td>
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
          <div className="lg:col-span-8 bg-white border border-gray-200/60 rounded-[16px] p-8 shadow-sm">
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
        </motion.div>

      </div>
    </div>
  );
}
