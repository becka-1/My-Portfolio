import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroAnimation = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // 1. Path animation takes 2000ms. Starts exiting after that.
    const fadeOutTimer = setTimeout(() => setStage(2), 3000);
    // 2. Cleanup parent component after fade finishes
    const completeTimer = setTimeout(() => onComplete(), 4000);

    return () => {
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
            inset: 0,
            width: '100vw',
            height: '100dvh',
            zIndex: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            overflow: 'hidden',
            backgroundColor: 'var(--color-accent)',
          }}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "tween", ease: "ease", duration: .8 }}
        >
          {/* We wrap the SVG in a responsive container */}
          <motion.div style={{ width: '90%', maxWidth: '800px' }}>
            <motion.svg
              viewBox="0 0 841.9 168.8"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            >
              <motion.path
                d="M54,129c0,0,32.9-43.8,100.4-5.9c0,0,37.3,20,96.4-15.4c0,0,15.7-5,6.2,14c-9.5,19-2.1,20-2.1,20 s29.2-39.6,32.4-28.1c0,0-10.5,44.8,22.5,14.7c0,0,18-18.3,1.2-16.1c-16.8,2.3,1.7,28.7,35.9,6.4c0,0,19.4-8.3,8.3-13.9 c-11.2-5.7-42.3,40.7-12.2,35.5s91.3-105.5,74-123.1c-17.3-17.6-71.7,135-23.8,111c0,0,21.6-15.7,35.5-16.7c0,0-25.1,4.1-24.8,23.8 s48.2-25.2,69.2-20.8c0,0-22.2,2.4-26,22.4c-0.9,4.6,1.9,9.1,6.4,10.1c5.6,1.3,13.9-0.4,22-15.2c0,0,2.9-8.9-4.6-10.2 c0,0-0.9,8.4,15.4,1.1c16.4-7.3,26.1-10.4,19.9,2.6s-5.8,15.6-5.8,15.6s24.6-26.4,25.2-17.3s-2.6,13.9,23.5-7.8c0,0,5.2-3.2,2.6,2.6 c-2.6,5.8-16.4,37.1,11,23.2c27.4-13.9,45.9-39.6,39.3-42.2c-6.6-2.6-31.3,15.1-24.8,39.6s67.7-27.1,128.9-11.6s72.3-5.8,72.3-5.8"
                fill="none"
                stroke="black"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
