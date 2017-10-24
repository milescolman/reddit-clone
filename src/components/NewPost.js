import uuidv1 from 'uuid/v1'
import React from 'react'
import {connect} from 'react-redux'

import {
  sendNewPost,
} from '../actions'

class NewPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showEditor: false,
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
    this.props.submitPost({...this.state,
         id: uuidv1(),
         timestamp: Date.now(),
         voteScore: 1
       })
    this.setState({
      title: '',
      author: '',
      category: 'Select a Category',
      body: '',
      error: '',
      showEditor: false
    })
  }

  render = () => {
    const displayState = this.state.showEditor ? 'inline' : 'none'
    const buttonDisplayState = !this.state.showEditor ? 'inline': 'none'
    const category = this.props.match && this.props.match.params.category
    return (
    <div className='new-post-container'>
      <div className='new-post-button'
        style={{display: buttonDisplayState}}
        onClick={() => this.setState({showEditor: true})}
      ><button><em>New Post</em></button></div>
      <div className='new-post' style={{display: displayState}}>
        {this.state.error ? <div className='error'>{this.state.error}</div> : ''}
        <form>
          <label>Title: <input name="title" placeholder="post title" value={this.state.title} onChange={(event) => this.handleField(event, 'title')}/></label>
          <label>Author: <input name="author" placeholder="your username" value={this.state.author} onChange={(event) => this.handleField(event, 'author')}/></label>
          {/* Replace category select with autocomplete search later */}
          <label>Category: <select value={category || 'Select a Category'} onChange={(event) => this.handleField(event, 'category')}>
            <option disabled>Select a Category</option>
            {this.props.categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
          </select>
          </label>
          <label>Body: <textarea name="body" placeholder="post body" value={this.state.body} onChange={(event) => this.handleField(event, 'body')}/></label>
          <input className="submit-button" type="submit" value="Submit" onClick={this.handleSubmit}/><button onClick={(event) => {
            event.preventDefault()
            this.setState({
              showEditor: false,
              title: '',
              author: '',
              category: 'Select a Category',
              body: '',
              error: '',
            })}}>Cancel</button>
        </form>
      </div>
    </div>
  )}
}

const mapStateToProps = (state) => ({
  categories: state.categories.map(({name}) => name) // throw in a category fetch here?
})

const mapDispatchToProps = (dispatch) => {
  return {
    submitPost: (post) => (
      dispatch(sendNewPost(post))
      // update redux state of posts in reducere to reduce api calls
      // using new post object
  ),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost)
