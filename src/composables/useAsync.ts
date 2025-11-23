//Created for component-level async operations,
//but currently using Pinia store for centralized state management"

import { ref } from 'vue'

export function useAsync<T>() {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const execute = async (asyncFn: () => Promise<T>) => {
    loading.value = true
    error.value = null

    try {
      data.value = await asyncFn()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, execute }
}
