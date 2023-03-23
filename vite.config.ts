import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({ resolvers: [ElementPlusResolver()], }), Components({ resolvers: [ElementPlusResolver()], })],
  server:{ host: '127.0.0.1', port: 30000 },
  resolve: {
    dedupe: ["vue"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@组件": path.resolve(__dirname, "./src/components"),
      "@页面": path.resolve(__dirname, "./src/views"),
      "@仓库": path.resolve(__dirname, "./src/stores"),
    },
  },
  css: {
    /* CSS 预处理器 */
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/全局.scss";'
      }
    }
  },

})
