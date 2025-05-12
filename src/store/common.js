import { defineStore } from '@mpxjs/pinia'

export const useCommonStore = defineStore('common', {
  state : () => {
    return {
      num: 10,
      title: 'hello world'
    }
  },
  getters: {
    getMyTitle(state) {
      return state.title
    }
  },
  actions: {
    increment () {
      this.$patch((state) => {
        state.num++
      })
    }
  }
})