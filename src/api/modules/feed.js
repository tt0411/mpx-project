import { createListResponse, getDiscoverNotesMock, getRecommendNotesMock, getFollowingNotesMock } from './mock-data'

export function getRecommendFeed(parameter = {}) {
  return createListResponse(getRecommendNotesMock(), parameter)
}

export function getFollowingFeed(parameter = {}) {
  return createListResponse(getFollowingNotesMock(), parameter)
}

export function getDiscoverFeed(parameter = {}) {
  return createListResponse(getDiscoverNotesMock(), parameter)
}
