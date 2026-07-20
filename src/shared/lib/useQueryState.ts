import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { LocationQueryRaw } from 'vue-router'
import type { z } from 'zod'

type QuerySchema = z.ZodObject<z.ZodRawShape>

interface QueryStateOptions<TState> {
  resetOnChange?: (keyof TState)[]
}

interface SetOptions {
  replace?: boolean
}

export function useQueryState<TSchema extends QuerySchema>(
  schema: TSchema,
  options: QueryStateOptions<z.infer<TSchema>> = {},
) {
  type State = z.infer<TSchema>

  const route = useRoute()
  const router = useRouter()

  const defaults = computed(() => schema.parse({}) as State)
  const state = computed(() => schema.parse(route.query) as State)

  const ownKeys = computed(() => Object.keys(defaults.value) as (keyof State)[])

  function serialize(value: State): LocationQueryRaw {
    const query: LocationQueryRaw = {}

    for (const key of ownKeys.value) {
      const item = value[key]

      if (item === '' || item === undefined || item === null) continue
      if (item === defaults.value[key]) continue

      query[key as string] = String(item)
    }

    return query
  }

  function has(key: keyof State): boolean {
    return route.query[key as string] !== undefined
  }

  function set(patch: Partial<State>, setOptions: SetOptions = {}) {
    const next = { ...state.value, ...patch }

    for (const key of options.resetOnChange ?? []) {
      if (!(key in patch)) next[key] = defaults.value[key]
    }

    const query: LocationQueryRaw = { ...route.query }

    for (const key of ownKeys.value) {
      delete query[key as string]
    }

    Object.assign(query, serialize(next))

    const location = { query, hash: route.hash }

    if (setOptions.replace) {
      router.replace(location)
      return
    }

    router.push(location)
  }

  return { state, set, has }
}
