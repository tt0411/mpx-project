import { defineStore } from '@mpxjs/pinia'
import { getCurrentUser, getDraftList, getMyNotes, getUserNotes, getUserProfile, toggleUserFollow } from '@/api'

function createListState() {
  return {
    list: [],
    pageNo: 1,
    pageSize: 10,
    hasMore: true,
    loading: false,
    initialized: false
  }
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    myProfile: null,
    myStats: {
      followCount: 0,
      fansCount: 0,
      likedReceivedCount: 0
    },
    myNotes: createListState(),
    myCollectionPreview: [],
    draftSummary: {
      count: 0,
      latestDraft: null
    },
    visitProfiles: {},
    visitUserNotes: {},
    followPendingMap: {}
  }),
  actions: {
    async fetchMyProfile() {
      const { code, data } = await getCurrentUser()
      if (code !== 0) return

      this.myProfile = data
      this.myStats = {
        followCount: data.followCount || 0,
        fansCount: data.fansCount || 0,
        likedReceivedCount: data.likedReceivedCount || 0
      }
    },
    async fetchMyNotes({ refresh = false } = {}) {
      const nextPageNo = refresh ? 1 : this.myNotes.pageNo
      this.myNotes.loading = true

      try {
        const { code, data } = await getMyNotes({ params: { pageNo: nextPageNo, pageSize: this.myNotes.pageSize } })
        if (code !== 0) return

        this.myNotes.list = refresh ? data.list || [] : [...this.myNotes.list, ...(data.list || [])]
        this.myNotes.pageNo = nextPageNo + 1
        this.myNotes.pageSize = data.pageSize || this.myNotes.pageSize
        this.myNotes.hasMore = Boolean(data.hasMore)
        this.myNotes.initialized = true
      } finally {
        this.myNotes.loading = false
      }
    },
    async fetchMyCollectionPreview() {
      this.myCollectionPreview = []
    },
    async fetchDraftSummary() {
      const { code, data } = await getDraftList({ params: { pageNo: 1, pageSize: 10 } })
      if (code !== 0) return

      this.draftSummary = {
        count: (data.list || []).length,
        latestDraft: (data.list || [])[0] || null
      }
    },
    async fetchVisitProfile(userId) {
      const { code, data } = await getUserProfile({ params: { userId } })
      if (code === 0 && data) {
        this.visitProfiles = {
          ...this.visitProfiles,
          [userId]: data
        }
      }
    },
    async fetchVisitUserNotes(userId, { refresh = false } = {}) {
      const currentState = this.visitUserNotes[userId] || createListState()
      const nextPageNo = refresh ? 1 : currentState.pageNo
      currentState.loading = true
      this.visitUserNotes = {
        ...this.visitUserNotes,
        [userId]: currentState
      }

      try {
        const { code, data } = await getUserNotes({ params: { userId, pageNo: nextPageNo, pageSize: currentState.pageSize } })
        if (code !== 0) return

        this.visitUserNotes = {
          ...this.visitUserNotes,
          [userId]: {
            ...currentState,
            list: refresh ? data.list || [] : [...currentState.list, ...(data.list || [])],
            pageNo: nextPageNo + 1,
            pageSize: data.pageSize || currentState.pageSize,
            hasMore: Boolean(data.hasMore),
            loading: false,
            initialized: true
          }
        }
      } finally {
        const target = this.visitUserNotes[userId]
        if (target) {
          this.visitUserNotes = {
            ...this.visitUserNotes,
            [userId]: {
              ...target,
              loading: false
            }
          }
        }
      }
    },
    patchNoteInMyList(noteId, patch = {}) {
      this.myNotes.list = this.myNotes.list.map((item) => {
        if (item.id !== noteId) return item
        return { ...item, ...patch }
      })
    },
    async patchVisitFollowState(userId) {
      this.followPendingMap = {
        ...this.followPendingMap,
        [userId]: true
      }

      try {
        const { code, data } = await toggleUserFollow({ data: { userId } })
        if (code !== 0) return

        if (this.visitProfiles[userId]) {
          this.visitProfiles = {
            ...this.visitProfiles,
            [userId]: {
              ...this.visitProfiles[userId],
              isFollowed: data.isFollowed,
              followCount: data.followCount
            }
          }
        }
      } finally {
        this.followPendingMap = {
          ...this.followPendingMap,
          [userId]: false
        }
      }
    }
  }
})
