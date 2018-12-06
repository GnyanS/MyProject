import PropTypes from 'prop-types';
import LoginPage from './LoginPage';
import { authSelector } from '../../../store/selectors/authSelectors';
import { connect } from 'react-redux';
import { validateAuth } from '../../../store/actions/authActions';
import { requestApiData } from '../../../store/actions/requestData';

LoginPage.propTypes = {
  data: PropTypes.object
};

const mapStateToProps = state => ({
  authToken: authSelector(state).authToken,
  data: state.data
});
const mapDispatchToProps = dispatch => ({
  validateAuth: options => dispatch(validateAuth(options)),
  requestApiData: () => dispatch(requestApiData())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
