import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  define: {__BUILD_DATE__ : JSON.stringify(new Date().toISOString())},
  resolve: { alias: { '@': path.resolve(__dirname, 'src'),
                      '@shared' : path.resolve(__dirname, 'src/shared'),
                      '@timeline' : path.resolve(__dirname, 'src/features/timeline'),
                      '@sidebar' : path.resolve(__dirname, 'src/features/sidebar'),
                      '@media' : path.resolve(__dirname, 'src/features/media'),
   } },
})
