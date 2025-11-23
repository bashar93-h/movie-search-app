import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'member'
}

export interface AuthToken {
  token: string
  expiresAt: number
}

const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@movie.com',
    password: 'admin123',
    name: 'Bashar',
    role: 'admin' as const,
  },
  {
    id: '2',
    email: 'member@movie.com',
    password: 'member123',
    name: 'Bashar',
    role: 'member' as const,
  },
]

export const useAuthStore = defineStore('authStore', () => {
  const router = useRouter()

  // state
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const tokenExpiry = ref<number | null>(null)
  const loading = ref(false)

  // Auto-logout timer
  let expiryTimer: ReturnType<typeof setTimeout> | null = null

  // getters
  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isMember = computed(() => user.value?.role === 'member')
  const userRole = computed(() => user.value?.role)

  const clearAuth = () => {
    user.value = null
    token.value = null
    tokenExpiry.value = null
    localStorage.removeItem('auth-user')
    localStorage.removeItem('auth-token')
    localStorage.removeItem('auth-expiry')
    if (expiryTimer) clearTimeout(expiryTimer)
  }

  const startExpiryTimer = () => {
    if (expiryTimer) clearTimeout(expiryTimer)

    if (tokenExpiry.value) {
      const timeUntilExpiry = tokenExpiry.value - Date.now()

      if (timeUntilExpiry > 0) {
        expiryTimer = setTimeout(() => {
          toast.warning('Session expired. Please login again.')
          logout()
        }, timeUntilExpiry)
      }
    }
  }

  const loadAuthFromStorage = () => {
    try {
      const storedUser = localStorage.getItem('auth-user')
      const storedToken = localStorage.getItem('auth-token')
      const storedExpiry = localStorage.getItem('auth-expiry')

      if (storedUser && storedToken && storedExpiry) {
        const expiry = parseInt(storedExpiry)
        if (Date.now() < expiry) {
          user.value = JSON.parse(storedUser)
          token.value = storedToken
          tokenExpiry.value = expiry
          startExpiryTimer()
        } else {
          clearAuth()
        }
      }
    } catch (error) {
      console.error('Failed to load auth from storage')
      clearAuth()
    }
  }

  const generateMockToken = (userId: string): string => {
    return `mock_jwt_${userId}_${Date.now()}_${Math.random().toString(36)}`
  }

  const login = async (email: string, password: string) => {
    loading.value = true

    try {
      // simulate api delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Find user in mock database
      const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

      if (!foundUser) {
        throw new Error('Invalid email or password')
      }

      const expiresIn = 60 * 60 * 1000
      const expiry = Date.now() + expiresIn

      const mockToken = generateMockToken(foundUser.id)

      user.value = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      }
      token.value = mockToken
      tokenExpiry.value = expiry

      localStorage.setItem('auth-user', JSON.stringify(user.value))
      localStorage.setItem('auth-token', mockToken)
      localStorage.setItem('auth-expiry', expiry.toString())

      startExpiryTimer()

      toast.success(`Welcome back, ${foundUser.name}!`)
      return true
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed')
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    clearAuth()
    toast.info('Logged out successfully')
    router.push('/login')
  }

  const checkAuth = (): boolean => {
    if (!user.value) return false

    if (tokenExpiry.value && Date.now() >= tokenExpiry.value) {
      logout()
      return false
    }
    return true
  }

  // if we have multiple level-roles [admin, moderator, super-admin]
  const hasRole = (requiredRoles: string[]): boolean => {
    if (!user.value) return false
    return requiredRoles.includes(user.value.role)
  }

  loadAuthFromStorage()

  return {
    // state
    user,
    token,
    loading,

    // Getters
    isAuthenticated,
    isAdmin,
    isMember,
    userRole,

    // Actions
    login,
    logout,
    checkAuth,
    hasRole,
  }
})
