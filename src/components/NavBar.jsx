import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import Hamburger from "./Hamburger";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo/logo.svg";
import './NavBar.css';

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const DURATION = 0.19;
const STAGGER = 0.025;

const FlipLink = ({ children, href, isActive, onClick, delay = 0 }) => {
  const [isTapped, setIsTapped] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsTapped(true);

    // Allow animation to play before closing and scrolling
    setTimeout(() => {
      const id = href.replace('#', '');
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      if (onClick) onClick();
      setIsTapped(false);
    }, 400); // 400ms delay for the flip animation
  };

  return (
    <motion.a
      initial="initial"
      animate={isActive || isTapped ? "hovered" : "initial"}
      whileHover="hovered"
      href={href}
      onClick={handleClick}
      className={`nav-link ${isActive ? 'active' : ''}`}
    >
      {/* Top layer — slides up on hover/tap */}
      <div className="nav-link-top">
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            className="nav-link-span"
            variants={{
              initial: { y: 0, opacity: 1 },
              hovered: { y: "-100%", opacity: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>

      {/* Bottom layer — slides in from below on hover/tap */}
      <div className="nav-link-bottom">
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            className="nav-link-span"
            variants={{
              initial: { y: "100%", opacity: 0 },
              hovered: { y: 0, opacity: 1 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

const MobileMenuLink = ({ children, href, isActive, onClick, index }) => {
  const [isTapped, setIsTapped] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsTapped(true);

    setTimeout(() => {
      const id = href.replace('#', '');
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      if (onClick) onClick();
      setIsTapped(false);
    }, 400);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1 + index * 0.1,
      }
    }
  };

  const topLetterVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: isActive ? '-100%' : 0,
      opacity: isActive ? 0 : 1,
      transition: { type: 'spring', damping: 14, stiffness: 90 }
    }
  };

  const bottomLetterVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: isActive ? 0 : '100%',
      opacity: isActive ? 1 : 0,
      transition: { type: 'spring', damping: 14, stiffness: 90 }
    }
  };

  return (
    <motion.a
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      href={href}
      onClick={handleClick}
      className={`nav-link ${isActive ? 'active' : ''}`}
    >
      <div className="nav-link-top">
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            className="nav-link-span"
            variants={isTapped ? undefined : topLetterVariants}
            animate={isTapped ? { y: "-100%", opacity: 0 } : undefined}
            transition={isTapped ? { duration: DURATION, ease: "easeInOut", delay: STAGGER * i } : undefined}
          >
            {l}
          </motion.span>
        ))}
      </div>

      <div className="nav-link-bottom">
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            className="nav-link-span"
            variants={isTapped ? undefined : bottomLetterVariants}
            animate={isTapped ? { y: 0, opacity: 1 } : undefined}
            transition={isTapped ? { duration: DURATION, ease: "easeInOut", delay: STAGGER * i } : undefined}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const centerY = window.innerHeight / 2;
      let newActiveId = "";

      // Iterate backwards so that deeper sections take priority if they overlap the center
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const id = NAV_LINKS[i].href.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if this section spans across the middle of the viewport
          if (rect.top <= centerY && rect.bottom >= centerY) {
            newActiveId = id;
            break;
          }
        }
      }

      if (newActiveId) {
        setActiveSection(newActiveId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once after initial render to set the correct active link
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 850 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleLogoClick = () => {
    if (isMenuOpen) setIsMenuOpen(false);
    const target = document.getElementById('home');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Bereket Melaku Logo" className="navbar-logo-img" />
      </div>

      {/* Desktop Links */}
      <div className="navbar-links desktop-only">
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.href.replace("#", "");
          return (
            <FlipLink
              key={link.label}
              href={link.href}
              isActive={isActive}
            >
              {link.label}
            </FlipLink>
          );
        })}
      </div>

      <div className="navbar-right desktop-only">
        <ThemeToggle />
      </div>

      {/* Mobile Links */}
      <div className={`navbar-links mobile-only ${isMenuOpen ? "mobile-open" : ""}`}>
        {isMenuOpen && NAV_LINKS.map((link, i) => {
          const isActive = activeSection === link.href.replace("#", "");
          return (
            <MobileMenuLink
              key={link.label}
              href={link.href}
              isActive={isActive}
              index={i}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </MobileMenuLink>
          );
        })}
      </div>

      <div className="navbar-controls mobile-controls">
        <ThemeToggle />
        <div className="mobile-menu-btn">
          <Hamburger isOpen={isMenuOpen} toggle={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;