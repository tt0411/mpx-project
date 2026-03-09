import mpx from '@mpxjs/core'
import { defineStore } from '@mpxjs/pinia'

export const useAuthStore = defineStore('auth', {
  state : () => {
    return {
        userInfo: mpx.getStorageSync('userInfo') || {},
    }
  },
  getters: {
    getWorkerInfo(state) {
      return state.userInfo
    }
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
      mpx.setStorageSync('userInfo', userInfo)
    },
    clearUserInfo() {
      this.userInfo = {}
      mpx.removeStorageSync('userInfo')
    }
  }
})
