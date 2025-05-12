import { defineStore } from '@mpxjs/pinia'
import { ref, computed } from '@mpxjs/core'

export const useOrderStore = defineStore('order', () => {
  const count = ref(0)
  const name = ref('pinia')
  const myName = computed(() => {
    return name.value
  })
  function increment() {
    count.value++
  }
  return { count, name, myName, increment }
})