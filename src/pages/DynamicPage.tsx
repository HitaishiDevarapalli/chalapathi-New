"use client";

import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronDown, Home, Calendar, BookOpen, Landmark, Info, Phone, ShieldCheck, UserPlus, FileText, UploadCloud, CreditCard } from "lucide-react";
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
        body: (
          <div className="space-y-6 text-gray-600 text-sm">
            <p>Students are evaluated on a 10-point letter grading scale. SGPA and CGPA are computed at the end of each semester block based on credit allocations.</p>
          </div>
        )
      };
    }
    if (cleanPath.includes("degrees")) {
      return {
        title: "Award of Degrees",
        category: "Academics",
        desc: "Eligibility conditions for degree distributions, graduation convocations, and transcripts.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm">
            <p>Degrees are awarded to candidates who secure the minimum required credits with no active backlogs, complying with university regulations.</p>
          </div>
        )
      };
    }
    if (cleanPath.includes("electives")) {
      return {
        title: "Electives and Options",
        category: "Academics",
        desc: "Professional core electives and open inter-disciplinary course selections.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm">
            <p>Choose from a rich basket of open electives spanning humanities, data structures, internet of things, and business leadership courses.</p>
          </div>
        )
      };
    }
    if (cleanPath.includes("rules")) {
      return {
        title: "Rules & Regulations",
        category: "Academics",
        desc: "Academic code of conduct, attendance thresholds, and malpractice codes.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm">
            <p>A minimum of 75% attendance is mandatory in each subject. Students must follow the examination and campus code of conduct strictly.</p>
          </div>
        )
      };
    }
    if (cleanPath.includes("teaching")) {
      return {
        title: "Teaching & Evaluation",
        category: "Academics",
        desc: "Outcome-based education framework, continuous assessment marks, and end exams.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm">
            <p>Assessment is divided into Continuous Internal Evaluation (CIE) carrying 40% weight and Semester End Examinations (SEE) carrying 60% weight.</p>
          </div>
        )
      };
    }
    if (cleanPath.includes("bos")) {
      return {
        title: "Board of Studies (BOS)",
        category: "Academics",
        desc: "Academic advisory council consisting of university deans, industry veterans, and subject experts.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm">
            <p>The Board of Studies meets annually to revise core curricula, ensuring our programs remain aligned with latest industrial software and technology trends.</p>
          </div>
        )
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

  const getCalendarTable = (key: string, year: string) => {
    const yStart = year.split("-")[0];
    const yEnd = "20" + year.split("-")[1];
    
    const events = [
      { event: "Commencement of Classwork", date: `July 15, ${yStart}` },
      { event: "First Mid-Term Examinations", date: `September 04 – 09, ${yStart}` },
      { event: "Second Mid-Term Examinations", date: `November 12 – 18, ${yStart}` },
      { event: "Practical Examinations", date: `December 02 – 07, ${yStart}` },
      { event: "End Semester Theory Exams", date: `December 09 – 22, ${yStart}` },
      { event: "Commencement of Next Semester", date: `January 05, ${yEnd}` }
    ];

    return (
      <div className="p-4 bg-gray-50/70 border-t border-gray-100 animate-slide-down">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-bold text-[#072A6C] uppercase tracking-wider">Calendar Details for {year}</span>
          <button 
            onClick={() => alert(`Academic Calendar PDF for ${year} is queued for download.`)}
            className="text-[10px] font-bold text-[#D71920] hover:text-[#072A6C] transition-colors"
          >
            📥 Download Calendar PDF
          </button>
        </div>
        <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100/60 border-b border-gray-200/60 text-gray-700 font-bold">
                <th className="p-3">Academic Event</th>
                <th className="p-3">Dates</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((e, idx) => (
                <tr key={idx} className="hover:bg-gray-50/30">
                  <td className="p-3 font-semibold text-[#072A6C]">{e.event}</td>
                  <td className="p-3 text-gray-600">{e.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

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
                  <div key={course.key} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => setActiveCourse(isExpanded ? null : uniqueKey)}
                      className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-gray-700 hover:text-[#D71920] bg-white transition-colors text-left outline-none cursor-pointer"
                    >
                      <span>• {course.label}</span>
                      <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-[#D71920]" : "text-gray-400"}`} />
                    </button>
                    {isExpanded && getCalendarTable(course.key, selectedYear)}
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
            <div key={item.key} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow transition-shadow">
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
