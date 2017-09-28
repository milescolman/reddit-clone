import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RedditApp from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <RedditApp />
  </Provider>,
    document.getElementById('root'));
registerServiceWorker();
