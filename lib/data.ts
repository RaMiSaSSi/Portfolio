// ---------------------------------------------------------------------------------------------------------------------------------------
//  Portfolio Data --- edit all TODO values
// ---------------------------------------------------------------------------------------------------------------------------------------

export const siteConfig = {
  name: "Sassi Rami", // TODO: your full name
  title: "Full-Stack Engineer", // TODO: your title
  tagline: "Crafting robust backends & elegant frontends with Java -- Spring Boot -- Angular -- React Native",
  email: "ramisassi11@gmail.com", // TODO: your email
  github: "https://github.com/RaMiSaSSi", // TODO: your GitHub
  linkedin: "https://www.linkedin.com/in/ramisassi/", // TODO: your LinkedIn
  location: "Tunis, Tunisia",
  availableForWork: true,
  cvUrl: "/resume.pdf",
  cvFileName: "CV_Sassi-Rami.pdf",
};

// --------- Tech Stack ---------------------------------------------------------------------------------------------
export const techStack = [
  { name: "Java",         icon: "---",  color: "#f89820" },
  { name: "Spring Boot",  icon: "----",  color: "#6db33f" },
  { name: "Angular",      icon: "----",  color: "#dd0031" },
  { name: "React Native", icon: "------",  color: "#61dafb" },
  { name: "Python",       icon: "----",  color: "#3776ab" },
  { name: "MongoDB",      icon: "----",  color: "#47a248" },
  { name: "PostgreSQL",   icon: "----",  color: "#336791" },
  { name: "MySQL",        icon: "----",  color: "#4479a1" },
  { name: "REST APIs",    icon: "----",  color: "#ff6b35" },
  { name: "Git",          icon: "----",  color: "#f05032" },
];

// --------- Skills ---------------------------------------------------------------------------------------------------------
export const skills = [
  {
    category: "Backend",
    items: ["Java", "Spring Boot", "Spring Security", "REST APIs", "Hibernate", "JPA"],
  },
  {
    category: "Frontend",
    items: ["Angular", "TypeScript", "React Native", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    category: "DevOps & Tools",
    items: ["Git", "GitHub", "Docker", "Maven", "Postman", "IntelliJ IDEA"],
  },
  {
    category: "Other",
    items: ["Python", "Agile / Scrum", "REST", "MVC Architecture", "CI/CD"],
  },
];

// --------- Projects ---------------------------------------------------------------------------------------------------
export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  stack: string[];
  category: string[];
  github?: string;
  demo?: string;
  status: "completed" | "in-progress";
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "amatun-shop",
    title: "Amatun Shop",
    description:
      "A full-featured e-commerce platform with product management, shopping cart, order tracking and admin dashboard.",
    longDescription:
      "Amatun Shop is a scalable e-commerce solution built with Angular on the frontend and Spring Boot powering a robust REST API backend. Products, inventory, orders and users are all persisted in PostgreSQL. The admin dashboard provides real-time analytics and inventory management.",
    tags: ["E-Commerce", "Full-Stack", "Admin"],
    stack: ["Angular", "Spring Boot", "PostgreSQL"],
    category: ["Angular", "Spring Boot"],
    github: "https://github.com/ramis/amatun-shop", // TODO
    demo: undefined,
    status: "completed",
    featured: true,
  },
  {
    id: "amatun-delivery",
    title: "Amatun Delivery",
    description:
      "A cross-platform delivery tracking app with real-time order updates, courier management, and customer notifications.",
    longDescription:
      "Amatun Delivery brings logistics management to mobile. The React Native app gives couriers and customers live order tracking, push notifications, and route optimization. The Spring Boot backend handles authentication, order lifecycle and API orchestration.",
    tags: ["Mobile", "Delivery", "Real-Time"],
    stack: ["Spring Boot", "React Native"],
    category: ["React Native", "Spring Boot"],
    github: "https://github.com/ramis/amatun-delivery", // TODO
    demo: undefined,
    status: "completed",
    featured: true,
  },
  {
    id: "aventurooo",
    title: "Aventurooo",
    description:
      "An adventure travel platform for discovering, booking and sharing outdoor experiences across Tunisia.",
    longDescription:
      "Aventurooo connects adventure seekers with local guides and outdoor experiences. Angular provides a rich SPA experience with maps, filters and booking flows, while Spring Boot manages bookings, users and activity listings via a secure REST API.",
    tags: ["Travel", "Booking", "Social"],
    stack: ["Angular", "Spring Boot"],
    category: ["Angular", "Spring Boot"],
    github: "https://github.com/ramis/aventurooo", // TODO
    demo: undefined,
    status: "completed",
    featured: false,
  },
];

export const projectCategories = ["All", "Angular", "Spring Boot", "React Native"];

// --------- Experience ---------------------------------------------------------------------------------------------
export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: "full-time" | "internship" | "freelance";
  description: string[];
  tech: string[];
};

export const experiences: Experience[] = [
  {
    id: "dev-flow",
    company: "Dev Flow Studio",
    role: "Full-Stack Developer",
    period: "2023 --- Present",  // TODO: actual dates
    location: "Tunis, Tunisia",
    type: "full-time",
    description: [
      "Designed and developed scalable REST APIs using Spring Boot and Java.",
      "Built dynamic Angular SPAs with component libraries and NgRx state management.",
      "Collaborated in Agile sprints and conducted thorough code reviews.",
    ],
    tech: ["Spring Boot", "Angular", "PostgreSQL", "Docker"],
  },
  {
    id: "mynds",
    company: "MYNDS COBEEZ",
    role: "Backend Developer",
    period: "2022 --- 2023", // TODO: actual dates
    location: "Tunis, Tunisia",
    type: "full-time",
    description: [
      "Developed and maintained microservices for a SaaS HR platform.",
      "Optimised database queries and improved API response times by 40%.",
      "Integrated third-party APIs and payment gateways.",
    ],
    tech: ["Java", "Spring Boot", "MySQL", "REST APIs"],
  },
  {
    id: "cni",
    company: "Centre National de l'Informatique",
    role: "Software Engineering Intern",
    period: "2021", // TODO: actual dates
    location: "Tunis, Tunisia",
    type: "internship",
    description: [
      "Contributed to a national digital infrastructure project.",
      "Developed internal tooling with Java and Spring Framework.",
      "Gained hands-on experience with enterprise-grade systems.",
    ],
    tech: ["Java", "Spring", "Oracle DB"],
  },
  {
    id: "best-info",
    company: "Best Info",
    role: "Junior Developer",
    period: "2020 --- 2021", // TODO: actual dates
    location: "Tunis, Tunisia",
    type: "full-time",
    description: [
      "Maintained and enhanced legacy Java applications.",
      "Built RESTful endpoints consumed by Angular frontends.",
      "Participated in client-facing demos and requirement gathering.",
    ],
    tech: ["Java", "Angular", "MySQL"],
  },
];

// --------- Education ------------------------------------------------------------------------------------------------
export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  description: string;
  grade?: string;
};

export const education: Education[] = [
  {
    id: "esprit",
    institution: "ESPRIT Engineering School",
    degree: "Engineering Degree",
    field: "Software Engineering",
    period: "2020 --- 2023", // TODO: actual dates
    location: "Tunis, Tunisia",
    description:
      "Specialised in software engineering with a focus on distributed systems, software architecture, and agile methodologies.",
    grade: "Honours",
  },
  {
    id: "iset",
    institution: "ISET Rades",
    degree: "Bachelor's Degree",
    field: "Computer Science",
    period: "2017 --- 2020", // TODO: actual dates
    location: "Rades, Tunisia",
    description:
      "Studied core computer science fundamentals including algorithms, data structures, OOP and relational databases.",
  },
  {
    id: "highschool",
    institution: "High School",
    degree: "Baccalaureate",
    field: "Mathematics & Sciences",
    period: "2017", // TODO: actual dates
    location: "Tunisia",
    description: "Graduated with distinction in the national Baccalaureate exam, major in Mathematics.",
    grade: "Distinction",
  },
];
