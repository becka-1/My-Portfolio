import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Profile from '../assets/profile photo/profile.jpg';
import './About.css';

const BIO = "Hi, I'm Bereket Melaku, a dedicated Computer Science and Engineering student and Full-Stack Developer with 2+ years of experience in web development and strong interest in software development, full-stack web applications and artificial intelligence. I build end-to-end web applications, from designing responsive and user-friendly interfaces to developing backend APIs and managing databases.";
const SKILLS = "Python · JavaScript · C++ · SQL · React · Node.js · Express.js · REST APIs · PostgreSQL · HTML · CSS · Tailwind · Git";

const Char = ({ children, progress, range }) => {
  const opacity = useTransform(progress, (p) => {
    if (p <= range[0]) return 0;
    if (p >= range[1]) return 1;
    return (p - range[0]) / (range[1] - range[0]);
  });
  return (
    <span className="about-char-wrap">
      <span className="about-char-shadow">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

const Word = ({ children, progress, range }) => {
  const chars = children.split('');
  const step = (range[1] - range[0]) / Math.max(chars.length, 1);
  return (
    <span className="about-word">
      {chars.map((char, i) => (
        <Char
          key={i}
          progress={progress}
          range={[range[0] + i * step, range[0] + (i + 1) * step]}
        >
          {char}
        </Char>
      ))}
    </span>
  );
};

const RevealText = ({ text, progress, startOffset = 0, endOffset = 1 }) => {
  const words = text.split(' ');
  const span = endOffset - startOffset;
  return (
    <p className="about-reveal-paragraph">
      {words.map((word, i) => {
        const start = startOffset + (i / words.length) * span;
        const end = start + span / words.length;
        return (
          <Word key={i} progress={progress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

/* ── About Section ── */
const About = () => {
  const [isStickyCapable, setIsStickyCapable] = useState(true);

  useEffect(() => {
    const checkMedia = () => {
      setIsStickyCapable(
        window.innerWidth > 850 && window.innerHeight >= 600
      );
    };
    checkMedia();
    window.addEventListener('resize', checkMedia);
    return () => window.removeEventListener('resize', checkMedia);
  }, []);

  const containerRef = useRef(null);
  const textContainerRef = useRef(null);

  const { scrollYProgress: desktopProgress } = useScroll({
    target: containerRef,
    offset: ['start 80px', 'end end'],
  });

  const { scrollYProgress: mobileProgress } = useScroll({
    target: textContainerRef,
    offset: ['start 0.85', 'start 0.01'],
  });

  const scrollYProgress = isStickyCapable ? desktopProgress : mobileProgress;

  return (
    <div ref={containerRef} className="about-scroll-container" id="about">
      <div className="about-sticky">
        <div className="halftone-bg" aria-hidden="true"></div>

        <section className="about-section">
          <div className="title-container">
            <h1 className="title-about">ABOUT</h1>
            <h1 className="title-me">
              ME
              <div className="image-container">
                <img src={Profile} alt="Bereket" />
                <motion.div
                  className="overlay"
                  initial={{ x: '0%' }}
                  whileInView={{ x: '100%' }}
                  viewport={{ once: false, margin: "0px 0px -20% 0px" }}
                  transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
                />
              </div>
            </h1>
          </div>

          <div ref={textContainerRef} className="text-container">
            <p className="about-skills-label">ABOUT ME</p>
            <RevealText
              text={BIO}
              progress={scrollYProgress}
              startOffset={0}
              endOffset={0.68}
            />

            <p className="about-skills-label">Skills &amp; Technologies</p>
            <RevealText
              text={SKILLS}
              progress={scrollYProgress}
              startOffset={0.70}
              endOffset={1}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;