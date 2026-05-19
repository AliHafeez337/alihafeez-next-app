import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-animate="fade-up"]').forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.utils.toArray('[data-animate="fade-in"]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        });
      });

      gsap.utils.toArray('[data-animate="stagger"]').forEach((container) => {
        const items = container.querySelectorAll('[data-stagger-item]');
        gsap.from(items, {
          scale: 0.92,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);
}
