
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
  const app = props.children?.props?.app ?? "Home";
  console.log('app', app);
  
  return (
    <>
      <main className={`${styles.main} ${app === "Home" ? styles.homeApp : ""} ${roboto_mono.className}`}>
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
        <div className={`${styles.headerFooter}  ${app === "Home" ? styles.homeAppHeaderFooter : ""}`}>
          <div className={styles.header}>
            <div>
              <h4>Ali Hafeez - The Programmer</h4>
              {/* <MainNavbar></MainNavbar> */}
            </div>
          </div>
          <div className={`${styles.footer} ${dancing_script.className}`}>
            <a
              href='https://drive.google.com/file/d/14y8cDraVvK34RX_5ro1USNXpa5AuoaUt/view'
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
              // href="https://join.skype.com/invite/yNc8wg7iVj3X"
              href="https://wa.me/+923048737860"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Let&apos;s be friends.</strong>
            </a>
          </div>
        </div>

        {app === "Home" && <div className={styles.content}>
          <div>
            {props.children}
          </div>
        </div>}

      </main>
      {app !== "Home" && (<div>
        <div>
          {props.children}
        </div>
      </div>)}
    </>
  )
}

export default MainLayout;