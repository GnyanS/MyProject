import LoginPage from './LoginPage';
import { authSelector } from '../../../store/selectors/authSelectors';
import { connect } from 'react-redux';
import { validateAuth } from '../../../store/actions/authActions';

const mapStateToProps = state => ({
  authToken: authSelector(state).authToken
});
const mapDispatchToProps = dispatch => ({
  validateAuth: options => dispatch(validateAuth(options))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
