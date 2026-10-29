import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // Relative base so the same build works at a domain root or a GitHub Pages subpath.
  base: './',
  plugins: [react(), tailwindcss()],
})
