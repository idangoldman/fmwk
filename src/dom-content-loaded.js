const onDOMContentLoaded = () => {
  const callbacks = []
  let listener
  let loaded = false

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', listener = () => {
      document.removeEventListener('DOMContentLoaded', listener)
      loaded = true

      do {
        listener = callbacks.shift()
        listener()
      } while (callbacks.length)
    })
  } else {
    loaded = true
  }

  return (callback) => {
    if (loaded) {
      setTimeout(callback, 0)
    } else {
      callbacks.push(callback)
    }
  }
}

export default onDOMContentLoaded()
