import store, { type ValuesStore } from "../src/store";

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

const DisplayValue = ({ item }: { item: keyof ValuesStore }) => (
  <div>
    {item}: {store.useStore((state) => state[item])}
  </div>
);

const IncrementValue = ({ item }: { item: keyof ValuesStore }) => (
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

function App({ initialState }: { initialState: ValuesStore }) {
  store.serverInitialize(initialState);
  return (
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
  );
}

export default App;
