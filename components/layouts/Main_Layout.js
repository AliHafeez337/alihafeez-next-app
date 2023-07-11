
import Head from 'next/head';
import { Roboto_Mono, Dancing_Script } from 'next/font/google'
// import MainNavbar from '../navbars/Main_Navbar'
import styles from './Main_Layout.module.css'


const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
})

const dancing_script = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
})

function MainLayout(props) {
  return (
    <main className={`${styles.main} ${roboto_mono.className}`}>
      <Head>
        <title>Ali Hafeez</title>
        <meta
          name='description'
          content='Ali Hafeez Website'
        />
        <meta
          name="viewport"
          content='initial-scale=1.0, width=device-width'
        />
      </Head>
      <div className={styles.headerFooter}>
        <div className={styles.header}>
          <div>
            <h4>Ali Hafeez - The Programmer</h4>
            {/* <MainNavbar></MainNavbar> */}
          </div>
        </div>
        <div className={`${styles.footer} ${dancing_script.className}`}>
          <a
            href='https://drive.google.com/file/d/1IN-fUzfdvQHLBOJNir473YtO3DAmAraY/view?usp=sharing'
            target="_blank"
            rel="noopener"
            className={roboto_mono.className}
          >
            <h4>View my CV</h4>
          </a>
          <p>
            &nbsp;
            and
            &nbsp;
          </p>
          <a
            href="https://join.skype.com/invite/yNc8wg7iVj3X"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Let&apos;s be friends.</strong>
          </a>
        </div>
      </div>

      <div className={styles.content}>
        <div>
          {props.children}
        </div>
      </div>

    </main>
  )
}

export default MainLayout;