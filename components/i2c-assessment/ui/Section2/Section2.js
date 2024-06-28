
// import './Section2.css';
import support from '../../assets/support.svg';
import reviews from '../../assets/reviews.svg';
import more from '../../assets/more.svg';
import Card from '../../components/Card/Card';
import CardContent from '../../components/CardContent/CardContent';

function Section2() {
  const data = [
    { id: 0, name: '24/7 Support', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: support },
    { id: 1, name: '1000+ of reviews', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: reviews },
    { id: 2, name: 'And more!', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: more }
  ]

  return (
    <section className="app-section2">
      <Card>
        {data.map(d => (
          <CardContent key={d.id} img={d.img} name={d.name} description={d.description}></CardContent>
        ))}
      </Card>
    </section>
  )
}

export default Section2;