import request from '../utils/request'

export function deleteByProjectAndManagerId(id) {
  return request({
    url: '/web/project-manager/deleteByProjectAndManagerId',
    method: 'get',
    params: {id}
  })
}

export function insertProjectManager(projectManager) {
  return request({
    url: '/web/project-manager/insertProjectManager',
    method: 'post',
    data: projectManager
  })
}

export function listManagersByProjectId(id) {
  return request({
    url: '/web/project-manager/listManagersByProjectId',
    method: 'get',
    params: {id}
  })
}

export function listProjectsByManagerId(id) {
  return request({
    url: '/web/project-manager/listProjectsByManagerId',
    method: 'get',
    params: {id}
  })
}
