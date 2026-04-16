import mpx from '@mpxjs/core'
import { defineStore } from '@mpxjs/pinia'
import { getHotSearchList, searchNotes, searchTopics, searchUsers } from '@/api'

const SEARCH_HISTORY_KEY = 'mini_redbook_search_history'

function createResultState() {
  return {
    list: [],
    pageNo: 1,
    pageSize: 10,
    hasMore: true,
    loading: false,
    initialized: false
  }
}

export const useSearchStore = defineStore('search', {
  state: () => ({
    keyword: '',
    hotKeywords: [],
    searchHistory: mpx.getStorageSync(SEARCH_HISTORY_KEY) || [],
    loadingHotKeywords: false,
    activeResultTab: 'note',
    results: {
      note: createResultState(),
      user: createResultState(),
      topic: createResultState()
    }
  }),
  actions: {
    setKeyword(keyword) {
      this.keyword = keyword
    },
    async fetchHotKeywords() {
      this.loadingHotKeywords = true
      try {
        const { code, data } = await getHotSearchList()
        if (code === 0) {
          this.hotKeywords = data.list || []
        }
      } finally {
        this.loadingHotKeywords = false
      }
    },
    addSearchHistory(keyword) {
      const normalized = String(keyword || '').trim()
      if (!normalized) return

      this.searchHistory = [normalized, ...this.searchHistory.filter((item) => item !== normalized)].slice(0, 10)
      mpx.setStorageSync(SEARCH_HISTORY_KEY, this.searchHistory)
    },
    clearSearchHistory() {
      this.searchHistory = []
      mpx.removeStorageSync(SEARCH_HISTORY_KEY)
    },
    async searchByType(type, { refresh = false } = {}) {
      const target = this.results[type]
      if (!target) return

      const apiMap = {
        note: searchNotes,
        user: searchUsers,
        topic: searchTopics
      }

      const request = apiMap[type]
      const nextPageNo = refresh ? 1 : target.pageNo
      target.loading = true

      try {
        const { code, data } = await request({ params: { keyword: this.keyword, pageNo: nextPageNo, pageSize: target.pageSize } })
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
    switchResultTab(type) {
      this.activeResultTab = type
    },
    patchNoteInResults(noteId, patch = {}) {
      this.results.note.list = this.results.note.list.map((item) => {
        if (item.id !== noteId) return item
        return { ...item, ...patch }
      })
    },
    resetSearchResults() {
      this.results = {
        note: createResultState(),
        user: createResultState(),
        topic: createResultState()
      }
    }
  }
})
