import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from './store/store';
import { configureRouter } from './router/router';
import { configureSaga } from './store/sagas/saga';

import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';

const renderer = page => {
  ReactDOM.render(<Provider store={store}>{page}</Provider>, document.getElementById('root'));
};

const store = configureStore();
configureSaga();
configureRouter(store, renderer);

registerServiceWorker();
