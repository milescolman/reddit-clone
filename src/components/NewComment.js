import React from 'react'
import {connect} from 'react-redux'
import uuidv1 from 'uuid/v1'
import { sendNewComment } from '../actions'

class NewComment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      comment: '',
      author: '',
      error: '',
    }
  }


  submitForm = (event) => {
    event.preventDefault()
    if (this.state.comment && this.state.author) {
      this.props.sendNewComment({
        id: uuidv1(),
        timestamp: Date.now(),
        body: this.state.comment,
        author: this.state.author,
        parentID: this.props.match.params.id,
      })
      this.setState({comment: '', author: ''})
    } else {
      this.setState({error: 'Both fields are required'})
    }
  }
  handleField = (event, field) => this.setState({[field]: event.target.value, error: ''})
  render = () => (
    <form onSubmit={this.submitForm}>
      <span className='error'>{this.state.error}</span>
      <label>Comment: <input value={this.state.comment}
        onChange={(event) => this.handleField(event, 'comment') }/></label>
      <label>Author: <input value={this.state.author}
        onChange={(event) => this.handleField(event, 'author')} /></label>
      <input type='submit' value='Submit'/>
    </form>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendNewComment: (commentObj) => dispatch(sendNewComment(commentObj))
  }
}
export default connect(
  null,
  mapDispatchToProps
)(NewComment)
