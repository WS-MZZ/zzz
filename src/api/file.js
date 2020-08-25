import request from '@/utils/request'

export const FILE_API_URL = process.env.BASE_API + '/api/file/v1/uploads'

export function deleteFile(uri) {
  return request({
    url: `/api/file/v1?uri=${uri}`,
    method: 'delete',
    params: uri
  })
}
