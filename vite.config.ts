import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    hmr:true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.ts', '.json', '.jsx', '.tsx', '.css']
  }
})
