import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/content/projects';
import styles from './Projects.module.scss';

export default function Projects() {
  const [active, setActive] = useState(null);
  const activeProject = projects.find((p) => p.id === active);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <h2 data-animate="fade-up" className={styles.heading}>
          Projects
        </h2>
        <p data-animate="fade-up" className={styles.intro}>
          Selected work and experiments. Click a card for details.
        </p>
        <div data-animate="stagger" className={styles.grid}>
          {projects.map((project) => (
            <article
              key={project.id}
              data-stagger-item
              className={styles.card}
            >
              <button
                type="button"
                className={styles.cardInner}
                onClick={() => setActive(project.id)}
                aria-label={`View ${project.title}`}
              >
                <div className={styles.cardFace}>
                  <Image
                    src={project.image}
                    alt=""
                    width={400}
                    height={260}
                    className={styles.thumb}
                  />
                  <div className={styles.meta}>
                    <h3>{project.title}</h3>
                    <ul className={styles.tags}>
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={styles.cardBack}>
                  <p>{project.description}</p>
                  <span className={styles.cta}>View Project</span>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      {activeProject && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={() => setActive(null)}
          onKeyDown={(e) => e.key === 'Escape' && setActive(null)}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
          >
            <button
              type="button"
              className={styles.close}
              onClick={() => setActive(null)}
              aria-label="Close project details"
            >
              ×
            </button>
            <h3 id="project-modal-title">{activeProject.title}</h3>
            <p>{activeProject.detail.overview}</p>
            {activeProject.detail.stack?.length > 0 && (
              <p className={styles.stack}>
                <strong>Stack:</strong>{' '}
                {activeProject.detail.stack.join(', ')}
              </p>
            )}
            {activeProject.external ? (
              <a
                href={activeProject.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkBtn}
              >
                Open project
              </a>
            ) : (
              <Link href={activeProject.href} className={styles.linkBtn}>
                Open project
              </Link>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
