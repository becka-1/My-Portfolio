import React, { useId } from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();
  const maskId = useId();

  return (
    <button 
      type="button"
      className={`st-sunMoonThemeToggleBtn ${isDark ? 'is-dark' : ''} ${className}`.trim()}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <svg width={28} height={28} viewBox="0 0 20 20" fill="currentColor" stroke="none">
        <mask id={maskId}>
          <rect x={0} y={0} width={20} height={20} fill="white" />
          <circle cx={11} cy={3} r={8} fill="black" />
        </mask>
        <circle className="sunMoon" cx={10} cy={10} r={8} mask={`url(#${maskId})`} />
        <g>
          <circle className="sunRay sunRay1" cx={18} cy={10} r={1.5} />
          <circle className="sunRay sunRay2" cx={14} cy={16.928} r={1.5} />
          <circle className="sunRay sunRay3" cx={6} cy={16.928} r={1.5} />
          <circle className="sunRay sunRay4" cx={2} cy={10} r={1.5} />
          <circle className="sunRay sunRay5" cx={6} cy={3.1718} r={1.5} />
          <circle className="sunRay sunRay6" cx={14} cy={3.1718} r={1.5} />
        </g>
      </svg>
    </button>
  );
};

export default ThemeToggle;
