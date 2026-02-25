import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./Skills.module.css";

const skillCategories = [
  {
    title: "Backend",
    emoji: "⚙️",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(6,182,212,0.05))",
    border: "rgba(6,182,212,0.3)",
    skills: ["Python", "Node Js", "Flask", "REST APIs", "JWT Auth"],
  },
  {
    title: "Frontend",
    emoji: "🎨",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))",
    border: "rgba(139,92,246,0.3)",
    skills: ["React", "JavaScript", "HTML/CSS", "Framer Motion", "Responsive Design"],
  },
  {
    title: "Tools & DevOps",
    emoji: "🛠️",
    color: "#10b981",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))",
    border: "rgba(16,185,129,0.3)",
    skills: ["Git", "Excel", "PowerBI", "GCP", "Postman", "VS Code"],
  },
  {
    title: "Concepts",
    emoji: "🧠",
    color: "#f97316",
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(249,115,22,0.05))",
    border: "rgba(249,115,22,0.3)",
    skills: ["Clean Architecture", "SOLID Principles", "Database Design", "Testing", "REST Design"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.skills} id="skills" ref={ref}>
      <div className={styles.bg}>
        <div className={styles.bgOrb} />
      </div>

      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.labelRow}>
            <span className={styles.labelDash} />
            <span className={styles.label}>Technical Skills</span>
            <span className={styles.labelDash} />
          </div>
          <h2 className={styles.title}>My Toolkit</h2>
          <p className={styles.subtitle}>
            Technologies &amp; concepts I work with to craft reliable, scalable applications
          </p>
        </motion.div>

        {/* Skill Cards Grid */}
        <div className={styles.grid}>
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.title}
              className={styles.catCard}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.12 }}
              style={{ "--cat-color": cat.color, "--cat-border": cat.border, "--cat-grad": cat.gradient }}
              whileHover={{ y: -6 }}
            >
              {/* Card top */}
              <div className={styles.catTop}>
                <span className={styles.catEmoji}>{cat.emoji}</span>
                <h3 className={styles.catTitle}>{cat.title}</h3>
                <div className={styles.catLine} />
              </div>

              {/* Skills */}
              <div className={styles.skillsWrap}>
                {cat.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className={styles.skillPill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: catIndex * 0.1 + i * 0.06 }}
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
