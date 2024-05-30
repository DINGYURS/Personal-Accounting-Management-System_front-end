import request from '@/utils/request.js'
import { useUserStore } from '@/stores/user.js'

// 用户注册
export const userRegisterService = ({ username, password, repassword }) => {
  const token = '' // 从本地存储中获取token
  return request.post(
    '/api/register',
    {
      username,
      password,
      repassword
    },
    {
      headers: {
        token: token
      }
    }
  )
}

// 用户登录
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', {
    username,
    password
  })

// 获取学生基本信息
export const getStudentData = (page, pageSize, studentId, name, gender) => {
  const userStore = useUserStore()
  return request.get('/api/student', {
    params: {
      page,
      pageSize,
      studentId,
      name,
      gender
    },
    headers: {
      token: userStore.token
    }
  })
}

// 删除学生信息
export const deleteStudentData = (ids) => {
  const userStore = useUserStore()
  return request.delete(`/api/student/${ids}`, {
    headers: {
      token: userStore.token
    }
  })
}

// 增加学生数据
export const insertStudentData = (formData) => {
  const userStore = useUserStore()
  return request.post('/api/student', formData, {
    headers: {
      token: userStore.token
    }
  })
}

// 回显学生数据
// export const echoStudentData = (id) => {
//   const userStore = useUserStore()
//   return request.get(`/api/student/${id}`, {
//     headers: {
//       token: userStore.token
//     }
//   })
// }

// 修改学生数据
export const editStudentData = (formData) => {
  console.log("formData", formData);
  const userStore = useUserStore()
  return request.put(`/api/student`, formData, {
    headers: {
      token: userStore.token
    }
  })
}
