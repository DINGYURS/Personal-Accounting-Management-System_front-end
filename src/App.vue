<script setup>
import { provide } from 'vue'
import * as echarts from 'echarts'

provide('echarts', echarts)
</script>

<template>
  <div>
    <router-view></router-view>
    <!--    <el-button @click="$router.push('/home')">跳转到首页</el-button>-->

    <!--    <p>{{ userstore.token }}</p>-->
    <!--    <el-button @click="userstore.setToken('登录信息')">登录</el-button>-->
    <!--    <el-button @click="userstore.removenToken()">退出</el-button>-->
  </div>
</template>

<style scoped></style>
