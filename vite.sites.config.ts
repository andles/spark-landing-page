import { cloudflare } from '@cloudflare/vite-plugin'
import { sites } from '@openai/sites-vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // This shareable review host must not compete with sparkinventory.com.
  define: { 'import.meta.env.VITE_SITE_NOINDEX': JSON.stringify('true') },
  plugins: [
    react(),
    tailwindcss(),
    sites(),
    cloudflare({ configPath: './wrangler.sites.jsonc' }),
  ],
})
