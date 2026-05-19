import dynamic from 'next/dynamic';

const ExperiencePage = dynamic(
  () => import('@/components/experience/ExperiencePage'),
  { ssr: false }
);

export default function Home() {
  return <ExperiencePage />;
}
