import { CONTACT } from '@/lib/chat/constants';

/**
 * Opens Koalendar booking popup on site (data-koalendar-widget).
 * @see https://koalendar.com — Add to website → Popup widget / link
 */
export default function KoalendarLink({
  children,
  className = '',
  style,
  ...props
}) {
  return (
    <a
      href={CONTACT.koalendarUrl}
      data-koalendar-widget
      data-koa-type="link"
      className={className}
      style={style}
      {...props}
    >
      {children}
    </a>
  );
}
