import React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route
}
from 'react-router-dom'

import Posts from './Posts'
import NotFound from './NotFound'

class RedditApp extends React.Component {

  render = () => {
    return (
      <div className='app'>
        <Router>
          <Switch>
            <Route exact
              path='/posts'
              component={Posts}
            />
            <Route exact
              path='/'
              render={() => (
                <Posts posts={this.props.posts}/>
              )}
            />
            <Route component={NotFound}/>
          </Switch>
        </Router>
      </div>
      )
  }
}

export default connect(
  null,
  null
)(RedditApp)
