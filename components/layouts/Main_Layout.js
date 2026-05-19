
import Head from 'next/head';
import SiteFooter from './SiteFooter';
import styles from './Main_Layout.module.css';

function MainLayout(props) {
  const app = props.children?.props?.app ?? "Home";
  return (
    <>
      <main className={`${styles.main} ${app === "Home" ? styles.homeApp : ""}`}>
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
              <p className={styles.siteTitle}>Ali Hafeez - The Programmer</p>
              {/* <MainNavbar></MainNavbar> */}
            </div>
          </div>
          <div className={styles.footer}>
            <SiteFooter />
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