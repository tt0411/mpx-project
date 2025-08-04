import { defineStore } from '@mpxjs/pinia'

export const useAuthStore = defineStore('auth', {
  state : () => {
    return {
        userInfo: {}, // 师傅信息
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    }
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    clearUserInfo() {
      this.userInfo = {}
    }
  }
})