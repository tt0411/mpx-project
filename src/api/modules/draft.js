import {
  createDataResponse,
  createListResponse,
  deleteDraftMock,
  getDraftDetailMock,
  getDraftListMock,
  getPayload,
  saveDraftMock
} from './mock-data'

export function getDraftList(parameter = {}) {
  return createListResponse(getDraftListMock(), parameter)
}

export function getDraftDetail(parameter = {}) {
  const { draftId, id } = getPayload(parameter)
  return createDataResponse(getDraftDetailMock(draftId || id))
}

export function saveDraft(parameter = {}) {
  return createDataResponse(saveDraftMock(getPayload(parameter)))
}

export function deleteDraft(parameter = {}) {
  const { draftId, id } = getPayload(parameter)
  return createDataResponse(deleteDraftMock(draftId || id))
}
