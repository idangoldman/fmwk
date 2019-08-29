const eventNamesValidation = (eventName = '', eventsList = []) => {
  let names = eventName.split(' ');
  let list = eventsList.flat(Infinity);

  names.every(name => {
    if (!list.includes(name)) {
      throw new Error(`- No event was found with '${name}' name.`);
    }
  });

  return names;
}

export default eventNamesValidation;
