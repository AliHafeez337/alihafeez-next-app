
// import './Section1.css'
import investment from '../../assets/investment.svg';
import underline from '../../assets/underline.svg';
import person0 from '../../assets/person0.svg';
import person1 from '../../assets/person1.svg';
import person2 from '../../assets/person2.svg';
import Card from '../../components/Card/Card';
import CardContent from '../../components/CardContent/CardContent';
import Image from 'next/image';

function Section1() {
  const people = [
    { id: 0, name: 'Andrew Schultz', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae, in tristique senectus dui pharetra sit.', img: person0 },
    { id: 1, name: 'Andrew Schultz', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae, in tristique senectus dui pharetra sit.', img: person1 },
    { id: 2, name: 'Andrew Schultz', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae, in tristique senectus dui pharetra sit.', img: person2 },
    { id: 3, name: 'Andrew Schultz', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae, in tristique senectus dui pharetra sit.', img: person0 }
  ]

  return (
    <section className="app-section1">
      <div>
        <h1>Lorem ipsum&#160;
          <div>
            <span style={{ color: '#46b0e6' }}>dolor</span>
            <Image src={underline} alt="underline" />
          </div>
          &#160;sit amet yo 👋</h1>
        <div className='people'>
          {people.map(person => (
            <Card key={person.id}>
              <CardContent img={person.img} name={person.name} description={person.description}></CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className='section1-img'>
        <Image src={investment} alt="investment" />
      </div>

    </section>
  )
}

export default Section1;


