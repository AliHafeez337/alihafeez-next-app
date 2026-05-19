# Ali Hafeez Portfolio App - Documentation

## Project Overview

A single-page portfolio website built with Next.js 13.4.9. The app displays a professional introduction with a personal photo, header branding, and footer links to a CV and WhatsApp contact.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 13.4.9 | React framework for routing and rendering |
| React | 18.2.0 | UI library |
| next/font/google | Built-in | Google Fonts integration (Roboto Mono, Dancing Script) |
| CSS Modules | Built-in | Component-scoped styling |

## Dependencies

```json
{
  "next": "13.4.9",
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "eslint": "8.44.0",
  "eslint-config-next": "13.4.9"
}
```

## Project Structure

```
ali-next-web-2/
├── components/
│   └── layouts/
│       ├── Main_Layout.js
│       └── Main_Layout.module.css
├── pages/
│   ├── _app.js
│   ├── _document.js
│   └── index.js
├── public/
│   ├── MAS_5458-nbg1.png
│   ├── favicon.ico
│   ├── next.svg
│   └── vercel.svg
├── static/
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   └── site.webmanifest
├── styles/
│   └── globals.css
├── package.json
├── next.config.js
├── jsconfig.json
└── README.md
```

## File Descriptions

### pages/_app.js

The root component that wraps every page. It imports global styles and applies the MainLayout to all pages.

```javascript
import '@/styles/globals.css'
import MainLayout from '@/components/layouts/Main_Layout'

export default function App({ Component, pageProps }) {
  return <MainLayout><Component {...pageProps} /></MainLayout>
}
```

**What it does:**
- Imports global CSS
- Wraps every page with MainLayout component
- Passes page props through to the active page

### pages/_document.js

Customizes the HTML document structure. Runs on the server side.

```javascript
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

**What it does:**
- Sets HTML language to English
- Adds favicon links for multiple device sizes
- Includes a web app manifest for PWA support
- Renders the main app content and Next.js scripts

### pages/index.js

The home page component. Displays a single centered image.

```javascript
import Image from 'next/image';
import img5461 from '../public/MAS_5458-nbg1.png';

export default function Home() {
  return <Image
    src={img5461}
    alt="My picture."
    style={{
      width: 'auto',
      height: '80vh',
    }}
  />
}
```

**What it does:**
- Imports the Next.js Image component for optimized images
- Imports a local image from the public folder
- Renders the image at 80% of viewport height
- Width adjusts automatically to maintain aspect ratio

### components/layouts/Main_Layout.js

The main layout wrapper that provides consistent header, footer, and page structure across the app.

```javascript
import Head from 'next/head';
import { Roboto_Mono, Dancing_Script } from 'next/font/google'
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
  
  return (
    <>
      <main className={`${styles.main} ${app === "Home" ? styles.homeApp : ""} ${roboto_mono.className}`}>
        <Head>
          <title>Ali Hafeez</title>
          <meta name='description' content='Ali Hafeez Website' />
          <meta name="viewport" content='initial-scale=1.0, width=device-width' />
        </Head>
        <div className={`${styles.headerFooter}  ${app === "Home" ? styles.homeAppHeaderFooter : ""}`}>
          <div className={styles.header}>
            <div>
              <h4>Ali Hafeez - The Programmer</h4>
            </div>
          </div>
          <div className={`${styles.footer} ${dancing_script.className}`}>
            <a href='https://drive.google.com/file/d/14y8cDraVvK34RX_5ro1USNXpa5AuoaUt/view' target="_blank" rel="noopener" className={roboto_mono.className}>
              <h4>View my CV</h4>
            </a>
            <p>&nbsp;and&nbsp;</p>
            <a href="https://wa.me/+923048737860" target="_blank" rel="noopener noreferrer">
              <strong>Let's be friends.</strong>
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
```

**What it does:**
- Loads two Google Fonts: Roboto Mono (monospace) and Dancing Script (cursive)
- Sets page title and meta description in the Head
- Displays a header with the name "Ali Hafeez - The Programmer"
- Displays a footer with CV link and WhatsApp contact
- Conditionally renders content based on which page is active
- Uses CSS Modules for scoped styling

**Key logic:**
- Extracts an `app` prop from child components to determine layout behavior
- Home page gets special styling (`homeApp` class and centered content wrapper)
- Non-home pages render children directly without the content wrapper

### components/layouts/Main_Layout.module.css

CSS Module providing scoped styles for the main layout.

```css
.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: radial-gradient(
    farthest-corner at 50%,
    rgb(50, 50, 50) 0%,
    rgb(0, 0, 0) 50%
  );
}

.headerFooter {
  display: inherit;
  justify-content: inherit;
  align-items: inherit;
  flex-direction: column;
  font-size: 0.85rem;
  max-width: var(--max-width);
  width: 100%;
  z-index: 2;
  font-family: var(--font-mono);
}

.header {
  width: 100%;
  align-items: center;
  inset: 0 0 auto;
  padding: 1rem 1.4rem;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid rgba(var(--callout-border-rgb), 0.25);
  background: linear-gradient(
    to bottom,
    rgba(var(--background-start-rgb), 1),
    rgba(var(--callout-rgb), 0.5)
  );
  background-clip: padding-box;
  backdrop-filter: blur(24px);
  display: flex;
  justify-content: center;
  text-align: center;
  color: rgb(var(--foreground-rgb));
}

.content {
  padding: 2.5rem 0 1rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.content div {
  width: var(--width);
  display: flex;
  justify-content: center;
}

.footer {
  padding: 0.5rem;
  display: flex;
}

.homeApp {
  min-height: 100vh;
}

.homeAppHeaderFooter {
  height: 100vh;
  position: absolute;
}

@media (max-width: 700px) {
  .content div {
    width: var(--width-mobile);
  }
}
```

**Styling breakdown:**

| Class | Purpose |
|-------|---------|
| `.main` | Creates flex container with dark radial gradient background |
| `.header` | Sticky-style header with blur effect and bottom border |
| `.content` | Centers the main page content horizontally |
| `.footer` | Horizontal layout for footer links |
| `.homeApp` | Makes main container full viewport height for home page |
| `.homeAppHeaderFooter` | Positions header/footer absolutely over the home page image |
| `@media` | Responsive adjustments for mobile screens |

### components/navbars/Main_Navbar.js

Navigation component (currently commented out in Main_Layout).

```javascript
import Link from 'next/link';
import styles from './Main_Navbar.module.css';

function MainNavbar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/portfolio">Portfolio</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  )
}

export default MainNavbar;
```

**What it does:**
- Provides navigation links for Home, Portfolio, and Contact pages
- Uses Next.js Link component for client-side navigation
- Currently not active in the layout (commented out)

### styles/globals.css

Global CSS reset and CSS variable definitions.

```css
:root {
  --max-width: 1100px;
  --width: 700px;
  --width-mobile: calc(100% - 40px);
  --border-radius: 12px;
  --font-mono: ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono',
    'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro',
    'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace;

  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 0, 0, 0;
  --background-end-rgb: 0, 0, 0;

  --callout-rgb: 20, 20, 20;
  --callout-border-rgb: 108, 108, 108;
  --card-rgb: 100, 100, 100;
  --card-border-rgb: 200, 200, 200;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

a {
  color: inherit;
  text-decoration: none;
}
```

**What it does:**
- Defines CSS custom properties (variables) for consistent sizing and colors
- Sets white text on dark background globally
- Resets margins and padding
- Removes default underline from links

### public/ folder

Contains static assets:
- `MAS_5458-nbg1.png` - Personal profile photo
- `favicon.ico` - Browser favicon
- `next.svg`, `vercel.svg` - Next.js and Vercel branding images

### static/ folder

Contains PWA icons:
- `apple-touch-icon.png` - iOS home screen icon
- `favicon-16x16.png`, `favicon-32x32.png` - Standard favicons
- `android-chrome-192x192.png`, `android-chrome-512x512.png` - Android icons
- `site.webmanifest` - Web app manifest file

## How Pages Render

1. **User requests any page** → Next.js server handles the request
2. **_document.js** → Sets up HTML structure with favicons
3. **_app.js** → Wraps everything with MainLayout
4. **MainLayout** → Adds header, footer, and applies global styling
5. **Page component (index.js)** → Renders the specific content

## Visual Design

**Color Scheme:**
- Background: Radial gradient from dark gray to black
- Text: White
- Header: Semi-transparent with blur effect
- Links: White, no underline

**Typography:**
- Main text: Roboto Mono (monospace)
- Footer cursive text: Dancing Script
- Fallback: System monospace fonts

**Layout:**
- Header sticks to top with blur effect
- Content centered horizontally
- Footer at bottom with CV and WhatsApp links
- Personal image takes 80% of viewport height

## Current Limitations

| Issue | Description |
|-------|-------------|
| No navigation | Main_Navbar exists but is commented out |
| Single page | Only home page is functional |
| No portfolio showcase | Portfolio page route exists but has no content |
| Hidden i2c page | Complete i2c-assessment page exists but no way to navigate to it |

## Available Scripts

```bash
npm run dev      # Starts development server
npm run build    # Creates production build
npm run start    # Runs production server
npm run lint     # Runs ESLint
npm run export   # Exports static HTML files
```

## Configuration Files

### next.config.js
Standard Next.js configuration (content not provided but file exists)

### jsconfig.json
Enables absolute imports using `@/` prefix for cleaner import paths