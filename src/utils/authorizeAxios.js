import axios from 'axios'
import { toast } from 'react-toastify'

// Tao doi tuong (instance) de custom va cau hinh chung cho du an
let authorizeAxiosInstance = axios.create()

// Thiet lap thoi gian cho toi da
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10

// withCredentials: cho phep axios tu dong gui cookie
authorizeAxiosInstance.defaults.withCredentials = true

// Add a request interceptor
authorizeAxiosInstance.interceptors.request.use((config) => {
  // Do something before request is sent
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  let errorMessage = error?.message
  if (error?.response?.data?.message) {
    errorMessage = error?.response?.data?.message
  }

  // Ma 410 - GONE: phuc vu refresh token
  if (error?.response?.status !== 410) {
    toast.error(errorMessage)
  }

  return Promise.reject(error)
})

export default authorizeAxiosInstance