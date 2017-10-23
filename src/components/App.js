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
import SinglePostWrapperWrapper from './SinglePostWrapperWrapper'
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
              render={(props) => (
                <div className='container'>
                  <Categories {...props}/>
                  <Posts />
                  <NewPost />
                </div>
              )}
            />
            <Route exact
              path='/categories'
              render={(props) => (
                <Categories {...props}/>
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
              exact
              path="/:category"
              render={() => (
                <Redirect to={{
                  pathname: '/:category/posts'
                }}/>
              )} />
            <Route
              path="/:category/posts"
              render={props => (
                <div className='container'>
                  <Categories {...props}/>
                  <Posts {...props}/>
                  <NewPost />
                </div>
              )}
            />
            <Route
              path="/:category/:id"
              render={
                (props) => (
                  <SinglePostWrapperWrapper {...props}/>
                )}
            />
            <Route component={NotFound}/>
          </Switch>
        </Router>
      </div>
      )
  }
}

const mapStateToProps = state => ({
  posts: state.posts
})
export default connect(
  mapStateToProps,
  null
)(RedditApp)
