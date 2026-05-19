import { profile } from '@/content/profile';
import styles from './About.module.scss';

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.inner}>
        <div data-animate="fade-up" className={styles.visual}>
          <div className={styles.room}>
            <span className={styles.orbit} aria-hidden="true" />
            {profile.skills.slice(0, 6).map((skill, i) => (
              <span
                key={skill}
                className={styles.sphere}
                style={{ '--i': i }}
                data-cursor="pointer"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.copy}>
          <h2 data-animate="fade-up" className={styles.heading}>
            About
          </h2>
          <p data-animate="fade-up" className={styles.bio}>
            {profile.bio}
          </p>
          <div data-animate="fade-up" className={styles.skills}>
            {profile.skills.map((skill) => (
              <span key={skill} className={styles.tag}>
                {skill}
              </span>
            ))}
          </div>
          <div data-animate="fade-up" className={styles.timeline} data-lenis-prevent>
            <h3 className={styles.subheading}>Experience</h3>
            <div className={styles.timelineTrack}>
              {profile.experience.map((item) => (
                <article key={item.period} className={styles.timelineCard}>
                  <time>{item.period}</time>
                  <h4>{item.role}</h4>
                  <p className={styles.company}>{item.company}</p>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
