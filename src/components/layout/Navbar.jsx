import { useState, useEffect, useCallback } from "react";
import styles from "./Navbar.module.css";
import useTheme from "../../hooks/useTheme";

/* ── Web Audio theme click sound ───────────────────────────── */
function playThemeSound(theme) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    // Two-tone chime: switching TO light = rising, TO dark = falling
    const isToLight = theme === "dark"; // we're switching FROM dark TO light

    const freqs = isToLight ? [440, 660, 880] : [880, 660, 440];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.22);
      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + i * 0.08 + 0.25);
    });
    setTimeout(() => ctx.close(), 1000);
  } catch (_) {
    // AudioContext not available – silently skip
  }
}

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["projects", "skills", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });
      if (current) setActiveSection(current);
      else setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  const handleNavClick = () => setIsMenuOpen(false);

  const handleThemeToggle = useCallback(() => {
    playThemeSound(theme);
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <nav className={styles.nav}>
      <div className="container">
        <div className={styles.inner}>
          {/* Logo */}
          <a href="#home" className={styles.logo}>
            <span className={styles.logoText}>
              <span className={styles.logoFirst}>Nishant</span>
              <span className={styles.logoLast}>Kumar</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className={styles.linksWrapper}>
            <div className={styles.links}>
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`${styles.link} ${activeSection === link.id ? styles.active : ""}`}
                  onClick={handleNavClick}
                >
                  {link.label}
                  <span className={styles.linkDot} />
                </a>
              ))}
            </div>

            {/* Theme Toggle with Sound */}
            <button
              className={styles.themeToggle}
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to light mode 🔊" : "Switch to dark mode 🔊"}
            >
              <span className={styles.themeIcon}>
                {theme === "dark" ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`${styles.mobileMenuBtn} ${isMenuOpen ? styles.open : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`${styles.mobileLink} ${activeSection === link.id ? styles.activeLink : ""}`}
                onClick={handleNavClick}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
