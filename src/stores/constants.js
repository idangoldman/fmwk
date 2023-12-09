export const STORE_TYPES = {
  local: 'localStorage',
  session: 'sessionStorage',
  // memory: 'memoryStorage',
  cookie: 'cookie'
}

export const STORE_EVENTS_LIST = [
  ['change', ['remove', 'set', 'clear', 'empty']],
  'has',
  'get'
]
