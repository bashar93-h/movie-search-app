<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { PhEnvelope, PhEye, PhEyeSlash, PhLock } from '@phosphor-icons/vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  const success = await authStore.login(email.value, password.value)
  if (success) {
    const redirectPath = (route.query.redirect as string) || '/'
    router.push(redirectPath)
  } else {
    error.value = 'Invalid credentials'
  }
}
</script>
<template>
  <div class="h-[calc(100vh-72px)] flex justify-center items-center">
    <div
      class="w-[90%] max-w-md md:w-full bg-background-dark dark:bg-background-light rounded-2xl p-6 md:p-8 pb-20"
    >
      <div class="text-center mb-8 text-text-dark dark:text-text-light">
        <h1 class="text-3xl font-goldman font-bold mb-2">Welcome back</h1>
        <p>Sign in to access your movie collection</p>
      </div>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="text-sm font-medium text-text-dark dark:text-text-light mb-2">Email</label>
          <div class="relative">
            <PhEnvelope size="20" class="absolute top-1/2 -translate-y-1/2 left-3" />
            <input
              v-model="email"
              type="email"
              required
              placeholder="your@email.com"
              class="w-full pl-10 pr-4 py-3 rounded-lg font-poppins border border-gray-600 focus:outline-none focus:border-accent-light focus:ring-1 focus:ring-accent-light transition-colors"
            />
          </div>
        </div>
        <div>
          <label class="text-sm font-medium text-text-dark dark:text-text-light mb-2"
            >Password</label
          >
          <div class="relative">
            <PhLock size="20" class="absolute top-1/2 -translate-y-1/2 left-3" />
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="........"
              class="w-full pl-10 pr-4 py-3 rounded-lg font-poppins border border-gray-600 focus:outline-none focus:border-accent-light focus:ring-1 focus:ring-accent-light transition-colors"
            />
            <button
              @click.prevent="showPassword = !showPassword"
              class="absolute top-1/2 -translate-y-1/2 right-3"
            >
              <PhEye v-if="!showPassword" size="20" />
              <PhEyeSlash v-else size="20" />
            </button>
          </div>
        </div>
        <div
          v-if="error"
          class="text-red-400 text-sm text-center bg-red-500/10 rounded-lg border border-red-500/20"
        >
          {{ error }}
        </div>
        <button
          type="submit"
          class="w-full py-3 bg-accent-light rounded-lg hover:bg-accent-dark font-semibold font-poppins transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ authStore.loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>
      <div
        class="mt-10 h-[1px] w-full bg-background-light dark:bg-background-dark rounded-md"
      ></div>
    </div>
  </div>
</template>
