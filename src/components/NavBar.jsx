import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import './NavBar.css';

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const DURATION = 0.19;
const STAGGER = 0.025;

const FlipLink = ({ children, href, isActive }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.a
      initial="initial"
      animate={isActive ? "hovered" : "initial"}
      whileHover="hovered"
      href={href}
      onClick={handleClick}
      className={`nav-link ${isActive ? 'active' : ''}`}
    >
      {/* Top layer — slides up on hover */}
      <div className="nav-link-top">
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            className="nav-link-span"
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
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

      {/* Bottom layer — slides in from below on hover */}
      <div className="nav-link-bottom">
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            className="nav-link-span"
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
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

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    // Wait a tick to ensure elements are mounted
    setTimeout(() => {
      NAV_LINKS.forEach((link) => {
        const id = link.href.replace("#", "");
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo"><MagneticButton>Bereket</MagneticButton></div>
      <div className="navbar-links">
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.href.replace("#", "");
          return (
            <FlipLink key={link.label} href={link.href} isActive={isActive}>
              {link.label}
            </FlipLink>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;