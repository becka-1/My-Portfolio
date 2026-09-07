import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProjectCard from './ProjectCard';
import './Projects.css';

import project1 from '../assets/projects/project1.jpg';
import project2 from '../assets/projects/project2.jpg';
import project3 from '../assets/projects/project3.jpg';
import project4 from '../assets/projects/project4.jpg';
import project5 from '../assets/projects/project5.jpg';

const PROJECTS = [
  {
    id: 1,
    url: project1,
    tag: 'Full-Stack · React · Node.js',
    title: 'Portfolio Website',
    description:
      'A personal portfolio built with React and Framer Motion, featuring animated sections, a sticky scroll text reveal, and a horizontal project carousel.',
    href: '#',
  },
  {
    id: 2,
    url: project2,
    tag: 'Backend · Express · PostgreSQL',
    title: 'REST API Platform',
    description:
      'A scalable REST API service with JWT authentication, role-based access control, and a PostgreSQL database, fully documented with Swagger.',
    href: '#',
  },
  {
    id: 3,
    url: project3,
    tag: 'AI · Python · TensorFlow',
    title: 'Image Classifier',
    description:
      'A deep-learning image classifier trained on a custom dataset achieving 94 % accuracy, deployed as a Flask micro-service with a React front-end.',
    href: '#',
  },
  {
    id: 4,
    url: project4,
    tag: 'Full-Stack · Next.js · Prisma',
    title: 'Task Manager App',
    description:
      'A real-time collaborative task manager with drag-and-drop boards, live notifications via WebSockets, and a Prisma/PostgreSQL backend.',
    href: '#',
  },
  {
    id: 5,
    url: project5,
    tag: 'Mobile · React Native',
    title: 'Fitness Tracker',
    description:
      'A cross-platform fitness tracking app built with React Native, featuring workout logging, progress charts, and a custom REST API backend.',
    href: '#',
  },
];

/* ── Horizontal scroll carousel ── */
const HorizontalCarousel = () => {
  const [transformRange, setTransformRange] = useState(['20%', '-40%']);

  useEffect(() => {
    const updateRange = () => {
      // Card rail is approx 1612px wide. We want to translate it enough so the 
      // last card is fully visible on any screen size.
      if (window.innerWidth <= 850) {
        // On mobile, the rail is much wider than the screen, so we need to move it further
        setTransformRange(['5%', '-1400px']);
      } else {
        // Desktop default
        setTransformRange(['20%', '-40%']);
      }
    };
    updateRange();
    window.addEventListener('resize', updateRange);
    return () => window.removeEventListener('resize', updateRange);
  }, []);

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  /* Maps scroll 0→1 to horizontal translation of the card rail. */
  const x = useTransform(scrollYProgress, [0, 1], transformRange);

  return (
    <section ref={targetRef} id="projects" className="projects-scroll-track">
      <div className="projects-sticky">

        <div className="projects-heading">
          <h1 className="projects-title">PROJECTS</h1>
          <p className="projects-subtitle">A selection of things I've built</p>
        </div>

        <div className="projects-rail-viewport">
          <motion.div className="projects-rail" style={{ x }}>
            {PROJECTS.map((card) => (
              <ProjectCard key={card.id} card={card} />
            ))}
          </motion.div>
        </div>

        <div className="projects-scroll-indicator">
          <span className="indicator-text">Keep scrolling</span>
          <div className="indicator-mouse">
            <svg width="14" height="20" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="28" rx="8"></rect>
              <motion.circle
                cx="12"
                cy="8"
                r="2.5"
                fill="currentColor"
                stroke="none"
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HorizontalCarousel;