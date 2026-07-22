import { Building2, Globe, Microscope, Handshake, Heart } from "lucide-react";
import type { FeaturePillar, FooterColumn } from "@/types";
import { ROUTES } from "@/constants";

export const featurePillars: FeaturePillar[] = [
  { icon: Building2, label: "Modern Infrastructure" },
  { icon: Globe, label: "Global Exposure" },
  { icon: Microscope, label: "Research Excellence" },
  { icon: Handshake, label: "Industry Connect" },
  { icon: Heart, label: "Vibrant Campus Life" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Quick Links",
    links: [
      { label: "About Us", href: ROUTES.about },
      { label: "Admissions", href: ROUTES.admissions },
      { label: "Academics", href: ROUTES.academics },
      { label: "Schools", href: ROUTES.schools },
    ],
  },
  {
    title: "Campus Life",
    links: [
      { label: "Hostels", href: "#" },
      { label: "Library", href: "#" },
      { label: "Sports", href: "#" },
      { label: "Clubs & Activities", href: "#" },
      { label: "Health Centre", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Downloads", href: "#" },
      { label: "Academic Calendar", href: "#" },
      { label: "Scholarships", href: "#" },
      { label: "Fee Structure", href: "#" },
      { label: "Mandatory Disclosure", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "ERP Portal", href: ROUTES.erp },
      { label: "Student Login", href: ROUTES.studentLogin },
      { label: "Faculty Login", href: ROUTES.facultyLogin },
      { label: "Help Desk", href: "#" },
      { label: "Contact Us", href: ROUTES.contact },
    ],
  },
];
