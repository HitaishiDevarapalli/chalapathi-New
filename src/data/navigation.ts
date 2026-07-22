import {
  User, Users, Award, Briefcase, Phone,
} from "lucide-react";
import type { TopLink, NavLink } from "@/types";
import { ROUTES } from "@/constants";

// ── Top Bar Links ───────────────────────────────
export const topBarLinks: TopLink[] = [
  { label: "Student Login", href: ROUTES.studentLogin, icon: User },
  { label: "Faculty Login", href: ROUTES.facultyLogin, icon: Users },
  { label: "Alumni", href: ROUTES.alumni, icon: Award },
  { label: "Careers", href: ROUTES.careers, icon: Briefcase },
  { label: "Contact Us", href: ROUTES.contact, icon: Phone },
];

// ── Main Navigation ─────────────────────────────
export const mainNavLinks: NavLink[] = [
  { label: "About Us", href: ROUTES.about },
  { label: "Admissions", href: ROUTES.admissions },
  { label: "Academics", href: ROUTES.academics },
  { label: "Schools", href: ROUTES.schools },
  { label: "Campus Life", href: ROUTES.campusLife },
  { label: "International", href: ROUTES.international },
];
