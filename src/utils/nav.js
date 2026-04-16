import mpx from '@mpxjs/core'
import { routes } from './router'
import { useCommonStore } from '@/store'

const routeMap = routes.reduce((map, route) => {
  map[route.name] = route
  return map
}, {})

const tabBarPages = [
  '/pages/tabs/home/index',
  '/pages/tabs/discover/index',
  '/pages/tabs/publish/index',
  '/pages/tabs/message/index',
  '/pages/tabs/profile/index'
]

function isTabBarPage(path) {
  return tabBarPages.includes(path)
}

function buildUrl(path, params = {}) {
  if (!params || Object.keys(params).length === 0) {
    return path
  }

  const queryString = Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')

  return `${path}?${queryString}`
}

function decodeQueryValue(value = '') {
  try {
    return decodeURIComponent(value)
  } catch (error) {
    return value
  }
}

function parseRouteParams(value = '') {
  const decodedValue = decodeQueryValue(value)
  if (!decodedValue) return {}

  try {
    return JSON.parse(decodedValue)
  } catch (error) {
    return {}
  }
}

function getPathByName(name) {
  const route = routeMap[name]
  return route ? route.path : null
}

function syncTabbarIndexByPath(path) {
  if (!isTabBarPage(path)) return

  const commonStore = useCommonStore()
  const currentTab = commonStore.tabBarList.find((item) => item.pagePath === path)

  if (currentTab) {
    commonStore.setActiveTabbarIndex(currentTab.value)
  }
}

export function navigateTo(options, params = {}) {
  return new Promise((resolve, reject) => {
    const path = typeof options === 'string' ? getPathByName(options) || options : options.path || getPathByName(options.name)
    const query = typeof options === 'string' ? params : options.params || {}

    if (!path) return reject(new Error('路径不能为空'))

    mpx.navigateTo({
      url: buildUrl(path, query),
      success: resolve,
      fail: reject
    })
  })
}

export function redirectTo(options, params = {}) {
  return new Promise((resolve, reject) => {
    const path = typeof options === 'string' ? getPathByName(options) || options : options.path || getPathByName(options.name)
    const query = typeof options === 'string' ? params : options.params || {}

    if (!path) return reject(new Error('路径不能为空'))

    mpx.redirectTo({
      url: buildUrl(path, query),
      success: resolve,
      fail: reject
    })
  })
}

export function switchTab(options) {
  return new Promise((resolve, reject) => {
    const path = typeof options === 'string' ? getPathByName(options) || options : options.path || getPathByName(options.name)

    if (!path) return reject(new Error('路径不能为空'))
    if (!isTabBarPage(path)) return reject(new Error(`${path} 不是 tabBar 页面`))

    syncTabbarIndexByPath(path)

    mpx.switchTab({ url: path, success: resolve, fail: reject })
  })
}

export function reLaunch(options, params = {}) {
  return new Promise((resolve, reject) => {
    const path = typeof options === 'string' ? getPathByName(options) || options : options.path || getPathByName(options.name)
    const query = typeof options === 'string' ? params : options.params || {}

    if (!path) return reject(new Error('路径不能为空'))

    syncTabbarIndexByPath(path)

    mpx.reLaunch({
      url: buildUrl(path, query),
      success: resolve,
      fail: reject
    })
  })
}

export function navigateBack(delta = 1) {
  return new Promise((resolve, reject) => {
    mpx.navigateBack({ delta, success: resolve, fail: reject })
  })
}

export function navigateToLogin(redirect = 'home', redirectParams = {}) {
  const query = {
    redirect
  }

  if (redirectParams && Object.keys(redirectParams).length) {
    query.redirectParams = JSON.stringify(redirectParams)
  }

  return navigateTo('login', query)
}

export function redirectAfterLogin(redirect = 'home', redirectParams = '') {
  const target = redirect || 'home'
  const path = getPathByName(target) || target
  const params = parseRouteParams(redirectParams)

  if (!path) {
    return switchTab('home')
  }

  if (isTabBarPage(path)) {
    return switchTab(target)
  }

  return redirectTo(target, params)
}

export { decodeQueryValue, parseRouteParams }
