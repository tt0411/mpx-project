import mpx from '@mpxjs/core'

const baseURL = 'http://xxx.com'
let loadingCount = 0

// 全局 loading 控制
function showLoading() {
  if (loadingCount === 0) {
    mpx.showLoading({ title: '加载中...' })
  }
  loadingCount++
}
function hideLoading() {
  loadingCount--
  if (loadingCount <= 0) {
    loadingCount = 0
    mpx.hideLoading()
  }
}

// 添加请求拦截器
mpx.xfetch.interceptors.request.use((config) => {
  if (config.showLoading === true) {
    showLoading()
  }
  // 可在此添加 token 等
  return config
})

// 添加响应拦截器
mpx.xfetch.interceptors.response.use(
  (response) => {
    if (response.config.showLoading) {
      hideLoading()
    }
    return response
  },
  (error) => {
    hideLoading()
    mpx.showToast({ title: error.message || '网络错误', icon: 'none' })
    return Promise.reject(error)
  }
)

// 通用请求方法
function request({ url, config = {}}) {
  return mpx.xfetch.fetch({
    url: url.includes('http') ? url : baseURL + url,
    timeout: config.timeout ?? 10000,
    ...config,
  }).then(res => res.data)
}

// GET
export function get(url, parameter = {}) {
  const { config = {}, showLoading = false, params } = parameter
  config.method = 'GET'
  config.params = params
  config.showLoading = showLoading
  config.headers = config.headers || {}
  config.timeout = config.timeout
  return request({ url, config })
}

// POST
export function post(url, parameter = {}) {
  const { config = {}, showLoading = false, data } = parameter
  config.method = 'POST'
  config.data = data
  config.showLoading = showLoading
  config.headers = config.headers || {}
  config.timeout = config.timeout
  return request({ url, config })
}

// PUT
export function put(url, parameter = {}) {
  const { config = {}, showLoading = false, data } = parameter
  config.method = 'PUT'
  config.data = data
  config.headers = config.headers || {}
  config.timeout = config.timeout
  config.showLoading = showLoading
  return request({ url, config })
}

// DELETE
export function del(url, parameter = {}) {
    const { config = {}, showLoading = false, data } = parameter
    config.method = 'DELETE'
    config.data = data
    config.showLoading = showLoading
    config.headers = config.headers || {}
    config.timeout = config.timeout
    return request({ url, config })
}

// 上传文件
export function uploadFile(url, parameter = {}) {
  const { config = {}, formData = {}, showLoading = false } = parameter
  config.method = 'POST'
  config.headers = {
    'Content-Type': 'multipart/form-data',
  }
  config.formData = formData
  config.timeout = config.timeout
  config.showLoading = showLoading
  return request({ url, config })
}