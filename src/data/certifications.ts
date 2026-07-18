export interface Certification {
  id: string;
  name: string;
  description: string;
  images: string[];
  color: string;
}

export const certifications: Certification[] = [
  {
    id: "sap",
    name: "SAP",
    description: "Enterprise Resource Planning (ERP), business processes, supply chain, finance, and analytics.",
    images: ["https://www.vectorlogo.zone/logos/sap/sap-ar21.svg"],
    color: "#0FAFFF"
  },
  {
    id: "servicenow",
    name: "ServiceNow",
    description: "AI-powered workflow automation, IT service management, and digital operations.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/5/57/ServiceNow_logo.svg"],
    color: "#81B5A1"
  },
  {
    id: "juniper-networks",
    name: "Juniper Networks",
    description: "AI-native networking, cloud infrastructure, and cybersecurity.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/3/31/Juniper_Networks_logo.svg"],
    color: "#78A22F"
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Customer Relationship Management (CRM), sales automation, and business analytics.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg"],
    color: "#00A1E0"
  },
  {
    id: "zscaler",
    name: "Zscaler",
    description: "Zero Trust Security, SASE, and cloud cybersecurity.",
    images: ["https://upload.wikimedia.org/wikipedia/en/f/fa/Zscaler_logo.svg"],
    color: "#0054A6"
  },
  {
    id: "microchip",
    name: "Microchip",
    description: "Embedded systems, IoT, microcontrollers, and Industry 4.0.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/5/54/Microchip_Technology_logo.svg"],
    color: "#E42528"
  },
  {
    id: "addverb-robotics",
    name: "Addverb Robotics",
    description: "Robotics, intelligent automation, warehouse automation, and AI-driven manufacturing.",
    images: ["https://upload.wikimedia.org/wikipedia/commons/8/8b/Addverb_logo.png"],
    color: "#F97316"
  },
  {
    id: "codechef",
    name: "CodeChef",
    description: "Competitive programming, coding, and algorithmic problem-solving.",
    images: ["https://cdn.codechef.com/images/cc-logo.svg"],
    color: "#5B4638"
  },
  {
    id: "nptel",
    name: "NPTEL",
    description: "IIT/IISc-certified courses in engineering, technology, sciences, and management.",
    images: ["/nptel-logo.png"],
    color: "#072A6C"
  },
  {
    id: "aws-azure-gcp",
    name: "AWS, Azure & Google Cloud",
    description: "Cloud computing, AI, DevOps, cybersecurity, and data engineering.",
    images: ["/cloud-providers-v2.png"],
    color: "#FF9900"
  },
  {
    id: "coursera-edx",
    name: "Coursera & edX",
    description: "Advanced specializations from Ivy League universities and global tech giants.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/5/5f/Coursera_logo_%282020%29.svg",
      "https://upload.wikimedia.org/wikipedia/commons/8/8f/EdX.svg"
    ],
    color: "#0056D2"
  },
  {
    id: "oracle-java",
    name: "Oracle & Java",
    description: "Database management, Java programming, and enterprise application development.",
    images: [
      "https://www.vectorlogo.zone/logos/oracle/oracle-ar21.svg",
      "https://www.vectorlogo.zone/logos/java/java-ar21.svg"
    ],
    color: "#F80000"
  },
  {
    id: "six-sigma-pmp",
    name: "Six Sigma & PMP",
    description: "Quality management, process improvement, and project management.",
    images: [
      "/six-sigma.svg",
      "/pmp.svg"
    ],
    color: "#8B5CF6"
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    description: "SEO, SEM, social media marketing, analytics, and branding (Google, HubSpot & Meta).",
    images: [
      "/digital-marketing.png"
    ],
    color: "#0668E1"
  }
];
