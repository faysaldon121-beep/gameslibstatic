import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages project sites set VITE_BASE=/your-repo-name/ at build time.
// For Cloudflare Pages / user pages leave it as '/'.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
  server: {
    host: true,
    allowedHosts: true,
  },
  preview: {
    host: true,
    allowedHosts: true,
  },
})
