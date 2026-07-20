import { z } from 'zod'

export const VISITED_PRESETS = [
  { value: '', label: 'Any time', days: 0 },
  { value: '7d', label: 'Last 7 days', days: 7 },
  { value: '30d', label: 'Last 30 days', days: 30 },
  { value: '90d', label: 'Last 90 days', days: 90 },
] as const

export type VisitedPreset = (typeof VISITED_PRESETS)[number]['value']

const VISITED_VALUES = VISITED_PRESETS.map((preset) => preset.value) as unknown as [
  VisitedPreset,
  ...VisitedPreset[],
]

export const visitedSchema = z.enum(VISITED_VALUES).catch('')

export function visitedLabel(preset: VisitedPreset): string {
  return VISITED_PRESETS.find((item) => item.value === preset)?.label ?? ''
}

const HOUR_SECONDS = 3600
const DAY_SECONDS = 86_400

export function visitedSince(preset: VisitedPreset, nowMs: number): number | undefined {
  const days = VISITED_PRESETS.find((item) => item.value === preset)?.days ?? 0

  if (!days) return undefined

  const nowSeconds = Math.floor(nowMs / 1000 / HOUR_SECONDS) * HOUR_SECONDS

  return nowSeconds - days * DAY_SECONDS
}
