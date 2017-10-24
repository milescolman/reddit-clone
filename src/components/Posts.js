import React from 'react'
import {connect} from 'react-redux'
import Post from './Post'
import {fetchAllPosts, fetchCategoryPosts} from '../actions'

class Posts extends React.Component  {
  constructor(props) {
    super(props)

    this.state = {sortFunction: 'likes'}
  }

  componentDidMount () {
    this.props.match ?
      this.props.fetchCategoryPosts(this.props.match.params.category)
      : this.props.updatePosts()
  }

  sortFunction = (postA, postB) => {
    if (this.state.sortFunction === 'likes') {
       if  (postA.voteScore < postB.voteScore) {
           return 1
       } else if (postA.voteScore > postB.voteScore) {
        return -1
      } else {
        return 0
      }
    } else if (postA.timestamp < postB.timestamp) {
      return 1
    } else if (postA.timestamp > postB.timestamp) {
      return -1
    } else {
      return 0
    }
  }

  setSortToLikes = () => this.setState(() => ({sortFunction: 'likes'}))
  setSortToPosted = () => this.setState(() => ({sortFunction: 'posted'}))
  render () {
    return (
    <div className='container'>
      Sort by <button className={this.state.sortFunction === 'posted' ? 'selected-btn' : ''} onClick={this.setSortToPosted}>Posted</button> <button className={this.state.sortFunction === 'likes' ? 'selected-btn' : ''} onClick={this.setSortToLikes}>Likes</button>
      <ul className='post-list'>
        { this.props.posts
          .filter(({deleted}) => (!deleted))
          .sort(this.sortFunction)
          .map(({title, category, author, voteScore, timestamp, id, body, deleted}) => (
            // remove title below once posts all have id field set
              <li key={id || title}>
                <Post
                  title={title}
                  author={author}
                  likes={voteScore}
                  date={timestamp}
                  id={id}
                  body={body}
                  deleted={deleted}
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
    updatePosts: () => dispatch(fetchAllPosts()),
    fetchCategoryPosts: (cat) => dispatch(fetchCategoryPosts(cat))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
