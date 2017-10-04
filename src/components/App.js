import React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route
}
from 'react-router-dom'

import Posts from './Posts'
import Categories from './Categories'
import NotFound from './NotFound'

class RedditApp extends React.Component {

  render = () => {
    return (
      <div className='app'>
        <Router>
          <Switch>
            <Route exact
              path='/posts'
              render={() => (
                <div className='container'>
                  <Categories />
                  <Posts />
                </div>
              )}
            />
            <Route exact
              path='/categories'
              render={() => (
                <Categories />
              )}
            />
            <Route exact
              path='/'
              render={() => (
                <div className='container'>
                  <Categories />
                  <Posts />
                </div>
              )}
            />
            <Route path="/:category/posts"
              render={props => (
                <div className='container'>
                  <Categories />
                  <Posts {...props}/>
                </div>
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
