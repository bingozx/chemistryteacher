<template>
  <div :class="store.mobileOpenState ? 'left hidden' : 'left'">
    <Message />
    <div class="nav-buttons">
      <button 
        class="nav-button" 
        :class="{ active: currentView === 'home' }"
        @click="switchView('home')"
      >
        首页
      </button>
      <button 
        class="nav-button" 
        :class="{ active: currentView === 'courses' }"
        @click="switchView('courses')"
      >
        课件展示
      </button>
    </div>
    <SocialLinks />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { mainStore } from "@/store";
import Message from "@/components/Message.vue";
import SocialLinks from "@/components/SocialLinks.vue";

const store = mainStore();
const currentView = ref('home')

const switchView = (view) => {
  currentView.value = view
  store.currentView = view
}
</script>

<style lang="scss" scoped>
.left {
  // flex: 1 0 0%;
  width: 50%;
  margin-right: 10px;
  transform: translateY(20px);
  &.hidden {
    display: none;
  }
  @media (max-width: 720px) {
    margin-right: 0;
    width: 100%;
  }
  
  .nav-buttons {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
    
    .nav-button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      background: var(--card-bg);
      color: var(--text-color);
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: var(--hover-color);
        color: var(--text-light);
      }
      
      &.active {
        background: var(--accent-color);
        color: var(--text-light);
      }
    }
  }
}
</style>
