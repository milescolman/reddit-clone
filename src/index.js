import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RedditApp from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore,
  applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { Provider } from 'react-redux'


const store = createStore(reducer,
  applyMiddleware(thunk)
)
export default store

ReactDOM.render(
 <Provider store={store}>
   <RedditApp />
 </Provider>,
    document.getElementById('root'));
registerServiceWorker();
