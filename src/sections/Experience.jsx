import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, useCallback, useEffect } from "react";
import styles from "./Experience.module.css";

/* ── Spawn CSS particle burst ── */
function spawnParticles(container, color) {
  if (!container) return;
  for (let i = 0; i < 9; i++) {
    const p = document.createElement("div");
    const size = 2 + Math.random() * 4;
    const sx = 15 + Math.random() * 70;
    const sy = 15 + Math.random() * 70;
    const dx = (Math.random() - 0.5) * 130;
    const dy = (Math.random() - 0.5) * 130;
    Object.assign(p.style, {
      position: "absolute",
      left: `${sx}%`,
      top: `${sy}%`,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      background: color,
      boxShadow: `0 0 6px ${color}`,
      pointerEvents: "none",
    });
    container.appendChild(p);
    const anim = p.animate(
      [
        { transform: "translate(0,0)", opacity: 0.9 },
        { transform: `translate(${dx}px,${dy}px)`, opacity: 0 },
      ],
      {
        duration: 550 + Math.random() * 450,
        easing: "cubic-bezier(.16,1,.3,1)",
        fill: "forwards",
      }
    );
    anim.onfinish = () => p.remove();
  }
}

/* ── 3D magnetic tilt card ── */
function MagCard({ children, className, accentColor }) {
  const ref = useRef(null);
  const spotRef = useRef(null);
  const particleRef = useRef(null);
  const rafRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [6, -6]);
  const rotateY = useTransform(x, [-80, 80], [-6, 6]);
  const sRX = useSpring(rotateX, { stiffness: 180, damping: 22 });
  const sRY = useSpring(rotateY, { stiffness: 180, damping: 22 });

  const handleMove = useCallback(
    (e) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const r = ref.current.getBoundingClientRect();
        x.set(e.clientX - r.left - r.width / 2);
        y.set(e.clientY - r.top - r.height / 2);
        // Spotlight
        if (spotRef.current) {
          const px = ((e.clientX - r.left) / r.width) * 100;
          const py = ((e.clientY - r.top) / r.height) * 100;
          spotRef.current.style.setProperty("--mx", px + "%");
          spotRef.current.style.setProperty("--my", py + "%");
        }
      });
    },
    [x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleEnter = useCallback(() => {
    spawnParticles(particleRef.current, accentColor);
  }, [accentColor]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: sRX, rotateY: sRY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
    >
      {/* spotlight */}
      <div ref={spotRef} className={styles.cardSpot} />
      {/* particle canvas */}
      <div ref={particleRef} className={styles.particles} />
      {children}
    </motion.div>
  );
}

/* ── Data ── */
const experiences = [
  {
    id: "01",
    role: "Fullstack Developer Intern",
    company: "Xcelerator",
    period: "Jan 2026 – Ongoing",
    type: "Internship",
    typeCls: "intern",
    desc: "Developed and maintained RESTful APIs for a SaaS platform serving 10,000+ users with a strong focus on performance and scalability.",
    achievements: [
      "Architected JWT authentication system with role-based access control",
      "Optimized database queries reducing API response time by 40%",
      "Implemented automated testing achieving 85% code coverage",
      "Designed API contracts collaboratively with the frontend team",
    ],
    tech: ["React Native", "FastAPI", "PostgreSQL"],
    highlight: "Performance",
    accent: "#06b6d4",
    barCls: "barCyan",
  },
  {
    id: "02",
    role: "Full-Stack Developer & ML Engineer",
    company: "Academic Project",
    period: "Jan 2025 – Dec 2025",
    type: "Academic",
    typeCls: "academic",
    desc: "Developed an AI-powered Multi-Disease Prediction System capable of predicting diseases such as diabetes, heart disease, and Breast Cancer, Pneumonia, Alzheimer using machine learning and deep learning models. Led complete model development, data preprocessing pipeline, and full-stack integration.",
    achievements: [
      "Built end-to-end ML pipeline including data cleaning, feature engineering, training, and evaluation",
      "Implemented multiple predictive models (Logistic Regression, SVM, Random Forest, CNN) with hyperparameter tuning",
      "Developed an intuitive medical-grade UI using React and Tailwind CSS for real-time predictions",
      "Integrated multi-model inference API using Flask with secure endpoints",
      "Achieved high accuracy by applying model stacking and cross-validation",
    ],
    tech: ["Python", "Flask", "React", "Supabase", "AWS"],
    highlight: "Leadership",
    accent: "#a855f7",
    barCls: "barPurple",
  },
];

/* ── Achievement item with staggered hover ── */
function AchItem({ text, delay }) {
  return (
    <li className={styles.achItem} style={{ transitionDelay: delay }}>
      <span className={styles.achIcon}>✦</span>
      {text}
    </li>
  );
}

/* ── Tech badge with fill sweep ── */
function Tech({ label }) {
  return (
    <div className={styles.tech}>
      <div className={styles.techFill} />
      <span>{label}</span>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView && railRef.current) {
      railRef.current.classList.add(styles.railVisible);
    }
  }, [isInView]);

  return (
    <section className={styles.exp} id="experience" ref={sectionRef}>
      {/* Background */}
      <div className={styles.bg}>
        <div className={styles.mesh} />
        <div className={styles.circuit} />
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <svg className={styles.noise} xmlns="http://www.w3.org/2000/svg">
          <filter id="nzexp">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".7"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#nzexp)" opacity=".04" />
        </svg>
      </div>

      <div className={styles.wrap}>
        {/* Header */}
        <motion.div
          className={styles.hd}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.eyebrow}>
            <span className={styles.pill}>Experience</span>
            <div className={styles.bar} />
          </div>
          <h2 className={styles.h1}>
            Professional <em className={styles.em}>Journey</em>
          </h2>
          <p className={styles.sub}>
            Building real-world solutions and gaining hands-on experience across
            diverse technologies
          </p>
        </motion.div>

        {/* Timeline */}
        <div className={styles.tl}>
          <div ref={railRef} className={styles.rail} />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              className={styles.ti}
              initial={{ opacity: 0, x: 36, y: 20 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{
                duration: 0.75,
                delay: 0.2 + i * 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Timeline node */}
              <div className={styles.node}>
                <div
                  className={`${styles.nodeRing} ${
                    i === 1 ? styles.nodeRingPurple : ""
                  }`}
                />
                <div className={styles.nodeRing2} />
                <div
                  className={`${styles.nodeCore} ${
                    i === 1 ? styles.nodeCorePurple : ""
                  }`}
                >
                  {exp.id}
                </div>
              </div>

              {/* 3D Card */}
              <MagCard
                className={`${styles.card} ${i === 1 ? styles.cardPurple : ""}`}
                accentColor={exp.accent}
              >
                <div className={`${styles.cardBar} ${styles[exp.barCls]}`} />
                <div className={styles.cardHolo} />

                {/* Header row */}
                <div className={styles.ch}>
                  <div className={styles.ct}>
                    <div className={styles.roleRow}>
                      <h3 className={styles.role}>{exp.role}</h3>
                      <span
                        className={`${styles.typeBadge} ${styles[exp.typeCls]}`}
                      >
                        {exp.type}
                      </span>
                    </div>
                    <p className={styles.company}>{exp.company}</p>
                    <p className={styles.period}>
                      <span
                        className={`${styles.pdot} ${
                          i === 1 ? styles.pdotPurple : ""
                        }`}
                      />
                      {exp.period}
                    </p>
                  </div>
                  <div className={styles.hlChip}>{exp.highlight}</div>
                </div>

                <p className={styles.desc}>{exp.desc}</p>

                <p className={styles.achHead}>Key Achievements</p>
                <ul className={styles.achList}>
                  {exp.achievements.map((a, j) => (
                    <AchItem key={j} text={a} delay={`${j * 0.05}s`} />
                  ))}
                </ul>

                <p className={styles.techHead}>Tech Stack</p>
                <div className={styles.techWrap}>
                  {exp.tech.map((t) => (
                    <Tech key={t} label={t} />
                  ))}
                </div>
              </MagCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
