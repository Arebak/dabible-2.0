// Lightweight Google gtag helpers (Ads + Analytics)
// Safe to import client-side only

// (Global Window augmentation lives in typings.d.ts to avoid duplicate declaration clashes)

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-V6LG0JJJXY';
export const ADS_ID = process.env.NEXT_PUBLIC_GTAG_ADS_ID || 'AW-431305064';
export const ADS_CONVERSION_LABEL = process.env.NEXT_PUBLIC_ADS_CONVERSION_LABEL || '_5c_CIb78YkbEOji1M0B';

function pushDataLayer(obj: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(obj);
}

// For GTM-only approach, page view events should be configured inside GTM using history/route listener or manual push below.
export function trackPageView(url: string) {
  pushDataLayer({ event: 'page_view', page_path: url });
}

export function trackConversion(params?: { value?: number; currency?: string }) {
  pushDataLayer({
    event: 'conversion',
    send_to: `${ADS_ID}/${ADS_CONVERSION_LABEL}`,
    value: params?.value,
    currency: params?.currency || 'USD'
  });
}

export function trackCustom(eventName: string, payload?: Record<string, unknown>) {
  pushDataLayer({ event: eventName, ...payload });
}
