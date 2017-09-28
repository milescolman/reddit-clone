import React from 'react'
//import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link} from 'react-router-dom'
import * as API from '../utils/api'

import Posts from './Posts'
import NotFound from './NotFound'

class RedditApp extends React.Component {
  state = {
  }

  render = () => {



    return (
      <div className='app'>
        <Router>
          <Switch>
            <Route exact
              path='/'
              component={Posts}
            />
            <Route component={NotFound}/>
          </Switch>
        </Router>
      </div>
      )
  }
}

//export default connect()(RedditApp)
export default RedditApp
