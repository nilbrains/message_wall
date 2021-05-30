import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  Cookies.defaults.domain = '.nilbrains.com';
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  Cookies.defaults.domain = '.nilbrains.com';
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  Cookies.defaults.domain = '.nilbrains.com';
  return Cookies.remove(TokenKey)
}
