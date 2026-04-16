import { defineStore } from '@mpxjs/pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    activeTabbarIndex: 0,
    tabbarMode: 'normal', // 'normal' | 'floating'
    messageBadgeCount: 0,
    tabBarList: [
      {
        name: 'home',
        pagePath: '/pages/tabs/home/index',
        value: 0,
        label: '首页',
        icon: 'home',
      },
      {
        name: 'discover',
        pagePath: '/pages/tabs/discover/index',
        value: 1,
        label: '发现',
        icon: 'like',
      },
      {
        name: 'publish',
        pagePath: '/pages/tabs/publish/index',
        value: 2,
        label: '发布',
        icon: 'add',
        isCenter: true,
      },
      {
        name: 'message',
        pagePath: '/pages/tabs/message/index',
        value: 3,
        label: '消息',
        icon: 'chat',
      },
      {
        name: 'profile',
        pagePath: '/pages/tabs/profile/index',
        value: 4,
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
    },
    setMessageBadgeCount(count) {
      this.messageBadgeCount = count
    }
  }
})
