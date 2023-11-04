export default function eventNamesValidation(eventNames = '', eventNamesList = []) {
  const names = eventNames.split(' ');
  const flatEventNamesList = eventNamesList.flat(3);
  const missingEvents = names.filter(name => !flatEventNamesList.includes(name));

  if (missingEvents.length > 0) {
    throw new Error(`- No events were found with names: ${missingEvents.join(', ')}.`);
  }

  return names
};
