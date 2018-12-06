import React from 'react';
import intl from 'react-intl-universal';
import './style.css';

// const LoginPage = ({ authToken, validateAuth, auth, context: { queries } }) => (
//   <div className={'row justify-content-center mt-4'}>
//     {authToken && validateAuth({ redirectToHome: true }) && <h4> {intl.get('app.loading')}</h4>}
//     {!authToken && validateAuth({ redirectToHome: true }) && (
//       <div className={'col-md-4'}>
//         <Button color="info" onClick={this.toggle}>{intl.get('app.login')}</Button>
//       </div>
//     )}
//   </div>
// );

class LoginPage extends React.Component {
  componentDidMount() {
    this.props.requestApiData();
  }

  //   render() {
  //   return this.props.data.status ?
  //   <div>
  //     <h1 className="h1Style">
  //       Received {this.props.data.status} from Dog API
  //     </h1>
  //     <p className="pStyle">Following is the image we received from Dog API</p>
  //     <img className="imgStyle" alt="Random Dog Pic" src={this.props.data.message} />
  //   </div>
  //   : null
  // }

  displayDetails = (x, i) => (
    <div key={x.id.value}>
      <h1>{x.gender}</h1>
      <h1>{x.name.first}</h1>
      <h1>{x.name.last}</h1>
      <img src={x.picture.medium} alt="Random User" />
    </div>
  );

  render() {
    const { results = [] } = this.props.data;
    return results.length ? (
      <div>
        <a href="/home" className="home-link">
          Back to HomePage
        </a>
        <br />
        <a href="/faq" className="faq-link">
          Check FAQ Page
        </a>
        <h1>{results.map(this.displayDetails)}</h1>
      </div>
    ) : (
      <h1>Loading...</h1>
    );
  }
}

export default LoginPage;
