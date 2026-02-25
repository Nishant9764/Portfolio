import { motion } from "framer-motion";
import styles from "./ProjectCard.module.css";
import Badge from "./Badge";

export default function ProjectCard({
  title,
  description,
  stack,
  github,
  demo,
  onClick,
}) {
  return (
    <motion.div
      className={`${styles.card} ${styles.clickable}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <div className={styles.header}>
        <h3>{title}</h3>
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.stack}>
        {stack.map((tech, index) => (
          <Badge key={index}>{tech}</Badge>
        ))}
      </div>

      <div className={styles.links}>
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer">
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}
