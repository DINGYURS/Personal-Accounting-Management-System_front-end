<script setup>
import { ref, computed } from 'vue'

const currentDate = ref(new Date())

const formattedDate = computed(() => {
  const options1 = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const options2 = {
    weekday: 'long'
  }
  let date = currentDate.value.toLocaleDateString('zh-CN', options1)
  let week = currentDate.value.toLocaleDateString('zh-CN', options2)
  return date + ' ' + week
})

const showDropdown1 = ref(false)
const showDropdown2 = ref(false)
const showDropdown3 = ref(false)
const showDropdown4 = ref(false)
const showDropdown5 = ref(false)
const showDropdown6 = ref(false)
const showDropdown7 = ref(false)
const showDropdown8 = ref(false)
const showDropdown9 = ref(false)
const showDropdown10 = ref(false)
</script>

<template>
  <div class="top">
    <div class="top_inside">
      <div class="top_left">
        <span style="float: left">今天是：{{ formattedDate }}</span>
      </div>
      <div style="float: right">
        设为首页&emsp;|&emsp; 加入收藏&emsp;|&emsp; English
      </div>
    </div>
  </div>
  <div class="header">
    <div class="top_inside">
      <div class="logo">
        <img src="@/assets/jsjysj.png" alt="" />
        <div class="i-search">
          <div style="float: left">
            <input
              name="showkeycode"
              id="showkeycode1089077"
              type="text"
              placeholder="请输入关键字"
              class="search-txt"
              autocomplete="off"
              style="color: #999999"
            />
          </div>
          <div class="fr">
            <input name="" type="submit" class="search-btn" value="" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="i-nav">
    <div class="nav">
      <ul>
        <li>首页</li>
        <li
          @mouseover="showDropdown1 = true"
          @mouseleave="showDropdown1 = false"
        >
          学院概况
          <div v-show="showDropdown1" class="menu">
            <ul>
              <li>学院介绍</li>
              <li>现任领导</li>
              <li>机构设置</li>
            </ul>
          </div>
        </li>
        <li
          @mouseover="showDropdown2 = true"
          @mouseleave="showDropdown2 = false"
        >
          师资队伍
          <div v-show="showDropdown2" class="menu">
            <ul>
              <li>专任教师</li>
              <li>人才工程</li>
              <li>兼职教授</li>
              <li>人才招聘</li>
              <li>外事交流</li>
            </ul>
          </div>
        </li>
        <li
          @mouseover="showDropdown3 = true"
          @mouseleave="showDropdown3 = false"
        >
          专业介绍
          <div v-show="showDropdown3" class="menu">
            <ul>
              <li>计算机科学与技术</li>
              <li>数据科学与大数据技术</li>
              <li>信息与计算科学</li>
              <li>软件工程</li>
            </ul>
          </div>
        </li>
        <li
          @mouseover="showDropdown4 = true"
          @mouseleave="showDropdown4 = false"
        >
          教学教务
          <div v-show="showDropdown4" class="menu">
            <ul>
              <li>教学动态</li>
              <li>教研教改</li>
              <li>学科竞赛</li>
            </ul>
          </div>
        </li>
        <li
          @mouseover="showDropdown5 = true"
          @mouseleave="showDropdown5 = false"
        >
          科学研究
          <div v-show="showDropdown5" class="menu">
            <ul>
              <li>科研动态</li>
              <li>科研成果</li>
              <li>学术交流</li>
              <li>地方合作</li>
            </ul>
          </div>
        </li>
        <li>科教平台</li>
        <li
          @mouseover="showDropdown6 = true"
          @mouseleave="showDropdown6 = false"
        >
          党建工作
          <div v-show="showDropdown6" class="menu">
            <ul>
              <li>理论学习</li>
              <li>党务工作</li>
              <li>标杆院系</li>
              <li>工会园地</li>
              <li>主题教育</li>
            </ul>
          </div>
        </li>
        <li
          @mouseover="showDropdown7 = true"
          @mouseleave="showDropdown7 = false"
        >
          学生工作
          <div v-show="showDropdown7" class="menu">
            <ul>
              <li>学工动态</li>
              <li>学风建设</li>
              <li>奖优助贷</li>
              <li>学生组织</li>
              <li>心理健康</li>
            </ul>
          </div>
        </li>
        <li
          @mouseover="showDropdown8 = true"
          @mouseleave="showDropdown8 = false"
        >
          招生就业
          <div v-show="showDropdown8" class="menu">
            <ul>
              <li>招生工作</li>
              <li>就业工作</li>
              <li>校友工作</li>
            </ul>
          </div>
        </li>
        <li
          @mouseover="showDropdown9 = true"
          @mouseleave="showDropdown9 = false"
        >
          行政办公
          <div v-show="showDropdown9" class="menu">
            <ul>
              <li>规章制度</li>
              <li>学院发文</li>
              <li>会议纪要</li>
              <li>岗位职责</li>
              <li>资料下载</li>
            </ul>
          </div>
        </li>
        <li
          @mouseover="showDropdown10 = true"
          @mouseleave="showDropdown10 = false"
        >
          专业认证
          <div v-show="showDropdown10" class="menu">
            <ul>
              <li>认证概况</li>
              <li>通知公告</li>
              <li>工作动态</li>
              <li>培养方案</li>
              <li>规章制度</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.nav > ul > li {
  float: left;
  position: relative;
  width: 100px;
}

ul,
li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.top_inside {
  width: 1200px;
  height: auto;
  margin: 0 auto;
}

.top {
  height: 34px;
  line-height: 34px;
  background: #1f4093;
  color: #ffffff;
  font-size: 12px;
}

.header {
  background: url(@/assets/headerbg.png) no-repeat center #1965b3;
  height: 110px;
}

.logo img {
  margin: 15px 0 0 0;
}

.i-search {
  width: 250px;
  height: 34px;
  overflow: hidden;
  position: relative;
  margin: 35px 0 0 18px;
  float: right;
  border: #ffffff 1px solid;
  background: #ffffff;
  border-radius: 8px;
}

.i-search .search-txt {
  width: 190px;
  padding-left: 10px;
  height: 34px;
  line-height: 34px;
  color: #ffffff;
  border: none;
  background: none;
  outline: none;
}

.i-search .search-btn {
  width: 46px;
  height: 34px;
  line-height: 34px;
  font-size: 16px;
  border: none;
  background: url('@/assets/ico_search.png') center no-repeat;
  cursor: pointer;
}

.i-search .search-btn:hover {
  cursor: pointer;
}

.i-nav {
  width: 100%;
  background: #1f4093;
  height: 48px;
}

.nav {
  padding: 0 20px;
  height: 48px;
  line-height: 48px;
  position: relative;
  z-index: 1;
  margin: 0 auto;
  width: 1200px;
  text-align: center;
  color: white;
}

.menu {
  background-color: #375e97;
}
</style>
