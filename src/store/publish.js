import { defineStore } from '@mpxjs/pinia'
import { createNote, getDraftDetail, saveDraft, updateNote } from '@/api'
import { useProfileStore } from './profile'

function createEditorForm() {
  return {
    title: '',
    content: '',
    images: [],
    topics: [],
    categoryId: '',
    locationText: ''
  }
}

export const usePublishStore = defineStore('publish', {
  state: () => ({
    editorForm: createEditorForm(),
    currentDraftId: '',
    loadingDraft: false,
    savingDraft: false,
    publishing: false,
    hasUnsavedChanges: false,
    lastSavedAt: ''
  }),
  actions: {
    setEditorField(key, value) {
      this.editorForm = {
        ...this.editorForm,
        [key]: value
      }
      this.hasUnsavedChanges = true
    },
    setEditorImages(images) {
      this.editorForm = {
        ...this.editorForm,
        images: images || []
      }
      this.hasUnsavedChanges = true
    },
    hydrateDraft(draft) {
      this.currentDraftId = draft.draftId || ''
      this.editorForm = {
        title: draft.title || '',
        content: draft.content || '',
        images: draft.images || [],
        topics: draft.topics || [],
        categoryId: draft.categoryId || '',
        locationText: draft.locationText || ''
      }
      this.lastSavedAt = draft.updatedAt || ''
      this.hasUnsavedChanges = false
    },
    async loadDraft(draftId) {
      this.loadingDraft = true
      try {
        const { code, data } = await getDraftDetail({ params: { draftId } })
        if (code === 0 && data) {
          this.hydrateDraft(data)
        }
      } finally {
        this.loadingDraft = false
      }
    },
    async saveCurrentDraft() {
      this.savingDraft = true
      try {
        const payload = {
          draftId: this.currentDraftId,
          ...this.editorForm
        }
        const { code, data } = await saveDraft({ data: payload })
        if (code === 0 && data) {
          this.currentDraftId = data.draftId
          this.lastSavedAt = data.updatedAt
          this.hasUnsavedChanges = false
          await useProfileStore().fetchDraftSummary()
          return data
        }
      } finally {
        this.savingDraft = false
      }

      return null
    },
    async publishCurrentNote() {
      this.publishing = true
      try {
        const payload = {
          draftId: this.currentDraftId,
          ...this.editorForm
        }
        const request = payload.id ? updateNote : createNote
        const { code, data } = await request({ data: payload })
        if (code === 0 && data) {
          this.resetEditor()
          const profileStore = useProfileStore()
          await profileStore.fetchMyNotes({ refresh: true })
          await profileStore.fetchDraftSummary()
          return data
        }
      } finally {
        this.publishing = false
      }

      return null
    },
    resetEditor() {
      this.editorForm = createEditorForm()
      this.currentDraftId = ''
      this.lastSavedAt = ''
      this.hasUnsavedChanges = false
    }
  }
})
