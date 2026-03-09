import { get, post, postForm, upload } from '@/api/request'

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

// 上传文件
export function uploadFile(data) {
  return upload('/cbs-core-web/file/upload', data)
}

// 获取师傅信息
export const getWorkerInfo = (workerCode, params) =>  {
  return get(`/cbs-core-web/worker-info/${workerCode}/get`, params)
}

/*
更新师傅基础信息
*/
export const updateWorkerInfo = (parameter) =>
  post(`/cbs-core-web/worker-info/update`, parameter)
