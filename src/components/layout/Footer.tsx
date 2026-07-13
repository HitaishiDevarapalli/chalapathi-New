import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin, Phone, Mail, Globe, Users, Briefcase, Play
} from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { label: "About Us", to: "/about" },
    { label: "Vision & Mission", to: "/about/vision" },
    { label: "Leadership", to: "/about/leadership" },
    { label: "History & Heritage", to: "/about/history" },
    { label: "Accreditations", to: "/about" },
  ];

  const academicsLinks = [
    { label: "Programs", to: "/academics" },
    { label: "Computer Science", to: "/academics/computer-science" },
    { label: "AI & ML", to: "/academics/artificial-intelligence" },
    { label: "Data Science", to: "/academics/data-science" },
    { label: "Schools", to: "/academics/schools" },
  ];

  const admissionsLinks = [
    { label: "Undergraduate", to: "/admissions/undergraduate" },
    { label: "Postgraduate", to: "/admissions/postgraduate" },
    { label: "Fee Structure", to: "/admissions/fees" },
    { label: "Scholarships", to: "/admissions/scholarships" },
    { label: "Apply Online", to: "/admissions/apply" },
  ];

  const campusLifeLinks = [
    { label: "Hostels", to: "/campus-life/hostels" },
    { label: "Library", to: "/campus-life/library" },
    { label: "Sports", to: "/campus-life/sports" },
    { label: "Clubs", to: "/campus-life/clubs" },
    { label: "Amenities", to: "/campus-life" },
  ];

  return (
    <footer className="bg-[#072A6C] text-[#D1D5DB] pt-16 pb-8 font-[var(--font-poppins)] text-[12px] border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {/* Col 1: Brand */}
        <div className="space-y-4 lg:col-span-1">
          <div className="bg-white rounded-[12px] p-2.5 w-fit flex items-center justify-center">
            <img
              src="/logo.png"
              alt="City Chalapathi"
              className="h-10 w-auto object-contain"
            />
          </div>
          <p className="leading-relaxed text-[#D1D5DB] text-[11px] font-light">
            Empowering minds through quality education, advanced learning and real-world experience. Your future begins here.
          </p>
          <div className="flex items-center gap-2 pt-2">
            {[Globe, Users, Briefcase, Play].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#D71920] flex items-center justify-center text-[#D1D5DB] hover:text-white transition-all">
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-[13px] mb-5 tracking-wide">Quick Links</h4>
          <ul className="space-y-3 font-light text-[12px]">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Academics */}
        <div>
          <h4 className="text-white font-semibold text-[13px] mb-5 tracking-wide">Academics</h4>
          <ul className="space-y-3 font-light text-[12px]">
            {academicsLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Admissions */}
        <div>
          <h4 className="text-white font-semibold text-[13px] mb-5 tracking-wide">Admissions</h4>
          <ul className="space-y-3 font-light text-[12px]">
            {admissionsLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 5: Campus Life */}
        <div>
          <h4 className="text-white font-semibold text-[13px] mb-5 tracking-wide">Campus Life</h4>
          <ul className="space-y-3 font-light text-[12px]">
            {campusLifeLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 6: Contact Us */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-[13px] mb-5 tracking-wide">Contact Us</h4>
          <div className="space-y-3.5 text-[11px] text-[#D1D5DB] font-light">
            <div className="flex items-start gap-2">
              <MapPin size={13} className="text-[#D71920] mt-0.5 shrink-0" />
              <span>A.R. Nagar, Mothadaka, Guntur, Andhra Pradesh - 522034</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone size={13} className="text-[#D71920] mt-0.5 shrink-0" />
              <span>8886630355 | 8886630356 9905505566</span>
            </div>
            <div className="flex items-start gap-2">
              <Mail size={13} className="text-[#D71920] mt-0.5 shrink-0" />
              <span>admissions@city.ac.in</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1440px] mx-auto px-5 mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-[#D1D5DB] font-light gap-3">
        <span>© 2025 City Chalapathi Institute of Technology. All Rights Reserved.</span>
        <div className="flex items-center gap-3">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span>|</span>
          <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
          <span>|</span>
          <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
