import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchPost} from '../actions'
import Categories from './Categories'
import Post from './Post'
import Comments from './Comments'
import NewComment from './NewComment'
import NotFound from './NotFound'


class SinglePostWrapperWrapper extends React.Component {
  componentDidMount = () => {
    this.props.fetchPost(this.props.match.params.id)
  }
  render()
  {
    const matchingPost = this.props.posts
    if (matchingPost.length === 0) {
      return (<NotFound />)
      // BUG: sometimes deleted posts are just empty objects..
    } else if (Object.keys(matchingPost[0]).length === 0 && matchingPost[0].constructor === Object) {
      return (<Redirect to={'/posts'} />)
    } else if (matchingPost[0].deleted ) {
      console.log('redirecting because post is deleted')
      return  (<Redirect to={`/${matchingPost[0].category}/posts`} />)
    } else {
      return (
        <div className='container'>
          <div>
            <Categories category={matchingPost[0].category}/>
          </div>
          <ul className='post-list'>
            <li className='post'>
              <Post {...this.props}
                title={matchingPost[0].title}
                author={matchingPost[0].author}
                likes={matchingPost[0].voteScore}
                date={matchingPost[0].timestamp}
                id={matchingPost[0].id}
                body={matchingPost[0].body}
                deleted={matchingPost[0].deleted}
              />
              <Comments {...this.props}/>
              <NewComment {...this.props}/>
            </li>
          </ul>
        </div>
      )}
    }
}

const mapStateToProps = (state, ownProps) => ({
  //post: state.posts.filter(post => post.id === ownProps.match.params.id)
  posts: state.posts
})
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (id) => dispatch(fetchPost(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePostWrapperWrapper)
