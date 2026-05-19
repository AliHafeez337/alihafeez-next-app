import { useEffect } from 'react';
import { useExperienceStore } from '@/store/useExperienceStore';

export function useMouseParallax(enabled) {
  const setMouse = useExperienceStore((s) => s.setMouse);

  useEffect(() => {
    if (!enabled) return undefined;

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled, setMouse]);
}
