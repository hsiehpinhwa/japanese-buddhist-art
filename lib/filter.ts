import { Statue } from './types'
import { ERA_NORMALIZE } from '@/data/eras'

export interface Filters {
  era: string       // '' = all
  designation: string  // '' = all
  prefecture: string   // '' = all
}

export const DEFAULT_FILTERS: Filters = {
  era: '',
  designation: '',
  prefecture: '',
}

export function normalizeEra(era: string): string {
  return ERA_NORMALIZE[era] ?? era
}

export function filterStatues(statues: Statue[], filters: Filters): Statue[] {
  return statues.filter((s) => {
    const normalizedEra = normalizeEra(s.era)
    if (filters.era && normalizedEra !== filters.era) return false
    if (filters.designation && s.designation !== filters.designation) return false
    if (filters.prefecture && s.prefecture !== filters.prefecture) return false
    return true
  })
}

export function filtersToParams(filters: Filters): URLSearchParams {
  const p = new URLSearchParams()
  if (filters.era) p.set('era', filters.era)
  if (filters.designation) p.set('desig', filters.designation)
  if (filters.prefecture) p.set('pref', filters.prefecture)
  return p
}

export function paramsToFilters(params: URLSearchParams): Filters {
  return {
    era: params.get('era') ?? '',
    designation: params.get('desig') ?? '',
    prefecture: params.get('pref') ?? '',
  }
}
