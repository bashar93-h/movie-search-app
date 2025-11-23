import axios from 'axios'

const tmdbApi = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
})

tmdbApi.interceptors.request.use(
  (config) => {
    console.log('TMDB Request:', config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

tmdbApi.interceptors.response.use(
  (respone) => respone,
  (error) => {
    console.log('API Error: ', error.response.status, error.response.data)
    return Promise.reject(error)
  },
)

export default tmdbApi
