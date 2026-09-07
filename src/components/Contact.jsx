import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import GithubIcon from '../assets/icons/Github.svg';
import LinkedInIcon from '../assets/icons/LinkedIn.svg';
import TelegramIcon from '../assets/icons/Telegram.svg';
import './Contact.css';

const socials = [
  { label: 'GitHub', href: 'https://github.com/', icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/', icon: LinkedInIcon },
  { label: 'Telegram', href: 'https://telegram.com/', icon: TelegramIcon },
];

const details = [
  { label: 'Email', value: 'bereketmelaku887@gmail.com', href: 'mailto:bereketmelaku887@gmail.com', icon: Mail },
  { label: 'Phone', value: '+251973112607', href: 'tel:+251973112607', icon: Phone },
  { label: 'Location', value: 'Addis Ababa, Ethiopia', href: null, icon: MapPin },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1], delay },
});

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-shell">

        {/* ── Centered heading ── */}
        <header className="contact-heading">
          <motion.p className="contact-eyebrow" {...fadeUp(0)}>
            Have a project in mind?
          </motion.p>
          <motion.h1 id="contact-title" {...fadeUp(0.08)}>
            Let's make something<br /><span>remarkable.</span>
          </motion.h1>
          <motion.p className="contact-intro" {...fadeUp(0.15)}>
            I'm always open to thoughtful collaborations, ambitious products,
            and good conversations about the web.
          </motion.p>
        </header>

        {/* ── Two-column grid ── */}
        <div className="contact-grid">

          {/* Left: details + socials */}
          <motion.div className="contact-info" {...fadeUp(0.18)}>
            <div className="contact-details">
              {details.map(({ label, value, href, icon: Icon }) => (
                <div className="contact-detail" key={label}>
                  <div className="contact-detail-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="contact-detail-label">{label}</p>
                    {href
                      ? <a href={href}>{value}</a>
                      : <p>{value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-socials">
              <p className="contact-detail-label">Elsewhere on the internet</p>
              <div className="social-links">
                {socials.map(({ label, href, icon }) => (
                  <a
                    className="social-link"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    key={label}
                  >
                    <img src={icon} alt="" className="social-icon" />
                    <span>{label}</span>
                    <ArrowUpRight size={14} strokeWidth={1.7} className="social-arrow" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            className="contact-form"
            {...fadeUp(0.22)}
            onSubmit={handleSubmit}
          >

            <div className="form-row">
              <label>
                <span>Your name</span>
                <input id="contact-name" type="text" name="name" placeholder="Jane Smith" required />
              </label>
              <label>
                <span>Email address</span>
                <input id="contact-email" type="email" name="email" placeholder="jane@company.com" required />
              </label>
            </div>
            <label>
              <span>What can I help with?</span>
              <input id="contact-subject" type="text" name="subject" placeholder="A new digital experience" required />
            </label>
            <label>
              <span>Tell me a little more</span>
              <textarea id="contact-message" name="message" rows="5" placeholder="Share a few details about your project..." required />
            </label>
            <motion.button
              id="contact-send"
              type="submit"
              className="contact-submit"
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.span
                    key="sent"
                    className="contact-btn-inner"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    ✓ Message sent!
                  </motion.span>
                ) : (
                  <motion.span
                    key="send"
                    className="contact-btn-inner"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    Send message <Send size={17} strokeWidth={1.8} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>

        </div>

        {/* ── Footer bar ── */}
        <footer className="contact-footer">
          <span>Available for select freelance projects</span>
          <span className="contact-status">
            {/* <i aria-hidden="true" /> */}
            Currently accepting inquiries
          </span>
        </footer>

      </div>
    </section>
  );
}
