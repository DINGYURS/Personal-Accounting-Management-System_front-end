<template>
  <div class="main">
    <el-row class="header">
      <el-col :span="12"> MAKE IT POSSIBLE</el-col>
      <el-col :offset="6" :span="2">
        <svg aria-hidden="true" class="icon">
          <use xlink:href="#icon-home"></use>
        </svg>
        首页
      </el-col>
      <el-col :span="2">
        <svg aria-hidden="true" class="icon icon-tupian">
          <use xlink:href="#icon-tupian"></use>
        </svg>
        图片
      </el-col>
      <el-col :span="2">
        <svg aria-hidden="true" class="icon">
          <use xlink:href="#icon-yonghu"></use>
        </svg>
        关于
      </el-col>
    </el-row>
    <div class="element">
      <h1>计时</h1>
      <h2>
        {{ days }} 天 {{ hours }} 小时 {{ minutes }} 分
        <span class="breath">{{ seconds }}</span> 秒
      </h2>
      <!--          <img alt="照片" class="photo" src="@\assets\CX_20221112_092246.jpg" />-->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import '@/assets/iconfont/iconfont.js'

// 使用 ref 来创建响应式变量
const startTime = ref(new Date('2023-07-03T00:11:49').getTime())
const currentTime = ref(new Date().getTime())
let timer

// 使用 computed 来创建计算属性
const days = computed(() => {
  const elapsedTime = currentTime.value - startTime.value
  return Math.floor(elapsedTime / (24 * 60 * 60 * 1000))
})

const hours = computed(() => {
  const elapsedTime = currentTime.value - startTime.value
  return Math.floor((elapsedTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
})

const minutes = computed(() => {
  const elapsedTime = currentTime.value - startTime.value
  return Math.floor((elapsedTime % (60 * 60 * 1000)) / (60 * 1000))
})

const seconds = computed(() => {
  const elapsedTime = currentTime.value - startTime.value
  return Math.floor((elapsedTime % (60 * 1000)) / 1000)
})

// 使用 onMounted 和 onBeforeUnmount 替代 mounted 和 beforeDestroy
onMounted(() => {
  // 每秒更新时间
  timer = setInterval(() => {
    currentTime.value = new Date().getTime()
  }, 1000)
})

onBeforeUnmount(() => {
  // 清除定时器
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.icon-tupian {
  font-weight: bold;
  width: 16px;
  height: 16px;
}

.photo {
  max-width: 50%;
  height: auto;
  border-radius: 5px;
  //box-shadow: 10px 10px 15px 5px rgba(0, l 0, 0, 0.3);
}

.breath {
  animation: breathAnimation 1s infinite alternate;
}

.element {
  text-align: center;
}

.header {
  padding: 20px 0 20px 20px;
  backdrop-filter: blur(200px); /* 添加毛玻璃效果 */
  //background-blend-mode: lighten; /* 混合模式，根据背景图片调整毛玻璃效果颜色 */
}

.main {
  background: url('@/assets/CX_20221112_090203.jpg') center/cover no-repeat;
  height: 100vh; /* 设置为视口高度，或根据需要设置具体高度 */
}

@keyframes breathAnimation {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.1;
  }
}

.common-layout {
  background-color: orangered;
}
</style>
