import { connect } from 'react-redux';
import { RoutingGlobalState } from '../../app/routing';
import { CounterPage } from './components/CounterPage';
import { counterActions } from './CounterActions';
import { counterEffects } from './CounterEffect';
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
  incrementByTen: counterEffects.incrementByTen,
};

export const CounterContainer = connect(
  mapState,
  mapDispatch,
)(CounterPage);
