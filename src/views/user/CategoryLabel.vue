<template>
  <!-- 顶部表单 -->
  <div style="width: 100%">
    <el-form :inline="true" :model="queryForm" class="query-Form">
      <el-form-item label="标签" class="query-Form-item">
        <el-input
          v-model="queryForm.tag"
          placeholder="按标签名字查询"
          clearable
        />
      </el-form-item>
      <el-form-item class="query-Form-item">
        <el-button type="primary" @click="handleCurrentChange">查询 </el-button>
      </el-form-item>
      <el-form-item class="query-Form-item">
        <el-button type="primary" @click="insertButton"> 新增 </el-button>
      </el-form-item>
      <el-form-item class="query-Form-item">
        <el-button type="danger" @click="insertFormVisible = true">
          批量删除
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 新增数据对话框 -->
  <el-dialog v-model="insertFormVisible" title="新增数据" width="500px">
    <el-form
      :label-position="labelPosition"
      :model="form"
      label-width="60px"
      show-message
      size="large"
      status-icon
      style="max-width: 460px; font-weight: bold"
    >
      <el-form-item label="标签" prop="tag">
        <el-input v-model="form.tag" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="insertFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitInsert"> 提交</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 编辑数据对话框 -->
  <el-dialog v-model="editFormVisible" title="编辑数据" width="500px">
    <el-form
      :label-position="labelPosition"
      :model="form"
      label-width="60px"
      show-message
      size="large"
      status-icon
      style="max-width: 460px; font-weight: bold"
    >
      <el-form-item label="标签" prop="tag">
        <el-input v-model="form.tag" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEdit"> 提交</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 表单数据展示 -->
  <div style="width: 100%">
    <el-table
      :data="tableData"
      height="auto"
      class="el-table"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" />
      <el-table-column label="序号" align="center">
        <template #default="{ $index }">
          {{ adjustedIndex($index) }}
        </template>
      </el-table-column>
      <el-table-column label="标签" prop="tag" align="center" />
      <el-table-column label="操作" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="primary" @click="editButton(row)">编辑</el-button>
          <el-button type="danger" @click="deleteButton(row)">删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :background="background"
    :disabled="disabled"
    :hide-on-single-page="hideOnSinglePage"
    :size="size"
    :total="total"
    layout="total, prev, pager, next, jumper"
    @current-change="handleCurrentChange"
  />
</template>
<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  pageQueryLabelInfo,
  deleteLabel,
  insertLabel,
  editLabel
} from '@/api/account/categoryLabel.js'

const size = ref(false)
const background = ref(true)
const disabled = ref(false)
const hideOnSinglePage = ref(true)
const labelPosition = ref('left')
const insertFormVisible = ref(false)
const editFormVisible = ref(false)
const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(0)
// const ruleFormRef = ref()

const form = reactive({
  id: '',
  tag: ''
})

const queryForm = reactive({
  tag: ''
})

const rules = reactive({
  username: [{ validator: usernameRule, trigger: 'blur' }],
  LabelId: [{ validator: LabelIdRule, trigger: 'blur' }],
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

function LabelIdRule(rule, value, callback) {
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

// 计算表格序号
const adjustedIndex = computed(() => {
  return (index) => {
    return (currentPage.value - 1) * pageSize.value + index + 1
  }
})

// “新增”按钮
const insertButton = () => {
  form.id = ''
  form.tag = ''
  insertFormVisible.value = true
}

// “编辑”按钮
const editButton = (row) => {
  editFormVisible.value = true
  console.log(row.id)
  handleEchoData(row)
}

// “删除”按钮
const deleteButton = (row) => {
  ElMessageBox.confirm('确定删除该学生信息吗？', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    handleDeleteLabel(row)
  })
}

// 新增标签
async function submitInsert() {
  try {
    await insertLabel(form)
    await handleCurrentChange(currentPage.value)
    insertFormVisible.value = false
    ElMessage.success('添加成功')
  } catch (error) {
    console.error('Failed to insert Label data:', error)
  }
}

// 编辑标签
async function submitEdit() {
  try {
    await editLabel(form)
    await handleCurrentChange(currentPage.value)
    editFormVisible.value = false
    ElMessage.success('编辑成功')
  } catch (error) {
    console.error('Failed to update Label data:', error)
  }
}

const handleSelectionChange = (selectedRows) => {
  // 使用 map 方法从每个选中的行中提取 id 属性
  const ids = selectedRows.map((row) => row.id)
  console.log('Selected IDs:', ids)
  // 这里 ids 将是一个包含所有选中行 id 的数组
}

// 处理删除标签
async function handleDeleteLabel(row) {
  try {
    await deleteLabel(row.id)
    await handleCurrentChange(currentPage.value)
    ElMessage.success('删除成功')
  } catch (error) {
    console.error('Failed to delete Label data:', error)
  }
}

// 分页查询数据
async function handleCurrentChange() {
  try {
    const response = await pageQueryLabelInfo(
      currentPage.value,
      pageSize.value,
      queryForm.tag
    )
    console.log('response:', response)
    tableData.value = response.data.data.rows
    total.value = response.data.data.total
  } catch (error) {
    console.error('Failed to fetch Label data:', error)
  }
}

// 回显数据
async function handleEchoData(row) {
  try {
    // const response = await echoLabelData(row.id)
    form.id = row.id
    form.tag = row.tag
  } catch (error) {
    console.error('Failed to edit Label data:', error)
  }
}

// 页面加载时获取数据
onMounted(async () => {
  try {
    await handleCurrentChange()
  } catch (error) {
    console.error('Failed to fetch Label data when created:', error)
  }
})
</script>
<style scoped>
.query-Form {
  font-weight: bold;
  background-color: #fff;
  border-radius: 10px;
  margin: 10px;
}

.query-Form-item {
  margin: 10px 5px;
}

.el-table {
  background-color: #fff;
  border-radius: 10px;
}
</style>
