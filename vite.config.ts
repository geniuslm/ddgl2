import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@组件": path.resolve(__dirname, "./src/components"),
      "@页面": path.resolve(__dirname, "./src/views"),
      "@仓库": path.resolve(__dirname, "./src/stores"),
    },
  },
})
