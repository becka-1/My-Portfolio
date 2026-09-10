import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProjectCard from './ProjectCard';
import './Projects.css';

import project1 from '../assets/projects/project1.jpg';
import project2 from '../assets/projects/project2.jpg';
import project3 from '../assets/projects/project3.jpg';

const PROJECTS = [
  {
    id: 1,
    url: project1,
    tag: 'Full-Stack · React · Node.js · PostgreSQL · Socket.io · OAuth',
    title: 'Local Services Marketplace',
    description:
      'A full-stack marketplace that connects users with local service providers. Users can discover and search for services, manage listings and profiles, submit service requests, track request status, and communicate through real-time messaging.',
    href: 'https://github.com/becka-1/local-services-marketplace-v2',
    github: 'https://github.com/becka-1/local-services-marketplace-v2',
  },
  {
    id: 2,
    url: project2,
    tag: 'Front-End · React · framer-motion · CSS',
    title: 'My New Portfolio Website',
    description:
      'A scalable REST API service with JWT authentication, role-based access control, and a PostgreSQL database, fully documented with Swagger.',
    href: 'https://becka-1.github.io/Portfolio-Website/',
    github: 'https://github.com/becka-1/Portfolio-Website',
  },
  {
    id: 3,
    url: project3,
    tag: 'Front-End · HTML · Vanilla CSS · Vanilla JavaScript',
    title: 'My Last Portfolio Website',
    description:
      'A deep-learning image classifier trained on a custom dataset achieving 94 % accuracy, deployed as a Flask micro-service with a React front-end.',
    href: 'https://becka-1.github.io/Portfolio-Website/',
    github: 'https://github.com/becka-1/Portfolio-Website',
  },
  // {
  //   id: 4,
  //   url: project4,
  //   tag: 'Full-Stack · Next.js · Prisma',
  //   title: 'Task Manager App',
  //   description:
  //     'A real-time collaborative task manager with drag-and-drop boards, live notifications via WebSockets, and a Prisma/PostgreSQL backend.',
  //   href: '#',
  //   github: 'https://github.com/',
  // }
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

        // Start further right, but don't travel as far left
        const startTravel = window.innerWidth > 850 ? 250 : 100;
        const endTravel = window.innerWidth > 850 ? 50 : 20; // Reduced this so it doesn't go too far left

        const maxScroll = Math.max(0, railWidth - viewportWidth + maskRight) + endTravel;

        // Start from maskLeft + startTravel so the cards come in from further right
        setTransformRange([`${maskLeft + startTravel}px`, `-${maxScroll}px`]);
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