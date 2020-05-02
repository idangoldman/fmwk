// @flow

import type { EventListType } from 'helpers/flow-types';

export const DOM_EVENTS_LIST: EventListType = [
  ['clicks', ['click', 'dblclick']],
  ['keys', ['keyup', 'keydown', 'keypress']],
  ['mouse', ['mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup']],
  ['window', ['contextmenu', 'resize', 'scroll', 'select']],
  ['form', ['change', 'submit', 'reset']],
  ['element', ['blur', 'focus', 'focusin', 'focusout']]
];

export const STORAGE_EVENTS_LIST: EventListType = [
  ['change', ['remove', 'set', 'clear', 'empty']],
  'get'
];

export const STORAGE_TYPES_LIST: EventListType = [
  'local', 'session', 'cookie'
];
