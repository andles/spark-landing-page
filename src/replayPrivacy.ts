// Preserve visual structure without copying arbitrary DOM attributes into replay.
// Keep this policy aligned with the web app.
const visualAttributes = new Set([
  'class', 'width', 'height', 'viewbox', 'd', 'fill', 'stroke', 'stroke-width',
  'stroke-linecap', 'stroke-linejoin', 'xmlns', 'role', 'type',
]);

function isPublicStylesheet(element: Element): boolean {
  if (element.tagName.toLowerCase() !== 'link' || element.getAttribute('rel') !== 'stylesheet') return false;
  try {
    const url = new URL(element.getAttribute('href') || '', element.ownerDocument.baseURI);
    return url.origin === new URL(element.ownerDocument.baseURI).origin
      && url.pathname.startsWith('/assets/') && url.pathname.endsWith('.css')
      && !url.search && !url.hash;
  } catch { return false; }
}

export function maskReplayAttribute(name: string, value: string, element?: Element): string {
  if (!element) return '*'.repeat(value.length);
  const attribute = name.toLowerCase();
  if (visualAttributes.has(attribute) && !/url\s*\(|attr\s*\(|var\s*\(/i.test(value)) return value;
  // rrweb inlines the public Vite stylesheet into this generated attribute.
  // Masking it destroys the entire replay's layout and theme.
  if (isPublicStylesheet(element) && ['_csstext', 'href', 'rel', 'media'].includes(attribute)) return value;
  if (attribute === 'src' && element.tagName.toLowerCase() === 'img') {
    try {
      const url = new URL(value, element.ownerDocument.baseURI);
      if (url.origin === new URL(element.ownerDocument.baseURI).origin && !url.search && !url.hash
        && /\.(?:svg|png|jpe?g|webp|avif)$/i.test(url.pathname)) return value;
    } catch { /* Invalid asset URLs remain masked. */ }
  }
  // Recorder-generated geometry keeps blocked content in its original position.
  if (['rr_width', 'rr_height', 'rr_left', 'rr_top', 'rr_position', 'rr_transform', 'rr_display', 'rr_scrollleft', 'rr_scrolltop'].includes(attribute)) return value;
  return '*'.repeat(value.length);
}
