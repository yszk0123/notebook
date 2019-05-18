export interface CounterLocalState {
  count: number;
}

export interface CounterGlobalState {
  counter: CounterLocalState;
}
