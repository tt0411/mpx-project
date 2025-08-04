import JSEncrypt from 'jsencrypt'
export const passwordRsa = (data) => {
  let publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgs7KYVB0LKQThGaEdJAkIXQqC1hWMsZHPIjX22VgEuL9IKCbOfcKFZHTxO10ut/b5gRNt1bpmYveWUpcmBYfGawtu1R1G1hJgmcXnFiBdkgP0aRiXtTpgs8SHL/rTgKjx9WMBHQmERx1ampPvGanenxFv+TQqukw1mISC8jT8/QIDAQAB'
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey)
  return encryptor.encrypt(data)
}