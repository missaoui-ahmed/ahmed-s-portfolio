import documentImage from "@/assets/project-document.jpg";
import booksImage from "@/assets/project-books.jpg";
import platformImage from "@/assets/project-platform.jpg";
import robotImage from "@/assets/project-robot.jpg";

export const contact = {
  email: "missaouiiahmed@gmail.com",
  linkedin: "https://linkedin.com/in/ahmed-missaoui",
  github: "https://github.com/missaoui-ahmed",
};

export const navigation = [
  ["About", "about"], ["Experience", "experience"], ["Skills", "skills"],
  ["Projects", "projects"], ["Education", "education"], ["Contact", "contact"],
] as const;

export const services = [
  { number: "01", title: "Full-Stack Development", description: "Building complete web applications, from frontend interfaces to backend APIs and databases.", tags: ["React", "Angular", "FastAPI", "REST APIs", "PostgreSQL"] },
  { number: "02", title: "AI Engineering", description: "Working with retrieval, embeddings, RAG, recommendation systems and computer vision.", tags: ["RAG", "ColPali", "Embeddings", "Prompt Engineering", "OpenCV"] },
  { number: "03", title: "Backend & Systems", description: "Developing APIs, authentication and data systems with deployment and monitoring tools.", tags: ["Python", "FastAPI", "Qdrant", "Docker", "Prometheus"] },
];

export const experience = [
  { role: "AI Full-Stack Developer Intern", organization: "Vermeg", location: "Tunisia", period: "Feb 2026 — Jun 2026", description: "Developed a full-stack AI document extraction platform using React (Vite), FastAPI and a multi-agent RAG architecture. Implemented OCR-free document understanding with ColPali, semantic chunking and hybrid retrieval combining BM25, dense retrieval and reciprocal rank fusion.", tags: ["React", "FastAPI", "RAG", "ColPali", "Qdrant", "PostgreSQL"] },
  { role: "Web Development Intern", organization: "Euro Tech Conseil", location: "Kairouan, Tunisia", period: "Aug 2025", description: "Developed an Angular and FastAPI web application with an AI-based book recommendation system combining user preferences and text-based techniques. Optimized the database schema and backend services.", tags: ["Angular", "FastAPI", "Recommendation Systems"] },
  { role: "Full-Stack Developer", organization: "ATPU — Association Tunisienne de Progrès Universitaire", location: "ISSATso, Sousse, Tunisia", period: "Jul 2025 — Sep 2025", description: "Implemented membership, renewal and event registration modules, administrative dashboards with financial reporting and PDF/Excel exports, and authenticated REST APIs with relational database integration.", tags: ["FastAPI", "REST APIs", "Reporting", "PDF / Excel"] },
  { role: "Final-Year Project Intern — Robotics Developer", organization: "Euro Tech Conseil", location: "Kairouan, Tunisia", period: "Feb 2023 — May 2023", description: "Developed an intelligent reception robot prototype using Python and Raspberry Pi, integrating face recognition, voice commands and object detection with OpenCV.", tags: ["Python", "Raspberry Pi", "OpenCV"] },
];

export const skills = [
  { title: "Programming", items: ["Python", "JavaScript", "TypeScript", "SQL", "C", "C++", ".NET"] },
  { title: "Frontend & Backend", items: ["React", "Vite", "Angular", "FastAPI", "REST APIs", "JWT"] },
  { title: "Artificial Intelligence", items: ["RAG", "ColPali", "OCR", "Embeddings", "Semantic Chunking", "Multi-Agent Systems", "Prompt Engineering", "TensorFlow", "PyTorch", "scikit-learn", "OpenCV"] },
  { title: "Data & Storage", items: ["PostgreSQL", "Qdrant", "MySQL", "MariaDB", "SQLite", "Pandas", "Matplotlib"] },
  { title: "Infrastructure & Reporting", items: ["Docker", "Prometheus", "Grafana", "Excel Exports", "PDF Exports"] },
];

export const projects = [
  { slug: "document-intelligence", title: "AI Document Intelligence Platform", category: "AI / RAG / Full-Stack", description: "A full-stack AI document extraction platform combining a React interface with multi-agent RAG and OCR-free document understanding.", image: documentImage, alt: "Conceptual illustration of documents passing through a data processing pipeline", tags: ["React", "FastAPI", "RAG", "ColPali", "Qdrant", "PostgreSQL"], context: "Developed during an AI Full-Stack Developer internship at Vermeg.", contribution: "Developed the platform with React (Vite) and FastAPI. Implemented ColPali-based OCR-free understanding, embeddings, semantic chunking, prompt engineering and hybrid retrieval combining BM25, dense retrieval and reciprocal rank fusion.", implementation: "The environment included Qdrant, PostgreSQL, REST APIs, JWT authentication, Docker, Prometheus and Grafana.", architecture: ["PDF documents", "Document processing", "Semantic chunking", "Embeddings", "Hybrid retrieval", "Multi-agent RAG", "Information extraction", "Structured output"] },
  { slug: "book-recommendation", title: "AI Book Recommendation System", category: "AI / Full-Stack", description: "A web application combining user preferences with text-based recommendation techniques.", image: booksImage, alt: "Conceptual illustration of books linked by recommendation paths", tags: ["Angular", "FastAPI", "Recommendation Systems", "REST APIs"], context: "Developed during a web development internship at Euro Tech Conseil.", contribution: "Developed the Angular and FastAPI application and its AI-based recommendation system. Optimized the database schema and backend services for data retrieval and scalability.", implementation: "The recommendation approach combined user preferences with text-based techniques." },
  { slug: "atpu-management", title: "ATPU Management Platform", category: "Full-Stack / Management", description: "A platform for membership, renewals, event registration, reporting and document exports.", image: platformImage, alt: "Conceptual illustration of organized records and reporting panels", tags: ["FastAPI", "REST APIs", "Authentication", "PDF / Excel"], context: "Developed for ATPU — Association Tunisienne de Progrès Universitaire.", contribution: "Implemented membership management, renewals and event registration modules; administrative dashboards with financial reporting and PDF/Excel exports; and secure authenticated REST APIs.", implementation: "Integrated relational database support for the platform." },
  { slug: "reception-robot", title: "Intelligent Reception Robot", category: "Robotics / Computer Vision", description: "A reception robot prototype integrating computer vision, voice commands and object detection.", image: robotImage, alt: "Conceptual illustration of a Raspberry Pi board and camera module", tags: ["Python", "Raspberry Pi", "OpenCV", "Computer Vision"], context: "Developed as a final-year project internship at Euro Tech Conseil.", contribution: "Developed a functional prototype using Python and Raspberry Pi, integrating face recognition, voice commands and object detection with OpenCV.", implementation: "Delivered technical documentation and a deployment setup." },
];

export const education = [
  { degree: "National Engineering Degree in Software Engineering", school: "University of Sousse — ISSATso", period: "2023 — 2026" },
  { degree: "Bachelor's Degree in Computer Engineering", school: "University of Kairouan — ISMAIK", period: "2020 — 2023" },
  { degree: "Baccalaureate in Mathematics", school: "Ibn Jazzar High School, Kairouan", period: "2019 — 2020" },
];

export const certifications = [
  "Fundamentals of Deep Learning",
  "Transformer-Based Natural Language Processing Applications",
  "Generative AI with Diffusion Models",
];
