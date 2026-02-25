import { motion } from "framer-motion";
import styles from "./SectionWrapper.module.css";

export default function SectionWrapper({ id, title, children }) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.container}>
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={styles.title}
          >
            {title}
          </motion.h2>
        )}
        {children}
      </div>
    </section>
  );
}
