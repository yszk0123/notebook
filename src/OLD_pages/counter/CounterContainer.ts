import { connect } from 'react-redux';
import { RoutingGlobalState } from '../../application/routing';
import { CounterPage } from './components/CounterPage';
import { counterActions } from './CounterActions';
import { counterSideEffects } from './CounterSideEffect';
import { CounterGlobalState } from './CounterState';

interface State extends CounterGlobalState, RoutingGlobalState {}

function mapState(state: State) {
  const { count } = state.counter;
  const { loading } = state.routing;

  return {
    count,
    loading,
  };
}

const mapDispatch = {
  increment: counterActions.increment,
  incrementByTen: counterSideEffects.incrementByTen,
};

export const CounterContainer = connect(
  mapState,
  mapDispatch,
)(CounterPage);
