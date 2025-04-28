import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/eidex/',
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})