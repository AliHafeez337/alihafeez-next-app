// import './CardContent.css';
import Image from 'next/image';

function CardContent({ img, name, description }) {
  return (
    <div className='card-content'>
      <div className='card-img'><Image src={ img } alt="investment" /></div>
      <div className='card-text'>
        <div className='card-name'>{ name }</div>
        <div className='card-descrition'>{ description }</div>
      </div>
    </div>
  )
}

export default CardContent;