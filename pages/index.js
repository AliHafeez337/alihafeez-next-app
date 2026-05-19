import Image from 'next/image';
import img5461 from '../public/MAS_5458-nbg1.png';
import CareerChatShell from '@/components/chat/CareerChatShell';
import styles from './Home.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.homeSplit}>
        <div className={styles.photoCol}>
          <Image
            src={img5461}
            alt="Ali Hafeez"
            priority
            style={{
              width: 'auto',
              height: '80vh',
              maxWidth: '100%',
            }}
          />
        </div>
      </div>
      <CareerChatShell />
    </>
  );
}
