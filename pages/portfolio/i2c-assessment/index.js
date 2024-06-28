
// import './App.css';
import Background from './ui/Background/Background';
import Header from './ui/Header/Header';
import Section1 from './ui/Section1/Section1';
import Section2 from './ui/Section2/Section2';
import Section3 from './ui/Section3/Section3';
import Section4 from './ui/Section4/Section4';
import Divider from './components/Divider/Divider';
import Footer from './ui/Footer/Footer';

function i2cApp() {
  const header1 = ['About us', 'Registration', 'Careers']
  const header2 = ['FAQs', 'Privacy Policy', 'Other']

  return (
    <div className="i2c-app">
      <Background></Background>
      <Header data={header1}></Header>
      <Section1></Section1>
      <Section2></Section2>
      <Section3></Section3>
      <Section4></Section4>
      <Divider></Divider>
      <Header data={header2} style={{ marginBottom: '0px' }}></Header>
      <Footer></Footer>
    </div>
  )
}

export default i2cApp;