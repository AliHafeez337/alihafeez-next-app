import { useEffect } from 'react';

export function useCustomCursor(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return undefined;
    if (window.matchMedia('(max-width: 700px)').matches) return undefined;

    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return undefined;

    let x = 0;
    let y = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px)`;
    };

    const animateRing = () => {
      ringX += (x - ringX) * 0.15;
      ringY += (y - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      rafId = requestAnimationFrame(animateRing);
    };

    const onPointerDown = () => {
      ring.classList.add('is-clicking');
    };

    const onPointerUp = () => {
      ring.classList.remove('is-clicking');
    };

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]';

    const onOver = (e) => {
      if (e.target.closest(interactiveSelector)) {
        ring.classList.add('is-hover');
      }
    };

    const onOut = (e) => {
      if (e.target.closest(interactiveSelector)) {
        ring.classList.remove('is-hover');
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    rafId = requestAnimationFrame(animateRing);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [enabled]);
}
