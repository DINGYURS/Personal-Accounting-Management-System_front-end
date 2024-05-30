<template>
  <el-container>
    <el-main v-show="selectedMenuIndex === '4'" class="el-main">
      <!--      <h5 style="text-align: center">Table</h5>-->
      <el-form
        :inline="true"
        :model="queryForm"
        class="query-Form"
        style="font-weight: bold"
      >
        <el-form-item label="学号">
          <el-input v-model="queryForm.studentId" clearable />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="queryForm.name" clearable />
        </el-form-item>
        <el-form-item label="性别">
          <el-select
            v-model="queryForm.gender"
            clearable
            placeholder="选择要按何种性别进行查询"
          >
            <el-option label="男" value="1" />
            <el-option label="女" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCurrentChange"
            >查询
          </el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="insertFormVisible = true">
        新增
      </el-button>
      <el-dialog v-model="insertFormVisible" title="新增数据" width="500px">
        <el-form
          :label-position="labelPosition"
          :model="form"
          :rules="rules"
          label-width="60px"
          show-message
          size="large"
          status-icon
          style="max-width: 460px; font-weight: bold"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="学号" prop="studentId">
            <el-input v-model="form.studentId" />
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select
              v-model="form.gender"
              placeholder="请选择您的性别"
              style="width: 100%"
            >
              <el-option label="男" value="1" />
              <el-option label="女" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="留言">
            <el-input v-model="form.motto" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="handleCloseInsertForm">取消</el-button>
            <el-button type="primary" @click="submitInsert()"> 提交</el-button>
          </div>
        </template>
      </el-dialog>
      <el-dialog v-model="editFormVisible" title="编辑数据" width="500px">
        <el-form
          :label-position="labelPosition"
          :model="form"
          :rules="rules"
          label-width="60px"
          show-message
          size="large"
          status-icon
          style="max-width: 460px; font-weight: bold"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="学号" prop="studentId">
            <el-input v-model="form.studentId" />
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select
              v-model="form.gender"
              placeholder="请选择您的性别"
              style="width: 100%"
            >
              <el-option label="男" value="1" />
              <el-option label="女" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="留言">
            <el-input v-model="form.motto" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submitEdit()"> 提交</el-button>
          </div>
        </template>
      </el-dialog>
      <el-table :data="tableData" height="283" style="width: 100%">
        <!--        <el-table-column label="序号" prop="id" width="180" />-->
        <el-table-column label="序号" width="180">
          <template #default="{ $index }">
            {{ adjustedIndex($index) }}
          </template>
        </el-table-column>
        <el-table-column label="学号" prop="studentId" width="180" />
        <el-table-column label="照片" width="180">
          <template #default="{ row }">
            <img :src="row.image" alt="student image" style="width: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="name" width="180" />
        <el-table-column label="性别" width="180">
          <template #default="{ row }">
            {{ row.gender === 1 ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column label="最后修改时间" prop="updateTime" width="180" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" @click="editButton(row)">编辑</el-button>

            <el-button type="danger" @click="deleteButton(row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :background="background"
        :disabled="disabled"
        :hide-on-single-page="hideOnSinglePage"
        :small="small"
        :total="total"
        layout="total, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <router-link to="/article/手绘画">test</router-link>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import {
  getStudentData,
  deleteStudentData,
  insertStudentData,
  editStudentData
} from '@/api/user.js'
import {
  Document,
  Location,
  Menu as IconMenu,
  Reading
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const tableData = ref([])
const selectedMenuIndex = ref('4')
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(0)
const small = ref(false)
const background = ref(true)
const disabled = ref(false)
const hideOnSinglePage = ref(true)
const insertFormVisible = ref(false)
const editFormVisible = ref(false)
const labelPosition = ref('left')
const ruleFormRef = ref()
const form = reactive({
  id: '',
  username: '',
  studentId: '',
  name: '',
  gender: '',
  image: 'n.jpg',
  motto: ''
})
const queryForm = reactive({
  studentId: '',
  name: '',
  gender: ''
})

const rules = reactive({
  username: [{ validator: usernameRule, trigger: 'blur' }],
  studentId: [{ validator: studentIdRule, trigger: 'blur' }],
  motto: [{ validator: mottoRule, trigger: 'blur' }]
})

function usernameRule(rule, value, callback) {
  if (value.length > 6) {
    callback(new Error('用户名不得超过6个字符'))
  } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    callback(new Error('用户名不能包含特殊字符'))
  } else {
    callback()
  }
}

function studentIdRule(rule, value, callback) {
  if (value.length !== 10) {
    callback(new Error('学号必须为10位数字'))
  } else if (!/^[0-9]+$/.test(value)) {
    callback(new Error('学号只能是数字'))
  } else {
    callback()
  }
}

function mottoRule(rule, value, callback) {
  if (value.length > 30) {
    callback(new Error('留言内容不得超过30个字符'))
  } else {
    callback()
  }
}

const adjustedIndex = computed(() => {
  return (index) => {
    return (currentPage.value - 1) * pageSize.value + index + 1
  }
})

const handleOpen = (index, indexPath) => {
  console.log(index, indexPath)
}
const handleClose = (index, indexPath) => {
  console.log(index, indexPath)
}
const handleSelect = (index) => {
  console.log('index:', index)
  selectedMenuIndex.value = index
}
const handleSizeChange = (number) => {
  console.log(`${number} items per page`)
}

const editButton = (row) => {
  editFormVisible.value = true
  handleEchoData(row)
}

const deleteButton = (row) => {
  ElMessageBox.confirm('确定删除该学生信息吗？', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    handleDeleteStudent(row)
    ElMessage.success('删除成功')
  })
  // .catch(() => {
  //   ElMessage.info('已取消')
  // })
}

const handleCloseInsertForm = () => {
  if (!ruleFormRef.value) return
  // ruleFormRef.value.resetFields()
  insertFormVisible.value = false
}

const submitInsert = () => {
  handleInsertStudent()
  insertFormVisible.value = false
}

async function submitEdit() {
  try {
    await editStudentData(form)
    ElMessage.success('编辑成功')
    editFormVisible.value = false
    await handleCurrentChange(currentPage.value)
  } catch (error) {
    console.error('Failed to update student data:', error)
  }
}

async function handleCurrentChange() {
  try {
    const response = await getStudentData(
      currentPage.value,
      pageSize.value,
      queryForm.studentId,
      queryForm.name,
      queryForm.gender
    )
    console.log('response:', response)
    tableData.value = response.data.data.rows
    total.value = response.data.data.total
  } catch (error) {
    console.error('Failed to fetch student data:', error)
  }
}

async function handleDeleteStudent(row) {
  try {
    await deleteStudentData(row.id)
    await handleCurrentChange(currentPage.value)
  } catch (error) {
    console.error('Failed to delete student data:', error)
  }
}

async function handleInsertStudent() {
  try {
    await insertStudentData(form)
    await handleCurrentChange(currentPage.value)
    ElMessage.success('添加成功')
  } catch (error) {
    console.error('Failed to insert student data:', error)
  }
}

async function handleEchoData(row) {
  try {
    // const response = await echoStudentData(row.id)
    form.id = row.id
    form.username = row.username
    form.studentId = row.studentId
    form.name = row.name
    form.gender = row.gender
    form.motto = row.motto
  } catch (error) {
    console.error('Failed to edit student data:', error)
  }
}

onMounted(async () => {
  try {
    await handleCurrentChange()
  } catch (error) {
    console.error('Failed to fetch student data when created:', error)
  }
})
</script>
<style scoped>
.el-main {
  padding: 0;
}

.el-aside {
  width: 200px;
  text-align: center;
  height: 100vh;
  background-color: #e0e5df;
}

.query-Form {
  --el-input-width: 200px;
}
</style>
