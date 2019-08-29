const findBranch = (eventName = '', eventsList = []) => {
  return [].concat(eventsList).reduce((accumulator, currentValue, currentIndex, array) => {
    if (Array.isArray(currentValue)) {
      if (currentValue.includes(eventName)) {
        accumulator = accumulator.concat(eventName);
      } else {
        accumulator = accumulator.concat(
          findBranch(currentValue, eventName)
        );
      }
      array.splice(1);
    } else if (array.includes(eventName)) {
      accumulator = accumulator.concat(eventName);
      array.splice(1);
    } else {
      accumulator = accumulator.concat(currentValue);
    }

    return accumulator;
  }, []).reverse();
}

export default findBranch;
