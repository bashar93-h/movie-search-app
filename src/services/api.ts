import axios, { type AxiosError } from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_OMDB_BASE_URL,
  params: {
    apiKey: import.meta.env.VITE_OMDB_API_KEY,
  },
})

api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.log('API Error: ', error.response.status, error.response.data)
    } else if (error.request) {
      console.log('Network Error: ', error.message)
    }
    return Promise.reject(error)
  },
)

export default api
