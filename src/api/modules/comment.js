import {
  createCommentMock,
  createDataResponse,
  createListResponse,
  deleteCommentMock,
  getCommentListMock,
  getPayload,
  replyCommentMock
} from './mock-data'

export function getCommentList(parameter = {}) {
  const { noteId, id } = getPayload(parameter)
  return createListResponse(getCommentListMock(noteId || id), parameter)
}

export function createComment(parameter = {}) {
  const { noteId, content } = getPayload(parameter)
  return createDataResponse(createCommentMock(noteId, content))
}

export function replyComment(parameter = {}) {
  const { noteId, parentId, content } = getPayload(parameter)
  return createDataResponse(replyCommentMock(noteId, parentId, content))
}

export function deleteComment(parameter = {}) {
  const { commentId, id } = getPayload(parameter)
  return createDataResponse(deleteCommentMock(commentId || id))
}
