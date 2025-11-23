import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const storedValue = localStorage.getItem(key)
  const data = ref<T>(storedValue ? JSON.parse(storedValue) : initialValue)

  watch(
    data,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true }, // for tracking nested changes
  )

  return data
}
