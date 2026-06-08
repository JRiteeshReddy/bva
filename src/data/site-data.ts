export interface Project {
  id: string;
  title: string;
  creator: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: "learn" | "build" | "events" | "showcase";
}

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Projects", href: "#projects" },
  { label: "Internship", href: "#internship" },
  { label: "Contact", href: "#contact" },
];

export const featureCards: FeatureCard[] = [
  {
    id: "learn",
    title: "Learn Vibe Coding",
    description:
      "Master the art of building with AI — from prompt engineering to shipping full-stack products at lightning speed.",
    icon: "learn",
  },
  {
    id: "build",
    title: "Build Projects",
    description:
      "Turn wild ideas into real products. Get mentorship, resources, and a community that pushes you to ship.",
    icon: "build",
  },
  {
    id: "events",
    title: "Participate in Events",
    description:
      "Hackathons, vibe coding sessions, demo days, and meetups — connect with Bangalore's most ambitious builders.",
    icon: "events",
  },
  {
    id: "showcase",
    title: "Showcase Work",
    description:
      "Share what you've built with the community. Get feedback, find collaborators, and celebrate your wins.",
    icon: "showcase",
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "VibeFlow",
    creator: "Arjun Mehta",
    description: "AI-powered workflow automation for indie hackers",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: ["AI", "Automation"],
    link: "#",
  },
  {
    id: "2",
    title: "CodeCanvas",
    creator: "Priya Sharma",
    description: "Visual AI coding assistant with real-time previews",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    tags: ["DevTools", "AI"],
    link: "#",
  },
  {
    id: "3",
    title: "NeuralNotes",
    creator: "Rahul K.",
    description: "Smart note-taking app that understands your context",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    tags: ["Productivity", "ML"],
    link: "#",
  },
  {
    id: "4",
    title: "LaunchPad BLR",
    creator: "Sneha Reddy",
    description: "Community platform for Bangalore startup founders",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    tags: ["Community", "SaaS"],
    link: "#",
  },
  {
    id: "5",
    title: "PromptForge",
    creator: "Vikram S.",
    description: "Collaborative prompt library for vibe coders",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop",
    tags: ["AI", "Open Source"],
    link: "#",
  },
  {
    id: "6",
    title: "ShipIt",
    creator: "Ananya Das",
    description: "One-click deployment for AI-generated apps",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    tags: ["DevOps", "AI"],
    link: "#",
  },
];

export const socialLinks = [
  {
    name: "WhatsApp",
    href: "https://chat.whatsapp.com/DVhWXNeuf6xK1DVkIWkG9p",
    icon: "whatsapp",
  },
];

export const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Internship", href: "#internship" },
  { label: "Contact", href: "#contact" },
];
