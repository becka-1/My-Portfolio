import { motion } from 'framer-motion';
import { GithubIcon } from './SocialIcons';
import './ProjectCard.css';

const ProjectCard = ({ card }) => {
  return (
    <div className="project-card">
      {/* Image */}
      <div className="project-card__image-wrap">
        <img
          src={card.url}
          alt={card.title}
          className="project-card__image"
        />
        <div className="project-card__image-overlay" />
      </div>

      {/* Content */}
      <div className="project-card__content">
        <span className="project-card__tag">{card.tag}</span>
        <h2 className="project-card__title">{card.title}</h2>
        <p className="project-card__description">{card.description}</p>

        <div className="project-card__actions">
          <motion.a
            target="_blank"
            href={card.href}
            className="project-card__cta"
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            View Project
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </motion.a>

          <a
            href={card.github || 'https://github.com/'}
            target="_blank"
            rel="noreferrer"
            className="project-card__github"
            aria-label={`View ${card.title} source on GitHub`}
          >
            <GithubIcon size={20} className="project-card__github-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
