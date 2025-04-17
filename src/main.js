import { createApp } from "vue";
import "@/style/style.scss";
import App from "@/App.vue";
// 引入 pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// 引入路由
import router from '@/router'
// swiper
import "swiper/css";
// Element Plus
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.mount("#app");

// PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) => {
    console.log('SW registered:', registration);
  }).catch((error) => {
    console.log('SW registration failed:', error);
  });

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    ElMessage({
      message: "站点已更新，刷新后生效",
      type: "success",
      duration: 3000
    });
  });
}
