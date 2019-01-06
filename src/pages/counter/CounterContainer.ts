import { connect } from 'react-redux';
import { AppState } from '../../app/app-type';
import { CounterPage } from './components/CounterPage';
import { counterActions } from './counter-type';
import { counterEffects } from './CounterEffect';

function mapState(state: AppState) {
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
