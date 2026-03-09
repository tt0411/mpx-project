import JSEncrypt from 'jsencrypt'
export const EncryptRsa = (data) => {
  let publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgs7KYVB0LKQThGaEdJAkIXQqC1hWMsZHPIjX22VgEuL9IKCbOfcKFZHTxO10ut/b5gRNt1bpmYveWUpcmBYfGawtu1R1G1hJgmcXnFiBdkgP0aRiXtTpgs8SHL/rTgKjx9WMBHQmERx1ampPvGanenxFv+TQqukw1mISC8jT8/QIDAQAB'
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey)
  return encryptor.encrypt(data)
}


/**
 * 安全转数字，失败时返回默认值。
 */
export function toNumber(value, fallback = 0) {
  const result = Number(value)
  return Number.isNaN(result) ? fallback : result
}

/**
 * 将对象转换为 query string。
 */
export function toQuery(params = {}) {
  return Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
}
