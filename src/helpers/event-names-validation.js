const eventNamesValidation = (eventNames = '', eventNamesList = []) => {
  const names = eventNames.split(' ')
  const list = eventNamesList.flat(3)

  for (const name of names) {
    if (!list.includes(name)) {
      throw new Error(`- No event was found with '${name}' name.`)
    }
  }

  return names
}

export default eventNamesValidation
