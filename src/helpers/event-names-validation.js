const eventNamesValidation = (eventName = '', eventsList = []) => {
  const names = eventName.split(' ');
  const list = eventsList.flat(Infinity);

  names.every(name => {
    if (!list.includes(name)) {
      throw new Error(`- No event was found with '${name}' name.`);
    }
  });

  return names;
};

export default eventNamesValidation;
