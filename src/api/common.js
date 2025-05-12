import { get, post } from '@/api/request'

export const getTest = (params) => get('/api/user', params)

// POST 请求不显示 loading
export const postTest = (params) => post('/api/login', params)