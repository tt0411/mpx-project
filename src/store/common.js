import { defineStore } from '@mpxjs/pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    activeTabbarIndex: 0,
    tabBarList: [
      {
        pagePath: '/pages/tabs/home/index',
        text: '首页',
        shortText: 'H'
      },
      {
        pagePath: '/pages/tabs/discover/index',
        text: '发现',
        shortText: 'D'
      },
      {
        pagePath: '/pages/tabs/profile/index',
        text: '我的',
        shortText: 'P'
      }
    ]
  }),
  actions: {
    setActiveTabbarIndex(index) {
      this.activeTabbarIndex = index
    }
  }
})
