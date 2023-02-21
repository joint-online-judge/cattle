import type { Gutter } from 'antd/lib/grid/row'

export const DOMAIN_HOST = window.location.origin

export const LOCAL_STORAGE_SETTINGS_KEY = 'JOJ_SETTINGS'

export const MAIN_CONTENT_GRID = {
  xs: 22,
  sm: 22,
  md: 22,
  lg: 20,
  xl: 18,
  xxl: 14
}

export const DEFAULT_GUTTER: [Gutter, Gutter] = [
  { xs: 16, sm: 16, md: 16, lg: 24, xl: 24, xxl: 24 }, // Horizontal
  { xs: 16, sm: 16, md: 16, lg: 24, xl: 24, xxl: 24 } // Vertical
]

export const SUPPORT_PROGRAMMING_LANGUAGE = [
  'python',
  'JavaScript',
  'c++11',
  'c99',
  'matlab'
]
