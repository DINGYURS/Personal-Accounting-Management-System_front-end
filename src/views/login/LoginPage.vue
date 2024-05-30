<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { userRegisterService, userLoginService } from '@/api/user.js'
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user.js'
import { useRouter } from 'vue-router'

const isRegister = ref(false)
const form = ref()

// 整个表单用于提交的form数据对象
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

// 表单验证规则
const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '只能是非空字符，长度在 6 到 15 个字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '只能是非空字符，长度在 6 到 15 个字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

// 注册成功之前进行效验
const register = async () => {
  // 验证表单
  await form.value.validate()

  // 如果验证成功，执行注册服务
  await userRegisterService(formModel.value)

  // 显示成功消息
  ElMessage.success('注册成功')

  // 跳转到登录页面
  isRegister.value = false
}

const userstore = useUserStore()
const router = useRouter()

// 登录成功之前进行效验
const login = async () => {
  try {
    // 验证表单
    await form.value.validate()
    // 如果验证成功，执行登录服务
    const res = await userLoginService(formModel.value)
    userstore.setToken(res.data.data)
    // 显示成功消息
    ElMessage.success('登录成功')
    console.log('登录成功', res)
    console.log('登录成功', res.data)
    console.log('登录成功', res.data.data)
    // 跳转到首页
    await router.push('/')
  } catch (error) {
    console.log('登录失败', error)
  }
}

const logout = async () => {
  await userstore.setToken('')
  await router.push('/login')
}

//监视变化，当isRegister变化时，重置表单
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <el-row class="login-page">
    <!--    <el-col :span="12" class="bg"></el-col>-->
    <el-col :offset="9" :span="6" class="form">
      <!--     注册表单-->
      <el-form
        v-if="isRegister"
        ref="form"
        :model="formModel"
        :rules="rules"
        autocomplete="off"
        size="large"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            placeholder="请输入再次密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            auto-insert-space
            class="button-register"
            type="primary"
            @click="register"
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link :underline="false" type="info" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>

      <!--      登录表单-->
      <el-form
        v-else
        ref="form"
        :model="formModel"
        :rules="rules"
        autocomplete="off"
        size="large"
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            name="password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link :underline="false" type="primary">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            auto-insert-space
            class="button-login"
            type="primary"
            @click="login"
          >
            登录
          </el-button>
          <el-button
            auto-insert-space
            class="button-login"
            type="primary"
            @click="logout"
          >
            退出
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link :underline="false" type="info" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button-login {
      width: 48%;
    }

    .button-register {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
