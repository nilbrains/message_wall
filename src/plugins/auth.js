import Cookies from 'js-cookie'

const TokenKey = 'token'

var Days = 7;
var exp = new Date(); 
exp.setTime(exp.getTime() + Days*24*60*60*1000);

Cookies.defaults.expires = exp;

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
