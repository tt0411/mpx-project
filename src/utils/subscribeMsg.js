import mpx from '@mpxjs/core'

/**
 * 小程序订阅消息封装
 * @param {Array<string>|string} tmplIds - 模板 ID 数组或单个模板 ID
 * @param {Object} options - 可选配置项
 * @param {boolean} options.showToast - 是否显示提示信息，默认 false
 * @param {string} options.successMsg - 订阅成功提示文案
 * @param {string} options.failMsg - 订阅失败提示文案
 * @param {boolean} options.failGoOn - 订阅失败是否继续，默认 false
 * @returns {Promise<Object>} 返回订阅结果
 */
export function subscribeMessage(tmplIds, options = {}) {
  return new Promise((resolve, reject) => {
    // 参数处理
    const templateIds = Array.isArray(tmplIds) ? tmplIds : [tmplIds]

    // 默认配置
    const config = {
      showToast: false,
      successMsg: '订阅成功',
      failMsg: '订阅失败',
      failGoOn: true,
      ...options
    }

    // 调用小程序订阅消息 API
    mpx.requestSubscribeMessage({
      tmplIds: templateIds,
      success: (res) => {
        // 处理订阅结果
        const acceptedList = []
        const rejectedList = []

        templateIds.forEach(tmplId => {
          const status = res[tmplId]
          if (status === 'accept') {
            acceptedList.push(tmplId)
          } else {
            rejectedList.push({ tmplId, status })
          }
        })

        const result = {
          accepted: acceptedList,
          rejected: rejectedList,
          allAccepted: acceptedList.length === templateIds.length,
          raw: res
        }

        // 显示提示信息
        if (config.showToast && result.allAccepted) {
          mpx.showToast({
            title: config.successMsg,
            icon: 'success'
          })
        }

        resolve(result)
      },
      fail: (err) => {
        // 订阅失败处理
        if (config.showToast) {
          mpx.showToast({
            title: config.failMsg,
            icon: 'none'
          })
        }
        config.failGoOn ? resolve() : reject(err)
      }
    })
  })
}

/**
 * 批量订阅消息（一次性订阅）
 * @param {Array<string>} tmplIds - 模板 ID 数组
 * @param {Object} options - 可选配置项
 * @returns {Promise<Object>} 返回订阅结果
 */
export function subscribeMessageOnce(tmplIds, options = {}) {
  return subscribeMessage(tmplIds, {
    ...options,
    showToast: options.showToast ?? false
  })
}

/**
 * 检查订阅消息设置
 * @returns {Promise<Object>} 返回设置信息
 */
export function getSetting() {
  return new Promise((resolve, reject) => {
    mpx.getSetting({
      withSubscriptions: true,
      success: (res) => {
        resolve({
          subscriptionEnabled: res.subscriptionsSetting?.mainSwitch ?? false,
          itemSettings: res.subscriptionsSetting?.itemSettings ?? {},
          raw: res
        })
      },
      fail: reject
    })
  })
}

export default {
  subscribeMessage,
  subscribeMessageOnce,
  getSetting
}
