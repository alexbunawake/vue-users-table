import { computed, ref } from 'vue'

export function useSelection<T extends string | number>() {
  const selected = ref(new Set<T>()) as { value: Set<T> }

  const ids = computed(() => Array.from(selected.value))
  const count = computed(() => selected.value.size)

  function isSelected(id: T) {
    return selected.value.has(id)
  }

  function toggle(id: T) {
    if (selected.value.has(id)) {
      selected.value.delete(id)
      return
    }

    selected.value.add(id)
  }

  function setMany(nextIds: T[], value: boolean) {
    for (const id of nextIds) {
      if (value) selected.value.add(id)
      else selected.value.delete(id)
    }
  }

  function clear() {
    selected.value.clear()
  }

  return { ids, count, isSelected, toggle, setMany, clear }
}
