import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./Education.module.css";

const education = [
    {
        degree: "Bachelor of Technology in Computer Science",
        institution: "Visvesvaraya Technological University (VTU)",
        location: "Bangalore, Karnataka",
        period: "2022 – 2026",
        grade: "8.7",
        gradeMax: "10",
        highlights: [
            "Specialized in Backend Development and Database Systems",
            "Final Year Project: MultiDisease Prediction using ML & DL — Grade: 98%",
            "Coursework: Data Structures, Algorithms, DBMS, Web Technologies",
            "Active member of Coding Club and Tech Society",
        ],
    },
];

export default function Education() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className={styles.education} id="education" ref={ref}>
            <div className={styles.bg}>
                <div className={styles.bgOrb1} />
                <div className={styles.bgOrb2} />
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
                        <span className={styles.label}>Education</span>
                        <span className={styles.labelDash} />
                    </div>
                    <h2 className={styles.title}>Academic Background</h2>
                </motion.div>

                {/* Card */}
                {education.map((edu, index) => (
                    <motion.div
                        key={index}
                        className={styles.card}
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Top gradient bar */}
                        <div className={styles.cardBar} />

                        {/* Card header */}
                        <div className={styles.cardHeader}>
                            <div className={styles.iconCircle}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                </svg>
                            </div>
                            <div className={styles.cardMeta}>
                                <h3 className={styles.degree}>{edu.degree}</h3>
                                <div className={styles.metaRow}>
                                    <span className={styles.institution}>{edu.institution}</span>
                                    <span className={styles.dot}>•</span>
                                    <span className={styles.location}>{edu.location}</span>
                                </div>
                            </div>
                            <div className={styles.periodBadge}>{edu.period}</div>
                        </div>

                        {/* CGPA visualizer */}
                        <div className={styles.gradeSection}>
                            <div className={styles.gradeLabel}>
                                <span>CGPA</span>
                                <span className={styles.gradeValue}>{edu.grade} / {edu.gradeMax}</span>
                            </div>
                            <div className={styles.gradeBar}>
                                <motion.div
                                    className={styles.gradeFill}
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: `${(parseFloat(edu.grade) / parseFloat(edu.gradeMax)) * 100}%` } : {}}
                                    transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                />
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className={styles.highlights}>
                            {edu.highlights.map((h, i) => (
                                <motion.div
                                    key={i}
                                    className={styles.highlightItem}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                                >
                                    <span className={styles.highlightDot} />
                                    <span>{h}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
