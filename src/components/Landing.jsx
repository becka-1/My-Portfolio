import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import Profile from '../assets/Profile Photo/profile.png';
import WaveIcon from '../assets/icons/wave-test.svg';
import './Landing.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 3.5,
      staggerChildren: 0.04,
    },
  },
};

const letterVariants = {
  hidden: {
    y: '100%',
  },
  visible: {
    y: 0,
    transition: {
      type: 'spring',
      damping: 14,
      stiffness: 90,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', delay },
  }),
};

const TEXT = "SOFTWARE DEVELOPER";
const LETTERS = Array.from(TEXT);

const Landing = () => {
  const waveRef = useRef(null);
  const isWaving = useRef(false);

  /* keyframes matching the CSS @keyframes wave-hand */
  const WAVE_KEYFRAMES = [
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(20deg)', offset: 0.15 },
    { transform: 'rotate(-8deg)', offset: 0.30 },
    { transform: 'rotate(18deg)', offset: 0.45 },
    { transform: 'rotate(-5deg)', offset: 0.60 },
    { transform: 'rotate(12deg)', offset: 0.75 },
    { transform: 'rotate(0deg)' },
  ];

  const handleWaveHover = useCallback(() => {
    if (isWaving.current || !waveRef.current) return;
    isWaving.current = true;

    const anim = waveRef.current.animate(WAVE_KEYFRAMES, {
      duration: 2200,
      easing: 'ease-in-out',
      fill: 'forwards',
    });

    anim.onfinish = () => {
      anim.cancel(); // reset transform so next hover starts clean
      isWaving.current = false;
    };
  }, []);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-container" id="home">
      {/* Two-column hero layout */}
      <div className="hero">
        {/* Left: text content */}
        <div className="hero-content">
          <motion.p
            className="hero-greeting"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3.5}
          >
            <img
              ref={waveRef}
              src={WaveIcon}
              alt=""
              className="wave-icon"
              onMouseEnter={handleWaveHover}
            />
            Hi! I'm Bereket
          </motion.p>

          <motion.h1
            className="hero-title"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {LETTERS.map((letter, i) => (
              /* Clip wrapper — hides the letter below the baseline until it slides up */
              <span key={i} className="letter-clip">
                <motion.span variants={letterVariants}>
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            className="hero-description"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            I build full-stack applications with a focus on performance and scalability.
          </motion.p>

          <motion.div
            className="hero-actions"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4.5}
          >
            <MagneticButton>
              <button
                className="btn-primary"
                onClick={() => scrollToSection('projects')}
              >
                View my projects
              </button>
            </MagneticButton>
            <MagneticButton>
              <button
                className="btn-secondary"
                onClick={() => scrollToSection('contact')}
              >
                Get in touch
              </button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right: image placeholder — replace with your image */}
        <motion.div
          className="hero-image"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3.7}
        >
          {/* Add your <img> here */}
          <img src={Profile} alt="" />
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
