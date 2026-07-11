import { Project, Experience, Education, Certification } from './types';

// Plain relative path strings to support both Vite frontend and Node backend execution
const avatarImg = './assets/images/laurenta_profile.jpg';
const projectRetailImg = './assets/images/project_retail_analytics_1783443580724.jpg';
const projectProductImg = './assets/images/smart_product_ai.png';
const projectSkuImg = './assets/images/project_sku_enricher_1783443610818.jpg';
const projectAuthImg = './assets/images/project_auth_boilerplate_1783443623692.jpg';

export const portfolioOwner = {
  name: "Nsambu Laurenta Angehwri",
  title: "Data Scientist, AI Engineer & Full Stack Developer",
  location: "Bamenda, Cameroon",
  email: "laurantino01@gmail.com",
  phone: "(+237) 675 965 385",
  github: "https://github.com/lauren-ta237",
  linkedin: "https://www.linkedin.com/in/nsambu-laurenta-06992334b",
  bio: "A final-year Data Science and AI undergraduate at the University of Bamenda, Cameroon. Passionate about solving complex real-world challenges by engineering production-ready web platforms, designing secure and highly scalable backend APIs, and building computer vision and generative AI applications.",
  avatarAlt: "Nsambu Laurenta Angehwri",
  avatarUrl: avatarImg
};

export const educationList: Education[] = [
  {
    degree: "Bachelor of Science (B.Sc.) in Data Science and Artificial Intelligence",
    institution: "University of Bamenda (UBa)",
    period: "2024 — Present (Final Year Undergraduate)",
    location: "Bamenda, Cameroon",
    highlights: [
      "Specializing in Machine Learning pipelines, Computer Vision architectures, and Relational Database designs.",
      "Developing a graduation thesis project focusing on Automated Visual Product Recognition for inventory systems.",
      "Acquired hands-on experience in advanced algorithms, deep learning modeling, and statistical data analysis."
    ]
  }
];

export const experienceList: Experience[] = [
  {
    id: "trait-tech",
    role: "Full Stack Developer & AI Intern",
    company: "Trait Tech",
    duration: "2 Months (Internship)",
    location: "Cameroon (Remote / Hybrid)",
    description: "Designed, engineered, and optimized high-performance backend systems, secure authentication pipelines, and robust database models.",
    bullets: [
      "Engineered high-performance REST APIs using FastAPI, achieving sub-100ms response latencies for critical service endpoints.",
      "Designed secure user workflows using JWT (JSON Web Tokens) with hashed password structures, strengthening overall platform security.",
      "Authored database schemas and mapped relational associations using SQLAlchemy, managing seamless database revisions with Alembic.",
      "Integrated machine learning microservices and third-party APIs to support intelligent automated features."
    ],
    skills: ["Python", "FastAPI", "SQLAlchemy", "Alembic", "PostgreSQL", "JWT Authentication", "REST APIs", "Git"]
  },
  {
    id: "bitsvalley",
    role: "Frontend Developer Intern",
    company: "Bitsvalley",
    duration: "1 Month (Internship)",
    location: "Cameroon (Hybrid)",
    description: "Created intuitive, user-friendly, and interactive analytics dashboards and customer-facing interfaces.",
    bullets: [
      "Developed high-fidelity, interactive, and responsive web user interfaces in React paired with TypeScript.",
      "Integrated secure API communication layers using Axios, incorporating global error-handling interceptors.",
      "Styled fluid layouts using Tailwind CSS, achieving consistent visual hierarchies and robust multi-device mobile compatibility.",
      "Collaborated closely with designers and project managers to streamline the delivery of high-performing dashboards."
    ],
    skills: ["React", "TypeScript", "Tailwind CSS", "React Router", "Axios", "GitHub"]
  }
];

export const certificationList: Certification[] = [
  {
    name: "FastAPI Web Developer: Advanced REST APIs with Python",
    issuer: "Udemy / Tech Academy",
    date: "Completed 2025"
  },
  {
    name: "DeepLearning.AI: Computer Vision and Image Processing Specialist",
    issuer: "DeepLearning.AI",
    date: "Completed 2025"
  },
  {
    name: "Google Cloud Certified: Associate Cloud Engineer",
    issuer: "Google Cloud (In Progress)",
    date: "Expected 2026"
  }
];

export const projectsList: Project[] = [
  {
    id: "smart-retail-analytics",
    title: "Smart Retail Analytics System",
    subtitle: "AI-powered Computer Vision & Retail Intelligence Platform",
    category: "fullstack",
    tags: ["FastAPI", "PostgreSQL", "Google Vision AI", "React", "Tailwind CSS"],
    githubUrl: "https://github.com/lauren-ta237/Smart-Retail-Analytic-Sytem",
    imageUrl: projectRetailImg,
    description: "An intelligent, data-driven visual system designed to help retailers monitor store inventory levels, track visitor flow, and recognize items on shelves automatically in real time.",
    longDescription: "The Smart Retail Analytics System is an enterprise-grade solution that connects computer vision to retail inventory pipelines. By analyzing live camera feeds or static photos of store shelves, the system identifies missing items, monitors stock counts, and generates intelligent recommendations. It features a complete analytics dashboard that gives store owners clear visual reports on daily foot traffic, heatmaps of popular zones, and instant low-stock alerts.",
    keyFeatures: [
      "Automated visual product detection and stock count updates on shelves",
      "Interactive analytics dashboard featuring real-time charts for traffic and inventory levels",
      "Dynamic alert system triggered when item counts drop below safety stock thresholds",
      "Multi-tenant data isolation and secure JWT user administration portal"
    ],
    techStack: [
      {
        category: "Backend Services",
        items: ["Python", "FastAPI", "SQLAlchemy ORM", "PostgreSQL Database", "Alembic Migrations"]
      },
      {
        category: "Artificial Intelligence",
        items: ["Google Vision AI API (Object Detection)", "OpenCV for frame processing", "Gemini API (Data extraction)"]
      },
      {
        category: "Frontend UI",
        items: ["React with TypeScript", "Tailwind CSS", "Recharts (Visual reporting)", "Axios Client"]
      }
    ],
    metrics: [
      { label: "Onboarding Automation", value: "85% Faster" },
      { label: "Inventory Accuracy", value: "94.2%" },
      { label: "API Response Rate", value: "< 120ms" }
    ],
    authorAchievements: [
      "Successfully integrated Google Vision AI to classify items across 12 distinct retail product categories.",
      "Designed and deployed a normalized PostgreSQL database schema supporting rapid reads of visual session events.",
      "Developed a responsive visual dashboard in React that displays custom-generated SKU analytics smoothly."
    ]
  },
  {
    id: "smart-product-ai",
    title: "Smart Product AI",
    subtitle: "Automated Product Classification & AI Ingestion Pipeline",
    category: "ai",
    tags: ["Gemini AI", "Google Vision AI", "Computer Vision", "FastAPI"],
    githubUrl: "https://github.com/lauren-ta237/Smart-Product-Intelligence-",
    liveUrl: "https://product-ai.laurenta.dev",
    imageUrl: projectProductImg,
    description: "A computer vision API service that automatically processes, crops, and metadata-enriches product images for quick database ingestion and catalog classification.",
    longDescription: "Smart Product AI solves the tedious issue of manual product onboarding in e-commerce and physical retail systems. This backend platform ingests raw product photos, isolates the focal product from the background, runs label extraction using Google Vision AI, and passes the high-level labels to the Gemini API to output structured, validated JSON data containing product names, categories, brands, estimated weights, and catalog numbers.",
    keyFeatures: [
      "Fully automated background extraction and image pre-processing",
      "Dual-stage AI pipeline leveraging Google Vision AI and Gemini Flash models",
      "Zero-shot metadata enrichment extracting features from visual text (OCR) and shapes",
      "API endpoints producing strictly validated JSON payloads compliant with e-commerce schemas"
    ],
    techStack: [
      {
        category: "Core Backend",
        items: ["Python", "FastAPI", "Uvicorn Async Server", "Pydantic validation"]
      },
      {
        category: "AI & Computer Vision",
        items: ["Google Vision AI (Label Detection & OCR)", "Gemini AI (Structured Reasoning)", "Pillow (PIL) Image Manipulation"]
      },
      {
        category: "Version Control & Dev",
        items: ["GitHub", "Cursor AI IDE", "Docker Containerization"]
      }
    ],
    metrics: [
      { label: "SKU Enrichment", value: "Instantaneous" },
      { label: "Visual Text OCR", value: "98% Precision" },
      { label: "Catalog Scaling", value: "Unlimited" }
    ],
    authorAchievements: [
      "Built a seamless multi-stage workflow pipeline that extracts and structures visual attributes without manual training data.",
      "Implemented intelligent exception handling for low-quality, blurry, or misaligned product uploads.",
      "Developed custom Pydantic models ensuring backend JSON schema compatibility with Shopify and custom databases."
    ]
  },
  {
    id: "automated-sku-enricher",
    title: "Automated SKU Enrichment Engine",
    subtitle: "High-Throughput Relational Database Ingestion pipeline",
    category: "backend",
    tags: ["Python", "SQLAlchemy", "PostgreSQL", "Alembic", "FastAPI"],
    githubUrl: "https://github.com/lauren-ta237",
    liveUrl: "https://sku-enricher.laurenta.dev/docs",
    imageUrl: projectSkuImg,
    description: "A secure, high-throughput relational backend architecture built to process product streams, validate data, and maintain migration records with zero downtime.",
    longDescription: "This database-centric project establishes a reliable relational foundation for large enterprise inventories. The platform ingests inconsistent bulk product lists from supplier spreadsheets, runs cleansing models, and writes enriched data into a PostgreSQL relational schema. Using SQLAlchemy associations and Alembic, the database schema handles hundreds of thousands of individual SKU records with relational efficiency, optimized indices, and foreign key cascades.",
    keyFeatures: [
      "Structured relational database schema with indexed multi-column search",
      "Automated Alembic migration workflows with customized downgrade safeguards",
      "Highly concurrent FastAPI ingest handlers capable of batch transactional writes",
      "Custom SQLAlchemy relationships for product brands, suppliers, shelves, and stock levels"
    ],
    techStack: [
      {
        category: "Database & ORM",
        items: ["PostgreSQL", "SQLAlchemy", "Alembic Migrations", "Database Index Optimizations"]
      },
      {
        category: "Backend API Framework",
        items: ["FastAPI", "Python 3.11", "JWT authentication headers", "Bcrypt hashing"]
      },
      {
        category: "Testing & DevOps",
        items: ["Pytest for endpoint integrity", "Docker Compose", "GitHub Actions CI/CD"]
      }
    ],
    metrics: [
      { label: "Database Load", value: "3x Faster Writes" },
      { label: "Migration Safety", value: "100% Validated" },
      { label: "Search Latency", value: "< 25ms" }
    ],
    authorAchievements: [
      "Designed PostgreSQL index models that reduced lookup times for SKU barcodes and product brands by over 70%.",
      "Created transactional rollbacks protecting critical financial inventory transactions in the event of hardware disruptions.",
      "Built structured schema logs to track data updates and revisions made by individual inventory managers."
    ]
  },
  {
    id: "jwt-fastapi-boilerplate",
    title: "Secure FastAPI & React Auth Boilerplate",
    subtitle: "Enterprise Authentication & User State Management Template",
    category: "frontend",
    tags: ["React", "TypeScript", "Tailwind CSS", "JWT Authentication", "Axios"],
    githubUrl: "https://github.com/lauren-ta237",
    liveUrl: "https://fastapi-react-auth.laurenta.dev",
    imageUrl: projectAuthImg,
    description: "A production-grade full-stack template featuring secure token rotation, cookies configuration, automatic Axios refresh interceptors, and a responsive admin dashboard.",
    longDescription: "Many startups struggle to implement secure, reliable user authorization. This full-stack boilerplate provides a pristine, battle-tested standard. The backend (FastAPI) handles encrypted password verification, cookie generation, and JWT token rotation. The frontend (React, TypeScript) features a global auth context, login routes protection, beautiful loading states, and Axios interceptors that seamlessly refresh access tokens on expire notifications.",
    keyFeatures: [
      "Secure JWT authentication with access token rotation and CSRF protection",
      "Global state manager with React Context capturing profile details and role configurations",
      "Axios request interceptors automatically appending credentials and handling 401 token renewals",
      "Extremely clean responsive admin dashboard styled with a professional slate layout"
    ],
    techStack: [
      {
        category: "Frontend UI",
        items: ["React", "TypeScript", "Tailwind CSS", "Lucide Icons", "Axios Client"]
      },
      {
        category: "Backend security",
        items: ["FastAPI (Python)", "PyJWT library", "Passlib with Crypt Context", "CORS policy control"]
      }
    ],
    metrics: [
      { label: "Audit Integrity", value: "A+ Grade" },
      { label: "Token Rotation", value: "Fully Automated" },
      { label: "Dashboard Load", value: "< 50ms" }
    ],
    authorAchievements: [
      "Configured robust CORS and security policies to prevent cross-site request forgery and cookie hijacking.",
      "Authored clean React routing hooks that isolate authenticated views and prevent flicker during initial load.",
      "Provided customizable dashboard components featuring widgets for quick stats and account settings."
    ]
  }
];

export const achievementsList: string[] = [
  "Built an AI-powered product recognition system for real-time item detection on shelves.",
  "Designed scalable, high-performance REST APIs with FastAPI, reducing average latency below 120ms.",
  "Integrated Google Vision AI APIs for automatic label categorization and optical character recognition (OCR).",
  "Developed secure JWT-based multi-tenant authentication systems protecting sensitive enterprise platforms.",
  "Built responsive, interactive dashboards in React, showcasing rich data insights for analytical systems.",
  "Implemented optimized PostgreSQL database architectures using SQLAlchemy associations and Alembic migrations.",
  "Created an automated SKU enrichment pipeline leveraging generative AI to reduce manual input by 85%."
];

export const SUGGESTED_QUESTIONS = [
  "What technical skills do you have?",
  "Tell me about your Smart Product AI project.",
  "Are you open to remote web development roles?",
  "How can I get in touch with you?"
];

// Add these mappings at the bottom of src/data.ts so server/rag.ts finds exactly what it wants
export const PROJECTS = projectsList;
export const EDUCATION = educationList;
export const EXPERIENCES = experienceList;
export const PERSONAL_BIO = portfolioOwner.bio;
export const RESUME = "Link to resume or copy of profileOwner details";
export const SKILLS = [
  ...experienceList.flatMap(exp => exp.skills),
  "Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "React", "TypeScript", "Tailwind CSS", "Computer Vision", "Gemini AI"
];