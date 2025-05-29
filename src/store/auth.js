import { defineStore } from '@mpxjs/pinia'

export const useAuthStore = defineStore('auth', {
  state : () => {
    return {
        isLogin: true, // 是否登录
        userInfo: {}, // 用户信息
    }
  },
  getters: {
    getIsLogin(state) {
      return state.isLogin
    }
  },
  actions: {
    setIsLogin(data) {
      this.$patch((state) => {
        state.isLogin = data
      })
    },
  }
})