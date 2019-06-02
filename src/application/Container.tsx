/**
 * @see https://github.com/jamiebuilds/unstated-next
 */
import React from 'react';

interface ContainerProviderProps<State = void> {
  initialState?: State;
  children: React.ReactNode;
}

interface Container<Value, State = void> {
  Provider: React.ComponentType<ContainerProviderProps<State>>;
  useContainer: () => Value;
  withContainer: <Props>(
    Component: React.ComponentType<Props>,
    initialState?: State,
  ) => React.FunctionComponent<Props>;
}

export function createContainer<Value, State = void>(
  useHook: (initialState?: State) => Value,
): Container<Value, State> {
  const Context = React.createContext<Value | null>(null);

  function Provider(props: ContainerProviderProps<State>) {
    const value = useHook(props.initialState);
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  }

  function useContainer(): Value {
    const value = React.useContext(Context);
    if (value === null) {
      throw new Error('Component must be wrapped with <Container.Provider>');
    }
    return value;
  }

  function withContainer<Props>(
    Component: React.ComponentType<Props>,
    initialState?: State,
  ): React.FunctionComponent<Props> {
    return (props: Props) => (
      <Provider initialState={initialState}>
        <Component {...props} />
      </Provider>
    );
  }

  return { Provider, useContainer, withContainer };
}
