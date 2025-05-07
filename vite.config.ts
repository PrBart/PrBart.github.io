import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import fs from 'fs'

function spa404Plugin() {
  return {
    name: 'spa-404-plugin',
    closeBundle() {
      const indexPath = path.resolve(__dirname, 'dist/index.html')
      const notFoundPath = path.resolve(__dirname, 'dist/404.html')
      fs.copyFileSync(indexPath, notFoundPath)
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), spa404Plugin()],
})
