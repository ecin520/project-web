import request from '../utils/request'

export function deleteTask(taskId, projectId) {
  return request({
    url: '/web/task/deleteTask',
    method: 'get',
    params: {taskId, projectId}
  })
}

export function getByTaskId(id) {
  return request({
    url: '/web/task/getByTaskId',
    method: 'get',
    params: {id}
  })
}

export function insertTask(task) {
  return request({
    url: '/web/task/insertTask',
    method: 'post',
    data: task
  })
}

export function listAllTasksByProjectId(id) {
  return request({
    url: '/web/task/listAllTasksByProjectId',
    method: 'get',
    params: {id}
  })
}

export function listAllTasksByProjectIdAndExecutor(projectId, executor) {
  return request({
    url: '/web/task/listAllTasksByProjectIdAndExecutor',
    method: 'get',
    params: {projectId, executor}
  })
}


export function listAllTasksByUserId(id) {
  return request({
    url: '/web/task/listAllTasksByUserId',
    method: 'get',
    params: {id}
  })
}

export function updateTaskByDeveloper(task) {
  return request({
    url: '/web/task/updateTaskByDeveloper',
    method: 'post',
    data: task
  })
}

export function updateTaskByManager(task) {
  return request({
    url: '/web/task/updateTaskByManager',
    method: 'post',
    data: task
  })
}


export function deleteByTaskTypeId(id) {
  return request({
    url: '/web/task-type/deleteByTaskTypeId',
    method: 'get',
    params: {id}
  })
}

export function deleteByTaskTypeName(name) {
  return request({
    url: '/web/task-type/deleteByTaskTypeName',
    method: 'get',
    params: {id}
  })
}

export function insertTaskType(taskType) {
  return request({
    url: '/web/task-type/insertTaskType',
    method: 'post',
    data: taskType
  })
}

export function listTaskTypes() {
  return request({
    url: '/web/task-type/listTaskTypes',
    method: 'get'
  })
}

export function updateTaskType(taskType) {
  return request({
    url: '/web/task-type/updateTaskType',
    method: 'psot',
    data: taskType
  })
}

