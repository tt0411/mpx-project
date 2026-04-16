import { createDataResponse, getCurrentUserProfile, getPayload, getUserProfileMock, normalizeMockAssets, resolveLoginUser, updateCurrentUserMock } from './mock-data'

function createSession(userInfo) {
  return {
    token: `mock-token-${Date.now()}`,
    userInfo: normalizeMockAssets({
      ...userInfo,
      name: userInfo.nickname,
      nickname: userInfo.nickname
    })
  }
}

/**
 * 模板登录接口（示例实现）
 */
export function login(parameter = {}) {
  const data = getPayload(parameter)
  const username = data.username || getCurrentUserProfile().nickname || 'demo'
  const loginUser = resolveLoginUser(username)

  return Promise.resolve({
    code: 0,
    message: 'success',
    data: createSession(loginUser)
  })
}

export function sendSmsCode(parameter = {}) {
  const { phone } = getPayload(parameter)
  const phonePattern = /^1\d{10}$/

  if (!phonePattern.test(String(phone || ''))) {
    return Promise.resolve({
      code: 1,
      message: '请输入正确的手机号',
      data: null
    })
  }

  return Promise.resolve({
    code: 0,
    message: '验证码已发送，演示环境固定为 123456',
    data: {
      phone,
      code: '123456'
    }
  })
}

export function loginByPhoneCode(parameter = {}) {
  const { phone, code } = getPayload(parameter)
  const phonePattern = /^1\d{10}$/

  if (!phonePattern.test(String(phone || ''))) {
    return Promise.resolve({
      code: 1,
      message: '请输入正确的手机号',
      data: null
    })
  }

  if (String(code || '') !== '123456') {
    return Promise.resolve({
      code: 1,
      message: '验证码错误，演示环境请使用 123456',
      data: null
    })
  }

  const loginUser = resolveLoginUser(`用户${String(phone).slice(-4)}`)

  return Promise.resolve({
    code: 0,
    message: 'success',
    data: createSession({
      ...loginUser,
      nickname: `用户${String(phone).slice(-4)}`,
      phone
    })
  })
}

export function loginByWechat() {
  const loginUser = resolveLoginUser('微信用户')

  return Promise.resolve({
    code: 0,
    message: 'success',
    data: createSession({
      ...loginUser,
      nickname: loginUser.nickname || '微信用户'
    })
  })
}

export function logout() {
  return createDataResponse(true)
}

export function getCurrentUser() {
  return createDataResponse(getCurrentUserProfile())
}

export function updateProfile(parameter = {}) {
  return createDataResponse(updateCurrentUserMock(getPayload(parameter)))
}

export function getUserProfile(parameter = {}) {
  const { userId, id } = getPayload(parameter)
  return createDataResponse(getUserProfileMock(userId || id))
}

export function uploadFile(parameter = {}) {
  return Promise.resolve({
    code: 0,
    message: 'success',
    data: `https://picsum.photos/seed/upload-file-${Date.now()}/1080/1440`
  })
}
