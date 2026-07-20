import { readStorage, writeStorage } from './safeStorage'

export function useReturnPath(key: string, fallback: string) {
  function save(path: string) {
    writeStorage('session', key, path)
  }

  function resolve(): string {
    const stored = readStorage('session', key)

    return stored && stored.startsWith(fallback) ? stored : fallback
  }

  return { save, resolve }
}
