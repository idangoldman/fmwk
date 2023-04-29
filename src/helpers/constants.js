export const DOM_EVENTS_LIST = [
  ['clicks', ['click', 'dblclick']],
  ['keys', ['keyup', 'keydown', 'keypress']],
  ['mouse', ['mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup']],
  ['window', ['contextmenu', 'resize', ['scroll', ['up|top', 'down|bottom', 'left', 'right']], 'select']],
  ['form', ['change', 'submit', 'reset', 'valid', 'invalid']],
  ['element', ['blur', 'focus', 'focusin', 'focusout']]
]

export const STORAGE_EVENTS_LIST = [
  ['change', ['remove', 'set', 'clear', 'empty']],
  'get'
]

export const STORAGE_TYPES_LIST = [
  'local', 'session', 'cookie'
]
