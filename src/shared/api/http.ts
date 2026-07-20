export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

async function readBody(res: Response): Promise<unknown> {
  const text = await res.text()

  if (!text) {
    return undefined
  }

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

function errorMessage(res: Response, body: unknown): string {
  if (typeof body === 'string' && body) {
    return body
  }

  if (body && typeof body === 'object' && 'message' in body) {
    const { message } = body as { message?: unknown }

    if (typeof message === 'string' && message) {
      return message
    }
  }

  return res.statusText || `Request failed with status ${res.status}`
}

export async function http<TRes>(url: string, init?: RequestInit): Promise<TRes> {
  const res = await fetch(url, {
    ...init,
    headers: init?.body
      ? { 'Content-Type': 'application/json', ...init?.headers }
      : (init?.headers ?? {}),
  })

  const body = await readBody(res)

  if (!res.ok) throw new HttpError(res.status, errorMessage(res, body))

  return body as TRes
}
