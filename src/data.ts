import { ArrowRight, Briefcase, Code2 } from "lucide-react";

export const PROFILE = {
    name: "Duong Long",
    role: "Frontend Developer",
    tagline: "I build fast, polished web experiences with thoughtful UX and delightful motion.",
    location: "Hà Nội, Việt Nam",
    email: "your.email@example.com",
    phone: "+84 9xx xxx xxx",
    links: {
        github: "https://github.com/your-handle",
        linkedin: "https://www.linkedin.com/in/your-handle",
        cv: "#",
    },
};

export const NAV = [
    {id: "home", label: "Home"},
    {id: "about", label: "About"},
    {id: "skills", label: "Skills"},
    {id: "work", label: "Work"},
    {id: "projects", label: "Projects"},
    {id: "contact", label: "Contact"},
] as const;

export const HIGHLIGHTS = [
    {icon: Code2, title: "Frontend Engineering", desc: "React/TypeScript, performance, component systems, accessibility."},
    {icon: Briefcase, title: "Product UI", desc: "Design-minded implementation with clean layouts & micro-interactions."},
    {icon: ArrowRight, title: "Motion & Delight", desc: "Framer Motion, transitions, scroll reveals, hover depth & polish."},
];

export const SKILLS = [
    {name: "React", level: 92},
    {name: "TypeScript", level: 88},
    {name: "TailwindCSS", level: 90},
    {name: "Animations (Framer Motion)", level: 86},
    {name: "Performance", level: 82},
    {name: "Testing", level: 70},
    {name: "UI/UX", level: 80},
];

export const EXPERIENCE = [
    {
        role: "Frontend Developer",
        company: "Your Company",
        start: "2023",
        end: undefined,
        location: "Hà Nội",
        bullets: [
            "Built responsive UI with reusable components and clean architecture.",
            "Optimized performance (rendering, list virtualization, bundle strategy).",
            "Collaborated with backend and designers to ship features end-to-end.",
        ],
        tags: ["React", "TypeScript", "Odoo", "Mobiscroll"],
    },
    {
        role: "Frontend Intern",
        company: "Another Company",
        start: "2022",
        end: "2023",
        location: "Remote",
        bullets: [
            "Delivered UI pages and implemented form validation & API integration.",
            "Improved accessibility and component consistency across screens.",
        ],
        tags: ["JavaScript", "CSS", "REST"],
    },
];

export type Project = {
    title: string;
    description: string;
    tags: string[];
    image?: string;
    links: { live?: string; repo?: string };
    highlights: string[];
};

export const PROJECTS: Project[] = [
    {
        title: "ClickUp-style Task Board",
        description: "A Trello/ClickUp inspired board with smooth drag & drop, filters, and polished motion.",
        tags: ["React", "TypeScript", "DnD", "Tailwind", "Framer Motion"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
        links: { live: "#", repo: "#" },
        highlights: [
            "Virtualized lists for performance at scale",
            "Animated re-order, hover depth, and modal transitions",
            "Reusable state management patterns",
        ],
    },
    {
        title: "E-commerce Mobile Web",
        description: "Mobile-first storefront with fast navigation, smart search, and checkout UX.",
        tags: ["React", "Vite", "Tailwind", "UX"],
        image: "https://images.unsplash.com/photo-1557825835-70d97c4aa567?q=80&w=1400&auto=format&fit=crop",
        links: { live: "#", repo: "#" },
        highlights: [
            "Responsive layout tuned for common iPhone sizes",
            "Accessible components and keyboard-friendly flows",
            "Optimized bundles and caching strategy",
        ],
    },
    {
        title: "Dashboard UI Kit",
        description: "A component-driven dashboard system with charts, tables, and theming.",
        tags: ["Design System", "Components", "A11y"],
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1400&auto=format&fit=crop",
        links: { live: "#", repo: "#" },
        highlights: [
            "Consistent tokens for spacing/typography",
            "Motion presets for interactions & transitions",
            "Theme toggle with graceful reduced motion",
        ],
    },
];
