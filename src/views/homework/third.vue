<template>
  <div class="all">
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
    <el-container>
      <el-aside class="el-aside">
        <el-row class="tac">
          <el-col class="navbar" :span="24">
            <h5 style="text-align: center">图书目录</h5>
            <el-menu
              class="el-menu-vertical-demo"
              default-active="1"
              style="background-color: #e0e5df"
              @select="handleSelect"
            >
              <el-menu-item index="1">
                <el-icon>
                  <House />
                </el-icon>
                <span>全部</span>
              </el-menu-item>
              <el-menu-item index="2">
                <el-icon>
                  <Monitor />
                </el-icon>
                <span>计算机</span>
              </el-menu-item>
              <el-menu-item index="3">
                <el-icon>
                  <EditPen />
                </el-icon>
                <span>文学</span>
              </el-menu-item>
              <el-menu-item index="4">
                <el-icon>
                  <DataLine />
                </el-icon>
                <span>数学</span>
              </el-menu-item>
              <el-menu-item index="5">
                <el-icon>
                  <Reading />
                </el-icon>
                <span>政治</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main class="main">
        <el-dialog v-model="editDialogVisible" title="编辑界面" width="500">
          <el-form :model="dialogForm" :label-position="labelPosition">
            <el-form-item label="书名:" :label-width="formLabelWidth">
              <el-input v-model="dialogForm.bookname" autocomplete="off" />
            </el-form-item>
            <el-form-item label="类别:" :label-width="formLabelWidth">
              <el-input v-model="dialogForm.category" autocomplete="off" />
            </el-form-item>
            <el-form-item label="价格:" :label-width="formLabelWidth">
              <el-input v-model="dialogForm.price" autocomplete="off" />
            </el-form-item>
            <el-form-item label="数量:" :label-width="formLabelWidth">
              <el-input v-model="dialogForm.num" autocomplete="off" />
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="editDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="editDialogConfirm()">
                确认
              </el-button>
            </div>
          </template>
        </el-dialog>
        <el-dialog v-model="insertDialogVisible" title="新增界面" width="500">
          <el-form :model="dialogForm" :label-position="labelPosition">
            <el-form-item label="书名:" :label-width="formLabelWidth">
              <el-input v-model="dialogForm.bookname" autocomplete="off" />
            </el-form-item>
            <el-form-item label="类别:" :label-width="formLabelWidth">
              <el-input v-model="dialogForm.category" autocomplete="off" />
            </el-form-item>
            <el-form-item label="价格:" :label-width="formLabelWidth">
              <el-input v-model="dialogForm.price" autocomplete="off" />
            </el-form-item>
            <el-form-item label="数量:" :label-width="formLabelWidth">
              <el-input v-model="dialogForm.num" autocomplete="off" />
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="insertDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="insertDialogConfirm()">
                确认
              </el-button>
            </div>
          </template>
        </el-dialog>
        <el-form :inline="true" class="query-Form">
          <el-form-item label="书名">
            <el-input v-model="searchText" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="findInfo">查询</el-button>
            <el-button
              type="primary"
              @click="insertButton()"
              style="margin-left: 389px"
            >
              新增
            </el-button>
          </el-form-item>
        </el-form>
        <el-table :data="pagedData" height="283px" highlight-current-row>
          <el-table-column label="序号" width="180">
            <template #default="{ $index }">
              {{ adjustedIndex($index) }}
            </template>
          </el-table-column>
          <el-table-column label="书名" prop="bookname" width="180" />
          <el-table-column label="价格" prop="price" width="180" />
          <el-table-column label="数量" prop="num" width="180" />
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button type="primary" @click="editButton(row)"
                >编辑
              </el-button>
              <el-button type="danger" @click="deleteButton(row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="8">第{{ currentPage }}/{{ totalPages }}页</el-col>
          <el-col :span="8">
            <el-button type="primary" @click="prevPage">上一页</el-button>
            <el-button type="primary" @click="nextPage">下一页</el-button>
          </el-col>
          <el-col :span="8">
            每页显示
            <el-input
              style="width: 40px"
              v-model="inputPageSize"
              autocomplete="off"
            />
            条记录
            <el-button type="primary" @click="setPageSize">设定</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import {
  EditPen,
  House,
  Reading,
  Monitor,
  DataLine
} from '@element-plus/icons-vue'

const editDialogVisible = ref(false)
const insertDialogVisible = ref(false)
const formLabelWidth = ref('auto')
const labelPosition = ref('left')
const currentDate = ref(new Date())
const selectedMenuIndex = ref(1)
const currentPage = ref(1)
const inputPageSize = ref(5)
const pageSize = ref(5)
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
const searchText = ref('')

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

const originalTableData = reactive([
  {
    bookId: 1,
    bookname: 'C语言程序设计',
    category: '计算机',
    price: 30,
    num: 30
  },
  {
    bookId: 2,
    bookname: 'Java程序设计',
    category: '计算机',
    price: 50,
    num: 50
  },
  {
    bookId: 3,
    bookname: '西游记',
    category: '文学',
    price: 20,
    num: 20
  },
  {
    bookId: 4,
    bookname: '红楼梦',
    category: '文学',
    price: 25,
    num: 25
  },
  {
    bookId: 5,
    bookname: '高等数学',
    category: '数学',
    price: 30,
    num: 80
  },
  {
    bookId: 6,
    bookname: '线性代数',
    category: '数学',
    price: 45,
    num: 120
  },
  {
    bookId: 7,
    bookname: '马克思主义',
    category: '政治',
    price: 25,
    num: 150
  },
  {
    bookId: 8,
    bookname: '中国近代史',
    category: '政治',
    price: 35,
    num: 200
  }
])
const tableData = reactive([...originalTableData])
const dialogForm = reactive([
  {
    bookID: '',
    bookname: '',
    category: '',
    price: null,
    num: null
  }
])

const totalPages = computed(() => {
  return Math.ceil(tableData.length / pageSize.value)
})

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = currentPage.value * pageSize.value
  return tableData.slice(start, end)
})

const adjustedIndex = computed(() => {
  return (index) => {
    return (currentPage.value - 1) * pageSize.value + index + 1
  }
})

const handleSelect = (index) => {
  console.log('index:', index)
  selectedMenuIndex.value = index
  currentPage.value = 1
  if (index === '1') {
    tableData.splice(0, tableData.length, ...originalTableData)
  } else if (index === '2') {
    const filteredData = originalTableData.filter(
      (book) => book.category === '计算机'
    )
    tableData.splice(0, tableData.length, ...filteredData)
  } else if (index === '3') {
    const filteredData = originalTableData.filter(
      (book) => book.category === '文学'
    )
    tableData.splice(0, tableData.length, ...filteredData)
  } else if (index === '4') {
    const filteredData = originalTableData.filter(
      (book) => book.category === '数学'
    )
    tableData.splice(0, tableData.length, ...filteredData)
  } else if (index === '5') {
    const filteredData = originalTableData.filter(
      (book) => book.category === '政治'
    )
    tableData.splice(0, tableData.length, ...filteredData)
  }
}

const insertButton = () => {
  dialogForm.bookId = ''
  dialogForm.bookname = ''
  dialogForm.category = ''
  dialogForm.price = null
  dialogForm.num = null
  insertDialogVisible.value = true
}

const editButton = (row) => {
  dialogForm.bookId = row.bookId
  dialogForm.bookname = row.bookname
  dialogForm.category = row.category
  dialogForm.price = row.price
  dialogForm.num = row.num
  console.log(originalTableData)
  editDialogVisible.value = true
}

const deleteButton = (row) => {
  const index = originalTableData.findIndex(
    (book) => book.bookId === row.bookId
  )
  if (index !== -1) {
    originalTableData.splice(index, 1)
  }
  handleSelect(selectedMenuIndex.value)
}

const editDialogConfirm = () => {
  const book = originalTableData.find(
    (book) => book.bookId === dialogForm.bookId
  )
  if (book) {
    book.bookname = dialogForm.bookname
    book.category = dialogForm.category
    book.price = dialogForm.price
    book.num = dialogForm.num
  }
  console.log(originalTableData)
  handleSelect(selectedMenuIndex.value)
  editDialogVisible.value = false
}

const insertDialogConfirm = () => {
  const newBook = {
    bookId: originalTableData.length + 1,
    bookname: dialogForm.bookname,
    category: dialogForm.category,
    price: dialogForm.price,
    num: dialogForm.num
  }
  originalTableData.push(newBook)
  handleSelect(selectedMenuIndex.value)
  insertDialogVisible.value = false
}

const findInfo = () => {
  const lowerCaseSearchText = searchText.value.toLowerCase() // 兼容英文书籍
  let category
  switch (selectedMenuIndex.value) {
    case '2':
      category = '计算机'
      break
    case '3':
      category = '文学'
      break
    case '4':
      category = '数学'
      break
    case '5':
      category = '政治'
      break
    default:
      category = ''
  }
  const filteredData = originalTableData.filter(
    (book) =>
      book.bookname.toLowerCase().includes(lowerCaseSearchText) &&
      (category ? book.category === category : true)
  )
  tableData.splice(0, tableData.length, ...filteredData)
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const setPageSize = () => {
  pageSize.value = inputPageSize.value
}
</script>
<style scoped>
.main {
  margin: 10px;
  padding: 0;
  border-radius: 10px;
}

.el-aside {
  margin: 10px;
}

.query-Form {
  --el-input-width: 200px;
  background-color: #e7d5ad;
  font-weight: bold;
}

.query-Form > .el-form-item {
  margin: 15px;
}

.navbar {
  border-radius: 10px;
  background-color: #e7d5ad;
}

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

.all {
  height: 100vh;
  background-color: rgb(243, 239, 230);
}
</style>
