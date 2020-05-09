import request from '../utils/request'

// 通过主键删除项目
export function deleteProjectById(id) {
  return request({
    url: '/web/project/deleteProjectById',
    method: 'get',
    params: {id}
  })
}

// 获取用户的项目
export function getUserProject(id) {
  return request({
    url: '/web/project/getUserProject',
    method: 'get',
    params: {id}
  })
}

export function insertProject(project) {
  return request({
    url: '/web/project/insertProject',
    method: 'post',
    data: project
  })
}

export function listUserProjects(id) {
  return request({
    url: '/web/project/listUserProjects',
    method: 'get',
    params: {id}
  })
}

export function updateProject(project) {
  return request({
    url: '/web/project/updateProject',
    method: 'post',
    data: project
  })
}

export function deleteByProjectTypeId(id) {
  return request({
    url: '/web/project-type/deleteByProjectTypeId',
    method: 'get',
    params: {id}
  })
}

export function deleteByProjectTypeName(name) {
  return request({
    url: '/web/project-type/deleteByProjectTypeName',
    method: 'get',
    params: {id}
  })
}

export function insertProjectType(projectType) {
  return request({
    url: '/web/project-type/insertProjectType',
    method: 'post',
    data: projectType
  })
}

export function listProjectTypes() {
  return request({
    url: '/web/project-type/listProjectTypes',
    method: 'get'
  })
}

export function updateProjectType(projectType) {
  return request({
    url: '/web/project-type/updateProjectType',
    method: 'psot',
    data: projectType
  })
}
// 主键删除验证消息
export function deleteByProjectVerificationId(id) {
  return request({
    url: '/web/project-verification/deleteByProjectVerificationId',
    method: 'get',
    params: {id}
  })
}

// 通过项目id删除所有验证消息
export function deleteByProjectVerificationProjectId(id) {
  return request({
    url: '/web/project-verification/deleteByProjectVerificationProjectId',
    method: 'get',
    params: {id}
  })
}

// 删除用户所有验证消息
export function deleteByProjectVerificationReceiveId(id) {
  return request({
    url: '/web/project-verification/deleteByProjectVerificationReceiveId',
    method: 'get',
    params: {id}
  })
}

// 插入验证消息
export function insertProjectVerification(projectVerification) {
  return request({
    url: '/web/project-verification/insertProjectVerification',
    method: 'post',
    data: projectVerification
  })
}

// 通过项目id列出所有验证消息
export function listProjectVerificationsByProjectId(id) {
  return request({
    url: '/web/project-verification/listProjectVerificationsByProjectId',
    method: 'get',
    params: {id}
  })
}

// 列出用户所有验证消息
export function listProjectVerificationsByReceiveId(id) {
  return request({
    url: '/web/project-verification/listProjectVerificationsByReceiveId',
    method: 'get',
    params: {id}
  })
}

// 更新项目验证消息--类型Developer
export function updateProjectVerificationByDeveloper(projectVerification) {
  return request({
    url: '/web/project-verification/updateProjectVerificationByDeveloper',
    method: 'post',
    data: projectVerification
  })
}

// 更新项目验证消息--类型MANAGER
export function updateProjectVerificationByManager(projectVerification) {
  return request({
    url: '/web/project-verification/updateProjectVerificationByManager',
    method: 'post',
    data: projectVerification
  })
}
