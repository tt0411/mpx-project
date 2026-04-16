import {
  createListResponse,
  getHotKeywordsMock,
  getPayload,
  searchNoteCardsMock,
  searchTopicsMock,
  searchUsersMock
} from './mock-data'

export function getHotSearchList(parameter = {}) {
  return createListResponse(getHotKeywordsMock(), parameter)
}

export function searchNotes(parameter = {}) {
  const { keyword = '' } = getPayload(parameter)
  return createListResponse(searchNoteCardsMock(keyword), parameter)
}

export function searchUsers(parameter = {}) {
  const { keyword = '' } = getPayload(parameter)
  return createListResponse(searchUsersMock(keyword), parameter)
}

export function searchTopics(parameter = {}) {
  const { keyword = '' } = getPayload(parameter)
  return createListResponse(searchTopicsMock(keyword), parameter)
}
