import Image from 'next/image';
import img5461 from '../public/MAS_5458-nbg1.png';

export default function Home() {
  return <Image
    src={img5461}
    alt="My picture."
    // width={500} // automatically provided
    // height={500} // automatically provided
    style={{
      width: 'auto',
      height: '80vh',
    }}
  />
}
