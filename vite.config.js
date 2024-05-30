import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // import.meta.env.BASE_URL 配置路径
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep']
        })
      ]
    }),
    Icons({
      autoInstall: true
    })
  ],
  server: {
    host: '0.0.0.0',
    cors: true,
    port: 8888,
    open: false, //自动打开
    proxy: {
      // 这里的ccc可乱写, 是拼接在url后面的地址 如果接口中没有统一的后缀可自定义
      // 如果有统一后缀, 如api, 直接写api即可, 也不用rewrite了
      '/api': {
        target: 'http://127.0.0.1:9000', // 真实接口地址, 后端给的基地址
        changeOrigin: true, // 允许跨域
        secure: false //设置是否使用安全连接（https）
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

// export default defineConfig({
//   plugins: [vue()],
//   optimizeDeps: {
//     include: ['schart.js']
//   },
//
//
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//       '@assets': path.resolve(__dirname, 'src/assets'),
//     },
//   },
// })
