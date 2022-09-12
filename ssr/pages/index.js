import { useSyncExternalStore, createContext, useContext } from "react";
import store from "../src/store";

export function getServerSideProps() {
  return {
    props: {
      initialState: {
        value1: 12,
        value2: 14,
      },
    },
  };
}

const ServerContext = createContext();

const useStore = (selector = (state) => state) =>
  useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(useContext(ServerContext))
  );

const DisplayValue = ({ item }) => (
  <div>
    {item}: {useStore((state) => state[item])}
  </div>
);

const IncrementValue = ({ item }) => (
  <button
    onClick={() => {
      const state = store.getState();
      store.setState({
        ...state,
        [item]: state[item] + 1,
      });
    }}
  >
    Increment {item}
  </button>
);

function App({ initialState }) {
  store.serverInitialize(initialState);
  return (
    <ServerContext.Provider value={initialState}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          maxWidth: 600,
          gap: "1rem",
        }}
      >
        <IncrementValue item="value1" />
        <DisplayValue item="value1" />
        <IncrementValue item="value2" />
        <DisplayValue item="value2" />
      </div>
    </ServerContext.Provider>
  );
}

export default App;
