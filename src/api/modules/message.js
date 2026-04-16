import { createDataResponse, createListResponse, getMessagesMock, getPayload, getUnreadCountMock, markMessagesReadMock } from './mock-data'

export function getMessageList(parameter = {}) {
  const { type = 'all' } = getPayload(parameter)
  return createListResponse(getMessagesMock(type), parameter)
}

export function markMessageRead(parameter = {}) {
  const { ids = [] } = getPayload(parameter)
  return createDataResponse(markMessagesReadMock(ids))
}

export function getUnreadCount() {
  return createDataResponse({ count: getUnreadCountMock() })
}
