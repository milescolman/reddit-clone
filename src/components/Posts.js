import React from 'react'
import {connect} from 'react-redux'
import Post from './Post'
import {fetchAllPosts, fetchCategoryPosts} from '../actions'

class Posts extends React.Component  {
  constructor(props) {
    super(props)
    this.sortFunction = this.sortFunction.bind(this)
  }
  state = {sortFunction: 'likes'}

  componentDidMount () {
    console.log(this.props.match)
    this.props.match ?
      this.props.fetchCategoryPosts(this.props.match.params.category)
      : this.props.updatePosts()
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
      {this.props.match ? <h1>{this.props.match.params.category}</h1>: ''}
      Sort by <button className={this.state.sortFunction === 'posted' ? 'selected-btn' : ''} onClick={this.setSortToPosted}>Posted</button> <button className={this.state.sortFunction === 'likes' ? 'selected-btn' : ''} onClick={this.setSortToLikes}>Likes</button>
      <ul className='post-list'>
        { this.props.posts.sort(this.sortFunction).map(({title, category, author, voteScore, timestamp, id}) => (
          <li key={title}>
            <Post
              title={title}
              author={author}
              likes={voteScore}
              category={this.props.match ? '' : category}
              date={timestamp}
              id={id}
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
