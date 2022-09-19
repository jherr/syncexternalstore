import { useSyncExternalStore } from "react";

export default function createStore<Shape>(initialState: Shape) {
  let currentState = initialState;
  const listeners = new Set<(state: Shape) => void>();
  let serverState: Shape | null = null;
  const subscribe = (listener: (state: Shape) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  return {
    getState: () => currentState,
    setState: (newState: Shape) => {
      currentState = newState;
      listeners.forEach((listener) => listener(currentState));
    },
    subscribe,
    serverInitialize: (initialServerState: Shape) => {
      if (!serverState) {
        currentState = initialServerState;
        serverState = initialServerState;
      }
    },
    getServerState: () => serverState ?? initialState,
    useStore: <SelectorOutput>(
      selector: (state: Shape) => SelectorOutput
    ): SelectorOutput =>
      useSyncExternalStore(
        subscribe,
        () => selector(currentState),
        () => selector(serverState ?? initialState)
      ),
  };
}
