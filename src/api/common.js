import request from '../utils/request'

export function login(username, password, code) {
  return request({
    url: '/web/common/login',
    method: 'get',
    params: {username, password, code}
  })
}

export function register(username, password) {
  return request({
    url: '/web/common/register',
    method: 'get',
    params: {username, password}
  })
}

export function createImageCode() {
  return request({
    url: '/web/common/createImageCode',
    method: 'get'
  })
}