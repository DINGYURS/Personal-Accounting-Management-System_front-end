import request from '@/utils/request.js'
import { useUserStore } from '@/stores/user.js'

// 分页查询收支信息
export const pageQueryAccountInfo = (page, pageSize, tag, type) => {
  const userStore = useUserStore()
  console.log(page, pageSize, tag, type)
  return request.get('/api/info', {
    params: {
      page,
      pageSize,
      tag,
      type
    },
    headers: {
      token: userStore.token
    }
  })
}

// 按月份获取收支信息
export const getAccountInfoByMonth = ([year, month]) => {
  const userStore = useUserStore()
  return request.get('/api/info/month', {
    params: {
      month: `${year}-${String(month).padStart(2, '0')}`
    },
    headers: {
      token: userStore.token
    }
  })
}

// 获取所有标签信息
export const getAllLabel = () => {
  const userStore = useUserStore()
  return request.get('/api/info/label', {
    headers: {
      token: userStore.token
    }
  })
}

// 删除收支信息
export const deleteAccountInfo = (ids) => {
  const userStore = useUserStore()
  return request.delete(`/api/info/${ids}`, {
    headers: {
      token: userStore.token
    }
  })
}

// 增加标签数据
export const insertAccountInfo = (formData) => {
  const userStore = useUserStore()
  return request.post('/api/info', formData, {
    headers: {
      token: userStore.token
    }
  })
}

// 修改标签数据
export const editAccountInfo = (formData) => {
  const userStore = useUserStore()
  return request.put(`/api/info`, formData, {
    headers: {
      token: userStore.token
    }
  })
}
// TODO:代码复用性差
