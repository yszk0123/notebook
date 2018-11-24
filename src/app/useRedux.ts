import { useContext } from 'react';
// @ts-ignore
import { ReactReduxContext } from 'react-redux';
import { AppDispatch, AppState } from './app-type';

export function useRedux<T>(
  mapState: (state: AppState) => T,
): [T, AppDispatch] {
  const {
    storeState: state,
    store: { dispatch },
  } = useContext(ReactReduxContext);
  return [mapState(state), dispatch];
}

export default useRedux;
