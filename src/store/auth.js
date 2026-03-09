import mpx from '@mpxjs/core'
import { defineStore } from '@mpxjs/pinia'

const STORAGE_KEY = 'template_session'

export const useUserStore = defineStore('user', {
  state: () => {
    const saved = mpx.getStorageSync(STORAGE_KEY) || {}
    return {
      userInfo: saved.userInfo || {},
      token: saved.token || ''
    }
  },
  getters: {
    isLogin(state) {
      return Boolean(state.token)
    }
  },
  actions: {
    setSession(payload = {}) {
      this.userInfo = payload.userInfo || {}
      this.token = payload.token || ''
      mpx.setStorageSync(STORAGE_KEY, {
        userInfo: this.userInfo,
        token: this.token
      })
    },
    clearSession() {
      this.userInfo = {}
      this.token = ''
      mpx.removeStorageSync(STORAGE_KEY)
      mpx.removeStorageSync('cookies')
    }
  }
})
