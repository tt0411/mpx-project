import { defineStore } from '@mpxjs/pinia'

export const useCommonStore = defineStore('common', {
  state : () => {
    return {
      activeTabbarIndex: 0, // 当前选中的tabbar索引
      tabBarList: [
        {
            pagePath: "/pages/tabs/work/index",
            iconPath: "https://cbs-worker-wxapp.oss-cn-hangzhou.aliyuncs.com/static/tabs/work.png",
            selectedIconPath: "https://cbs-worker-wxapp.oss-cn-hangzhou.aliyuncs.com/static/tabs/work-active.png",
            text: "工单"
        },
        {
            pagePath: "/pages/tabs/warehouse/index",
            iconPath: "https://cbs-worker-wxapp.oss-cn-hangzhou.aliyuncs.com/static/tabs/warehouse.png",
            selectedIconPath: "https://cbs-worker-wxapp.oss-cn-hangzhou.aliyuncs.com/static/tabs/warehouse-active.png",
            text: "仓库"
        },
        {
            pagePath: "/pages/tabs/knowledge/index",
            iconPath: "https://cbs-worker-wxapp.oss-cn-hangzhou.aliyuncs.com/static/tabs/knowledge.png",
            selectedIconPath: "https://cbs-worker-wxapp.oss-cn-hangzhou.aliyuncs.com/static/tabs/knowledge-active.png",
            text: "e帮手学堂"
        },
        {
            pagePath: "/pages/tabs/notice/index",
            iconPath: "https://cbs-worker-wxapp.oss-cn-hangzhou.aliyuncs.com/static/tabs/notice.png",
            selectedIconPath: "https://cbs-worker-wxapp.oss-cn-hangzhou.aliyuncs.com/static/tabs/notice-active.png",
            text: "公告",
            info: 3
        },
        {
            pagePath: "/pages/tabs/mine/index",
            iconPath: "https://cbs-worker-wxapp.oss-cn-hangzhou.aliyuncs.com/static/tabs/my.png",
            selectedIconPath: "https://cbs-worker-wxapp.oss-cn-hangzhou.aliyuncs.com/static/tabs/my-active.png",
            text: "我的",
            dot: true,
        }
     ]
    }
  },
  actions: {
    setActiveTabbarIndex(index) {
      this.$patch((state) => {
        state.activeTabbarIndex = index
      })
    },
  }
})