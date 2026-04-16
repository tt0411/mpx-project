import { createDataResponse, createListResponse, getPayload, getTopicDetailMock, getTopicNotesMock } from './mock-data'

export function getTopicDetail(parameter = {}) {
  const { topicId, id } = getPayload(parameter)
  return createDataResponse(getTopicDetailMock(topicId || id))
}

export function getTopicNotes(parameter = {}) {
  const { topicId, id } = getPayload(parameter)
  return createListResponse(getTopicNotesMock(topicId || id), parameter)
}
