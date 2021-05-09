import request from '@/plugins/axios'

export function createWall(data) {
  return request({
    url: '/wall/wall/add',
    method: 'post',
    data,
  })
}

export function wallList(cur, key) {
  return request({
    url: '/wall/wall/getlist',
    method: 'get',
    params: {
      cur: cur || 1,
      key: key || '',
    },
  })
}


export function wallNewList() {
  return request({
    url: '/wall/wall/getNewlist',
    method: 'get'
  })
}


export function starMessage(id) {
  return request({
    url: '/wall/wall/starMessage',
    method: 'post',
    data: {
      id
    }
  })
}