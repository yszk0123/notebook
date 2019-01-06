import { connect } from 'react-redux';
import { RoutingGlobalState } from '../../routing/routing-type';
import { CounterPage } from './components/CounterPage';
import { counterActions, CounterGlobalState } from './counter-type';
import { counterEffects } from './CounterEffect';

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
