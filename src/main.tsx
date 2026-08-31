import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import RouteMetaUpdater from './seo/RouteMetaUpdater'

const app = (
  <StrictMode>
    <BrowserRouter>
      <RouteMetaUpdater />
      <App />
    </BrowserRouter>
  </StrictMode>
)

const container = document.getElementById('root')!

// Prerendered pages are hydrated; the plain SPA shell is rendered from
// scratch. `?variant=` URLs are also rendered from scratch. The prerendered
// homepage is the default variant, so hydrating a different variant into it
// would mismatch.
const hasVariant = new URLSearchParams(window.location.search).has('variant')
if (container.hasChildNodes() && !hasVariant) {
  hydrateRoot(container, app)
} else {
  container.innerHTML = ''
  createRoot(container).render(app)
}
