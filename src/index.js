import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RedditApp from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { compose, createStore,
  applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { Provider } from 'react-redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
export default store

ReactDOM.render(
 <Provider store={store}>
   <RedditApp />
 </Provider>,
    document.getElementById('root'));
registerServiceWorker();
