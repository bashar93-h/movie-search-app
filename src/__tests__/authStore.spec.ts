import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

// Mock vue-router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('Login', () => {
    it('should login successfully with valid credentials', async () => {
      const authStore = useAuthStore()

      const result = await authStore.login('admin@movie.com', 'admin123')

      expect(result).toBe(true)
      expect(authStore.isAuthenticated).toBe(true)
      expect(authStore.user).toEqual({
        id: '1',
        email: 'admin@movie.com',
        name: 'Bashar',
        role: 'admin',
      })
      expect(authStore.token).toBeTruthy()
    })

    it('should fail login with invalid credentials', async () => {
      const authStore = useAuthStore()

      const result = await authStore.login('wrong@email.com', 'wrongpass')

      expect(result).toBe(false)
      expect(authStore.isAuthenticated).toBe(false)
      expect(authStore.user).toBeNull()
      expect(authStore.token).toBeNull()
    })

    it('should store auth data in localStorage on successful login', async () => {
      const authStore = useAuthStore()

      await authStore.login('member@movie.com', 'member123')

      expect(localStorage.setItem).toHaveBeenCalledWith('auth-user', expect.any(String))
      expect(localStorage.setItem).toHaveBeenCalledWith('auth-token', expect.any(String))
      expect(localStorage.setItem).toHaveBeenCalledWith('auth-expiry', expect.any(String))
    })
  })

  describe('Logout', () => {
    it('should clear user data on logout', async () => {
      const authStore = useAuthStore()

      // Login first
      await authStore.login('admin@movie.com', 'admin123')
      expect(authStore.isAuthenticated).toBe(true)

      // Logout
      authStore.logout()

      expect(authStore.user).toBeNull()
      expect(authStore.token).toBeNull()
      expect(authStore.isAuthenticated).toBe(false)
    })

    it('should remove auth data from localStorage on logout', async () => {
      const authStore = useAuthStore()

      await authStore.login('admin@movie.com', 'admin123')
      authStore.logout()

      expect(localStorage.removeItem).toHaveBeenCalledWith('auth-user')
      expect(localStorage.removeItem).toHaveBeenCalledWith('auth-token')
      expect(localStorage.removeItem).toHaveBeenCalledWith('auth-expiry')
    })
  })

  describe('Role Checks', () => {
    it('should correctly identify admin role', async () => {
      const authStore = useAuthStore()

      await authStore.login('admin@movie.com', 'admin123')

      expect(authStore.isAdmin).toBe(true)
      expect(authStore.isMember).toBe(false)
      expect(authStore.userRole).toBe('admin')
    })

    it('should correctly identify member role', async () => {
      const authStore = useAuthStore()

      await authStore.login('member@movie.com', 'member123')

      expect(authStore.isAdmin).toBe(false)
      expect(authStore.isMember).toBe(true)
      expect(authStore.userRole).toBe('member')
    })

    it('should check if user has required roles', async () => {
      const authStore = useAuthStore()

      await authStore.login('admin@movie.com', 'admin123')

      expect(authStore.hasRole(['admin'])).toBe(true)
      expect(authStore.hasRole(['member'])).toBe(false)
      expect(authStore.hasRole(['admin', 'member'])).toBe(true)
    })
  })

  describe('Authentication Check', () => {
    it('should return false when not authenticated', () => {
      const authStore = useAuthStore()

      expect(authStore.checkAuth()).toBe(false)
    })

    it('should return true when authenticated with valid token', async () => {
      const authStore = useAuthStore()

      await authStore.login('admin@movie.com', 'admin123')

      expect(authStore.checkAuth()).toBe(true)
    })
  })
})
