
// import './Section3.css';
import microsoft from '../../assets/microsoft.svg';
import twitter from '../../assets/twitter.svg';
import ola from '../../assets/ola.svg';
import underline2 from '../../assets/underline2.svg';
import Slider from '../../components/Slider/Slider';
import Image from 'next/image';

function Seciton3() {
  const data = [microsoft, twitter, ola];

  return (
    <section className='app-section3'>
      <div className='section3-text'>
        <h1>
          <div>
            <span>Trusted by</span>
            <Image src={underline2} alt="underline" />
          </div>
        </h1>
        <p className='dim'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae, in tristique senectus dui pharetra sit.</p>
      </div>
      <Slider data={data}></Slider>
    </section>
  )
}

export default Seciton3;