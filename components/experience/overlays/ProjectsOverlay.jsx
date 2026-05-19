import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/content/projects';
import { useExperienceStore } from '@/store/useExperienceStore';
import styles from './Overlays.module.scss';
import panelStyles from './ProjectsOverlay.module.scss';

export default function ProjectsOverlay() {
  const section = useExperienceStore((s) => s.section);
  const isReady = useExperienceStore((s) => s.isReady);
  const visible = isReady && section === 'projects';

  return (
    <section
      id="projects"
      className={`${styles.overlay} ${panelStyles.panel} ${visible ? styles.visible : ''}`}
      aria-hidden={!visible}
    >
      <h2 className={panelStyles.title}>Projects</h2>
      <div className={panelStyles.grid}>
        {projects.map((project) => (
          <article key={project.id} className={panelStyles.card}>
            <div className={panelStyles.thumbWrap}>
              <Image
                src={project.image}
                alt=""
                width={400}
                height={240}
                className={panelStyles.thumb}
              />
            </div>
            <div className={panelStyles.meta}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className={panelStyles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {project.external ? (
                <a href={project.href} target="_blank" rel="noopener noreferrer">
                  Open →
                </a>
              ) : (
                <Link href={project.href}>Open →</Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
