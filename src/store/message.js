import { defineStore } from '@mpxjs/pinia'
import { getMessageList, getUnreadCount, markMessageRead } from '@/api'
import { useCommonStore } from './common'

function createMessageState() {
  return {
    list: [],
    pageNo: 1,
    pageSize: 10,
    hasMore: true,
    loading: false,
    initialized: false
  }
}

export const useMessageStore = defineStore('message', {
  state: () => ({
    activeMessageTab: 'all',
    messages: {
      all: createMessageState(),
      like: createMessageState(),
      comment: createMessageState(),
      follow: createMessageState(),
      system: createMessageState()
    },
    unreadCount: 0
  }),
  actions: {
    async fetchMessages(type, { refresh = false } = {}) {
      const target = this.messages[type]
      if (!target) return

      const nextPageNo = refresh ? 1 : target.pageNo
      target.loading = true

      try {
        const { code, data } = await getMessageList({ params: { type, pageNo: nextPageNo, pageSize: target.pageSize } })
        if (code !== 0) return

        target.list = refresh ? data.list || [] : [...target.list, ...(data.list || [])]
        target.pageNo = nextPageNo + 1
        target.pageSize = data.pageSize || target.pageSize
        target.hasMore = Boolean(data.hasMore)
        target.initialized = true
      } finally {
        target.loading = false
      }
    },
    switchMessageTab(type) {
      this.activeMessageTab = type
    },
    async markMessagesRead(ids = []) {
      if (!ids.length) return

      const { code } = await markMessageRead({ data: { ids } })
      if (code !== 0) return

      Object.keys(this.messages).forEach((type) => {
        this.messages[type].list = this.messages[type].list.map((item) => {
          if (!ids.includes(item.id)) return item
          return { ...item, isRead: true }
        })
      })

      await this.fetchUnreadCount()
    },
    async fetchUnreadCount() {
      const { code, data } = await getUnreadCount()
      if (code === 0) {
        this.unreadCount = data.count || 0
        this.syncBadgeToCommon()
      }
    },
    syncBadgeToCommon() {
      useCommonStore().setMessageBadgeCount(this.unreadCount)
    },
    resetMessages(type) {
      if (!this.messages[type]) return
      this.messages[type] = createMessageState()
    }
  }
})
