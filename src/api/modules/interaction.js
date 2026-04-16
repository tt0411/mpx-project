import {
  createDataResponse,
  getPayload,
  toggleNoteCollectMock,
  toggleNoteLikeMock,
  toggleUserFollowMock
} from './mock-data'

export function toggleNoteLike(parameter = {}) {
  const { noteId, id } = getPayload(parameter)
  return createDataResponse(toggleNoteLikeMock(noteId || id))
}

export function toggleNoteCollect(parameter = {}) {
  const { noteId, id } = getPayload(parameter)
  return createDataResponse(toggleNoteCollectMock(noteId || id))
}

export function toggleUserFollow(parameter = {}) {
  const { userId, id } = getPayload(parameter)
  return createDataResponse(toggleUserFollowMock(userId || id))
}
