// ─────────────────────────────────────────────────────────────────────────────
//  Portfolio Data  –  Rami Sassi
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name:            "Rami Sassi",
  title:           "Full-Stack Software Engineer",
  tagline:         "I design, build, containerize and deploy full-stack applications — from reactive frontends to scalable backends and cloud infrastructure.",
  email:           "ramisassi11@gmail.com",
  github:          "https://github.com/RaMiSaSSi",
  linkedin:        "https://www.linkedin.com/in/ramisassi/",
  location:        "Tunis, Tunisia",
  availableForWork: true,
  cvUrl:           "/resume.pdf",
  cvFileName:      "CV_Rami-Sassi.pdf",
};

// ─────────────────────────────────────────────────────────────────────────────
//  Skill Categories  (chips — no percentages)
// ─────────────────────────────────────────────────────────────────────────────
export type SkillCategory = {
  id:          string;
  label:       string;
  color:       string;
  description: string;
  items:       SkillItem[];
};

export type SkillItem = {
  name:        string;
  description: string;
};

export const skillCategories: SkillCategory[] = [
  {
    id:          "frontend",
    label:       "Frontend",
    color:       "#e8482b",
    description: "Building reactive, accessible and performant user interfaces",
    items: [
      { name: "Angular",      description: "Component architecture, NgRx state management and reactive forms" },
      { name: "React",        description: "Hooks, context API and server-side rendering with Next.js" },
      { name: "TypeScript",   description: "Strongly-typed codebases with advanced generics and utility types" },
      { name: "HTML5",        description: "Semantic markup, accessibility and Web APIs" },
      { name: "CSS3",         description: "Responsive layouts, animations and design systems" },
      { name: "Tailwind CSS", description: "Utility-first CSS for rapid UI development" },
    ],
  },
  {
    id:          "backend",
    label:       "Backend",
    color:       "#d9a441",
    description: "Designing reliable, secure and scalable server-side systems",
    items: [
      { name: "Java",             description: "OOP, concurrency, streams and enterprise patterns" },
      { name: "Spring Boot",      description: "REST APIs, dependency injection and microservices architecture" },
      { name: "Spring Security",  description: "JWT authentication, OAuth2 and role-based access control" },
      { name: "Node.js",          description: "Event-driven backends with Express and async I/O patterns" },
      { name: "NestJS",           description: "Modular TypeScript backend framework for scalable APIs" },
      { name: "GraphQL",          description: "Schema design, resolvers and efficient data querying" },
      { name: "WebSocket",        description: "Real-time bidirectional communication for live features" },
      { name: "REST APIs",        description: "Resource design, versioning, pagination and OpenAPI docs" },
    ],
  },
  {
    id:          "database",
    label:       "Databases",
    color:       "#4cd08d",
    description: "Modeling data for reliability, performance and scale",
    items: [
      { name: "PostgreSQL", description: "Relational modeling, indexing, transactions and query optimization" },
      { name: "MySQL",      description: "Relational databases for OLTP workloads" },
      { name: "MongoDB",    description: "Document store for flexible, schema-less data models" },
      { name: "Redis",      description: "In-memory caching, session storage and pub/sub messaging" },
    ],
  },
  {
    id:          "devops",
    label:       "DevOps",
    color:       "#3f8f7f",
    description: "Automating the path from code to production",
    items: [
      { name: "Docker",         description: "Containerized development, multi-stage builds and Docker Compose" },
      { name: "Docker Compose", description: "Multi-service orchestration for local and staging environments" },
      { name: "CI/CD",          description: "GitHub Actions pipelines for automated testing and deployment" },
      { name: "Nginx",          description: "Reverse proxy, load balancing and static file serving" },
      { name: "Linux",          description: "Server administration, shell scripting and process management" },
      { name: "Git / GitHub",   description: "Version control, branching strategies and pull request workflows" },
    ],
  },
  {
    id:          "other",
    label:       "Other",
    color:       "#c96f4a",
    description: "Additional capabilities across the engineering spectrum",
    items: [
      { name: "Python",         description: "Scripting, data processing and AI/chatbot integration" },
      { name: "AI Integration", description: "Rasa chatbots, LLM APIs and intelligent feature integration" },
      { name: "Mobile Dev",     description: "Cross-platform mobile applications with React Native" },
      { name: "Agile / Scrum",  description: "Sprint planning, retrospectives and team collaboration" },
      { name: "Clean Code",     description: "SOLID principles, design patterns and code review practices" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Projects
// ─────────────────────────────────────────────────────────────────────────────
export type ArchLayer = {
  id:    string;
  label: string;
  tech:  string;
  color: string;
};

export type Project = {
  id:              string;
  number:          string;
  title:           string;
  subtitle:        string;
  description:     string;
  role:            string;
  problem:         string;
  solution:        string;
  features:        string[];
  challenges:      string[];
  learned:         string[];
  stack:           string[];
  tags:            string[];
  category:        string[];
  arch:            ArchLayer[];
  github?:         string;
  demo?:           string;
  layout?:         "mobile" | "web";
  status:          "completed" | "in-progress";
  featured:        boolean;
  screenshots:     string[];
};

export const projects: Project[] = [
  
  
  
 // ─────────────────────────────────────────────────────────────────────────────
//  Corrected project entries — replace projects[3], projects[4] and projects[5]
//  (Amatun Shop, Amatun Delivery, and the courier mobile app) in lib/data.ts
//  with these. All Lorem ipsum / placeholder content has been removed.
// ─────────────────────────────────────────────────────────────────────────────

{
  id:       "amatun-shop",
  number:   "01",
  title:    "Amatun Shop",
  subtitle: "Multi-role e-commerce marketplace",
  description:
    "A full-stack e-commerce marketplace connecting local shops, customers, delivery agents and partners, with real-time order tracking and role-based dashboards.",
  role:     "Full-Stack Engineer (Angular + Spring Boot + React Native)",
  problem:
    "Local shops needed a shared platform to sell online without building their own infrastructure, while customers needed a single place to browse, order and track deliveries across multiple shops — with delivery agents and shop staff requiring their own dedicated workflows.",
  solution:
    "Built a multi-role marketplace with Angular, Spring Boot and PostgreSQL, exposing both REST and GraphQL APIs and using WebSocket (STOMP) for real-time order status updates. Each role (customer, shop staff, delivery agent, admin) has a dedicated, guard-protected space with its own dashboard and workflows. A React Native mobile app mirrors the core customer experience natively, with camera-based QR scanning, push notifications and offline caching.",
  features: [
    "Product catalog with search and multi-criteria filters (category, brand, promotions)",
    "Real-time order tracking via WebSocket (STOMP)",
    "Role-based dashboards: customer, shop staff, delivery agent, admin",
    "Shop staff dashboard with sales analytics (Chart.js) and product/order management",
    "Admin dashboard for platform-wide oversight (shops, staff, categories, deliveries, partnerships)",
    "QR code order verification and PDF invoice generation",
    "JWT + OAuth2 (Google) authentication",
    "Multilingual (FR/EN) PWA with light/dark themes",
    "In-app chatbot and Leaflet-based delivery mapping",
    "React Native mobile app with push notifications, geolocation and offline cache",
  ],
  challenges: [
    "Designing a role-based access model (guards) cleanly separating customer, shop staff, delivery agent and admin permissions",
    "Synchronizing real-time order state across web and mobile clients via WebSocket",
    "Combining REST and GraphQL in a single backend without duplicating business logic",
    "Keeping the mobile app's offline cache consistent with live backend state",
  ],
  learned: [
    "Multi-role authorization design for complex marketplace platforms",
    "Real-time data synchronization with WebSocket/STOMP across web and mobile",
    "Combining REST and GraphQL within the same Spring Boot backend",
    "Building and deploying a containerized fullstack app on Oracle Cloud Infrastructure",
  ],
  stack:    ["Angular", "Spring Boot", "PostgreSQL", "React Native", "GraphQL", "WebSocket", "Docker"],
  tags:     ["E-Commerce", "Full-Stack", "Marketplace"],
  category: ["Angular", "Spring Boot", "React Native"],
  arch: [
    { id: "fe",   label: "Angular",      tech: "Frontend",    color: "#dd0031" },
    { id: "api",  label: "REST/GraphQL", tech: "Gateway",     color: "#8b5cf6" },
    { id: "be",   label: "Spring Boot",  tech: "Backend",     color: "#6db33f" },
    { id: "db",   label: "PostgreSQL",   tech: "Database",    color: "#336791" },
    { id: "app",  label: "React Native", tech: "Mobile App",  color: "#61dafb" },
  ],
github:   "https://github.com/RaMiSaSSi",
    demo:     undefined,
    status:   "completed",
    featured: true,
    screenshots: [
      "/images/shop/home1.png",
      "/images/shop/home2.png",
      "/images/shop/home3.png",
      "/images/shop/listeboutiques.png",
      "/images/shop/boutique.png",
      "/images/shop/listecategories.png",
      "/images/shop/listeproduits.png",
      "/images/shop/produit.png",
      "/images/shop/panier.png",
      "/images/shop/livraison.png",
      "/images/shop/admincomamandes.png",
      "/images/shop/adminfacture.png",
    ],
  },
{
  id:       "amatun-delivery",
  number:   "02",
  title:    "Amatun Delivery",
  subtitle: "E-Commerce & Boutique Staff Delivery Management Platform",
  description:
    "A full delivery and e-commerce platform connecting customers, boutique staff, admins and couriers: boutique dashboards for order management, product catalogs, invoices and revenue tracking, with order lifecycle management from acceptance to delivery, returns and exchanges.",
  role:     "Full-Stack Engineer (Angular + Spring Boot + PostgreSQL)",
  problem:
    "Boutiques needed a dedicated operational tool to manage their own orders, track delivery status, handle returns and exchanges, and monitor revenue — while customers and admins operated on separate interfaces sharing the same backend.",
  solution:
    "Built a multi-role platform with a Spring Boot + PostgreSQL backend consumed by three front-ends: an Angular dashboard for boutique staff featuring real-time order and product management, an admin/user web front, and mobile apps for customers and couriers with live tracking and delivery workflows.",
  features: [
    "Boutique dashboard for order acceptance, returns and exchanges",
    "Order lifecycle tracking (pending, confirmed, delivered, returned)",
    "Product catalog, categories and inventory management per boutique",
    "Invoice (facture) management and revenue/CA analytics with charts",
    "Batch grande commande creation for multiple orders at once",
    "Real-time notifications via WebSocket",
    "QR-code based order and client identification",
    "JWT authentication with role-based access (admin, staff, customer, courier)",
    "Google sign-in and secure token refresh",
  ],
  challenges: [
    "Keeping order status synchronized across 4 separate applications sharing one backend",
    "Synchronizing real-time delivery status between the backend, admin dashboard and courier app",
    "Designing courier assignment logic based on availability and location",
    "Preventing corrupted user records (role without staff record) from breaking authenticated flows",
  ],
  learned: [
    "Multi-application architecture driven by a single REST backend",
    "Real-time system design for order and delivery tracking",
    "JWT security, role-based access control and inheritance-mapped entities",
    "Coordinating state across a web dashboard, backend, and mobile apps",
  ],
  stack:    ["Angular", "Spring Boot", "PostgreSQL", "React Native", "REST APIs", "WebSocket"],
  tags:     ["E-Commerce", "Logistics", "Real-Time", "Multi-Platform"],
  category: ["Angular", "Spring Boot"],
  arch: [
    { id: "fe",  label: "Angular",      tech: "Frontend",   color: "#dd0031" },
    { id: "be",  label: "Spring Boot",  tech: "Backend",    color: "#6db33f" },
    { id: "db",  label: "PostgreSQL",   tech: "Database",   color: "#336791" },
    { id: "app", label: "React Native", tech: "Mobile App", color: "#61dafb" },
  ],
  github:   "https://github.com/RaMiSaSSi",
  demo:     undefined,
  status:   "completed",
  featured: true,
  screenshots: [
    "/images/delivery/home.png",
    "/images/delivery/home2.png",
    "/images/delivery/login.png",
    "/images/delivery/listecommande.png",
    "/images/delivery/creationcommande.png",
    "/images/delivery/cyclecommade.png",
    "/images/delivery/bandecommande.png",
    "/images/delivery/commanderapide.png",
  ],
},
{
  id:       "amatun-livreur",
  number:   "03",
  title:    "Amatun Livreur",
  subtitle: "Courier Mobile App with Live Geolocation & Order Tracking",
  description:
    "The courier-facing mobile app for the Amatun Delivery platform, giving couriers live geolocation tracking, order assignment and real-time delivery status updates.",
  role:     "Mobile Developer (React Native)",
  problem:
    "Couriers needed a dedicated mobile app to receive delivery assignments, track their location and update order status in real time, without relying on the customer-facing web platform.",
  solution:
    "Built a React Native mobile app for couriers with live geolocation tracking, incoming order notifications and a delivery workflow synchronized with the Amatun Delivery backend.",
  features: [
    "Live courier geolocation tracking",
    "Incoming delivery order notifications",
    "Order pickup and delivery status workflow",
    "Real-time synchronization with the Amatun Delivery backend",
    "Courier delivery history overview",
    "Navigation integration for delivery routes",
  ],
  challenges: [
    "Implementing reliable background location tracking on mobile",
    "Keeping delivery status in sync between the courier app and admin dashboard in real time",
    "Battery-efficient geolocation updates during active deliveries",
  ],
  learned: [
    "React Native geolocation and background tracking APIs",
    "Real-time mobile-to-backend synchronization patterns",
    "Mobile UX design for task-focused courier workflows",
  ],
stack:    ["React Native", "REST APIs"],
    tags:     ["Mobile", "Logistics", "Real-Time"],
    category: ["React Native"],
    layout:   "mobile",
    arch: [
      { id: "app", label: "React Native", tech: "Mobile App", color: "#61dafb" },
      { id: "api", label: "REST API",     tech: "Gateway",    color: "#8b5cf6" },
      { id: "be",  label: "Spring Boot",  tech: "Backend",    color: "#6db33f" },
      { id: "db",  label: "PostgreSQL",   tech: "Database",   color: "#336791" },
    ],
github:   "https://github.com/RaMiSaSSi",
    demo:     undefined,
    status:   "completed",
    featured: true,
    screenshots: [
      "/images/Livreur/dashboard.png",
      "/images/Livreur/ListeCommandes.png",
      "/images/Livreur/commandedetails.png",
      "/images/Livreur/directiongps.png",
      "/images/Livreur/historique.png",
      "/images/Livreur/profil.png",
    ],
  },
  {
    id:       "amatun-shop-client",
    number:   "04",
    title:    "Amatun Shop — Client App",
    subtitle: "Mobile application dedicated to Amatun Shop customers",
    description:
      "A React Native mobile app dedicated exclusively to Amatun Shop customers: browse boutiques and categories, view products, and manage the shopping cart — a clean, native shopping experience built to match the web marketplace.",
    role:     "Mobile Developer (React Native)",
    problem:  "",
    solution: "",
    features: [
      "Dedicated customer flow: boutique discovery, categories and product browsing",
      "Product detail view with pricing and shop context",
      "Shopping cart management",
    ],
    challenges: [],
    learned:  [],
    stack:    ["React Native"],
    tags:     ["E-Commerce", "Mobile App", "Customer"],
    category: ["React Native"],
    layout:   "mobile",
    arch: [
      { id: "app", label: "React Native", tech: "Mobile App", color: "#61dafb" },
      { id: "api", label: "REST API",     tech: "Gateway",    color: "#8b5cf6" },
      { id: "be",  label: "Spring Boot",  tech: "Backend",    color: "#6db33f" },
      { id: "db",  label: "PostgreSQL",   tech: "Database",   color: "#336791" },
    ],
    github:   "https://github.com/RaMiSaSSi",
    demo:     undefined,
    status:   "completed",
    featured: true,
    screenshots: [
      "/images/App/home1.png",
      "/images/App/home2.png",
      "/images/App/categories.png",
      "/images/App/listeboutique.png",
      "/images/App/boutiquedetails.png",
      "/images/App/produit.png",
      "/images/App/panier.png",
    ],
  },
  {
    id:       "aventuroo",
    number:   "05",
    title:    "Aventuroo",
    subtitle: "Adventure Travel & Outdoor Experience Platform",
    description:
      "A social platform connecting adventure seekers with local guides for discovering, booking and sharing outdoor experiences across Tunisia.",
    role:     "Full-Stack Engineer (Angular + Spring Boot)",
    problem:
      "Outdoor adventure tourism in Tunisia had no centralized platform — guides relied on social media and word-of-mouth while travelers had no reliable way to find and book authentic experiences.",
    solution:
      "Built a booking and discovery platform with interactive maps, guide profiles, experience listings and a social review system. Angular SPA frontend with Spring Boot REST backend and PostgreSQL.",
    features: [
      "Experience discovery with location-based filtering and maps",
      "Guide profile pages with verified credentials and reviews",
      "Booking system with date selection and participant management",
      "Social feed for sharing post-adventure stories and photos",
      "Rating and review system for experiences and guides",
      "Admin moderation panel for guide verification",
    ],
    challenges: [
      "Implementing location-based search with bounding box queries in PostgreSQL",
      "Building a performant image upload pipeline for adventure galleries",
      "Designing a fair, fraud-resistant review system",
    ],
    learned: [
      "Geospatial queries with PostGIS extension",
      "Image optimization pipelines and lazy loading strategies",
      "Complex many-to-many booking relationships in JPA",
    ],
    stack:    ["Angular", "Spring Boot", "PostgreSQL", "Docker"],
    tags:     ["Travel", "Social", "Booking"],
    category: ["Angular", "Spring Boot"],
    arch: [
      { id: "fe",  label: "Angular",      tech: "Frontend",  color: "#dd0031" },
      { id: "api", label: "REST API",      tech: "Gateway",   color: "#8b5cf6" },
      { id: "be",  label: "Spring Boot",  tech: "Backend",   color: "#6db33f" },
      { id: "db",  label: "PostgreSQL",   tech: "Database",  color: "#336791" },
      { id: "ops", label: "Docker",       tech: "Deploy",    color: "#2496ed" },
    ],
    github:   "https://github.com/RaMiSaSSi",
    demo:     undefined,
    status:   "completed",
    featured: false,
    screenshots: [
      "/projects/aventurooo/1.svg",
      "/projects/aventurooo/2.svg",
      "/projects/aventurooo/3.svg",
      "/projects/aventurooo/4.svg",
      "/projects/aventurooo/5.svg",
      "/projects/aventurooo/6.svg",
    ],
  },
  {
    id:       "pr9auto",
    number:   "06",
    title:    "PR9Auto",
    subtitle: "Automotive Services & Garage Management System",
    description:
      "A full-stack web application for automotive garages — managing vehicle repairs, client appointments, spare parts inventory and real-time technician tracking.",
    role:     "Full-Stack Engineer (Angular + Spring Boot + PostgreSQL)",
    problem:
      "Small and medium automotive garages had no digital system to track ongoing repairs, manage parts inventory or give clients visibility into their vehicle status.",
    solution:
      "Developed a garage management platform with appointment scheduling, real-time repair tracking, parts inventory management and client notification system. Backend powered by Spring Boot with PostgreSQL, containerized using Docker Compose.",
    features: [
      "Client portal for appointment booking and vehicle status tracking",
      "Technician dashboard for repair order management",
      "Parts inventory system with low-stock alerts",
      "Real-time status updates via WebSocket",
      "Invoice generation and service history records",
      "Admin analytics dashboard for garage performance metrics",
    ],
    challenges: [
      "Real-time repair status synchronization between technicians and the client portal",
      "Complex inventory logic with automatic restocking triggers",
      "Designing a multi-role workflow where mechanics, receptionists and admins have distinct UX flows",
    ],
    learned: [
      "WebSocket implementation with Spring Boot for live UI updates",
      "Advanced PostgreSQL query optimization with JPA native queries",
      "Role-based UI rendering patterns in Angular",
    ],
    stack:    ["Angular", "Spring Boot", "PostgreSQL", "WebSocket", "Docker"],
    tags:     ["Automotive", "Full-Stack", "Real-Time", "Freelance"],
    category: ["Angular", "Spring Boot"],
    arch: [
      { id: "fe",  label: "Angular",      tech: "Frontend",   color: "#dd0031" },
      { id: "ws",  label: "WebSocket",    tech: "Real-Time",  color: "#f59e0b" },
      { id: "be",  label: "Spring Boot",  tech: "Backend",    color: "#6db33f" },
      { id: "db",  label: "PostgreSQL",   tech: "Database",   color: "#336791" },
      { id: "ops", label: "Docker",       tech: "Container",  color: "#2496ed" },
    ],
    github:   "https://github.com/RaMiSaSSi",
    demo:     undefined,
    status:   "completed",
    featured: false,
    screenshots: [
      "/projects/pr9auto/1.svg",
      "/projects/pr9auto/2.svg",
      "/projects/pr9auto/3.svg",
      "/projects/pr9auto/4.svg",
      "/projects/pr9auto/5.svg",
      "/projects/pr9auto/6.svg",
    ],
  },
  {
    id:       "esprit-united",
    number:   "07",
    title:    "EspritUnited",
    subtitle: "",
    description: "",
    role:     "Full-Stack Engineer (Spring Boot + Angular)",
    problem:  "",
    solution: "",
    features: [],
    challenges: [],
    learned:  [],
    stack:    ["Spring Boot", "Angular"],
    tags:     ["Full-Stack", "Alternance", "DevFlowStudio"],
    category: ["Angular", "Spring Boot"],
    arch: [
      { id: "fe", label: "Angular",     tech: "Frontend", color: "#dd0031" },
      { id: "be", label: "Spring Boot", tech: "Backend",  color: "#6db33f" },
    ],
    github:   "https://github.com/RaMiSaSSi",
    demo:     undefined,
    status:   "completed",
    featured: false,
    screenshots: [
      "/projects/esprit-united/1.svg",
      "/projects/esprit-united/2.svg",
      "/projects/esprit-united/3.svg",
      "/projects/esprit-united/4.svg",
      "/projects/esprit-united/5.svg",
      "/projects/esprit-united/6.svg",
    ],
  },
  {
    id:       "workspot",
    number:   "08",
    title:    "Workspot",
    subtitle: "",
    description: "",
    role:     "Full-Stack Engineer (Spring Boot + Angular + PWA)",
    problem:  "",
    solution: "",
    features: [],
    challenges: [],
    learned:  [],
    stack:    ["Spring Boot", "Angular", "PWA"],
    tags:     ["Full-Stack", "Freelance"],
    category: ["Angular", "Spring Boot"],
    arch: [
      { id: "fe",  label: "Angular",     tech: "Frontend",   color: "#dd0031" },
      { id: "pwa", label: "PWA",         tech: "App",        color: "#8b5cf6" },
      { id: "be",  label: "Spring Boot", tech: "Backend",    color: "#6db33f" },
    ],
    github:   "https://github.com/RaMiSaSSi",
    demo:     undefined,
    status:   "completed",
    featured: false,
    screenshots: [
      "/projects/workspot/1.svg",
      "/projects/workspot/2.svg",
      "/projects/workspot/3.svg",
      "/projects/workspot/4.svg",
      "/projects/workspot/5.svg",
      "/projects/workspot/6.svg",
    ],
  },
  {
    id:       "export-afrique",
    number:   "09",
    title:    "ExportAfrique",
    subtitle: "",
    description: "",
    role:     "Full-Stack Engineer (Express + Angular)",
    problem:  "",
    solution: "",
    features: [],
    challenges: [],
    learned:  [],
    stack:    ["Express", "Angular"],
    tags:     ["Full-Stack", "DevFlowStudio"],
    category: ["Angular", "Node.js"],
    arch: [
      { id: "fe", label: "Angular", tech: "Frontend", color: "#dd0031" },
      { id: "be", label: "Express", tech: "Backend",  color: "#339933" },
    ],
    github:   "https://github.com/RaMiSaSSi",
    demo:     undefined,
    status:   "completed",
    featured: false,
    screenshots: [
      "/projects/export-afrique/1.svg",
      "/projects/export-afrique/2.svg",
      "/projects/export-afrique/3.svg",
      "/projects/export-afrique/4.svg",
      "/projects/export-afrique/5.svg",
      "/projects/export-afrique/6.svg",
    ],
  },
  {
    id:       "pointage-app",
    number:   "10",
    title:    "pointageApp",
    subtitle: "",
    description: "",
    role:     "Full-Stack Engineer (Python + React)",
    problem:  "",
    solution: "",
    features: [],
    challenges: [],
    learned:  [],
    stack:    ["Python", "React"],
    tags:     ["Full-Stack", "Freelance"],
    category: ["React", "Python"],
    arch: [
      { id: "fe", label: "React",  tech: "Frontend", color: "#61dafb" },
      { id: "be", label: "Python", tech: "Backend",  color: "#3776ab" },
    ],
    github:   "https://github.com/RaMiSaSSi",
    demo:     undefined,
    status:   "completed",
    featured: false,
    screenshots: [
      "/projects/pointage-app/1.svg",
      "/projects/pointage-app/2.svg",
      "/projects/pointage-app/3.svg",
      "/projects/pointage-app/4.svg",
      "/projects/pointage-app/5.svg",
      "/projects/pointage-app/6.svg",
    ],
  },
  
  {
    id:       "cobeez",
    number:   "11",
    title:    "CoBeez",
    subtitle: "Formation & Coworking Management Platform",
    description:
      "A SaaS platform for managing professional training programs and coworking spaces — handling members, bookings, formations and AI-assisted communication.",
    role:     "Full-Stack Engineer (Angular + Spring Boot + Python/Rasa)",
    problem:
      "Training centers and coworking spaces relied on manual spreadsheets and phone calls to manage bookings, member subscriptions, and formation schedules — causing errors and poor user experience.",
    solution:
      "Built a full SaaS platform with a reactive Angular frontend, a Spring Boot REST API backend and a Python/Rasa AI chatbot for automated member support. Secured with JWT and Spring Security, containerized with Docker.",
    features: [
      "Multi-role dashboard for admins, trainers and members",
      "Formation catalog with booking and enrollment management",
      "Coworking space reservation system with availability calendars",
      "Integrated Rasa AI chatbot for instant member support",
      "PDF report generation and email notifications",
      "JWT-based authentication with role-based access control",
    ],
    challenges: [
      "Designing a multi-tenant data model supporting both formations and coworking in one platform",
      "Integrating the Python/Rasa chatbot with the Spring Boot backend via REST webhooks",
      "Building a performant Angular calendar component for real-time availability",
    ],
    learned: [
      "Multi-module Spring Boot architecture for domain separation",
      "Rasa NLU training pipeline and webhook integration patterns",
      "Angular reactive forms and complex state management with RxJS",
    ],
    stack:    ["Angular", "Spring Boot", "PostgreSQL", "Python / Rasa", "Docker", "JWT"],
    tags:     ["SaaS", "Full-Stack", "AI Chatbot"],
    category: ["Angular", "Spring Boot"],
    arch: [
      { id: "fe",  label: "Angular 19",    tech: "Frontend",    color: "#dd0031" },
      { id: "api", label: "REST API",       tech: "Gateway",     color: "#8b5cf6" },
      { id: "be",  label: "Spring Boot",   tech: "Backend",     color: "#6db33f" },
      { id: "ai",  label: "Rasa / Python", tech: "AI Service",  color: "#3776ab" },
      { id: "db",  label: "PostgreSQL",    tech: "Database",    color: "#336791" },
      { id: "ops", label: "Docker",        tech: "Container",   color: "#2496ed" },
    ],
    github:   "https://github.com/RaMiSaSSi",
    demo:     undefined,
    status:   "completed",
    featured: false,
    screenshots: [
      "/projects/cobeez/1.svg",
      "/projects/cobeez/2.svg",
      "/projects/cobeez/3.svg",
      "/projects/cobeez/4.svg",
      "/projects/cobeez/5.svg",
      "/projects/cobeez/6.svg",
    ],
  },
  
];

export const projectCategories = ["All", "Angular", "Spring Boot", "Node.js", "React", "React Native", "Python"];

// ─────────────────────────────────────────────────────────────────────────────
//  Experience
// ─────────────────────────────────────────────────────────────────────────────
export type Experience = {
  id:          string;
  company:     string;
  role:        string;
  period:      string;
  location:    string;
  type:        "alternance" | "internship" | "project";
  description: string[];
  tech:        string[];
};

export const experiences: Experience[] = [
  {
    id: "dev-flow-studio",
    role: "Full Stack Developer",
    company: "Dev Flow Studio",
    type: "project",
    period: "Jun. 2025 — Jun. 2026",
    location: "Tunis, Tunisia",
    description: [
      "Aventuroo — Built a tourist activity booking and car rental platform with Angular, Spring Boot and PostgreSQL, including client-facing and admin interfaces (bookings, calendars, vehicle availability).",
      "Amatun Shop — Developed a multi-vendor e-commerce platform with Angular, Spring Boot and PostgreSQL, covering product, order and payment management plus an admin dashboard, with REST API design integrated into a fullstack architecture.",
      "Amatun Delivery & Delivery App — Built a real-time delivery management and tracking platform, including order management, delivery status and courier assignment modules, plus a mobile app for couriers with live geolocation and order tracking.",
      "ExportAfrique — Developed with Express and Angular.",
      "EspritUnited — Alternance project between ESPRIT and DevFlowStudio, built with Spring Boot and Angular.",
    ],
    tech: ["Angular", "Spring Boot", "PostgreSQL", "React Native", "Express", "REST APIs"],
  },
  {
    id: "mynds-cobeez",
    role: "Final Year Internship — Developer",
    company: "MYNDS-COBEEZ",
    type: "internship",
    period: "Feb. — May 2025",
    location: "Tunisia",
    description: [
      "Developed a training center and coworking space management platform with Angular, Spring Boot and PostgreSQL.",
      "Integrated an intelligent chatbot using Python and Rasa to answer user questions based on platform data.",
    ],
    tech: ["Angular", "Spring Boot", "PostgreSQL", "Python", "Rasa"],
  },
  {
    id: "cni",
    role: "Advanced Internship",
    company: "Centre National de l'Informatique, Tunis",
    type: "internship",
    period: "Jan. — Feb. 2024",
    location: "Tunis, Tunisia",
    description: [
      "Developed a custom website with PHP, HTML5, CSS and JavaScript, from design through feature implementation and content integration.",
      "Collaborated with the development team throughout the project lifecycle.",
    ],
    tech: ["PHP", "HTML5", "CSS", "JavaScript"],
  },
  {
    id: "best-info",
    role: "Introductory Internship",
    company: "BEST INFO",
    type: "internship",
    period: "Jan. — Feb. 2023",
    location: "Tunisia",
    description: [
      "Discovered the internal workings and processes of a software development company, including analysis of client interactions.",
    ],
    tech: [],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Education
// ─────────────────────────────────────────────────────────────────────────────
export type Education = {
  id:          string;
  institution: string;
  degree:      string;
  field:       string;
  period:      string;
  location?:   string;
  description: string;
  grade?:      string;
};

export const education: Education[] = [
  {
    id: "esprit",
    degree: "Engineering Cycle",
    field: "Software Engineering (Alternance)",
    institution: "ESPRIT",
    period: "2025 — Present",
    description:
      "Work-study engineering program in software engineering, combining academic coursework with hands-on professional experience in alternance at DevFlowStudio.",
    grade: "",
  },
  {
    id: "iset-rades",
    degree: "Licence",
    field: "Information Technology",
    institution: "ISET Radès",
    period: "2022 — 2025",
    description:
      "Bachelor's degree focused on information technology fundamentals and applied development.",
    grade: "",
  },
  {
    id: "bac",
    degree: "Baccalauréat",
    field: "Computer Science",
    institution: "Lycée Secondaire Bardo",
    period: "2021 — 2022",
    description: "High school diploma with a specialization in computer science.",
    grade: "",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Engineering pipeline steps  (for the "Beyond the UI" section)
// ─────────────────────────────────────────────────────────────────────────────
export type PipelineStep = {
  id:          string;
  phase:       string;
  label:       string;
  description: string;
  tools:       string[];
  color:       string;
};

export const pipelineSteps: PipelineStep[] = [
  {
    id:          "design",
    phase:       "01",
    label:       "Design",
    description: "Architecture planning, data modeling and API contract definition before writing a single line of code.",
    tools:       ["System diagrams", "OpenAPI spec", "DB schema"],
    color:       "#b3541e",
  },
  {
    id:          "develop",
    phase:       "02",
    label:       "Develop",
    description: "Full-stack implementation with clean code principles, SOLID patterns and thorough unit testing.",
    tools:       ["Spring Boot", "Angular", "TypeScript", "JUnit"],
    color:       "#e8482b",
  },
  {
    id:          "integrate",
    phase:       "03",
    label:       "Integrate",
    description: "CI pipeline configuration, automated testing gates and integration test suites.",
    tools:       ["GitHub Actions", "Docker Build", "Integration tests"],
    color:       "#d9a441",
  },
  {
    id:          "containerize",
    phase:       "04",
    label:       "Containerize",
    description: "Multi-stage Docker builds and Docker Compose orchestration for consistent environments.",
    tools:       ["Docker", "Docker Compose", "Multi-stage builds"],
    color:       "#a3a04e",
  },
  {
    id:          "deploy",
    phase:       "05",
    label:       "Deploy",
    description: "Automated deployment pipelines targeting Linux servers with Nginx as reverse proxy.",
    tools:       ["Nginx", "Linux", "SSH deploys", "GitHub Actions"],
    color:       "#3f8f7f",
  },
  {
    id:          "monitor",
    phase:       "06",
    label:       "Monitor",
    description: "Logging, health checks and application monitoring to ensure production reliability.",
    tools:       ["Spring Actuator", "Log aggregation", "Health checks"],
    color:       "#c96f4a",
  },
];
