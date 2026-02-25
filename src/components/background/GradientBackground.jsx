import styles from "./GradientBackground.module.css";

export default function GradientBackground() {
  return (
    <div className={styles.wrapper}>
      {/* Primary teal blob */}
      <div className={styles.blob1}></div>
      
      {/* Secondary violet blob */}
      <div className={styles.blob2}></div>
      
      {/* Accent accent glow */}
      <div className={styles.blob3}></div>
      
      {/* Gradient overlay for cohesion */}
      <div className={styles.gradientOverlay}></div>
    </div>
  );
}