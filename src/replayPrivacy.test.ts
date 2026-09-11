import { describe, expect, it } from 'vitest';
import { maskReplayAttribute } from './replayPrivacy';

function element(tagName = 'DIV', attributes: Record<string, string> = {}): Element {
  return { tagName, getAttribute: (name: string) => attributes[name] || null,
    ownerDocument: { baseURI: 'https://sparkinventory.com/' } } as unknown as Element;
}

describe('replay attribute privacy', () => {
  it('preserves CSS classes and the bundled stylesheet', () => {
    expect(maskReplayAttribute('class', 'grid md:grid-cols-2', element())).toBe('grid md:grid-cols-2');
    const stylesheet = element('LINK', {rel:'stylesheet',href:'/assets/index-abc.css'});
    expect(maskReplayAttribute('_cssText', '.grid{display:grid}', stylesheet)).toBe('.grid{display:grid}');
    expect(maskReplayAttribute('href', '/assets/index-abc.css', stylesheet)).toBe('/assets/index-abc.css');
  });
  it('masks customer attributes, form values, URLs and inline styles', () => {
    for (const name of ['title','aria-label','data-customer','value','href','id','style']) {
      expect(maskReplayAttribute(name, 'customer-secret', element())).not.toContain('customer-secret');
    }
    expect(maskReplayAttribute('class', 'bg-[url(customer-secret)]', element())).not.toContain('customer-secret');
  });
  it('preserves public image assets without query strings', () => {
    expect(maskReplayAttribute('src', '/logos/shopify.svg', element('IMG'))).toBe('/logos/shopify.svg');
    expect(maskReplayAttribute('src', '/avatar.png?token=secret', element('IMG'))).not.toContain('secret');
  });
  it('does not exempt private or external stylesheets', () => {
    for (const href of ['/assets/theme.css?token=secret','https://external.example/theme.css','/customer/theme.css']) {
      expect(maskReplayAttribute('_cssText', 'customer-secret', element('LINK',{rel:'stylesheet',href}))).not.toContain('customer-secret');
    }
  });
});
