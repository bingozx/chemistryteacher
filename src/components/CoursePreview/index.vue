<template>
  <div class="course-preview-container">
    <div class="filter-section">
      <div class="grade-filter">
        <el-radio-group v-model="currentGrade" @change="filterCourses">
          <el-radio-button label="九上">九年级上</el-radio-button>
          <el-radio-button label="九下">九年级下</el-radio-button>
        </el-radio-group>
      </div>
      <div class="chapter-filter">
        <el-select v-model="currentChapter" placeholder="选择章节" @change="filterCourses">
          <el-option
            v-for="chapter in chapters[currentGrade]"
            :key="chapter.value"
            :label="chapter.label"
            :value="chapter.value"
          />
        </el-select>
      </div>
    </div>

    <div class="courses-grid">
      <div 
        v-for="course in filteredCourses" 
        :key="course.id" 
        class="course-card cards"
        @click="previewCourse(course)"
      >
        <div class="course-thumbnail">
          <img :src="course.thumbnail" :alt="course.title" />
        </div>
        <div class="course-info">
          <h3>{{ course.title }}</h3>
          <p>{{ course.description }}</p>
        </div>
      </div>
    </div>

    <!-- 预览弹窗 -->
    <el-dialog
      v-model="previewVisible"
      :title="currentCourse.title"
      width="80%"
      class="preview-dialog"
    >
      <div class="preview-content">
        <img :src="currentCourse.preview" :alt="currentCourse.title" />
      </div>
      <div class="preview-footer">
        <p>如需完整课件，请通过以下方式联系：</p>
        <div class="contact-info">
          <span>小红书号：ZXX711618</span>
          <span>抖音号：ZXX711618</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 年级选择
const currentGrade = ref('九上')

// 章节数据
const chapters = {
  '九上': [
    { label: '第一单元 走进化学世界', value: 'unit1' },
    { label: '第二单元 身边的化学物质', value: 'unit2' },
    { label: '第三单元 物质构成的奥秘', value: 'unit3' },
    { label: '第四单元 自然界中的化学物质', value: 'unit4' }
  ],
  '九下': [
    { label: '第五单元 化学反应', value: 'unit5' },
    { label: '第六单元 碳和碳的氧化物', value: 'unit6' },
    { label: '第七单元 燃料与金属资源的利用', value: 'unit7' }
  ]
}

const currentChapter = ref('')

// 课件数据（示例）
const coursesData = ref([
  {
    id: 1,
    grade: '九上',
    unit: 'unit1',
    title: '第1课时 化学与生活',
    description: '走进化学世界，认识化学与生活的关系',
    thumbnail: '/images/courses/thumbnail1.jpg',
    preview: '/images/courses/preview1.jpg'
  },
  // ... 其他课时数据
])

// 过滤课件
const filteredCourses = computed(() => {
  return coursesData.value.filter(course => {
    if (currentChapter.value) {
      return course.grade === currentGrade.value && course.unit === currentChapter.value
    }
    return course.grade === currentGrade.value
  })
})

// 预览相关
const previewVisible = ref(false)
const currentCourse = ref({})

const previewCourse = (course) => {
  currentCourse.value = course
  previewVisible.value = true
}

const filterCourses = () => {
  // 过滤逻辑已通过计算属性实现
}
</script>

<style lang="scss" scoped>
.course-preview-container {
  padding: 20px;
  
  .filter-section {
    margin-bottom: 20px;
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .courses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    padding: 20px 0;
  }

  .course-card {
    cursor: pointer;
    overflow: hidden;
    
    .course-thumbnail {
      width: 100%;
      height: 160px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }
    
    .course-info {
      padding: 15px;
      
      h3 {
        font-size: 16px;
        margin-bottom: 8px;
        color: var(--accent-color);
      }
      
      p {
        font-size: 14px;
        color: var(--text-color);
        opacity: 0.8;
      }
    }
    
    &:hover {
      .course-thumbnail img {
        transform: scale(1.05);
      }
    }
  }
}

.preview-dialog {
  .preview-content {
    text-align: center;
    
    img {
      max-width: 100%;
      max-height: 70vh;
      object-fit: contain;
    }
  }
  
  .preview-footer {
    margin-top: 20px;
    text-align: center;
    
    .contact-info {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      gap: 20px;
      
      span {
        color: var(--accent-color);
        font-weight: bold;
      }
    }
  }
}
</style> 