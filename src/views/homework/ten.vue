<template>
  <form>
    <div class="input-container">
      <label for="username">用户名:</label>
      <input
        type="text"
        id="username"
        v-model="form.username"
        required
      /><br /><br />
      <label for="password">密码:</label>
      <input
        type="password"
        id="password"
        v-model="form.password"
        required
      /><br /><br />
      <label for="confirm-password">确认密码:</label>
      <input
        type="password"
        id="confirm-password"
        v-model="form.confirmPassword"
        required
      /><br /><br />
      <label for="id-card">联系方式:</label>
      <input
        type="text"
        id="id-card"
        v-model="form.idCard"
        required
      /><br /><br />
    </div>
    <label class="s1" for="gender">性别</label>
    <select id="gender" v-model="form.gender">
      <option value="male">男</option>
      <option value="female">女</option>
    </select>
    <br /><br />
    <label class="s1">兴趣爱好</label><br />
    <div v-for="(interest, index) in interests" :key="index">
      <input type="checkbox" :value="interest.value" v-model="form.interests" />
      <label :for="interest.value">{{ interest.label }}</label
      ><br />
    </div>
    <br /><br />
    <label class="s1">个人主页</label><br />
    <a href="http://www.huawei.com" name="site">个人主页</a><br /><br />
    <label class="s1" for="gender">请选择省份</label>
    <select id="gender" v-model="form.province">
      <option value="male">浙江</option>
      <option value="female">湖南</option>
      <option value="female">新疆</option>
      <option value="female">广东</option>
    </select>
    <br /><br />
    <div style="display: flex">
      <input
        type="submit"
        value="重置"
        @click.prevent="resetForm"
        style="margin-right: 20px"
      />
      <input type="submit" @click.prevent="submitForm" value="提交" />
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'
const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  idCard: '',
  gender: '',
  interests: [],
  province: ''
})
const interests = ref([
  { label: '羽毛球', value: 'interest1' },
  { label: '剪纸', value: 'interest2' },
  { label: '滑雪', value: 'interest3' }
])
const resetForm = () => {
  form.username = ''
  form.password = ''
  form.confirmPassword = ''
  form.idCard = ''
  form.gender = ''
  form.interests = []
  form.province = ''
}
const submitForm = () => {
  console.log(form)
}
</script>

<style scoped>
body {
  font-family: system-ui;
  background-color: #f2f2f2;
}

h1 {
  text-align: center;
  color: #333;
  margin: 0;
}

form {
  max-width: 500px;
  margin: 5% auto 5%;
  padding: 3%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-container {
  margin-bottom: 20px;
}

.input-container label {
  display: block;
  width: 100%;
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
}

.s1 {
  font-weight: bold;
}

.input-container input {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

select,
textarea {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

input[type='submit'] {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

input[type='submit']:hover {
  background-color: #555;
}
</style>
