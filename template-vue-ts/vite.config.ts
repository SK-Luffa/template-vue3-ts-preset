import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/Abc': {
        target: 'https:/abc',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\Abc/, ''),
      },

    }
  },

})