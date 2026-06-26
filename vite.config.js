import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import tailwindcss from '@tailwindcss/vite'

 

// Deployed to GitHub Pages project site at /Personal-Website/.

// `base` controls the public path for built assets; Router uses the same

// value (via import.meta.env.BASE_URL) as its basename.

export default defineConfig({

  base: '/Personal-Website/',

  plugins: [react(), tailwindcss()],

})

 