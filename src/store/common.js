import { defineStore } from '@mpxjs/pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    activeTabbarIndex: 0,
    tabbarMode: 'normal', // 'normal' | 'floating'
    tabBarList: [
      {
        pagePath: '/pages/tabs/home/index',
        value: 0,
        label: '首页',
        icon: 'home',
      },
      {
        pagePath: '/pages/tabs/discover/index',
        value: 1,
        label: '发现',
        icon: 'like',
      },
      {
        pagePath: '/pages/tabs/message/index',
        value: 2,
        label: '消息',
        icon: 'chat',
      },
      {
        pagePath: '/pages/tabs/profile/index',
        value: 3,
        label: '我的',
        icon: 'user',
      }
    ]
  }),
  actions: {
    setActiveTabbarIndex(index) {
      this.activeTabbarIndex = index
    },
    setTabbarMode(mode) {
      this.tabbarMode = mode
    }
  }
})

