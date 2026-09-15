import { useRef, useEffect, useId, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const registry = new Map();
let globalListenerAttached = false;

function onGlobalMouseMove(e) {
  let winnerId = null;
  let winnerDist = Infinity;

  for (const [id, entry] of registry) {
    const el = entry.ref.current;
    if (!el) continue;

    const { left, top, width, height } = el.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    const attractRx = width / 2 + entry.padding;
    const attractRy = height / 2 + entry.padding;
    const attractDist = (dx / attractRx) ** 2 + (dy / attractRy) ** 2;

    const releaseRx = width / 2 + entry.releasePad;
    const releaseRy = height / 2 + entry.releasePad;
    const releaseDist = (dx / releaseRx) ** 2 + (dy / releaseRy) ** 2;

    const inAttract = attractDist < 1;
    const inRelease = entry.attracted && releaseDist < 1;

    if (inAttract || inRelease) {
      const euclidean = Math.sqrt(dx * dx + dy * dy);
      if (euclidean < winnerDist) {
        winnerDist = euclidean;
        winnerId = id;
      }
    }
  }

  for (const [id, entry] of registry) {
    const el = entry.ref.current;
    if (!el) continue;

    if (id === winnerId) {
      const { left, top, width, height } = el.getBoundingClientRect();
      const dx = e.clientX - (left + width / 2);
      const dy = e.clientY - (top + height / 2);
      entry.attracted = true;
      entry.rawX.set(dx * entry.strength);
      entry.rawY.set(dy * entry.strength);
    } else {
      entry.attracted = false;
      entry.rawX.set(0);
      entry.rawY.set(0);
    }
  }
}

const MagneticButton = ({ children, strength = 0.5, padding = 50, releasePad = 80 }) => {
  const id = useId();
  const ref = useRef(null);

  const [isHoverable, setIsHoverable] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : true
  );

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 10, mass: 0.6 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const handler = (e) => setIsHoverable(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isHoverable) return;

    registry.set(id, { ref, rawX, rawY, strength, padding, releasePad, attracted: false });

    if (!globalListenerAttached) {
      window.addEventListener('mousemove', onGlobalMouseMove);
      globalListenerAttached = true;
    }

    return () => {
      registry.delete(id);
      if (registry.size === 0) {
        window.removeEventListener('mousemove', onGlobalMouseMove);
        globalListenerAttached = false;
      }
    };
  }, [id, rawX, rawY, strength, padding, releasePad, isHoverable]);

  if (!isHoverable) {
    return <div style={{ display: 'inline-block' }}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ x, y, display: 'inline-block' }}>
      {children}
    </motion.div>
  );
};

export default MagneticButton;
