# /meeting-confirmed — setup and verification

Shared demo confirmation page. Every variant's "Book a Call" opens the same
Calendly event, and Calendly redirects to `https://sparkinventory.com/meeting-confirmed`
after a booking. The Google Ads conversion is counted on that page load.

## (a) Calendly settings to change (manual, not in code)

Do this once in the Calendly dashboard. It applies to every landing page variant,
because they all book through the same event.

1. Calendly, go to **Event Types**.
2. Open the event used by the site: the 30 minute meeting at
   `calendly.com/jason-sparkinventory/30min`.
3. Open its settings and find the **Confirmation Page** option (it appears while
   editing the event, sometimes labeled "On confirmation" or under the booking
   page options).
4. Choose **Redirect to an external site**.
5. Set the redirect URL to:
   ```
   https://sparkinventory.com/meeting-confirmed
   ```
6. Turn **on** "Pass event details to your redirect." This appends the invitee
   name and start time to the URL, which the page uses to personalize the
   headline and the date and time. The page still looks correct if this is off,
   it just shows a generic headline and "See your email" for the time.
7. Save.

Notes:
- This is the only place the redirect is configured. There is nothing to change
  in the repo for it.
- The redirect lands on our own domain, so the Google Ads click id (gclid) and
  its cookie carry through and the conversion is attributed to the ad.
- The site opens Calendly as a popup. Calendly's redirect still applies to popups,
  it sends the top window to the confirmation URL after the booking completes.

## (b) Google Ads conversion

The conversion is a URL based action pointing at `/meeting-confirmed`, which you
already updated. It fires from the Google tag (`AW-17962279599`) that loads on
every page. Because the Calendly redirect is a full page load, the tag reports a
page view for `/meeting-confirmed` and the URL rule counts one conversion.

What changed in code to support this:
- The old click based conversion on "Book a Call" was removed, so clicks are no
  longer counted.
- `/book-a-call` no longer fires a conversion, it only redirects.
- No conversion snippet was added to `/meeting-confirmed`, on purpose. With a URL
  based action, adding a snippet would double count. If you would rather use an
  event snippet conversion (with a conversion label), tell me and I will wire the
  one line event on the page and you would then remove the URL rule.

## How to verify (Tag Assistant)

1. Open `tagassistant.google.com`, add domain `sparkinventory.com`, and start a
   debug session (or use the Tag Assistant Chrome extension).
2. On the site, accept the cookie banner so ad storage is granted. Without
   consent the conversion still counts but as a modeled, cookieless hit.
3. Click "Book a Call", complete a real test booking in the Calendly popup.
4. Calendly redirects to `/meeting-confirmed`. In Tag Assistant confirm:
   - the Google Ads tag `AW-17962279599` fires a page view on that URL, and
   - the URL based conversion action records exactly one conversion.
5. Confirm it does NOT fire earlier: clicking "Book a Call" and opening the popup
   should show only normal page activity, no conversion. Visiting `/book-a-call`
   should redirect with no conversion.
6. In Google Ads, Goals then Conversions, the action should read "Recording
   conversions" and show the test within a few hours.

Acceptance: one conversion per completed booking, fired on `/meeting-confirmed`,
never on the click or the booking step, and the same for every variant.
