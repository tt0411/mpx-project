import { defineStore } from '@mpxjs/pinia'
import { createComment, getCommentList, getNoteDetail, replyComment, toggleNoteCollect, toggleNoteLike } from '@/api'
import { useFeedStore } from './feed'
import { useProfileStore } from './profile'
import { useSearchStore } from './search'

function getPendingKey(noteId, type) {
  return `${noteId}:${type}`
}

export const useNoteStore = defineStore('note', {
  state: () => ({
    currentNoteId: '',
    detailMap: {},
    commentPreviewMap: {},
    detailLoadingMap: {},
    interactionPendingMap: {}
  }),
  actions: {
    async fetchNoteDetail(noteId) {
      this.currentNoteId = noteId
      this.detailLoadingMap = {
        ...this.detailLoadingMap,
        [noteId]: true
      }

      try {
        const { code, data } = await getNoteDetail({ params: { noteId } })
        if (code === 0 && data) {
          this.detailMap = {
            ...this.detailMap,
            [noteId]: data
          }
        }
      } finally {
        this.detailLoadingMap = {
          ...this.detailLoadingMap,
          [noteId]: false
        }
      }
    },
    async fetchCommentPreview(noteId) {
      const { code, data } = await getCommentList({ params: { noteId, pageNo: 1, pageSize: 3 } })
      if (code === 0) {
        this.commentPreviewMap = {
          ...this.commentPreviewMap,
          [noteId]: data.list || []
        }
      }
    },
    patchDetailById(noteId, patch = {}) {
      const current = this.detailMap[noteId]
      if (!current) return
      this.detailMap = {
        ...this.detailMap,
        [noteId]: {
          ...current,
          ...patch
        }
      }
    },
    patchCommentCount(noteId, delta) {
      const current = this.detailMap[noteId]
      if (!current) return
      const nextCommentCount = Math.max((current.commentCount || 0) + delta, 0)
      this.syncNotePatch(noteId, { commentCount: nextCommentCount })
    },
    syncNotePatch(noteId, patch = {}) {
      if (this.detailMap[noteId]) {
        this.patchDetailById(noteId, patch)
      }

      useFeedStore().patchNoteInFeeds(noteId, patch)
      useSearchStore().patchNoteInResults(noteId, patch)
      useProfileStore().patchNoteInMyList(noteId, patch)
    },
    async toggleLike(noteId) {
      const pendingKey = getPendingKey(noteId, 'like')
      if (this.interactionPendingMap[pendingKey]) return

      this.interactionPendingMap = {
        ...this.interactionPendingMap,
        [pendingKey]: true
      }

      try {
        const { code, data } = await toggleNoteLike({ data: { noteId } })
        if (code === 0 && data) {
          this.syncNotePatch(noteId, {
            liked: data.liked,
            likeCount: data.likeCount
          })
        }
      } finally {
        this.interactionPendingMap = {
          ...this.interactionPendingMap,
          [pendingKey]: false
        }
      }
    },
    async toggleCollect(noteId) {
      const pendingKey = getPendingKey(noteId, 'collect')
      if (this.interactionPendingMap[pendingKey]) return

      this.interactionPendingMap = {
        ...this.interactionPendingMap,
        [pendingKey]: true
      }

      try {
        const { code, data } = await toggleNoteCollect({ data: { noteId } })
        if (code === 0 && data) {
          this.syncNotePatch(noteId, {
            collected: data.collected,
            collectCount: data.collectCount
          })
        }
      } finally {
        this.interactionPendingMap = {
          ...this.interactionPendingMap,
          [pendingKey]: false
        }
      }
    },
    async createNoteComment(noteId, content) {
      const { code, data } = await createComment({ data: { noteId, content } })
      if (code === 0 && data) {
        this.patchCommentCount(noteId, 1)
      }
      return data
    },
    async replyToComment(noteId, parentId, content) {
      const { code, data } = await replyComment({ data: { noteId, parentId, content } })
      if (code === 0 && data) {
        this.patchCommentCount(noteId, 1)
      }
      return data
    },
    clearCurrentNote() {
      this.currentNoteId = ''
    }
  }
})
