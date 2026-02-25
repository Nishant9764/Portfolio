/**
 * Contact.jsx — Cinematic Panda Delivery Edition
 *
 * GOOGLE SHEETS SETUP (see GoogleSheetsScript.gs for the Apps Script code):
 * 1. Create a Google Sheet
 * 2. Extensions → Apps Script → paste code from GoogleSheetsScript.gs
 * 3. Deploy → New Deployment → Web App (Execute as: Me, Access: Anyone)
 * 4. Copy the deployment URL and paste it as SHEET_URL below
 */

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import styles from "./Contact.module.css";

// ⚠️  Adjust this path to wherever Mascott.png lives in your project
import mascotImg from "../assets/Mascott.png";

/* ════════════════════════════════════════════════════════
   CONFIG — paste your Google Apps Script URL here
════════════════════════════════════════════════════════ */
const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwB_syPmGVbGVW_czkTjlzRO97ZaJApo9KQiXDYE-xq_weHgvBn9C3tpQKiGMEHyVuWRQ/exec";

/* ════════════════════════════════════════════════════════
   STAR FIELD
════════════════════════════════════════════════════════ */
function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        sz: Math.random() * 2 + 0.4,
        dur: 1.8 + Math.random() * 3,
        del: Math.random() * 5,
      })),
    []
  );
  return (
    <div className={styles.starField}>
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className={styles.star}
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.sz, height: s.sz }}
          animate={{ opacity: [0.1, 1, 0.1], scale: [1, 1.8, 1] }}
          transition={{
            duration: s.dur,
            repeat: Infinity,
            delay: s.del,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   PAPER DOCUMENT (folds into envelope)
════════════════════════════════════════════════════════ */
function PaperDoc({ folding }) {
  return (
    <div className={styles.perspBox}>
      <motion.div
        className={styles.paper3d}
        animate={
          folding
            ? {
                rotateX: [0, -60, -180],
                scaleY: [1, 0.6, 0.42],
                scaleX: [1, 1, 0.78],
              }
            : {}
        }
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <svg width="110" height="148" viewBox="0 0 110 148" fill="none">
          <rect width="110" height="148" rx="3" fill="#fdfcf4" />
          <rect
            x="0.75"
            y="0.75"
            width="108.5"
            height="146.5"
            rx="2.5"
            fill="none"
            stroke="#e2dfc8"
            strokeWidth="1.5"
          />
          {/* Header */}
          <rect x="12" y="16" width="86" height="4" rx="2" fill="#9ca3b0" />
          <rect
            x="12"
            y="26"
            width="55"
            height="2.5"
            rx="1.25"
            fill="#c8c4b0"
          />
          <line
            x1="12"
            y1="37"
            x2="98"
            y2="37"
            stroke="#e8e4d0"
            strokeWidth="1"
          />
          {/* Body lines */}
          {[50, 62, 74, 86, 98, 112, 124].map((y, i) => (
            <motion.rect
              key={i}
              x="12"
              y={y}
              height="3"
              rx="1.5"
              fill={i < 2 ? "#a0aab8" : "#d0cdc0"}
              initial={{ width: 0 }}
              animate={{ width: i % 4 === 3 ? 52 : i % 3 === 2 ? 68 : 86 }}
              transition={{ delay: 0.04 * i, duration: 0.35 }}
            />
          ))}
          {/* Fold crease */}
          <motion.line
            x1="4"
            y1="74"
            x2="106"
            y2="74"
            stroke="#bbb8a8"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            initial={{ opacity: 0 }}
            animate={folding ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </svg>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ENVELOPE
════════════════════════════════════════════════════════ */
function Envelope({ size = 1 }) {
  const w = 72 * size,
    h = 52 * size;
  return (
    <svg width={w} height={h} viewBox="0 0 72 52" fill="none">
      <rect
        x="1"
        y="1"
        width="70"
        height="50"
        rx="6"
        fill="#fdfcf4"
        stroke="#14b8a6"
        strokeWidth="2"
      />
      <path
        d="M1 1 L36 26 L71 1"
        fill="#f0ede0"
        stroke="#14b8a6"
        strokeWidth="1.5"
      />
      <path d="M1 51 L28 28" stroke="#e0dcc0" strokeWidth="1.5" />
      <path d="M71 51 L44 28" stroke="#e0dcc0" strokeWidth="1.5" />
      <circle cx="36" cy="38" r="5" fill="#14b8a6" />
      <text
        x="36"
        y="42"
        textAnchor="middle"
        fontSize="6"
        fill="white"
        fontWeight="bold"
      >
        ✦
      </text>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════
   SATELLITE SVG
════════════════════════════════════════════════════════ */
function Satellite({ transmitting }) {
  return (
    <svg width="190" height="130" viewBox="0 0 190 130" fill="none">
      {/* Left solar panel */}
      <rect
        x="4"
        y="44"
        width="54"
        height="36"
        rx="3"
        fill="#0c1f3a"
        stroke="#0ea5e9"
        strokeWidth="1.5"
      />
      {[0, 1, 2, 3].map((i) => (
        <line
          key={`lv${i}`}
          x1={4 + i * 13}
          y1="44"
          x2={4 + i * 13}
          y2="80"
          stroke="#0ea5e9"
          strokeWidth="0.7"
          opacity="0.5"
        />
      ))}
      {[0, 1, 2].map((i) => (
        <line
          key={`lh${i}`}
          x1="4"
          y1={44 + i * 12}
          x2="58"
          y2={44 + i * 12}
          stroke="#0ea5e9"
          strokeWidth="0.7"
          opacity="0.5"
        />
      ))}
      {transmitting && (
        <motion.rect
          x="4"
          y="44"
          width="54"
          height="36"
          rx="3"
          fill="#0ea5e9"
          animate={{ opacity: [0, 0.22, 0] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        />
      )}

      {/* Right solar panel */}
      <rect
        x="132"
        y="44"
        width="54"
        height="36"
        rx="3"
        fill="#0c1f3a"
        stroke="#0ea5e9"
        strokeWidth="1.5"
      />
      {[0, 1, 2, 3].map((i) => (
        <line
          key={`rv${i}`}
          x1={132 + i * 13}
          y1="44"
          x2={132 + i * 13}
          y2="80"
          stroke="#0ea5e9"
          strokeWidth="0.7"
          opacity="0.5"
        />
      ))}
      {[0, 1, 2].map((i) => (
        <line
          key={`rh${i}`}
          x1="132"
          y1={44 + i * 12}
          x2="186"
          y2={44 + i * 12}
          stroke="#0ea5e9"
          strokeWidth="0.7"
          opacity="0.5"
        />
      ))}
      {transmitting && (
        <motion.rect
          x="132"
          y="44"
          width="54"
          height="36"
          rx="3"
          fill="#0ea5e9"
          animate={{ opacity: [0, 0.22, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: 0.35 }}
        />
      )}

      {/* Struts */}
      <rect
        x="58"
        y="57"
        width="14"
        height="10"
        fill="#162840"
        stroke="#0ea5e9"
        strokeWidth="1"
      />
      <rect
        x="118"
        y="57"
        width="14"
        height="10"
        fill="#162840"
        stroke="#0ea5e9"
        strokeWidth="1"
      />

      {/* Body */}
      <rect
        x="64"
        y="36"
        width="62"
        height="56"
        rx="8"
        fill="#152238"
        stroke="#0ea5e9"
        strokeWidth="2"
      />
      {transmitting && (
        <motion.rect
          x="64"
          y="36"
          width="62"
          height="56"
          rx="8"
          fill="#0ea5e9"
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}

      {/* Lens */}
      <circle
        cx="95"
        cy="64"
        r="10"
        fill="#0a1628"
        stroke="#0ea5e9"
        strokeWidth="1.5"
      />
      <motion.circle
        cx="95"
        cy="64"
        r="6"
        fill={transmitting ? "#14b8a6" : "#0c4a80"}
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 0.9, repeat: Infinity }}
      />
      {transmitting && (
        <motion.circle
          cx="95"
          cy="64"
          r="10"
          fill="none"
          stroke="#14b8a6"
          animate={{ r: [10, 20], opacity: [0.8, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}

      {/* Dish */}
      <motion.g
        style={{ transformOrigin: "95px 36px" }}
        animate={
          transmitting ? { rotate: [-14, 0, -14] } : { rotate: [0, 5, 0] }
        }
        transition={{
          duration: transmitting ? 0.65 : 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ellipse
          cx="95"
          cy="18"
          rx="26"
          ry="14"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="2"
        />
        <ellipse
          cx="95"
          cy="18"
          rx="17"
          ry="9"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          x1="95"
          y1="36"
          x2="95"
          y2="18"
          stroke="#14b8a6"
          strokeWidth="2"
        />
        <circle cx="95" cy="18" r="3.5" fill="#14b8a6" />
        {transmitting && (
          <motion.circle
            cx="95"
            cy="18"
            r="3.5"
            fill="none"
            stroke="#14b8a6"
            animate={{ r: [3.5, 14], opacity: [1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity }}
          />
        )}
      </motion.g>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════
   EARTH SVG — India / Bangalore highlighted
════════════════════════════════════════════════════════ */
function Earth({ glowing }) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        {/* Outer glow rings */}
        {glowing &&
          [0, 0.5, 1].map((d, i) => (
            <motion.circle
              key={i}
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={
                i === 0 ? "rgba(20,184,166,0.3)" : "rgba(14,165,233,0.15)"
              }
              strokeWidth={i === 0 ? 2 : 1}
              animate={{ r: [52, 60 + i * 4, 52], opacity: [0.7, 0.3, 0.7] }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: d }}
            />
          ))}
        {/* Ocean */}
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="#071626"
          stroke="#0ea5e9"
          strokeWidth="1.5"
        />
        {/* Americas */}
        <path
          d="M22 32 Q28 26 34 30 Q38 36 36 44 Q34 52 30 58 Q26 64 22 60 Q18 54 18 46 Q18 38 22 32Z"
          fill="#1a5c3a"
        />
        {/* Europe / Africa */}
        <path
          d="M46 18 Q52 14 58 18 Q64 16 70 22 Q73 28 70 36 Q67 44 62 48 Q56 52 50 50 Q44 52 40 46 Q36 40 36 34 Q38 24 46 18Z"
          fill="#1a5c3a"
          opacity="0.9"
        />
        {/* Asia */}
        <path
          d="M64 14 Q74 10 84 16 Q92 22 92 32 Q92 40 88 46 Q84 52 78 54 Q72 56 66 52 Q62 48 60 42 Q58 36 60 28 Q60 20 64 14Z"
          fill="#1a5c3a"
          opacity="0.9"
        />
        {/* Australia */}
        <path
          d="M86 72 Q94 70 98 76 Q100 82 96 86 Q92 90 88 88 Q84 84 84 80 Q84 74 86 72Z"
          fill="#1a5c3a"
          opacity="0.8"
        />
        {/* India */}
        <path
          d="M76 38 Q80 40 82 46 Q84 54 82 60 Q79 68 76 72 Q73 76 71 72 Q68 66 69 58 Q70 50 74 44 Q75 40 76 38Z"
          fill="#2d7a4a"
        />
        {/* Bangalore dot */}
        <motion.circle
          cx="75"
          cy="66"
          r={glowing ? 5 : 3.5}
          fill="#14b8a6"
          animate={glowing ? { r: [5, 7, 5] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />
        {/* Bangalore ping rings */}
        {glowing &&
          [0, 0.5, 1].map((d) => (
            <motion.circle
              key={d}
              cx="75"
              cy="66"
              r="5"
              fill="none"
              stroke="#14b8a6"
              strokeWidth="1.5"
              animate={{ r: [5, 24], opacity: [0.9, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: d }}
            />
          ))}
        {/* Atmosphere */}
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="rgba(14,165,233,0.25)"
          strokeWidth="5"
        />
        {/* Clouds */}
        <ellipse cx="42" cy="32" rx="9" ry="3" fill="rgba(255,255,255,0.06)" />
        <ellipse
          cx="78"
          cy="78"
          rx="11"
          ry="3.5"
          fill="rgba(255,255,255,0.05)"
        />
      </svg>
      {glowing && (
        <motion.div
          className={styles.bangaloreTag}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          📍 Bangalore
        </motion.div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   CINEMATIC DELIVERY ANIMATION (main sequence)
════════════════════════════════════════════════════════ */
const STATUS_TEXT = {
  letter: "Composing your message...",
  folding: "Sealing the letter with encryption...",
  panda: "🐼 Panda has secured your message!",
  launch: "🚀 Launching to orbit...",
  space: "🛸 Approaching the relay satellite...",
  transmit: "📡 Transmitting encrypted signal...",
  earth: "🌍 Signal locked on Bangalore!",
};

function CinematicDelivery({ onDone }) {
  const [phase, setPhase] = useState("letter");

  useEffect(() => {
    const seq = [
      [650, "folding"],
      [2000, "panda"],
      [3400, "launch"],
      [4700, "space"],
      [5900, "transmit"],
      [7100, "earth"],
      [8800, onDone],
    ];
    const timers = seq.map(([ms, action]) =>
      setTimeout(
        () => (typeof action === "function" ? action() : setPhase(action)),
        ms
      )
    );
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  const inSpace = ["space", "transmit", "earth"].includes(phase);

  return (
    <div className={styles.cinemaStage}>
      {/* ── Backgrounds ── */}
      <div className={styles.cineBgBase} />
      <motion.div
        className={styles.cineBgSpace}
        animate={{ opacity: inSpace ? 1 : 0 }}
        transition={{ duration: 1.3 }}
      />

      {/* Stars */}
      <motion.div
        className={styles.starsLayer}
        animate={{ opacity: inSpace ? 1 : 0.2 }}
        transition={{ duration: 1.3 }}
      >
        <StarField />
      </motion.div>

      {/* City skyline */}
      <motion.div
        className={styles.citySkyline}
        animate={{ opacity: inSpace ? 0 : 1 }}
        transition={{ duration: 0.9 }}
      />

      {/* ════ LETTER / FOLDING PHASE ════ */}
      <AnimatePresence>
        {(phase === "letter" || phase === "folding") && (
          <motion.div
            key="letterPhase"
            className={styles.cineCenter}
            exit={{ opacity: 0, scale: 0.45, y: -60 }}
            transition={{ duration: 0.55 }}
          >
            <PaperDoc folding={phase === "folding"} />
            {phase === "folding" && (
              <motion.div
                className={styles.foldHint}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className={styles.foldDots}>
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: 0.15,
                    }}
                  />
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                  />
                </span>
                encrypting
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════ PANDA PICKUP PHASE ════ */}
      <AnimatePresence>
        {phase === "panda" && (
          <motion.div
            key="pandaPickup"
            className={styles.pandaPickupScene}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -240, scale: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            {/* Envelope flies in to panda's hand */}
            <motion.div
              className={styles.flyEnvelope}
              initial={{ x: -140, y: 50, opacity: 0, rotate: -30, scale: 0.6 }}
              animate={{ x: 0, y: 0, opacity: 1, rotate: 10, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 13,
                delay: 0.25,
              }}
            >
              <Envelope size={1.1} />
            </motion.div>

            {/* Panda hero */}
            <motion.div
              className={styles.pandaHeroWrap}
              initial={{ x: 260, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 90, damping: 14 }}
            >
              <img
                src={mascotImg}
                alt="Tech Panda"
                className={styles.pandaHeroImg}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════ LAUNCH PHASE ════ */}
      <AnimatePresence>
        {phase === "launch" && (
          <motion.div
            key="launchPhase"
            className={styles.launchScene}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Rocket exhaust trail */}
            <motion.div
              className={styles.rocketTrail}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 320, opacity: [0, 1, 0.6, 0.1] }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* Panda launching up */}
            <motion.div
              className={styles.launchPandaWrap}
              initial={{ y: 70, scale: 1, opacity: 1 }}
              animate={{ y: -460, scale: 0.18, opacity: [1, 1, 0.8, 0] }}
              transition={{ duration: 1.5, ease: [0.18, 0, 0.6, 1] }}
            >
              {/* Glow burst */}
              <motion.div
                className={styles.launchGlow}
                animate={{ scale: [1, 3, 0], opacity: [1, 0.5, 0] }}
                transition={{ duration: 0.9 }}
              />
              {/* Held envelope */}
              <div className={styles.heldEnvelope}>
                <Envelope size={0.7} />
              </div>
              <img src={mascotImg} alt="" className={styles.pandaLaunchImg} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════ SPACE SCENE ════ */}
      <AnimatePresence>
        {inSpace && (
          <motion.div
            key="spaceScene"
            className={styles.spaceScene}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Satellite — top center */}
            <motion.div
              className={styles.satArea}
              initial={{ y: -140, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 65, damping: 12 }}
            >
              <Satellite
                transmitting={phase === "transmit" || phase === "earth"}
              />
            </motion.div>

            {/* Tiny panda approaching satellite */}
            <AnimatePresence>
              {phase === "space" && (
                <motion.div
                  className={styles.pandaTinyWrap}
                  initial={{ x: -200, y: 70, opacity: 0, scale: 0.2 }}
                  animate={{ x: 30, y: 10, opacity: 1, scale: 0.26 }}
                  exit={{ x: 110, y: -70, opacity: 0, scale: 0.08 }}
                  transition={{ type: "spring", stiffness: 45, damping: 10 }}
                >
                  <img
                    src={mascotImg}
                    alt=""
                    className={styles.pandaMicroImg}
                  />
                  <div className={styles.tinyEnvelope}>
                    <Envelope size={0.42} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Transmission arc + signal dots */}
            {(phase === "transmit" || phase === "earth") && (
              <svg
                className={styles.arcSvg}
                viewBox="0 0 520 340"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter
                    id="arcGlow"
                    x="-60%"
                    y="-60%"
                    width="220%"
                    height="220%"
                  >
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient
                    id="arcGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                {/* Arc path */}
                <motion.path
                  d="M 260 80 Q 440 -20 450 255"
                  stroke="url(#arcGrad)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray="10 6"
                  filter="url(#arcGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
                {/* Glow blur copy */}
                <motion.path
                  d="M 260 80 Q 440 -20 450 255"
                  stroke="#14b8a6"
                  strokeWidth="7"
                  fill="none"
                  opacity="0.07"
                  filter="url(#arcGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
                {/* Signal dots */}
                {[0, 0.4, 0.8].map((d) => (
                  <motion.circle
                    key={d}
                    r="5.5"
                    fill="#14b8a6"
                    filter="url(#arcGlow)"
                    initial={{ cx: 260, cy: 80, opacity: 0 }}
                    animate={{
                      cx: [260, 380, 450],
                      cy: [80, 20, 255],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.4,
                      delay: d,
                      repeat: phase === "transmit" ? 4 : 0,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </svg>
            )}

            {/* Earth — bottom right */}
            <motion.div
              className={styles.earthArea}
              initial={{ scale: 0.3, opacity: 0, x: 60 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 55,
                damping: 12,
                delay: 0.2,
              }}
            >
              <Earth glowing={phase === "earth"} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Status bar ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          className={styles.statusBar}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className={styles.statusPulse}
            animate={{ opacity: [1, 0.2, 1], scale: [1, 1.6, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
          />
          {STATUS_TEXT[phase]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   SUCCESS CHECKMARK
════════════════════════════════════════════════════════ */
function SuccessRing() {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      <motion.circle
        cx="45"
        cy="45"
        r="40"
        stroke="#14b8a6"
        strokeWidth="3"
        fill="none"
        initial={{ strokeDasharray: 251, strokeDashoffset: 251 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      <motion.path
        d="M26 45 L38 57 L64 31"
        stroke="#14b8a6"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ strokeDasharray: 60, strokeDashoffset: 60 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 0.55, delay: 0.6, ease: "easeOut" }}
      />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════
   CONTACT SECTION
════════════════════════════════════════════════════════ */
export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | animating | success | error

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors", // required for Google Apps Script
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: "Portfolio Contact Form",
        }),
      });
    } catch (_) {
      // no-cors always "throws" — treat as success
    }
    setTimeout(() => {
      setStatus("animating");
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 400);
  };

  const socials = [
    {
      href: "mailto:nishantkumar1427@gmail.com",
      label: "Email",
      value: "nishantkumar1427@gmail.com",
      color: "#14b8a6",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      href: "https://www.linkedin.com/in/nishant-kumar-25bb4225a",
      label: "LinkedIn",
      value: "linkedin.com/in/nishant-kumar-25bb4225a",
      color: "#0ea5e9",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      href: "https://github.com/Nishant9764",
      label: "GitHub",
      value: "github.com/Nishant9764",
      color: "#a855f7",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
  ];

  return (
    <section className={styles.contact} id="contact" ref={ref}>
      <div className={styles.bg}>
        <div className={styles.glow1} />
        <div className={styles.glow2} />
      </div>

      <div className={styles.container}>
        {/* ── Header ── */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.labelRow}>
            <span className={styles.labelDash} />
            <span className={styles.label}>Get In Touch</span>
            <span className={styles.labelDash} />
          </div>
          <h2 className={styles.title}>
            Let's Build Something <br />
            <span className={styles.accent}>Exceptional</span>
          </h2>
          <p className={styles.subtitle}>
            Open to opportunities, high-impact projects, and engaging
            collaborations. Feel free to reach out.
          </p>
        </motion.div>

        <div className={styles.grid2col}>
          {/* ── LEFT: Socials ── */}
          <motion.div
            className={styles.sidebar}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className={styles.sidebarHeading}>Direct Contact</p>
            <div className={styles.socialList}>
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  className={styles.socialCard}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  whileHover={{ x: 8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  style={{ "--card-color": s.color }}
                >
                  <div
                    className={styles.socialIcon}
                    style={{ color: s.color, borderColor: `${s.color}30` }}
                  >
                    {s.icon}
                  </div>
                  <div className={styles.socialInfo}>
                    <p className={styles.socialLabel}>{s.label}</p>
                    <p className={styles.socialValue}>{s.value}</p>
                  </div>
                  <svg
                    className={styles.arrow}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.a>
              ))}
            </div>
            <div className={styles.availBadge}>
              <span className={styles.availDot} />
              <span>Available for new opportunities</span>
            </div>
          </motion.div>

          {/* ── RIGHT: Form / Cinema / Success ── */}
          <motion.div
            className={styles.formSide}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <AnimatePresence mode="wait">
              {/* SUCCESS */}
              {status === "success" && (
                <motion.div
                  key="success"
                  className={styles.successState}
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(14px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <SuccessRing />
                  <h3 className={styles.successHeading}>Message Delivered</h3>
                  <p className={styles.successText}>
                    Your message has been transmitted via satellite relay and
                    routed securely to my inbox. I'll be in touch
                    shortly!
                  </p>
                  <button
                    className={styles.resetBtn}
                    onClick={() => setStatus("idle")}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}

              {/* CINEMATIC ANIMATION */}
              {status === "animating" && (
                <motion.div
                  key="cinema"
                  className={styles.cinemaContainer}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CinematicDelivery onDone={() => setStatus("success")} />
                </motion.div>
              )}

              {/* FORM */}
              {(status === "idle" ||
                status === "loading" ||
                status === "error") && (
                <motion.form
                  key="form"
                  className={styles.form}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
                  transition={{ duration: 0.4 }}
                >
                  {status === "error" && (
                    <div className={styles.errorBanner}>
                      ⚠️ Connection error. Please try again.
                    </div>
                  )}

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Full Name</label>
                      <input
                        className={styles.formInput}
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        disabled={status === "loading"}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Email Address</label>
                      <input
                        className={styles.formInput}
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        disabled={status === "loading"}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Phone Number</label>
                    <input
                      className={styles.formInput}
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      pattern="[\+0-9\s\-\(\)]{7,}"
                      disabled={status === "loading"}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Message</label>
                    <textarea
                      className={styles.formTextarea}
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Discuss a project, request a quote, or just say hi..."
                      disabled={status === "loading"}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`${styles.submitBtn} ${
                      status === "loading" ? styles.submitLoading : ""
                    }`}
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <span className={styles.premiumLoader} />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            d="M5 12h14M12 5l7 7-7 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
