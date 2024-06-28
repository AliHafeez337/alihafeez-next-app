// import './Section4.css';
import registration from '../../assets/registration.svg';
import Regsitration from '../../components/Registration/Registration';
import Image from 'next/image';

function Section4() {
  return (
    <section className='app-section4'>
      <div className='section4-img'>
        <Image src={registration} alt="registration" />
      </div>
      <Regsitration>
      </Regsitration>
    </section>
  )
}

export default Section4;