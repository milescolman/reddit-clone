import React from 'react'
import {connect} from 'react-redux'

import {
  sendNewPost,
  fetchAllPosts
} from '../actions'

class NewPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      category: 'Select a Category',
      body: '',
      error: '',
    }

  }
  handleField = (event, field) =>
    this.setState({error: '', [field]: event.target.value})

  handleSubmit = (event) => {
    event.preventDefault()
    /* input validation */
    if (!this.state.title || !this.state.author || this.state.category === 'Select a Category' || !this.state.body) {
      this.setState({error: 'All fields are required.'})
      return
    }
    this.props.submitPost(this.state)
    this.setState({
      title: '',
      author: '',
      category: 'Select a Category',
      body: '',
      error: '',
    })
  }

  render = () => (
    <div className='new-post'>
      <h3>New Post</h3>
      {this.state.error ? <div className='error'>{this.state.error}</div> : ''}
      <form onSubmit={this.handleSubmit}>
        <label>Title: <input name="title" placeholder="post title" value={this.state.title} onChange={(event) => this.handleField(event, 'title')}/></label>
        <label>Author: <input name="author" placeholder="your username" value={this.state.author} onChange={(event) => this.handleField(event, 'author')}/></label>
        {/* Replace category select with autocomplete search later */}
        <label>Category: <select defaultValue='Select a Category' value={this.state.category} onChange={(event) => this.handleField(event, 'category')}>
          <option disabled>Select a Category</option>
          {this.props.categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
        </select>
        </label>
        <label>Body: <textarea name="body" placeholder="post body" value={this.state.body} onChange={(event) => this.handleField(event, 'body')}/></label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  categories: state.categories.map(({name}) => name) // throw in a category fetch here?
})

const mapDispatchToProps = (dispatch) => {
  return {
    submitPost: (post) => (
      dispatch(sendNewPost(post)),
      dispatch(fetchAllPosts())
      //can't update redux state of posts in reducere to reduce api calls
      // because server doesn't return anything on a new post creation
      // If we had the post id, we could request just that post...
  ),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost)
