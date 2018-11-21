import React from 'react';
import intl from 'react-intl-universal';

const LoginPage = ({ authToken, validateAuth, auth, context: { queries } }) => (
  <div className={'row justify-content-center mt-4'}>
    {authToken && validateAuth({ redirectToHome: true }) && <h4> {intl.get('app.loading')}</h4>}
    {!authToken && validateAuth({ redirectToHome: true }) && (
      <div className={'col-md-4 border p-2'}>
        <h1>{intl.get('app.underConstruction')}</h1>
      </div>
    )}
  </div>
);

export default LoginPage;
