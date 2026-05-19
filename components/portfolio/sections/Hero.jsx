import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { profile } from '@/content/profile';
import ScrollIcon from '../ScrollIcon';
import styles from './Hero.module.scss';
import portrait from '@/public/MAS_5458-nbg1.png';

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-hero="title"]', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.2,
      });
      gsap.from('[data-hero="portrait"]', {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.35,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.text}>
          <p data-hero="title" className={styles.eyebrow}>
            Hello, I&apos;m
          </p>
          <h1 data-hero="title" className={styles.name}>
            {profile.name}
          </h1>
          <p data-hero="title" className={styles.banner}>
            {profile.tagline}
          </p>
        </div>
        <div data-hero="portrait" className={styles.portraitWrap}>
          <div className={styles.hologram}>
            <Image
              src={portrait}
              alt={`Portrait of ${profile.name}`}
              priority
              className={styles.portrait}
              sizes="(max-width: 700px) 70vw, 320px"
            />
          </div>
        </div>
      </div>
      <div className={styles.scroll}>
        <ScrollIcon />
      </div>
    </section>
  );
}
