import { createApp } from "vue";
import "@/style/style.scss";
import App from "@/App.vue";

// 创建应用实例
const app = createApp(App);

// 错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err);
  console.error('Error Info:', info);
};

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus);

// Pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

// Router
import router from '@/router'
app.use(router);

// Swiper
import "swiper/css";

// 挂载应用
app.mount("#app");

// PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered:', registration);

      registration.addEventListener("controllerchange", () => {
        ElementPlus.ElMessage({
          message: "站点已更新，刷新后生效",
          type: "success",
          duration: 3000
        });
      });
    } catch (error) {
      console.error('SW registration failed:', error);
    }
  });
}
