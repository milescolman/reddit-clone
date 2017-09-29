import React from 'react'
import {connect} from 'react-redux'
import Post from './Post'
import * as API from '../utils/api'
import {fetchAllPosts} from '../actions'

class Posts extends React.Component  {
  state = {posts: [
    {title: 'new world champion',
    category: 'basket weaving',
    date: Date.now()-10,
    likes: 15000,
    author: 'Btman'
  },
    {title: 'old challenger waiting in wings',
    category: 'knitting',
    date: Date.now() - 59,
    likes: 16334,
    author: 'Sheila'
  }]}



  componentDidMount () {
    this.props.updatePosts()
  }

  render () {
    return (
    <div className='container'>
      Sort by
      <button>Posted</button>
      <button>Likes</button>
      <ul className='post-list'>
        {this.state.posts.map(({title, category, author, likes, date}) => (
          <li key={title}>
            <Post
              title={title}
              author={author}
              likes={likes}
              category={category}
              date={date}
            />
          </li>
        )
        )}
      </ul>
    </div>
  )}
}

// const updatePosts = () => dispatch => {
//   return API.fetchAllPosts().then(
//     posts => dispatch(getAllPosts({posts})),
//     error => dispatch(console.log(error))
//   )
// }

const mapStateToProps = (state) => {
  return {posts: state.posts}
}
const mapDispatchToProps = (dispatch) => {
  return {
    updatePosts: () => dispatch(
      console.log('boo'),
      fetchAllPosts())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
