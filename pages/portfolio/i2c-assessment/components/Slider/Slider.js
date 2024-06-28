// import './Slider.css';
import arrowLeft from '../../assets/arrowLeft.svg';
import arrowRight from '../../assets/arrowRight.svg';
import { useMemo, useState } from 'react';
import Button from '../Button/Button';
import Image from 'next/image';

function Slider({ data }) {
  const [startIdx, setStartIdx] = useState(0);

  const arrangedData = useMemo(
    () => ([
      ...data.filter((_, i) => i >= startIdx),
      ...data.filter((_, i) => i < startIdx)
    ]),
    [startIdx, data]
  )

  const handlePrevClick = () => {
    setStartIdx(prev => {
      if (prev === 0) {
        return data.length - 1;
      }
      return prev - 1;
    });
  }

  const handleNextClick = () => {
    setStartIdx(prev => (prev + 1) % data.length);
  }

  return (
    <div className='slider'>
      <Button className='arrow-left' handleClick={handlePrevClick}>
        <Image src={arrowLeft} alt='arrowLeft'></Image>
      </Button>
      <div className='slides'>
        {
          arrangedData.map((d, i) => (
            <Image key={i} src={d} alt={i}></Image>
          ))
        }
      </div>
      <Button className='arrow-right' handleClick={handleNextClick}>
        <Image src={arrowRight} alt='arrowRight'></Image>
      </Button>
    </div>
  )
}

export default Slider;