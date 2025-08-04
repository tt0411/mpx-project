import { get, post, postForm } from '@/api/request'

export const getTest = (params) => get('/api/user', params)

export const postTest = (params) => post('/api/login', params)

// 登录
export function login(data){
  return postForm('/cbs-auth/permission/user/login', data)
}

// 登出
export function logout(data) {
  return postForm('/cbs-auth/permission/user/logout', data)
}

export const getUserInfo = (workerCode, params) =>  { 
  return get(`/cbs-core-web/worker-info/${workerCode}/get`, params)
}
