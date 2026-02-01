import { Experience, Project, Skill, Education } from "@/types";

export const experiences: Experience[] = [
  {
    id: "exp-1",
    title: "Frontend Developer",
    company: "Trodad International Ltd",
    location: "Mirpur DOHS, Dhaka",
    period: "May 2025 – Present",
    projects: ["FEROZA E-Commerce", "PrepExcellence LMS", "Jotno Healthcare"],
    responsibilities: [
      "Built FEROZA e-commerce with Next.js, TypeScript & PostgreSQL - advanced filtering, cart & checkout",
      "Developed PrepExcellence LMS with course enrollment, video streaming & progress tracking",
      "Created Jotno healthcare app (React Native Expo) - doctor booking, ambulance & medical marketplace",
      "Implemented SSR/SSG, RESTful APIs & reusable component libraries with shadcn/ui",
      "Optimized performance with code splitting & lazy loading - 40% faster load times"
    ]
  },
  {
    id: "exp-2",
    title: "Jr. Frontend Developer",
    company: "SaverFavor Limited",
    location: "Sector-4, Uttara, Dhaka",
    period: "August 2024 - April 2025",
    responsibilities: [
      "Developed responsive e-commerce apps using React.js, Next.js, TypeScript & Tailwind CSS",
      "Implemented Redux Toolkit for cart, authentication & product filtering",
      "Built admin dashboard with CRUD operations using Material-UI",
      "Optimized bundle size through code splitting - 35% improved page load"
    ]
  }
];


export const projects: Project[] = [
  {
    id: "proj-1",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with separate user and admin panels, and secure role-based authentication",
    techStack: ["React.js", "Tailwind CSS", "Redux Toolkit", "Spring Boot", "JWT", "MySQL"],
    features: [
      "Shop products with advanced filtering",
      "Build custom PCs/CCs",
      "Manage cart, wishlist, and compare",
      "Place orders and track status",
      "Post reviews & questions",
      "Admin panel for complete content management"
    ]
  },
  {
    id: "proj-2",
    title: "SEO-Optimized E-Commerce (MVP)",
    description: "A minimal e-commerce platform built with Next.js, TypeScript, and Tailwind CSS",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit"],
    github: "github.com/sohagbhuiyan/SEO-Optimized",
    live: "https://seo-optimized-demo.vercel.app",
    features: [
      "Product listing with SEO optimization",
      "Product details pages",
      "Shopping cart functionality",
      "Responsive design"
    ]
  },
  {
    id: "proj-3",
    title: "Advanced To-Do Application",
    description: "Task management application with personal and professional categorization",
    techStack: ["JavaScript", "HTML", "CSS"],
    github: "github.com/sohagbhuiyan/TODO",
    live: "sohagbhuiyan.github.io/TODO/",
    features: [
      "Two separate tabs for personal & professional tasks",
      "Add, edit, and delete tasks",
      "Mark tasks as done",
      "Clean and intuitive UI"
    ]
  }
];

export const skills: Skill[] = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "C", "HTML", "CSS", "Java"]
  },
  {
    category: "Frameworks & Libraries",
    items: ["React.js", "Next.js", "Expo", "Tailwind CSS", "shadcn/ui", "Material UI", "Redux Toolkit", "Context API", "TanStack Query"]
  },
  {
    category: "Version Control & Deployment",
    items: ["Git", "GitHub", "Vercel", "Netlify"]
  },
  {
    category: "Collaboration & Project Management",
    items: ["Trello", "Asana"]
  },
  {
    category: "Other Tools",
    items: ["Figma", "Postman", "VS Code", "NativeWind"]
  }
];

export const education: Education[] = [
  {
    degree: "BSc in Computer Science & Engineering",
    institution: "Prime Asia University"
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Mahmudul Hasan Adarsha College"
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Dhalapara S U P High School"
  }
];

export const heroTexts = [
  "Sohag Bhuiyan",
  "Frontend Developer",
  "React & Next.js Expert",
  "Mobile App Developer",
  "React Native (Expo) Developer"
];