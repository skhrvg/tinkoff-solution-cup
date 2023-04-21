import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const baseConfig: AxiosRequestConfig = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
}

const instance = axios.create(baseConfig)

export default instance
