import { useEffect, useState } from 'react';
import { consentLaw, isOptOutLaw, subscribeAnalyticsConsent } from '../analyticsConsent';

// CookieYes opens its preference center (or, under the US notice, its opt-out
// center) when an element with the cky-banner-element class is clicked. US
// visitors see the label the state privacy laws require for that link. The
// prerendered page starts with the neutral label until CookieYes reports the law.
export function PrivacyChoicesButton() {
  const [law, setLaw] = useState('');
  useEffect(() => {
    const update = () => setLaw(consentLaw());
    update();
    return subscribeAnalyticsConsent(update);
  }, []);
  return (
    <div className="text-center text-slate-300">
      <button type="button" className="cky-banner-element spark-privacy">
        {isOptOutLaw(law) ? 'Do Not Sell or Share My Personal Information' : 'Privacy preferences'}
      </button>
    </div>
  );
}
