type StorageType = 'local' | 'session'

function getStorage(type: StorageType): Storage | null {
  try {
    return type === 'local' ? window.localStorage : window.sessionStorage
  } catch {
    return null
  }
}

export function readStorage(type: StorageType, key: string): string | null {
  try {
    return getStorage(type)?.getItem(key) ?? null
  } catch {
    return null
  }
}

export function writeStorage(type: StorageType, key: string, value: string): void {
  try {
    getStorage(type)?.setItem(key, value)
  } catch {
    return
  }
}
