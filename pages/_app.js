import '@/styles/globals.css'
import '@/pages/portfolio/i2c-assessment/App.css'
import '@/components/i2c-assessment/components/Button/Button.css';
import '@/components/i2c-assessment/components/Card/Card.css';
import '@/components/i2c-assessment/components/CardContent/CardContent.css';
import '@/components/i2c-assessment/components/Divider/Divider.css';
import '@/components/i2c-assessment/components/Registration/Registration.css';
import '@/components/i2c-assessment/components/Slider/Slider.css';
import '@/components/i2c-assessment/ui/Background/Background.css';
import '@/components/i2c-assessment/ui/Footer/Footer.css';
import '@/components/i2c-assessment/ui/Header/Header.css';
import '@/components/i2c-assessment/ui/Section1/Section1.css';
import '@/components/i2c-assessment/ui/Section2/Section2.css';
import '@/components/i2c-assessment/ui/Section3/Section3.css';
import '@/components/i2c-assessment/ui/Section4/Section4.css';
import MainLayout from '@/components/layouts/Main_Layout';
import KoalendarScripts from '@/components/koalendar/KoalendarScripts';
import { siteFont } from '@/lib/siteFont';

export default function App({ Component, pageProps }) {
  return (
    <div className={siteFont.className}>
      <KoalendarScripts />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </div>
  );
}
