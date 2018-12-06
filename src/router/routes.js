import React from 'react';
import LoginPage from '../containers/pages/loginPage';
import App from '../components/app/App';
import HomePage from '../components/homePage';
import Faq from '../components/faq';

const routes = [
  {
    path: ['/home', '/logout', '', '/'],
    authenticated: false,
    action: () => (
      <App>
        <HomePage />
      </App>
    )
  },
  {
    path: '/faq',
    authenticated: false,
    action: () => (
      <App>
        <Faq />
      </App>
    )
  },
  {
    path: '/login',
    authenticated: false,
    name: 'index-page',
    action: context => (
      <App context={context}>
        <LoginPage context={context} />
      </App>
    )
  },
  {
    path: '(.*)',
    authenticated: false,
    action: () => (
      <App>
        <h1>404 Not Found.</h1>
      </App>
    )
  }
];

export { routes };
