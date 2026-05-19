import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useExperienceStore } from '@/store/useExperienceStore';
import { getCameraState } from '@/lib/three/waypoints';

gsap.registerPlugin(ScrollTrigger);

export function useScrollExperience(scrollRef, enabled) {
  const setScrollProgress = useExperienceStore((s) => s.setScrollProgress);
  const setSection = useExperienceStore((s) => s.setSection);

  useEffect(() => {
    if (!enabled || !scrollRef.current) return undefined;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const st = ScrollTrigger.create({
      trigger: scrollRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);
        const { section } = getCameraState(p);
        setSection(section);
      },
    });

    return () => {
      st.kill();
      gsap.ticker.remove(onTick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [enabled, scrollRef, setScrollProgress, setSection]);
}
