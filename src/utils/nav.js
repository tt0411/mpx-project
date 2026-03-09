import mpx from '@mpxjs/core'
import { routes } from './router'

/**
 * 路由映射表 - 通过 name 快速查找路由配置
 */
const routeMap = routes.reduce((map, route) => {
  map[route.name] = route
  return map
}, {})

/**
 * Tab 页面路径集合
 */
const tabBarPages = [
  '/pages/tabs/work/index',
  '/pages/tabs/warehouse/index',
  '/pages/tabs/knowledge/index',
  '/pages/tabs/notice/index',
  '/pages/tabs/mine/index'
]

/**
 * 判断是否为 Tab 页面
 * @param {string} path - 页面路径
 * @returns {boolean}
 */
function isTabBarPage(path) {
  return tabBarPages.includes(path)
}

/**
 * 构建完整的 URL（路径 + 参数）
 * @param {string} path - 页面路径
 * @param {Object} params - 页面参数
 * @returns {string}
 */
function buildUrl(path, params = {}) {
  if (!params || Object.keys(params).length === 0) {
    return path
  }

  const queryString = Object.keys(params)
    .map(key => {
      const value = params[key]
      // 处理对象和数组，转为 JSON 字符串
      if (typeof value === 'object') {
        return `${key}=${encodeURIComponent(JSON.stringify(value))}`
      }
      return `${key}=${encodeURIComponent(value)}`
    })
    .join('&')

  return `${path}?${queryString}`
}

/**
 * 通过路由名称获取路径
 * @param {string} name - 路由名称
 * @returns {string|null}
 */
function getPathByName(name) {
  const route = routeMap[name]
  return route ? route.path : null
}

/**
 * 保留当前页面，跳转到应用内的某个页面
 * @param {string|Object} options - 路由名称或配置对象 { name, path, params, events, success }
 * @param {Object} params - 页面参数（当 options 为 string 时使用）
 * @returns {Promise}
 */
export function navigateTo(options, params = {}) {
  return new Promise((resolve, reject) => {
    let path = ''
    let query = params
    let events = null
    let success = null

    // 处理参数格式
    if (typeof options === 'string') {
      // 字符串参数，优先作为 name 查找，找不到则作为 path
      path = getPathByName(options) || options
    } else if (typeof options === 'object') {
      path = options.path || getPathByName(options.name) || ''
      query = options.params || {}
      events = options.events || null
      success = options.success || null
    }

    if (!path) {
      const error = new Error('路径不能为空')
      reject(error)
      return
    }

    const url = buildUrl(path, query)
    const navigateConfig = {
      url,
      success: (res) => {
        // 如果有自定义 success 回调，先执行
        if (success && typeof success === 'function') {
          success(res)
        }
        resolve(res)
      },
      fail: (err) => reject(err)
    }

    // 如果配置了 events，则通过 eventChannel 传递事件
    if (events && typeof events === 'object') {
      navigateConfig.events = events
    }

    mpx.navigateTo(navigateConfig)
  })
}

/**
 * 关闭当前页面，跳转到应用内的某个页面
 * @param {string|Object} options - 路由名称或配置对象 { name, path, params }
 * @param {Object} params - 页面参数（当 options 为 string 时使用）
 * @returns {Promise}
 */
export function redirectTo(options, params = {}) {
  return new Promise((resolve, reject) => {
    let path = ''
    let query = params

    if (typeof options === 'string') {
      path = getPathByName(options) || options
    } else if (typeof options === 'object') {
      path = options.path || getPathByName(options.name) || ''
      query = options.params || {}
    }

    if (!path) {
      const error = new Error('路径不能为空')
      reject(error)
      return
    }

    const url = buildUrl(path, query)

    mpx.redirectTo({
      url,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
}

/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 * @param {string|Object} options - 路由名称或配置对象 { name, path }
 * @returns {Promise}
 */
export function switchTab(options) {
  return new Promise((resolve, reject) => {
    let path = ''

    if (typeof options === 'string') {
      path = getPathByName(options) || options
    } else if (typeof options === 'object') {
      path = options.path || getPathByName(options.name) || ''
    }

    if (!path) {
      const error = new Error('路径不能为空')
      reject(error)
      return
    }

    if (!isTabBarPage(path)) {
      const error = new Error(`${path} 不是 tabBar 页面`)
      reject(error)
      return
    }

    mpx.switchTab({
      url: path,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
}

/**
 * 关闭所有页面，打开到应用内的某个页面
 * @param {string|Object} options - 路由名称或配置对象 { name, path, params }
 * @param {Object} params - 页面参数（当 options 为 string 时使用）
 * @returns {Promise}
 */
export function reLaunch(options, params = {}) {
  return new Promise((resolve, reject) => {
    let path = ''
    let query = params

    if (typeof options === 'string') {
      path = getPathByName(options) || options
    } else if (typeof options === 'object') {
      path = options.path || getPathByName(options.name) || ''
      query = options.params || {}
    }

    if (!path) {
      const error = new Error('路径不能为空')
      reject(error)
      return
    }

    const url = buildUrl(path, query)

    mpx.reLaunch({
      url,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
}

/**
 * 关闭当前页面，返回上一页面或多级页面
 * @param {number} delta - 返回的页面数，默认为 1
 * @returns {Promise}
 */
export function navigateBack(delta = 1) {
  return new Promise((resolve, reject) => {
    mpx.navigateBack({
      delta,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
}

/**
 * 智能导航 - 自动判断使用哪种跳转方式
 * @param {string|Object} options - 路由名称或配置对象 { name, path, params, replace }
 * @param {Object} params - 页面参数（当 options 为 string 时使用）
 * @returns {Promise}
 */
export function navigate(options, params = {}) {
  return new Promise((resolve, reject) => {
    let path = ''
    let query = params
    let replace = false

    if (typeof options === 'string') {
      path = getPathByName(options) || options
    } else if (typeof options === 'object') {
      path = options.path || getPathByName(options.name) || ''
      query = options.params || {}
      replace = options.replace || false
    }

    if (!path) {
      const error = new Error('路径不能为空')
      reject(error)
      return
    }

    // 判断跳转方式
    if (isTabBarPage(path)) {
      // Tab 页面使用 switchTab
      switchTab(path).then(resolve).catch(reject)
    } else if (replace) {
      // 替换当前页面
      redirectTo({ path, params: query }).then(resolve).catch(reject)
    } else {
      // 普通跳转
      navigateTo({ path, params: query }).then(resolve).catch(reject)
    }
  })
}

/**
 * 获取所有路由信息
 * @returns {Array}
 */
export function getRoutes() {
  return routes
}

/**
 * 根据路由名称获取路由信息
 * @param {string} name - 路由名称
 * @returns {Object|null}
 */
export function getRoute(name) {
  return routeMap[name] || null
}

export default {
  navigateTo,
  redirectTo,
  switchTab,
  reLaunch,
  navigateBack,
  navigate,
  getRoutes,
  getRoute,
  isTabBarPage,
  buildUrl,
  getPathByName
}
