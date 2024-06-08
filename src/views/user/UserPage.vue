<template>
  <el-container>
    <el-aside class="el-aside">
      <h5 style="text-align: center">导航栏</h5>
      <el-menu
        ref="ruleFormRef"
        background-color="#e0e5df"
        class="el-menu-vertical-demo"
        default-active="/user/info"
        style="border-width: 0"
        @close="handleClose"
        @open="handleOpen"
        @select="handleSelect"
      >
        <el-menu-item index="/user/screen">
          <el-icon>
            <DataLine />
          </el-icon>
          <span>数据大屏</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon>
              <Notebook />
            </el-icon>
            <span>记账管理</span>
          </template>
          <el-menu-item index="/user/label">
            <el-icon>
              <CollectionTag />
            </el-icon>
            分类标签
          </el-menu-item>
          <el-menu-item index="/user/info">
            <el-icon>
              <Document />
            </el-icon>
            记账信息
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/user/photo">
          <el-icon>
            <Picture />
          </el-icon>
          <span>照片墙</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="el-main">
      <routerView></routerView>
    </el-main>
  </el-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import router from '@/router'
import {
  DataLine,
  Notebook,
  Picture,
  Document,
  CollectionTag
} from '@element-plus/icons-vue'

const selectedMenuIndex = ref('/user/info')

const handleOpen = (index, indexPath) => {
  console.log(index, indexPath)
}
const handleClose = (index, indexPath) => {
  console.log(index, indexPath)
}
const handleSelect = (index) => {
  router.push(index)
  selectedMenuIndex.value = index
}
onMounted(() => {
  router.push(selectedMenuIndex.value)
})
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
