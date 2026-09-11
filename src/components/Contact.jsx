import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { GithubIcon, LinkedInIcon, TelegramIcon } from './SocialIcons';
import './Contact.css';

const socials = [
  { label: 'GitHub', href: 'https://github.com/becka-1', icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bereket-melaku/', icon: LinkedInIcon },
  { label: 'Telegram', href: 'https://t.me/Bereketme_10', icon: TelegramIcon },
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      console.error("VITE_WEB3FORMS_ACCESS_KEY is missing. Please add it to your environment variables (e.g. in Vercel) and redeploy.");
      setErrorMessage("Contact form configuration error: Missing Web3Forms access key.");
      setIsSubmitting(false);
      return;
    }

    const formElement = e.target;
    const formData = new FormData(formElement);
    formData.append("access_key", accessKey);

    try {
      // Send directly as FormData (multipart/form-data).
      // Web3Forms recommends native FormData because it avoids CORS preflight (OPTIONS) requests.
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        setSent(true);
        setErrorMessage('');
        formElement.reset();
        setTimeout(() => setSent(false), 4000);
      } else {
        console.error("Form submission failed", data);
        setErrorMessage(data.message || "Something went wrong. Please try again or reach out directly.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setErrorMessage("Failed to send message. Please check your network connection or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-shell">
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
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    className="social-link"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    key={label}
                  >
                    <Icon size={20} className="social-icon" />
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

            {/* Web3Forms spam prevention & subject */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
            <input type="hidden" name="subject" value="New message from your Portfolio" />

            <label>
              <span>What can I help with?</span>
              <input id="contact-subject" type="text" name="Project_Details" placeholder="A new digital experience" required />
            </label>
            <label>
              <span>Tell me a little more</span>
              <textarea id="contact-message" name="message" rows="5" placeholder="Share a few details about your project..." required />
            </label>

            {errorMessage && (
              <p className="contact-form-error" role="alert">
                {errorMessage}
              </p>
            )}

            <motion.button
              id="contact-send"
              type="submit"
              className="contact-submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? {} : { scale: 1.02, translateY: -2 }}
              whileTap={isSubmitting ? {} : { scale: 0.97 }}
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
                ) : isSubmitting ? (
                  <motion.span
                    key="submitting"
                    className="contact-btn-inner"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    Sending...
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



      </div>
    </section>
  );
}
