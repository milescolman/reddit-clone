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
      category: '',
      body: '',
    }

    this.handleTitle = this.handleTitle.bind(this)
    this.handleAuthor = this.handleAuthor.bind(this)
    this.handleBody = this.handleBody.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleTitle(event) {
    this.setState({title: event.target.value})
  }
  handleAuthor(event) {
    this.setState({author: event.target.value})
  }
  handleBody(event) {
    this.setState({body: event.target.value})
  }
  handleSelect(event) {
    this.setState({category: event.target.value})
  }
  handleSubmit(event) {
    /* input validation */
    event.preventDefault()
    this.props.submitPost(this.state)
    this.setState({
      title: '',
      author: '',
      category: '',
      body: '',
    })
  }

  render = () => (
    <div className='container'>
      <h2>New Post</h2>
      <form onSubmit={this.handleSubmit}>
        <label>Title: <input name="title" placeholder="post title" value={this.state.title} onChange={this.handleTitle}/></label>
        <label>Author: <input name="author" placeholder="your username" value={this.state.author} onChange={this.handleAuthor}/></label>
        {/* Replace category select with autocomplete search later */}
        <label>Category: <select defaultValue='Select a Category' value={this.state.select} onChange={this.handleSelect}>
          <option disabled>Select a Category</option>
          {this.props.categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
        </select>
        </label>
        <label>Body: <textarea name="body" placeholder="post body" value={this.state.body} onChange={this.handleBody}/></label>
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
  ),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost)
