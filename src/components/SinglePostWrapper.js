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
      {
        <Post
          title={this.props.post.title}
          author={this.props.post.author}
          body={this.props.post.body}
          likes={this.props.post.voteScore}
          category={this.props.post.category}
          date={this.props.post.timestamp}
          id={this.props.match.params.id}
          key={this.props.post.id}
        />
      }

    </div>
  )
}

const mapStateToProps = (state) => {
  return {post: state.posts[0]}
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
