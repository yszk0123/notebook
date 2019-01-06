import { connect } from 'react-redux';
import { HelloPage } from './components/HelloPage';

function mapState() {
  return {};
}

const mapDispatch = {};

export const HelloContainer = connect(
  mapState,
  mapDispatch,
)(HelloPage);
