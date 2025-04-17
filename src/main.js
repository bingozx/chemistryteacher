// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 样式
import "@/style/style.scss";

// Vue
import { createApp } from "vue";
import App from "@/App.vue";

// Pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// Router
import router from '@/router'

// Swiper
import "swiper/css";

// 创建应用实例
const app = createApp(App);

// 错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err);
  console.error('Error Info:', info);
};

// 初始化 Element Plus
app.use(ElementPlus);

// 初始化 Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

// 初始化路由
app.use(router);

// 挂载应用
app.mount("#app");

// PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered:', registration);

      registration.addEventListener("controllerchange", () => {
        app.config.globalProperties.$message({
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
