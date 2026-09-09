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
    github: 'https://github.com/',
  },
  {
    id: 2,
    url: project2,
    tag: 'Backend · Express · PostgreSQL',
    title: 'REST API Platform',
    description:
      'A scalable REST API service with JWT authentication, role-based access control, and a PostgreSQL database, fully documented with Swagger.',
    href: '#',
    github: 'https://github.com/',
  },
  {
    id: 3,
    url: project3,
    tag: 'AI · Python · TensorFlow',
    title: 'Image Classifier',
    description:
      'A deep-learning image classifier trained on a custom dataset achieving 94 % accuracy, deployed as a Flask micro-service with a React front-end.',
    href: '#',
    github: 'https://github.com/',
  },
  {
    id: 4,
    url: project4,
    tag: 'Full-Stack · Next.js · Prisma',
    title: 'Task Manager App',
    description:
      'A real-time collaborative task manager with drag-and-drop boards, live notifications via WebSockets, and a Prisma/PostgreSQL backend.',
    href: '#',
    github: 'https://github.com/',
  }
];

/* ── Horizontal scroll carousel ── */
const HorizontalCarousel = () => {
  const targetRef = useRef(null);
  const railRef = useRef(null);
  const viewportRef = useRef(null);

  const [transformRange, setTransformRange] = useState(['20%', '-25%']);

  useEffect(() => {
    const updateRange = () => {
      if (railRef.current && viewportRef.current) {
        const railWidth = railRef.current.scrollWidth;
        const viewportWidth = viewportRef.current.clientWidth;
        
        // Calculate padding to ensure cards don't touch the edges
        // Account for the CSS mask fade on both left and right sides of the viewport
        let maskLeft = 0;
        let maskRight = 0;
        
        if (window.innerWidth > 1100) {
          // 8% mask fade + clearance
          maskLeft = viewportWidth * 0.08;
          maskRight = (viewportWidth * 0.08) + 40;
        } else if (window.innerWidth > 850) {
          // 4% mask fade + clearance
          maskLeft = viewportWidth * 0.04;
          maskRight = (viewportWidth * 0.04) + 30;
        } else {
          // No mask on small screens, just standard padding
          maskLeft = 16;
          maskRight = window.innerWidth <= 600 ? 16 : 32;
        }
        
        const maxScroll = Math.max(0, railWidth - viewportWidth + maskRight);
        
        // Start from maskLeft so the first card clears the left fade
        setTransformRange([`${maskLeft}px`, `-${maxScroll}px`]);
      } else {
        // Fallback before refs are attached
        setTransformRange(['0px', '-1000px']);
      }
    };

    // Use a small timeout to ensure DOM is fully rendered before calculation
    const timeoutId = setTimeout(updateRange, 100);
    window.addEventListener('resize', updateRange);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateRange);
    };
  }, []);

  const { scrollYProgress } = useScroll({ 
    target: targetRef,
    offset: ["start start", "end end"]
  });

  /* Maps scroll 0→1 to horizontal translation of the card rail. */
  const x = useTransform(scrollYProgress, [0, 1], transformRange);

  return (
    <section ref={targetRef} id="projects" className="projects-scroll-track">
      <div className="projects-sticky">

        <div className="projects-heading">
          <h1 className="projects-title">PROJECTS</h1>
          <p className="projects-subtitle">A selection of things I've built</p>
        </div>

        <div ref={viewportRef} className="projects-rail-viewport">
          <motion.div ref={railRef} className="projects-rail" style={{ x }}>
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