import { defineStore } from '@mpxjs/pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    activeTabbarValue: '1',
    tabBarList: [
      {
        pagePath: '/pages/tabs/home/index',
        value: '1',
        label: '首页',
        icon: 'home',
      },
      {
        pagePath: '/pages/tabs/app/index',
        value: '2',
        label: '软件',
        icon: 'app',
      },
      {
        pagePath: '/pages/tabs/discover/index',
        value: '3',
        label: '发现',
        icon: 'add-circle',
      },
      {
        pagePath: '/pages/tabs/chat/index',
        value: '4',
        label: '聊天',
        icon: 'chat',
      },
      {
        pagePath: '/pages/tabs/profile/index',
        value: '5',
        label: '我的',
        icon: 'user',
      }
    ]
  }),
  actions: {
    setActiveTabbarValue(value) {
      this.activeTabbarValue = value
    }
  }
})
