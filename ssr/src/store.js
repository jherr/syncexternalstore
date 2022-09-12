function createStore(initialState) {
  let currentState = initialState;
  const listeners = new Set();
  let isInitialized = false;
  return {
    getState: () => currentState,
    setState: (newState) => {
      currentState = newState;
      listeners.forEach((listener) => listener(currentState));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    serverInitialize: (initialState) => {
      if (!isInitialized) {
        currentState = initialState;
        isInitialized = true;
      }
    },
  };
}

const store = createStore({
  value1: 0,
  value2: 0,
});

export default store;
