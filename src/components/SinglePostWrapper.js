import React from 'react'
import {connect} from 'react-redux'

import {
  fetchPost,
 } from '../actions'

import Post from './Post'

class SinglePostWrapper extends React.Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id)
  }

  render = () => (
    <div className='container'>
      {this.props.posts.map(({title, author, body, voteScore, category, timestamp}) => (
        <Post
          title={title}
          author={author}
          body={body}
          likes={voteScore}
          category={category}
          date={timestamp}
          id={this.props.match.params.id}
          key={this.props.match.params.id}
        />
      ))}

    </div>
  )
}

const mapStateToProps = (state) => {
  return {posts: state.posts}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (id) => dispatch(fetchPost(id)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePostWrapper)
