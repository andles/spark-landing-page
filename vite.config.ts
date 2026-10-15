import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Inline the stylesheet into the HTML so the first paint does not wait for a
// second request. In Lighthouse's headless Chrome, a page that is still
// waiting for its stylesheet about 200ms after the navigation commits misses
// a compositor window and paints a full second later, which is what the
// simulated mobile score measures. The CSS is about 23 KB compressed.
function inlineStylesheet(): Plugin {
  return {
    name: 'spark:inline-stylesheet',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, { bundle }) {
        return html.replace(
          /<link rel="stylesheet" crossorigin href="\/(assets\/[^"]+\.css)">/g,
          (tag, fileName: string) => {
            const asset = bundle?.[fileName]
            if (asset?.type !== 'asset') return tag
            const css = String(asset.source)
            return css.includes('</style') ? tag : `<style>${css}</style>`
          },
        )
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), inlineStylesheet()],
})
