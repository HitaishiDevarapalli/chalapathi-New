"use client";

import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Home, Calendar, BookOpen, Landmark, Info, Phone, ShieldCheck, UserPlus, FileText, UploadCloud, CreditCard } from "lucide-react";

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
    if (cleanPath.includes("calendar")) {
      return {
        title: "Academic Calendar",
        category: "Academics",
        desc: "Schedule of semesters, internal assessments, holidays, and examination blocks for the academic term.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm">
            <p>Our academic calendar is structured to provide clear timelines for classes, mid-term examinations, laboratory evaluations, and preparation holidays.</p>
            <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white max-w-md">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-700 font-bold">
                    <th className="p-4">Academic Event</th>
                    <th className="p-4">Tentative Dates</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="p-4 font-semibold text-[#072A6C]">Commencement of Classwork</td>
                    <td className="p-4">July 15, 2026</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-[#072A6C]">First Mid-Term Examinations</td>
                    <td className="p-4">September 04 – 09, 2026</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-[#072A6C]">Second Mid-Term Examinations</td>
                    <td className="p-4">November 12 – 18, 2026</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-[#072A6C]">Practical & End Semester Exams</td>
                    <td className="p-4">December 02 – 22, 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      };
    }
    if (cleanPath.includes("flexibilities")) {
      return {
        title: "Academic Flexibilities",
        category: "Academics",
        desc: "Autonomous credit choices, minor streams, honors degrees, and student transfers.",
        body: (
          <div className="space-y-6 text-gray-600 text-sm">
            <p>Being an autonomous institution, City Chalapathi offers student-centric choices like the Choice Based Credit System (CBCS), enabling scholars to choose electives across disciplines, enroll in honors streams, or achieve minor specializations in emerging branches.</p>
          </div>
        )
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
