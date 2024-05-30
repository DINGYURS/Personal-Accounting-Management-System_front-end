<template>
  <el-container>
    <el-aside class="el-aside">
      <h5 style="text-align: center">导航栏</h5>
      <el-menu
        ref="ruleFormRef"
        background-color="#e0e5df"
        class="el-menu-vertical-demo"
        default-active="1"
        style="border-width: 0"
        @close="handleClose"
        @open="handleOpen"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <el-icon>
            <DataLine />
          </el-icon>
          <span>数据大屏</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <Notebook />
            </el-icon>
            <span>记账管理</span>
          </template>
          <el-menu-item index="2-1"
            ><el-icon> <CollectionTag /> </el-icon>分类标签</el-menu-item
          >
          <el-menu-item index="2-2"
            ><el-icon> <Document /> </el-icon>记账信息</el-menu-item
          >
        </el-sub-menu>
        <el-menu-item index="3">
          <el-icon>
            <Picture />
          </el-icon>
          <span>照片墙</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="el-main">
      <DataDisplay v-if="selectedMenuIndex === '1'" />
      <CategoryLabel v-if="selectedMenuIndex === '2-1'" />
      <AccountInfo v-if="selectedMenuIndex === '2-2'" />
      <Photo v-if="selectedMenuIndex === '3'" />
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import AccountInfo from './AccountInfo.vue'
import DataDisplay from './DataDisplay.vue'
import CategoryLabel from './CategoryLabel.vue'
import Photo from './Photo.vue'
import {
  DataLine,
  Notebook,
  Picture,
  Document,
  CollectionTag
} from '@element-plus/icons-vue'

const selectedMenuIndex = ref('1')

const handleOpen = (index, indexPath) => {
  console.log(index, indexPath)
}
const handleClose = (index, indexPath) => {
  console.log(index, indexPath)
}
const handleSelect = (index) => {
  console.log('当前导航位置:', index)
  selectedMenuIndex.value = index
}
</script>
<style scoped>
.el-main {
  padding: 0;
  background-color: rgb(240, 242, 245);
}

.el-aside {
  width: 200px;
  text-align: center;
  height: 100vh;
  background-color: #e0e5df;
}
</style>
