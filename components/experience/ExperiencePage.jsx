import { useRef } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Urbanist } from 'next/font/google';
import Preloader from './Preloader';
import UIChrome from './UIChrome';
import HeroOverlay from './overlays/HeroOverlay';
import AboutOverlay from './overlays/AboutOverlay';
import ProjectsOverlay from './overlays/ProjectsOverlay';
import ContactOverlay from './overlays/ContactOverlay';
import { useScrollExperience } from '@/hooks/useScrollExperience';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useModelsManifest } from '@/hooks/useModelsManifest';
import { useExperienceStore } from '@/store/useExperienceStore';
import { profile } from '@/content/profile';
import styles from './ExperiencePage.module.scss';

const ExperienceCanvas = dynamic(() => import('./ExperienceCanvas'), {
  ssr: false,
});

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
});

export default function ExperiencePage() {
  const scrollRef = useRef(null);
  const isReady = useExperienceStore((s) => s.isReady);
  const manifestReady = useModelsManifest();

  useScrollExperience(scrollRef, isReady);
  useMouseParallax(isReady);

  return (
    <>
      <Head>
        <title>{profile.name} — Portfolio</title>
        <meta
          name="description"
          content={`${profile.name} — ${profile.tagline}. ${profile.subtitle}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${styles.page} ${urbanist.className}`}>
        <Preloader />
        {isReady && manifestReady && <ExperienceCanvas />}
        <UIChrome />
        <HeroOverlay />
        <AboutOverlay />
        <ProjectsOverlay />
        <ContactOverlay />
        <div ref={scrollRef} className={styles.scrollTrack} id="scroll-root">
          <div className={styles.spacer} data-section="hero" id="hero" />
          <div className={styles.spacer} data-section="transition" />
          <div className={styles.spacer} data-section="about" id="about" />
          <div className={styles.spacer} data-section="projects" id="projects" />
          <div className={styles.spacer} data-section="contact" id="contact" />
        </div>
        <noscript>
          <p className={styles.noscript}>
            {profile.name} — Full-stack developer. Enable JavaScript for the 3D
            portfolio, or email {profile.email}.
          </p>
        </noscript>
      </div>
    </>
  );
}
