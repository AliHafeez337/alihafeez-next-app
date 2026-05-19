import Head from 'next/head';
import { Urbanist, Roboto_Mono, Dancing_Script } from 'next/font/google';
import { useLenis } from '@/hooks/useLenis';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import { useCustomCursor } from '@/hooks/useCustomCursor';
import { profile } from '@/content/profile';
import BackgroundGrid from './BackgroundGrid';
import Cursor from './Cursor';
import Header from './Header';
import Footer from './Footer';
import styles from './PortfolioLayout.module.scss';

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
  variable: '--font-urbanist',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing',
});

export default function PortfolioLayout({ children }) {
  useLenis(true);
  useScrollAnimations();
  useCustomCursor(true);

  return (
  <>
    <Head>
      <title>{profile.name} — Portfolio</title>
      <meta
        name="description"
        content={`${profile.name} — ${profile.tagline}. Programmer portfolio.`}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <div
      className={`${styles.root} ${urbanist.variable} ${robotoMono.variable} ${dancingScript.variable} ${urbanist.className}`}
    >
      <BackgroundGrid />
      <Cursor />
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  </>
  );
}
