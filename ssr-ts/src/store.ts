import createStore from "./createStore";

const store = createStore({
  value1: 0,
  value2: 0,
});

export type ValuesStore = ReturnType<typeof store.getState>;

export default store;

const useStore = (selector: (state: ValuesStore) => number) => {};

useStore(() => 2);
