/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue"],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
          type: 'module',
        },
        manifest: {
          name: "ChemTeacher白的化学课件",
          short_name: "化学课件",
          description: "人教版初中化学精品课件",
          theme_color: "#ffffff",
          start_url: "/",
          display: "standalone",
          background_color: "#ffffff",
          icons: [
            {
              src: "/images/icon/192.png",
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "/images/icon/512.png",
              sizes: "512x512",
              type: "image/png"
            }
          ]
        },
        workbox: {
          skipWaiting: true,
          clientsClaim: true,
          navigateFallback: 'index.html',
          navigateFallbackAllowlist: [/^\/$/],
          runtimeCaching: [
            {
              urlPattern: /(.*?)\.(js|css|woff2|woff|ttf)/, // js / css 静态资源缓存
              handler: "CacheFirst",
              options: {
                cacheName: "js-css-cache",
              },
            },
            {
              urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 图片缓存
              handler: "CacheFirst",
              options: {
                cacheName: "image-cache",
              },
            },
            {
              urlPattern: /^https:\/\/api\..*/, // API 请求缓存
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                networkTimeoutSeconds: 5,
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ],
        },
      }),
      viteCompression(),
    ],
    base: '/',
    server: {
      port: "3000",
      open: true,
      headers: {
        'Content-Security-Policy': `
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval';
          style-src 'self' 'unsafe-inline' https://s1.hdslb.com;
          img-src 'self' data: https:;
          font-src 'self' https://s1.hdslb.com;
          connect-src 'self' https:;
        `
      }
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/style/global.scss" as *;`,
        },
      },
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          pure_funcs: ["console.log"],
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'element-plus': ['element-plus'],
            'vue-vendor': ['vue', 'vue-router', 'pinia'],
          }
        }
      },
      chunkSizeWarningLimit: 1500,
      sourcemap: false
    },
  });
