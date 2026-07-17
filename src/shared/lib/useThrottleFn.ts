import { onUnmounted } from 'vue'

export function useThrottleFn<TArgs extends unknown[]>(fn: (...args: TArgs) => void, limit = 16) {
  let lastCall = 0
  let timer: ReturnType<typeof setTimeout> | null = null

  function throttled(...args: TArgs) {
    const now = Date.now()
    const remaining = limit - (now - lastCall)

    if (remaining <= 0) {
      lastCall = now
      fn(...args)
    } else if (!timer) {
      timer = setTimeout(() => {
        lastCall = Date.now()
        timer = null
        fn(...args)
      }, remaining)
    }
  }

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return throttled
}
