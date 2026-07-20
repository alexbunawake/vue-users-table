import { watch, type Ref, type WatchSource } from 'vue'

interface ScrollOptions {
  block?: ScrollLogicalPosition
}

export function useScrollOnChange(
  source: WatchSource,
  target: Ref<HTMLElement | null>,
  options: ScrollOptions = {},
) {
  const { block = 'start' } = options

  watch(source, () => {
    if (!target.value) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    target.value.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block,
    })
  })
}
