import mpx from '@mpxjs/core'
import { envConfig } from '@/utils'

const baseURL = envConfig.baseURL
let loadingCount = 0

function showLoading() {
  if (loadingCount === 0) {
    mpx.showLoading({ title: '加载中...' })
  }
  loadingCount += 1
}

function hideLoading() {
  loadingCount = Math.max(loadingCount - 1, 0)
  if (loadingCount === 0) {
    mpx.hideLoading()
  }
}

mpx.xfetch.interceptors.request.use((config) => {
  if (config.showLoading) {
    showLoading()
  }

  const session = mpx.getStorageSync('template_session') || {}
  const token = session.token
  const cookies = mpx.getStorageSync('cookies')

  config.headers = config.headers || {}
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  if (cookies && cookies.length) {
    config.headers.cookie = cookies.join(';')
  }

  return config
})

mpx.xfetch.interceptors.response.use(
  (response) => {
    if (response.requestConfig.showLoading) {
      hideLoading()
    }

    if (response.cookies && response.cookies.length) {
      const cookieParts = response.cookies[0].split(';')
      mpx.setStorageSync('cookies', cookieParts)
    }

    return response.data
  },
  (error) => {
    hideLoading()

    if (error.code === 'ECONNABORTED') {
      mpx.showToast({ title: '请求超时', icon: 'none' })
      return Promise.reject(error)
    }

    try {
      const status = error.response && error.response.status
      const message = status === 404 ? '接口不存在' : status === 500 ? '服务异常' : '网络异常'
      mpx.showToast({ title: message, icon: 'none' })
    } catch (err) {
      mpx.showToast({ title: '网络异常', icon: 'none' })
    }

    return Promise.reject(error)
  }
)

function request({ url, config = {} }) {
  return mpx.xfetch.fetch({
    url: url.includes('http') ? url : `${baseURL}${url}`,
    timeout: config.timeout || 10000,
    ...config
  })
}

function buildConfig(method, parameter = {}) {
  return {
    method,
    data: parameter.data,
    params: parameter.params,
    showLoading: parameter.showLoading,
    showToastMsg: parameter.showToastMsg,
    headers: parameter.headers || {},
    timeout: parameter.timeout || 10000
  }
}

export function get(url, parameter = {}) {
  return request({ url, config: buildConfig('GET', parameter) })
}

export function post(url, parameter = {}) {
  return request({ url, config: buildConfig('POST', parameter) })
}

export function put(url, parameter = {}) {
  return request({ url, config: buildConfig('PUT', parameter) })
}

export function del(url, parameter = {}) {
  return request({ url, config: buildConfig('DELETE', parameter) })
}

export function postForm(url, parameter = {}) {
  const config = buildConfig('POST', parameter)
  config.emulateJSON = true
  return request({ url, config })
}

export function upload(url, parameter = {}) {
  const { formData = {}, filePath, name = 'file', showLoading } = parameter

  return new Promise((resolve, reject) => {
    if (showLoading) {
      mpx.showLoading({ title: '上传中...' })
    }

    mpx.uploadFile({
      url: url.includes('http') ? url : `${baseURL}${url}`,
      filePath,
      name,
      formData,
      success(res) {
        if (showLoading) {
          mpx.hideLoading()
        }
        try {
          resolve(JSON.parse(res.data))
        } catch (error) {
          reject(error)
        }
      },
      fail(err) {
        if (showLoading) {
          mpx.hideLoading()
        }
        mpx.showToast({ title: '上传失败', icon: 'none' })
        reject(err)
      }
    })
  })
}
