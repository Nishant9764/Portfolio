import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./Projects.module.css";

const projects = [
  {
    id: 1,
    title: "Event Judging Management System",
    description:
      "Full-stack role-based event management system built to streamline school event coordination for 1000+ students, enabling automated student assignment, real-time scoring, and centralized result processing.",
    tech: ["Node.js", "Express", "MySQL", "EJS", "JWT", "Docker"],
    github: "https://github.com/yourusername/event-judging-system",
    live: "",
    highlights: [
      "Role-based Admin & Judge access",
      "Secure JWT authentication",
      "Auto student–judge assignment",
      "Real-time scoring dashboard",
      "Multi-judge score validation",
      "Auto result compilation",
      "Dockerized backend deployment",
    ],
    accent: "#06b6d4",
    num: "01",
  },
  {
    id: 2,
    title: "SmartCureX-Multi-Disease Prediction System",
    description:
      "AI-powered health prediction platform that analyzes medical inputs to detect risks for multiple diseases using ML &DL models.",
    tech: ["Python", "Flask", "Scikit-Learn", "Pandas", "React"],
    github: "https://github.com/yourusername/multidisease-predictor",
    live: null,
    highlights: [
      "End-to-end ML pipeline",
      "Multi-model disease prediction",
      "Flask inference API",
      "Real-time result visualization",
      "High-accuracy classification"
    ],
    accent: "#8b5cf6",
    num: "02",
  },  
  {
    id: 3,
    title: "Quiz Connect - Quiz Application",
    description:
      "Interactive quiz platform with timed questions, analytics, and dynamic scoring for students and learners.",
    tech: ["HTML", "CSS", "EJS", "MySql", "JWT", "Flask"],
    github: "https://github.com/yourusername/quiz-app",
    live: null,
    highlights: [
      "Timed quiz sessions",
      "Auto score calculation",
      "Admin question management",
      "JWT-secured user access"
    ],
    accent: "#10b981",
    num: "03",
  },  
  {
    id: 4,
    title: "NutrifyAI – Personalized Nutritionist",
    description:
      "AI-driven nutrition analysis system that predicts calorie intake, identifies food items, and generates personalized diet recommendations.",
    tech: ["Python", "Flask", "TensorFlow", "Pandas", "HTML", "CSS"],
    github: "https://github.com/yourusername/nutrify-ai",
    live: null,
    highlights: [
      "Food image recognition",
      "Calorie & nutrient estimation",
      "Personalized diet plans",
      "Flask ML inference"
    ],
    accent: "#f97316",
    num: "04",
  }  
];

function ProjectCard({ project, index, total }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Cards behind scale down and dim slightly
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0.6]
  );

  const CARD_OFFSET = 70; // px offset per stacked card
  const stickyTop = 90 + index * CARD_OFFSET;

  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      style={{
        position: "sticky",
        top: `${stickyTop}px`,
        scale,
        opacity,
        zIndex: index + 1,
      }}
    >
      {/* Accent bar */}
      <div
        className={styles.accentBar}
        style={{ background: project.accent }}
      />

      {/* Card body */}
      <div className={styles.cardBody}>
        {/* Left content */}
        <div className={styles.cardLeft}>
          <div className={styles.cardMeta}>
            <span className={styles.numBadge} style={{ color: project.accent }}>
              {project.num}
            </span>
            <h3 className={styles.cardTitle}>{project.title}</h3>
          </div>
          <p className={styles.cardDesc}>{project.description}</p>

          {/* Highlights */}
          <ul className={styles.highlights}>
            {project.highlights.map((h, i) => (
              <li key={i} className={styles.highlightItem}>
                <span
                  className={styles.check}
                  style={{ color: project.accent }}
                >
                  ✓
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Right content */}
        <div className={styles.cardRight}>
          {/* Tech badges */}
          <div className={styles.techStack}>
            {project.tech.map((t) => (
              <span
                key={t}
                className={styles.techBadge}
                style={{
                  borderColor: `${project.accent}40`,
                  color: project.accent,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className={styles.links}>
            <a
              href={project.github}
              className={styles.linkBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Code
            </a>
            {project.live && (
              <a
                href={project.live}
                className={`${styles.linkBtn} ${styles.linkBtnPrimary}`}
                style={{
                  background: `${project.accent}22`,
                  borderColor: `${project.accent}60`,
                  color: project.accent,
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className={styles.projects} id="projects" ref={sectionRef}>
      {/* Section Header */}
      <div className={styles.header}>
        <div className={styles.labelRow}>
          <span className={styles.label}>Featured Work</span>
          <div className={styles.progress}>
            <motion.div
              className={styles.progressFill}
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
        <h2 className={styles.title}>Selected Projects</h2>
        <p className={styles.subtitle}>
          Scroll to explore — cards stack as you go
        </p>

        {/* Decorative divider bridging header → cards */}
        <div className={styles.headerDivider}>
          <div className={styles.dividerDot} />
          <div className={styles.dividerDot} />
          <div className={styles.dividerDot} />
        </div>
      </div>

      {/* Card Stack */}
      <div className={styles.stack}>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
        {/* Spacer so the last card isn't flush against next section */}
        <div style={{ height: "60px" }} />
      </div>
    </section>
  );
}
