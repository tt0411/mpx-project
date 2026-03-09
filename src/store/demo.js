import { defineStore } from '@mpxjs/pinia'

export const useDemoStore = defineStore('demo', {
  state: () => ({
    count: 0
  }),
  actions: {
    increase() {
      this.count += 1
    }
  }
})
