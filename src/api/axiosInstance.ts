// import type { InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

const $admin = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_URL,
})

// function authInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
//   if (config.headers)
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//   return config
// }

export {
  $admin,
}
