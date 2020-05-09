import request from '../utils/request'

export function deleteByProjectAndDeveloperId(id) {
  return request({
    url: '/web/project-developer/deleteByProjectAndDeveloperId',
    method: 'get',
    params: {id}
  })
}

export function insertProjectDeveloper(projectDeveloper) {
  return request({
    url: '/web/project-developer/insertProjectDeveloper',
    method: 'post',
    data: projectDeveloper
  })
}

export function listDevelopersByProjectId(id) {
  return request({
    url: '/web/project-developer/listDevelopersByProjectId',
    method: 'get',
    params: {id}
  })
}

export function listProjectsByDeveloperId(id) {
  return request({
    url: '/web/project-developer/listProjectsByDeveloperId',
    method: 'get',
    params: {id}
  })
}
