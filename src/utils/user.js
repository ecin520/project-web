import Cookies from 'js-cookie'

const key = 'UserInfo'

export function setUserInfo(userInfo) {
  Cookies.set(key, userInfo, { expires: 7 })
}

export function getUserInfo() {
  return Cookies.getJSON(key)
}

export function clearUserInfo() {
  Cookies.remove(key)
}