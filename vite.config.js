import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'

function resolve(dir) {
  return join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/wall/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('src')
    },
  },
  build: {
    outDir: 'dist/wall'
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    disableHostCheck: true,
    open: true,
  },
})
