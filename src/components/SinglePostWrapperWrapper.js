import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllPosts} from '../actions'
import Categories from './Categories'
import SinglePostWrapper from './SinglePostWrapper'
import Comments from './Comments'
import NewComment from './NewComment'
import NotFound from './NotFound'


class SinglePostWrapperWrapper extends React.Component {
  componentDidMount() {
    this.props.fetchAllPosts()
  }
  render() {
    const matchingPost = this.props.posts.filter(post => post.id === this.props.match.params.id)

    if (matchingPost.length === 0) {
      return (<NotFound />)
    } else if (matchingPost[0].deleted) {
      return  (<Redirect to={`/${matchingPost[0].category}/posts`} />)
    } else {
      return (
        <div className='container'>
          <Categories category={matchingPost[0].category}/>
          <SinglePostWrapper {...this.props}/>
          <Comments {...this.props}/>
          <NewComment {...this.props}/>
        </div>
      )}
    }
}

const mapStateToProps = state => ({
  posts: state.posts
})
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllPosts: () => dispatch(fetchAllPosts()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePostWrapperWrapper)
