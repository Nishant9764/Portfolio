import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import styles from "./About.module.css";

const codeSnippet = [
  { type: "keyword", text: "class " },
  { type: "class", text: "Nishant" },
  { type: "text", text: ":" },
  { type: "newline" },
  { type: "indent" },
  { type: "keyword", text: "def " },
  { type: "fn", text: "__init__" },
  { type: "text", text: "(self):" },
  { type: "newline" },
  { type: "indent2" },
  { type: "string", text: 'self.role = "Full-Stack Developer"' },
  { type: "newline" },
  { type: "indent2" },
  { type: "string", text: 'self.focus = "Frontend, Backend & APIs"' },
  { type: "newline" },
  { type: "indent2" },
  { type: "string", text: 'self.passion = "Clean Architecture"' },
  { type: "newline" },
  { type: "indent" },
  { type: "keyword", text: "def " },
  { type: "fn", text: "build" },
  { type: "text", text: "(self, idea):" },
  { type: "newline" },
  { type: "indent2" },
  { type: "keyword", text: "return " },
  { type: "string", text: '"Scalable solution ✨"' },
];

const values = [
  {
    icon: "⚡",
    title: "Performance",
    desc: "Optimized systems that handle scale without breaking a sweat",
    gradient: "linear-gradient(135deg, #06b6d4, #0ea5e9)",
  },
  {
    icon: "🏗️",
    title: "Architecture",
    desc: "Clean, maintainable code that future-you will thank present-you for",
    gradient: "linear-gradient(135deg, #8b5cf6, #d946ef)",
  },
  {
    icon: "🔐",
    title: "Security",
    desc: "JWT, OAuth2, RBAC — because security is never an afterthought",
    gradient: "linear-gradient(135deg, #10b981, #14b8a6)",
  },
  {
    icon: "🚀",
    title: "Delivery",
    desc: "Ship fast, test thoroughly, iterate constantly",
    gradient: "linear-gradient(135deg, #f97316, #ef4444)",
  },
];

function CodeLine({ item }) {
  const typeClass = {
    keyword: styles.keyword,
    class: styles.className,
    fn: styles.fnName,
    string: styles.string,
    text: styles.codeText,
    indent: null,
    indent2: null,
    newline: null,
  };

  if (item.type === "newline") return <br />;
  if (item.type === "indent") return <span className={styles.indent}>  </span>;
  if (item.type === "indent2") return <span className={styles.indent}>    </span>;
  return <span className={typeClass[item.type] || ""}>{item.text}</span>;
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const [flippedCard, setFlippedCard] = useState(null);

  return (
    <section className={styles.about} id="about" ref={ref}>
      {/* Decorative background */}
      <div className={styles.bg}>
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
        <div className={styles.bgGrid} />
      </div>

      <div className={styles.container}>
        {/* Section Label */}
        <motion.div
          className={styles.sectionLabel}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.labelDash} />
          <span className={styles.labelText}>About Me</span>
          <span className={styles.labelDash} />
        </motion.div>

        {/* Main Content Split */}
        <div className={styles.mainGrid}>
          {/* ── LEFT: Biography + Code Card ── */}
          <motion.div
            className={styles.leftCol}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className={styles.headline}>
              I build things that{" "}
              <span className={styles.gradText}>scale</span> and{" "}
              <span className={styles.gradText2}>last</span>
            </h2>
            <p className={styles.bio}>
              I'm an <strong>aspiring full-stack developer</strong> who
              loves turning complex problems into elegant, performant solutions.
              My toolkit revolves around Python ecosystems, MERN stack, APIs,
              and database-first thinking.
            </p>
            <p className={styles.bio}>
              I care about <strong>code quality</strong> as much as I care
              about the end product — well-tested, well-documented, and built
              to handle real-world load.
            </p>

            {/* Stats row */}
            <div className={styles.statsRow}>
              {[
                { num: "5+", label: "Tech Stacks" },
                { num: "7+", label: "Projects Built" },
                { num: "85%", label: "Avg Test Coverage" },
              ].map((s) => (
                <div key={s.label} className={styles.statItem}>
                  <span className={styles.statNum}>{s.num}</span>
                  <span className={styles.statLbl}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Code Terminal Card */}
            <motion.div
              className={styles.terminal}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className={styles.terminalBar}>
                <span className={styles.dot} style={{ background: "#ef4444" }} />
                <span className={styles.dot} style={{ background: "#f59e0b" }} />
                <span className={styles.dot} style={{ background: "#10b981" }} />
                <span className={styles.terminalTitle}>about_me.py</span>
              </div>
              <div className={styles.terminalBody}>
                <code className={styles.codeBlock}>
                  {codeSnippet.map((item, i) => (
                    <CodeLine key={i} item={item} />
                  ))}
                  <span className={styles.cursor} />
                </code>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Flip Value Cards ── */}
          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className={styles.rightHeading}>Core Values</p>
            <div className={styles.flipGrid}>
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  className={`${styles.flipCard} ${flippedCard === i ? styles.flipped : ""}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                  onHoverStart={() => setFlippedCard(i)}
                  onHoverEnd={() => setFlippedCard(null)}
                  onClick={() => setFlippedCard(flippedCard === i ? null : i)}
                >
                  <div className={styles.flipInner}>
                    {/* Front */}
                    <div className={styles.flipFront}>
                      <span className={styles.flipIcon}>{v.icon}</span>
                      <h3 className={styles.flipTitle}>{v.title}</h3>
                    </div>
                    {/* Back */}
                    <div
                      className={styles.flipBack}
                      style={{ background: v.gradient }}
                    >
                      <p className={styles.flipDesc}>{v.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className={styles.ctaBox}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className={styles.ctaPrompt}>Ready to build something great?</p>
              <a href="#contact" className={styles.ctaBtn}>
                <span>Let's Connect</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
