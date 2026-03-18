/**
 * 模板登录接口（示例实现）
 */
export function login(parameter = {}) {
  const data = parameter.data || {}
  const username = data.username || ''

  return Promise.resolve({
    code: 0,
    message: 'success',
    data: {
      token: `mock-token-${Date.now()}`,
      userInfo: {
        id: `u-${username || 'demo'}`,
        name: username || 'Demo User'
      }
    }
  })
}

export function logout() {
  return Promise.resolve({
    code: 0,
    message: 'success',
    data: true
  })
}


export function uploadFile(parameter = {}) {
  return Promise.resolve({
    code: 0,
    message: 'success',
    data: 'https://bh-cbs-dev.oss-cn-hangzhou.aliyuncs.com/else/2026/2/26/2026960626475208705.mp4'
  })
}