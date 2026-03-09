import mpx from '@mpxjs/core'

/**
 * 支付错误码映射
 */
const PAY_ERROR_CODES = {
  'requestPayment:fail cancel': '用户取消支付',
  'requestPayment:fail': '支付失败',
  'requestPayment:fail (detail message)': '支付失败，请稍后重试'
}

/**
 * 获取支付错误提示信息
 * @param {string} errMsg - 错误信息
 * @returns {string}
 */
function getPayErrorMsg(errMsg) {
  if (!errMsg) return '支付失败'

  // 用户取消支付
  if (errMsg.includes('cancel')) {
    return '用户取消支付'
  }

  // 其他支付失败情况
  return PAY_ERROR_CODES[errMsg] || '支付失败，请稍后重试'
}

/**
 * 微信小程序支付
 * @param {Object} paymentParams - 支付参数对象
 * @param {string} paymentParams.timeStamp - 时间戳
 * @param {string} paymentParams.nonceStr - 随机字符串
 * @param {string} paymentParams.package - 订单详情扩展字符串
 * @param {string} paymentParams.signType - 签名方式，默认 MD5
 * @param {string} paymentParams.paySign - 签名
 * @param {Object} options - 可选配置项
 * @param {boolean} options.showLoading - 是否显示加载提示，默认 true
 * @param {string} options.loadingMsg - 加载提示文案，默认 '支付中...'
 * @param {boolean} options.showToast - 支付失败是否显示提示，默认 true
 * @param {string} options.successMsg - 支付成功提示文案
 * @param {boolean} options.showSuccessToast - 是否显示支付成功提示，默认 false
 * @returns {Promise<Object>} 返回支付结果
 */
export function requestPayment(paymentParams, options = {}) {
  return new Promise((resolve, reject) => {
    // 参数验证
    if (!paymentParams || typeof paymentParams !== 'object') {
      const error = new Error('支付参数不能为空')
      reject(error)
      return
    }

    const { timeStamp, nonceStr, package: packageStr, signType = 'MD5', paySign } = paymentParams

    if (!timeStamp || !nonceStr || !packageStr || !paySign) {
      const error = new Error('支付参数不完整')
      reject(error)
      return
    }

    // 默认配置
    const config = {
      showLoading: true,
      loadingMsg: '支付中...',
      showToast: true,
      successMsg: '支付成功',
      showSuccessToast: false,
      ...options
    }

    // 显示加载提示
    if (config.showLoading) {
      mpx.showLoading({ title: config.loadingMsg, mask: true })
    }

    // 调用小程序支付 API
    mpx.requestPayment({
      timeStamp,
      nonceStr,
      package: packageStr,
      signType,
      paySign,
      success: (res) => {
        if (config.showLoading) {
          mpx.hideLoading()
        }

        // 显示支付成功提示
        if (config.showSuccessToast) {
          mpx.showToast({
            title: config.successMsg,
            icon: 'success'
          })
        }

        resolve({
          success: true,
          message: '支付成功',
          raw: res
        })
      },
      fail: (err) => {
        if (config.showLoading) {
          mpx.hideLoading()
        }

        const errorMsg = getPayErrorMsg(err.errMsg)

        // 显示错误提示（用户取消除外）
        if (config.showToast && !err.errMsg.includes('cancel')) {
          mpx.showToast({
            title: errorMsg,
            icon: 'none'
          })
        }

        reject({
          success: false,
          message: errorMsg,
          isCancelled: err.errMsg.includes('cancel'),
          raw: err
        })
      }
    })
  })
}

/**
 * 支付宝小程序支付
 * @param {Object} paymentParams - 支付参数
 * @param {string} paymentParams.tradeNO - 交易号
 * @param {Object} options - 可选配置项
 * @returns {Promise<Object>}
 */
export function aliPayment(paymentParams, options = {}) {
  return new Promise((resolve, reject) => {
    if (!paymentParams || !paymentParams.tradeNO) {
      const error = new Error('支付参数不完整')
      reject(error)
      return
    }

    const config = {
      showLoading: true,
      loadingMsg: '支付中...',
      showToast: true,
      ...options
    }

    if (config.showLoading) {
      mpx.showLoading({ title: config.loadingMsg, mask: true })
    }

    mpx.requestPayment({
      tradeNO: paymentParams.tradeNO,
      success: (res) => {
        if (config.showLoading) {
          mpx.hideLoading()
        }

        resolve({
          success: true,
          message: '支付成功',
          resultCode: res.resultCode,
          raw: res
        })
      },
      fail: (err) => {
        if (config.showLoading) {
          mpx.hideLoading()
        }

        const errorMsg = getPayErrorMsg(err.errMsg)

        if (config.showToast && !err.errMsg.includes('cancel')) {
          mpx.showToast({
            title: errorMsg,
            icon: 'none'
          })
        }

        reject({
          success: false,
          message: errorMsg,
          isCancelled: err.errMsg.includes('cancel'),
          raw: err
        })
      }
    })
  })
}

/**
 * 统一支付方法（自动识别平台）
 * @param {Object} paymentParams - 支付参数
 * @param {Object} options - 可选配置项
 * @returns {Promise<Object>}
 */
export function pay(paymentParams, options = {}) {
  return new Promise((resolve, reject) => {
    // 获取当前平台
    const platform = __mpx_mode__

    // 根据平台调用对应的支付方法
    if (platform === 'wx') {
      requestPayment(paymentParams, options)
        .then(resolve)
        .catch(reject)
    } else if (platform === 'ali') {
      aliPayment(paymentParams, options)
        .then(resolve)
        .catch(reject)
    } else {
      reject({
        success: false,
        message: `暂不支持 ${platform} 平台支付`
      })
    }
  })
}

/**
 * 检查支付状态（查询订单）
 * @param {string} orderId - 订单ID
 * @param {Function} queryApi - 查询接口方法
 * @param {Object} options - 可选配置项
 * @param {number} options.maxRetry - 最大重试次数，默认 3
 * @param {number} options.retryDelay - 重试间隔（毫秒），默认 2000
 * @returns {Promise<Object>}
 */
export function checkPaymentStatus(orderId, queryApi, options = {}) {
  return new Promise((resolve, reject) => {
    if (!orderId || !queryApi) {
      reject(new Error('订单ID和查询接口不能为空'))
      return
    }

    const config = {
      maxRetry: 3,
      retryDelay: 2000,
      ...options
    }

    let retryCount = 0

    const query = () => {
      queryApi(orderId)
        .then(res => {
          if (res.code === 0 && res.data) {
            resolve({
              success: true,
              paid: res.data.paid || false,
              status: res.data.status,
              data: res.data
            })
          } else {
            // 查询失败，重试
            if (retryCount < config.maxRetry) {
              retryCount++
              setTimeout(query, config.retryDelay)
            } else {
              reject({
                success: false,
                message: '查询支付状态失败'
              })
            }
          }
        })
        .catch(err => {
          // 查询出错，重试
          if (retryCount < config.maxRetry) {
            retryCount++
            setTimeout(query, config.retryDelay)
          } else {
            reject({
              success: false,
              message: '查询支付状态异常',
              error: err
            })
          }
        })
    }

    query()
  })
}

/**
 * 完整支付流程（支付 + 查询状态）
 * @param {Object} paymentParams - 支付参数
 * @param {Object} config - 配置项
 * @param {Function} config.queryApi - 查询订单状态接口
 * @param {string} config.orderId - 订单ID
 * @param {boolean} config.autoCheck - 是否自动查询支付结果，默认 true
 * @param {Object} config.payOptions - 支付配置
 * @param {Object} config.checkOptions - 查询配置
 * @returns {Promise<Object>}
 */
export function payWithCheck(paymentParams, config = {}) {
  return new Promise((resolve, reject) => {
    const {
      queryApi,
      orderId,
      autoCheck = true,
      payOptions = {},
      checkOptions = {}
    } = config

    // 先执行支付
    pay(paymentParams, payOptions)
      .then(payResult => {
        // 如果不需要自动查询，直接返回支付结果
        if (!autoCheck || !queryApi || !orderId) {
          resolve({
            ...payResult,
            checked: false
          })
          return
        }

        // 支付成功后查询订单状态
        checkPaymentStatus(orderId, queryApi, checkOptions)
          .then(checkResult => {
            resolve({
              ...payResult,
              ...checkResult,
              checked: true
            })
          })
          .catch(checkErr => {
            // 查询失败，但支付成功
            resolve({
              ...payResult,
              checked: false,
              checkError: checkErr
            })
          })
      })
      .catch(payErr => {
        // 支付失败
        reject(payErr)
      })
  })
}

/**
 * 获取支付环境信息
 * @returns {Object}
 */
export function getPaymentEnv() {
  const platform = __mpx_mode__

  return {
    platform,
    isWechat: platform === 'wx',
    isAlipay: platform === 'ali',
    isSupportPay: ['wx', 'ali'].includes(platform)
  }
}

export default {
  requestPayment,
  aliPayment,
  pay,
  checkPaymentStatus,
  payWithCheck,
  getPaymentEnv
}
