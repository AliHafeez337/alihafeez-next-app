import Script from 'next/script';

export default function KoalendarScripts() {
  return (
    <>
      <Script id="koalendar-stub" strategy="afterInteractive">
        {`window.Koalendar=window.Koalendar||function(){(Koalendar.props=Koalendar.props||[]).push(arguments)};`}
      </Script>
      <Script
        id="koalendar-widget"
        src="https://koalendar.com/assets/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && window.Koalendar) {
            window.Koalendar('init');
          }
        }}
      />
    </>
  );
}
