import axios from 'axios'
import router from '@/router'

import { BASE_API } from '@/config'

// create an axios instance
const service = axios.create({
  baseURL: BASE_API, // url = base url + request url
  timeout: 5000, // request timeout
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 20000) {
      if (res.code === 404) {
        router.push('/404')
      }
      return res
    } else {
      return res
    }
  },
  (error) => {
    if (!error.response) {
      router.push('/0')
    }
    return Promise.reject(error)
  }
)
window.axios = service
export default service
