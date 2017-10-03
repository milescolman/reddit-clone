import React from 'react'
import {connect} from 'react-redux'
import Post from './Post'
import {fetchAllPosts} from '../actions'

class Posts extends React.Component  {
  constructor(props) {
    super(props)
    this.sortFunction = this.sortFunction.bind(this)
  }
  state = {sortFunction: 'likes'}

  componentDidMount () {
    console.log('this.props.updatePosts()')
    this.props.updatePosts()
  }

  sortFunction (postA, postB) {
    return (this.state.sortFunction === 'likes') ?
       postA.voteScore < postB.voteScore
    :  postA.timestamp < postB.timestamp
  }

  setSortToLikes = () => this.setState(() => ({sortFunction: 'likes'}))
  setSortToPosted = () => this.setState(() => ({sortFunction: 'posted'}))
  render () {
    return (
    <div className='container'>
      Sort by <button className={this.state.sortFunction === 'posted' ? 'selected-btn' : ''} onClick={this.setSortToPosted}>Posted</button> <button className={this.state.sortFunction === 'likes' ? 'selected-btn' : ''} onClick={this.setSortToLikes}>Likes</button>
      <ul className='post-list'>
        { this.props.posts.sort(this.sortFunction).map(({title, category, author, voteScore, timestamp}) => (
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
