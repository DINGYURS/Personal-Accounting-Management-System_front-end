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
      <el-form-item label="类型" class="query-Form-item">
        <el-select
          v-model="queryForm.gender"
          clearable
          placeholder="按金额类型查询"
        >
          <el-option label="支出" value="1" />
          <el-option label="收入" value="2" />
        </el-select>
      </el-form-item>
      <!-- TODO:按照金额区间查询 -->
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
      <el-form-item label="标签">
        <el-select v-model="labelOption" placeholder="选择标签" size="large">
          <el-option
            v-for="item in labelOptions"
            :key="item.id"
            :label="item.tag"
            :value="item.tag"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择金额类别"
          style="width: 100%"
        >
          <el-option label="支出" value="1" />
          <el-option label="收入" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="金额" prop="price">
        <el-input v-model="form.price" />
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="form.note" />
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
      <el-form-item label="标签">
        <el-select v-model="labelOption" placeholder="选择标签" size="large">
          <el-option
            v-for="item in labelOptions"
            :key="item.id"
            :label="item.tag"
            :value="item.tag"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择金额类别"
          style="width: 100%"
        >
          <el-option label="支出" value="1" />
          <el-option label="收入" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="金额" prop="price">
        <el-input v-model="form.price" />
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="form.note" />
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
      <el-table-column label="类型" prop="type" align="center">
        <template #default="{ row }">
          <el-tag type="danger" v-if="row.type === 1">支出</el-tag>
          <el-tag type="success" v-else>收入</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="金额" prop="price" align="center" />
      <el-table-column label="备注" prop="note" align="center" />
      <el-table-column label="创建时间" prop="createTime" align="center" />
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
  pageQueryAccountInfo,
  deleteAccountInfo,
  insertAccountInfo,
  editAccountInfo,
  getAllLabel
} from '@/api/account/accountInfo.js'

const size = ref(false)
const background = ref(true)
const disabled = ref(false)
const hideOnSinglePage = ref(true)
const labelPosition = ref('left')
const insertFormVisible = ref(false)
const editFormVisible = ref(false)
const tableData = ref([])
const labelOption = ref('')
const labelOptions = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const form = reactive({
  id: '',
  tag: '',
  type: '',
  price: '',
  note: ''
})

const queryForm = reactive({
  tag: '',
  type: ''
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
  form.type = ''
  form.price = ''
  form.note = ''
  labelOption.value = ''
  insertFormVisible.value = true
}

// “编辑”按钮
const editButton = (row) => {
  editFormVisible.value = true
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
    form.tag = labelOption.value
    await insertAccountInfo(form)
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
    form.tag = labelOption.value
    await editAccountInfo(form)
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
    await deleteAccountInfo(row.id)
    await handleCurrentChange(currentPage.value)
    ElMessage.success('删除成功')
  } catch (error) {
    console.error('Failed to delete Label data:', error)
  }
}

// 分页查询数据
async function handleCurrentChange() {
  try {
    const response = await pageQueryAccountInfo(
      currentPage.value,
      pageSize.value,
      queryForm.tag,
      queryForm.type
    )
    console.log('response:', response)
    tableData.value = response.data.data.rows
    total.value = response.data.data.total
  } catch (error) {
    console.error('Failed to fetch AccountInfo data:', error)
  }
}

// 获取所有标签数据
async function pageQueryLabelInfo() {
  try {
    const response = await getAllLabel()
    labelOptions.value = response.data.data
    console.log(labelOptions.value)
  } catch (error) {
    console.error('Failed to get all Label data:', error)
  }
}

// 回显数据
async function handleEchoData(row) {
  try {
    // const response = await echoLabelData(row.id)
    form.id = row.id
    form.tag = row.tag
    form.type = row.type
    form.price = row.price
    form.note = row.note
  } catch (error) {
    console.error('Failed to edit Label data:', error)
  }
}

// 页面加载时获取数据
onMounted(async () => {
  try {
    await handleCurrentChange()
    await pageQueryLabelInfo()
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
