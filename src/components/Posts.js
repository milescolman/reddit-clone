import React from 'react'
import {connect} from 'react-redux'
import Post from './Post'
import {fetchAllPosts} from '../actions'

class Posts extends React.Component  {

  componentDidMount () {
    console.log('this.props.updatePosts()')
    this.props.updatePosts()
  }

  render () {
    return (
    <div className='container'>
      Sort by
      <button>Posted</button>
      <button>Likes</button>
      <ul className='post-list'>
        { this.props.posts.map(({title, category, author, voteScore, timestamp}) => (
          <li key={title}>
            <Post
              title={title}
              author={author}
              likes={voteScore}
              category={category}
              date={timestamp}
            />
          </li>
        )
        )}
      </ul>
    </div>
  )}
}

const mapStateToProps = (state) => {
  return {posts: state.posts}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePosts: () => dispatch(fetchAllPosts())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
