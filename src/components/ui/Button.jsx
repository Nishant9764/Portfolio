import styles from "./Button.module.css";
import { motion } from "framer-motion";

export default function Button({ children, variant = "primary", onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -2 }}
      className={`${styles.btn} ${styles[`btn--${variant}`]}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
