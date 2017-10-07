import React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
}
from 'react-router-dom'

import Categories from './Categories'
import NotFound from './NotFound'
import Posts from './Posts'
import SinglePostWrapper from './SinglePostWrapper'
import NewPost from './NewPost'
import NewComment from './NewComment'
import Comments from './Comments'
import Comment from './Comment'

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
                  <NewPost />
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
              render={() =>
                <Redirect to={{
                  pathname: '/posts'
                }}/>
              }
            />
            <Route
              path="/:category/posts"
              render={props => (
                <div className='container'>
                  <Categories />
                  <Posts {...props}/>
                  <NewPost />
                </div>
              )}
            />
            <Route
              path="/:category/:id"
              render={props => (
                <div className='container'>
                  <Categories />
                  <SinglePostWrapper {...props}/>
                  <Comments {...props}/>
                  <NewComment {...props}/>
                </div>
              )}
            />
            <Route
              path="/comments/:id"
              render={props => (
                <div className='container'>
                  <Categories />

                  <Comment {...props}/>
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
