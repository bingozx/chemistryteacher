import { createApp } from "vue";
import "@/style/style.scss";
import App from "@/App.vue";
// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入 pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// 引入路由
import router from '@/router'
// swiper
import "swiper/css";

const app = createApp(App);
const pinia = createPinia();

// 初始化 Pinia
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

// 初始化 Element Plus
app.use(ElementPlus);

// 初始化路由
app.use(router);

// 挂载应用
app.mount("#app");

// 错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err);
  console.error('Error Info:', info);
};

// PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('SW registered:', registration);
    }).catch((error) => {
      console.log('SW registration failed:', error);
    });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      ElementPlus.ElMessage({
        message: "站点已更新，刷新后生效",
        type: "success",
        duration: 3000
      });
    });
  });
}
