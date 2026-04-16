import { createDataResponse, getCurrentUserProfile, getPayload, getUserProfileMock, normalizeMockAssets, resolveLoginUser, updateCurrentUserMock } from './mock-data'

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
    data: {
      token: `mock-token-${Date.now()}`,
      userInfo: normalizeMockAssets({
        ...loginUser,
        name: loginUser.nickname,
        nickname: loginUser.nickname
      })
    }
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
