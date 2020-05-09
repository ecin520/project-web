import request from '../utils/request'

export function getByUserId(id) {
  return request({
    url: '/web/user/getByUserId',
    method: 'get',
    params: {id}
  })
}

export function getByUsername(username) {
  return request({
    url: '/web/user/getByUsername',
    method: 'get',
    params: {username}
  })
}

export function updateByUserId(user) {
  return request({
    url: '/web/user/updateByUserId',
    method: 'post',
    data: user
  })
}