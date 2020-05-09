import request from '../utils/request'

export function deleteAnnex(id) {
  return request({
    url: '/web/annex/deleteAnnex',
    method: 'get',
    params: {id}
  })
}

export function insertAnnex(annex) {
  return request({
    url: '/web/annex/insertAnnex',
    method: 'post',
    data: annex
  })
}

export function listAnnexesByTaskId(id) {
  return request({
    url: '/web/annex/listAnnexesByTaskId',
    method: 'get',
    params: {id}
  })
}

export function updateAnnex(annex) {
  return request({
    url: '/web/annex/updateAnnex',
    method: 'post',
    data: annex
  })
}