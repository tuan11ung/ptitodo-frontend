import axios from 'axios'
import { toast } from 'react-toastify'

import { interceptorLoadingElements } from './formatters'

import { logoutUserAPI } from '~/redux/user/userSlice'
import { refreshTokenAPI } from '~/apis'

let axiosReduxStore

// Ky thuat inject store
export const injectStore = mainStore => {
  axiosReduxStore = mainStore
}

// Tao doi tuong (instance) de custom va cau hinh chung cho du an
let authorizeAxiosInstance = axios.create()

// Thiet lap thoi gian cho toi da
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10

// withCredentials: cho phep axios tu dong gui cookie
authorizeAxiosInstance.defaults.withCredentials = true

// Add a request interceptor
authorizeAxiosInstance.interceptors.request.use((config) => {
  // Do something before request is sent

  interceptorLoadingElements(true)

  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

let refreshTokenPromise = null

// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  interceptorLoadingElements(false)

  return response
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  interceptorLoadingElements(false)

  // TH1: Nhan ma 401 tu BE thi dang xuat
  if (error.response?.status === 401) {
    axiosReduxStore.dispatch(logoutUserAPI(false))
  }

  // TH2: nhan ma 410 tu BE thi refresh token
  const originalRequests = error.config
  if (error.response?.status === 410 && !originalRequests._retry) {
    originalRequests._retry = true

    // Neu chua co refreshTokenPromis
    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokenAPI()
        .then(data => {
          return data?.accessToken
        })
        .catch((_error) => {
          // neu nhan bat cu loi nao thi log out luon
          axiosReduxStore.dispatch(logoutUserAPI(false))
          return Promise.reject(_error)
        })
        .finally(() => {
          // Du API co thanh cong hay khong thi van luon gan lai refreshTokenPromise ve null nhu ban dau
          refreshTokenPromise = null
        })
    }

    // Xu ly truong hop refreshTokenPromis chay thanh cong:
    // eslint-disable-next-line no-unused-vars
    return refreshTokenPromise.then(accessToken => {

      // originalRequests.headers.Authorization = `Bearer ${accessToken}`
      // Return lai axios instance cua chung ta ket hop cac originalRequest de goi lai APIs ban dau bi loi
      return authorizeAxiosInstance(originalRequests)
    })
  }

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