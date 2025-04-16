<template>
  <div class="courses-view">
    <div class="header">
      <h1>ChemTeacher白的化学课件</h1>
      <p class="subtitle">人教版初中化学精品课件</p>
    </div>
    
    <CoursePreview />
    
    <div class="contact-section">
      <h2>获取完整课件</h2>
      <div class="contact-methods">
        <div class="contact-card">
          <img :src="xiaohongshuIcon" alt="小红书" />
          <p>小红书号：ZXX711618</p>
        </div>
        <div class="contact-card">
          <img :src="douyinIcon" alt="抖音" />
          <p>抖音号：ZXX711618</p>
        </div>
        <div class="contact-card">
          <img :src="wechatIcon" alt="微信" />
          <p>扫码添加微信</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CoursePreview from '@/components/CoursePreview/index.vue'
import xiaohongshuIcon from '@/assets/images/icon/xiaohongshu.png'
import douyinIcon from '@/assets/images/icon/douyin.png'
import wechatIcon from '@/assets/images/icon/wechat.png'
</script>

<style lang="scss" scoped>
.courses-view {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  .header {
    text-align: center;
    margin-bottom: 2rem;
    
    h1 {
      color: var(--accent-color);
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    .subtitle {
      color: var(--text-color);
      opacity: 0.8;
    }
  }
  
  .contact-section {
    margin-top: 3rem;
    text-align: center;
    
    h2 {
      color: var(--accent-color);
      margin-bottom: 1.5rem;
    }
    
    .contact-methods {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
      
      .contact-card {
        background: var(--card-bg);
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px var(--shadow-color);
        transition: transform 0.3s ease;
        
        &:hover {
          transform: translateY(-5px);
        }
        
        img {
          width: 48px;
          height: 48px;
          margin-bottom: 1rem;
        }
        
        p {
          color: var(--text-color);
          font-weight: 500;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .courses-view {
    padding: 1rem;
    
    .contact-methods {
      flex-direction: column;
      align-items: center;
      
      .contact-card {
        width: 100%;
        max-width: 300px;
      }
    }
  }
}
</style> 