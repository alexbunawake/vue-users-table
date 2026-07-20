import { onUnmounted } from 'vue'

export function useDebounceFn<TArgs extends unknown[]>(fn: (...args: TArgs) => void, delay = 500) {
  let timer: ReturnType<typeof setTimeout>

  function debounced(...args: TArgs) {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }

  onUnmounted(() => clearTimeout(timer))

  return debounced
}
