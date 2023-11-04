export default (function onDOMContentLoaded() {
  const callbacks = [];
  let domLoaded = false;

  const executeCallbacks = () => {
    domLoaded = true;
    while (callbacks.length) {
      callbacks.shift().call();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', executeCallbacks);
  } else {
    domLoaded = true;
  }

  return (callback) => {
    if (domLoaded) {
      setTimeout(callback, 0);
    } else {
      callbacks.push(callback);
    }
  };
})();
