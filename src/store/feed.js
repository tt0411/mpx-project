import { defineStore } from '@mpxjs/pinia'
import { getDiscoverFeed, getFollowingFeed, getRecommendFeed } from '@/api'

function createFeedState() {
  return {
    list: [],
    pageNo: 1,
    pageSize: 10,
    hasMore: true,
    loading: false,
    refreshing: false,
    initialized: false
  }
}

export const useFeedStore = defineStore('feed', {
  state: () => ({
    feeds: {
      recommend: createFeedState(),
      following: createFeedState(),
      discover: createFeedState()
    },
    activeHomeTab: 'recommend'
  }),
  actions: {
    async fetchFeed(scene, { refresh = false } = {}) {
      const target = this.feeds[scene]
      if (!target) return

      const apiMap = {
        recommend: getRecommendFeed,
        following: getFollowingFeed,
        discover: getDiscoverFeed
      }

      const request = apiMap[scene]
      if (!request) return

      const nextPageNo = refresh ? 1 : target.pageNo
      target.loading = !refresh
      target.refreshing = refresh

      try {
        const { code, data } = await request({ params: { pageNo: nextPageNo, pageSize: target.pageSize } })
        if (code !== 0) return

        target.list = refresh ? data.list || [] : [...target.list, ...(data.list || [])]
        target.pageNo = nextPageNo + 1
        target.pageSize = data.pageSize || target.pageSize
        target.hasMore = Boolean(data.hasMore)
        target.initialized = true
      } finally {
        target.loading = false
        target.refreshing = false
      }
    },
    switchHomeTab(scene) {
      this.activeHomeTab = scene
    },
    patchNoteInFeeds(noteId, patch = {}) {
      Object.keys(this.feeds).forEach((scene) => {
        this.feeds[scene].list = this.feeds[scene].list.map((item) => {
          if (item.id !== noteId) return item
          return { ...item, ...patch }
        })
      })
    },
    resetFeed(scene) {
      if (!this.feeds[scene]) return
      this.feeds[scene] = createFeedState()
    },
    resetAllFeeds() {
      this.feeds = {
        recommend: createFeedState(),
        following: createFeedState(),
        discover: createFeedState()
      }
    }
  }
})
