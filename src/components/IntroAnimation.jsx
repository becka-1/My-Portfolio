import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroAnimation = ({ onComplete }) => {
  // SETTINGS: Change to 'transparent' for a cutout window, or 'solid' for a solid white fill.
  const FILL_TYPE = 'solid';

  const [stage, setStage] = useState(0);

  useEffect(() => {
    // 1. Text fills up/shows background at 2500ms
    const drawTimer = setTimeout(() => setStage(1), 1000);

    // 2. Entire SVG & black background starts fading away at 4000ms
    const fadeOutTimer = setTimeout(() => setStage(2), 2000);

    // 3. Cleanup parent component at 5000ms (after fade finishes)
    const completeTimer = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 2 && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
          // initial={{ opacity: 1 }}
          // exit={{ opacity: 0 }}
          // transition={{ duration: 0.5 }}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "tween", ease: "ease", duration: 0.8 }}
        >
          <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <mask id="textMask">
                <rect x="0" y="0" width="1000" height="1000" fill="white" />

                {/* The fill mask */}
                <motion.text
                  x="500"
                  y="500"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="110"
                  fontWeight="900"
                  letterSpacing="0.05em"
                  fontFamily="system-ui, sans-serif"
                  fill="white"
                  initial={{ fill: "rgba(255, 255, 255, 1)" }}
                  animate={{
                    fill: stage >= 1 && FILL_TYPE === 'transparent' ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)"
                  }}
                  transition={{ duration: 0.8 }}
                >
                  WELCOME
                </motion.text>
              </mask>
            </defs>
            <rect x="0" y="0" width="1000" height="1000" fill="rgba(60, 60, 60, 1)" mask="url(#textMask)" />

            {/* The Stroke Text */}
            <motion.text
              x="500"
              y="500"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="110"
              fontWeight="900"
              letterSpacing="0.05em"
              fontFamily="system-ui, sans-serif"
              fill="white"
              stroke="white"
              strokeWidth="2"
              initial={{ strokeDasharray: "0 1000", fillOpacity: 0 }}
              animate={{
                strokeDasharray: ["0 1000", "1000 0"],
                fillOpacity: stage >= 1 && FILL_TYPE === 'solid' ? 1 : 0
              }}
              transition={{
                strokeDasharray: { duration: 2.5, ease: "easeInOut" },
                fillOpacity: { duration: 1.8, ease: "easeInOut" }
              }}
            >
              WELCOME
            </motion.text>
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
