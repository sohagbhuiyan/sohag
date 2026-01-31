import { Experience, Project, Skill, Education } from "@/types";

export const experiences: Experience[] = [
  {
    id: "exp-1",
    title: "Frontend Developer",
    company: "Trodad International Ltd",
    location: "Mirpur DOHS, Dhaka",
    period: "May 2025 – Present",
    responsibilities: [
      "Developed responsive, scalable, and SEO-friendly web applications using Next.js, TypeScript, and Tailwind CSS",
      "Built and maintained reusable UI components using shadcn/ui, ensuring design consistency across the application",
      "Implemented server functions / API routes to handle backend logic and integrate securely with PostgreSQL databases",
      "Built custom React hooks for data fetching, state management, and caching to optimize performance and code reusability",
      "Collaborated with backend, design, and product teams to deliver high-quality features in an agile environment",
      "Optimized application performance, focusing on faster load times, accessibility standards, and scalable architecture",
      "Participated in code reviews, provided technical insights, and contributed to team decision-making",
      "Worked partially with Expo to support feature integration for mobile applications"
    ]
  },
  {
    id: "exp-2",
    title: "Jr. Frontend Developer",
    company: "SaverFavor Limited",
    location: "Sector-4, Uttara, Dhaka",
    period: "August 2024 - April 2025",
    responsibilities: [
      "Developed and maintained responsive web applications using React.js, Next.js, TypeScript/JavaScript, Redux Toolkit, Tailwind CSS, and MUI",
      "Implemented scalable state management and reusable UI components",
      "Integrated RESTful APIs for dynamic products, authentication, cart, and order flows",
      "Built a scalable admin dashboard with full CRUD functionality for efficient product, order, and content management"
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
  "Next.js Expert",
  "React Specialist",
  "Tailwind CSS Master",
  "TypeScript Enthusiast",
  "UI/UX Developer",
  "Mobile App Developer"
];