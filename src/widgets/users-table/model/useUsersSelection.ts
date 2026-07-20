import { computed, watch, type Ref } from 'vue'
import type { User } from '@/entities/user'
import { useSelection } from '@/shared/lib/useSelection'

export function useUsersSelection(users: Ref<User[]>, resetOn: unknown[]) {
  const { ids, count, isSelected, toggle, setMany, clear } = useSelection<string>()

  const pageIds = computed(() => users.value.map((user) => user.id))

  const allOnPageSelected = computed(
    () => pageIds.value.length > 0 && pageIds.value.every(isSelected),
  )

  const someOnPageSelected = computed(
    () => !allOnPageSelected.value && pageIds.value.some(isSelected),
  )

  function toggleAllOnPage(value: boolean) {
    setMany(pageIds.value, value)
  }

  watch(resetOn, () => clear())

  return {
    ids,
    count,
    isSelected,
    toggle,
    toggleAllOnPage,
    clear,
    allOnPageSelected,
    someOnPageSelected,
  }
}
