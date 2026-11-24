/**
 * Single place for ad / analytics tracking. Everything that reports a call or a
 * lead goes through here, so each action is counted once and with the same data.
 *
 * Installed today (index.html): the Google tag (gtag.js) for Google Ads only.
 * There is no Google Tag Manager container, no GA4 property and no Meta Pixel
 * base code. Meta calls below are no-ops until a Pixel is installed.
 *
 * Google Ads conversion actions:
 *  - CALL: "Clique Botao Ligar Site" (existing action, fired on tel: link clicks).
 *  - LEAD: website form submissions. Until a dedicated "Form submit" conversion
 *    action is created in Google Ads, this reuses the CALL action so leads keep
 *    being counted for bidding. When you create it, paste its label here.
 */
export const GOOGLE_ADS_ID = 'AW-16885125181';

export const CONVERSIONS = {
  call: `${GOOGLE_ADS_ID}/Au3NCM3fmugbEL2guvM-`,
  // TODO: replace with the label of a dedicated "Form submit" conversion action.
  lead: `${GOOGLE_ADS_ID}/Au3NCM3fmugbEL2guvM-`,
} as const;

type Gtag = (...args: unknown[]) => void;
const gtag = (): Gtag | undefined =>
  typeof window !== 'undefined' && typeof (window as any).gtag === 'function' ? (window as any).gtag : undefined;
const fbq = (): Gtag | undefined =>
  typeof window !== 'undefined' && typeof (window as any).fbq === 'function' ? (window as any).fbq : undefined;

const newId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

// A double tap or a click that bubbles twice must not count as two calls.
let lastCallAt = 0;

/** A click on a tel: link. Does not navigate: the link opens the dialer itself. */
export function trackCallClick(phoneHref: string) {
  const now = Date.now();
  if (now - lastCallAt < 2000) return;
  lastCallAt = now;

  const page = typeof window !== 'undefined' ? window.location.pathname : '';
  gtag()?.('event', 'conversion', { send_to: CONVERSIONS.call });
  gtag()?.('event', 'click_to_call', { send_to: GOOGLE_ADS_ID, phone: phoneHref.replace('tel:', ''), page_path: page });
  fbq()?.('track', 'Contact');
}

/** A successfully delivered lead form. `form` names where it came from. */
export function trackLead(form: string, service?: string) {
  const transactionId = newId(); // lets Google Ads de-duplicate a resubmitted form
  const page = typeof window !== 'undefined' ? window.location.pathname : '';
  gtag()?.('event', 'conversion', { send_to: CONVERSIONS.lead, transaction_id: transactionId });
  gtag()?.('event', 'generate_lead', { send_to: GOOGLE_ADS_ID, form_name: form, service: service || '', page_path: page });
  fbq()?.('track', 'Lead', { content_name: service || form });
}

/**
 * Page view for in-app navigation. gtag('config') only sends one on the first
 * load; without this, remarketing audiences never see the later pages.
 */
export function trackPageView(path: string) {
  if (typeof window === 'undefined') return;
  gtag()?.('event', 'page_view', {
    send_to: GOOGLE_ADS_ID,
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
  fbq()?.('track', 'PageView');
}
