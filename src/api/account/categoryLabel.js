import request from '@/utils/request.js'
import { useUserStore } from '@/stores/user.js'

// 获取标签信息
export const pageQueryLabelInfo = (page, pageSize, tag) => {
  const userStore = useUserStore()
  console.log(page, pageSize, tag)
  return request.get('/api/label', {
    params: {
      page,
      pageSize,
      tag
    },
    headers: {
      token: userStore.token
    }
  })
}

// 删除标签信息
export const deleteLabel = (ids) => {
  const userStore = useUserStore()
  return request.delete(`/api/label/${ids}`, {
    headers: {
      token: userStore.token
    }
  })
}

// 增加标签数据
export const insertLabel = (formData) => {
  const userStore = useUserStore()
  return request.post('/api/label', formData, {
    headers: {
      token: userStore.token
    }
  })
}

// 修改标签数据
export const editLabel = (formData) => {
  const userStore = useUserStore()
  return request.put(`/api/label`, formData, {
    headers: {
      token: userStore.token
    }
  })
}
