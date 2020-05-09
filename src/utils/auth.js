import Cookies from 'js-cookie'

const key = 'Authorization'

export function getToken() {
  return Cookies.get(key)
}

export function setToken(token) {
  return Cookies.set(key, 'Bearer ' + token, { expires: 7 })
}

export function clearToken() {
  return Cookies.remove(key)
}

