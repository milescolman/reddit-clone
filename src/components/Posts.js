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
      <span className='error'>Sort by (broken)</span> <button className={this.state.sortFunction === 'posted' ? 'selected-btn' : ''} onClick={this.setSortToPosted}>Posted</button> <button className={this.state.sortFunction === 'likes' ? 'selected-btn' : ''} onClick={this.setSortToLikes}>Likes</button>
      <ul className='post-list'>
        {/* removed .sort(this.sortFunction) from below */}
        { this.props.posts
          .filter(({deleted}) => (!deleted))
          .map(({title, category, author, voteScore, timestamp, id, body, deleted}) => (
          // remove title below once posts all have id field set
            <li key={id || title}>
              <Post
                title={title}
                author={author}
                likes={voteScore}
                category={this.props.match ? '' : category}
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
