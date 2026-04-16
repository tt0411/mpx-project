import {
  createDataResponse,
  createListResponse,
  createNoteMock,
  deleteNoteMock,
  getMyNotesMock,
  getNoteDetailMock,
  getPayload,
  getUserNotesMock,
  updateNoteMock
} from './mock-data'

export function getNoteDetail(parameter = {}) {
  const { noteId, id } = getPayload(parameter)
  return createDataResponse(getNoteDetailMock(noteId || id))
}

export function createNote(parameter = {}) {
  return createDataResponse(createNoteMock(getPayload(parameter)))
}

export function updateNote(parameter = {}) {
  return createDataResponse(updateNoteMock(getPayload(parameter)))
}

export function deleteNote(parameter = {}) {
  const { noteId, id } = getPayload(parameter)
  return createDataResponse(deleteNoteMock(noteId || id))
}

export function getMyNotes(parameter = {}) {
  return createListResponse(getMyNotesMock(), parameter)
}

export function getUserNotes(parameter = {}) {
  const { userId, id } = getPayload(parameter)
  return createListResponse(getUserNotesMock(userId || id), parameter)
}
