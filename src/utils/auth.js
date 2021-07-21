import Cookies from 'js-cookie'

const User = 'CGVC_USER'

export function setUser (data) {
  return Cookies.set(User, JSON.stringify(data))
}

export function getUser () {
  return Cookies.get(User) ? JSON.parse(Cookies.get(User)) : ''
}

export function removeUser () {
  return Cookies.remove(User)
}
