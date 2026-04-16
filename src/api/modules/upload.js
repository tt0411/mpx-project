import { createDataResponse, createUploadImageMock } from './mock-data'

export function uploadImage() {
  return createDataResponse(createUploadImageMock())
}
