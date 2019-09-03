/**
 * Match event names against given event names list.
 * @param  {String}      eventNames     String of event names separated by space.
 * @param  {EventsList}  eventNamesList Nested array of event names.
 * @return {Array}       Array of valid event names.
 * @throws When event name is not part of event names list.
 *
 * @example
 * const eventNames = 'click mouseover';
 *
 * eventNamesValidation(eventNames, DOM_EVENTS_LIST);
 * // ['click', 'mouseover']
 */
const eventNamesValidation = (eventNames = '', eventNamesList = []) => {
  const names = eventNames.split(' ');
  const list = eventNamesList.flat(3);

  for (const name of names) {
    if (!list.includes(name)) {
      throw new Error(`- No event was found with '${name}' name.`);
    }
  }

  return names;
};

export default eventNamesValidation;
