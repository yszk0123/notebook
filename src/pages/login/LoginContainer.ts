import { connect } from 'react-redux';
import { LoginPage } from './components/LoginPage';

function mapState() {
  return {};
}

const mapDispatch = {};

export const LoginContainer = connect(
  mapState,
  mapDispatch,
)(LoginPage);
