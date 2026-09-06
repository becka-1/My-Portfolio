import React from 'react';
import NavBar from '../components/NavBar';
import Landing from '../components/Landing';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

/**
 * Portfolio — main page assembler.
 * Import and add new sections here as you build them out.
 *
 * Suggested structure:
 *   <NavBar />        — fixed top navigation
 *   <Landing />       — hero / intro section       ← done
 *   <About />         — about me section           ← coming soon
 *   <Projects />      — project showcase           ← coming soon
 *   <Contact />       — contact section            ← coming soon
 */

const Portfolio = () => {
  return (
    <>
      <NavBar />
      <Landing />
      <About />
      <Projects />
      <Contact />

      {/* ── Add new sections below as you build them ── */}
      {/* <About /> */}
      {/* <Projects /> */}
      {/* <Contact /> */}
    </>
  );
};

export default Portfolio;
