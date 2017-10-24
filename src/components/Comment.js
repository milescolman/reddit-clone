import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {
  voteOnComment,
  editComment,
  deleteComment
} from '../actions'
import FaAngleUp from 'react-icons/lib/fa/angle-up'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaEdit from 'react-icons/lib/fa/edit'

class Comment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showCommentEditor: false,
      body: this.props.body
    }

  }
    toggleCommentEditor = () => (this.setState({showCommentEditor: !this.state.showCommentEditor}))
    handleBody = (event) => {
      event.preventDefault()
      this.setState({body: event.target.value})
    }
    submitForm = (event) => {
      event.preventDefault()
      this.props.submitEdit({id: this.props.id, parentId: this.props.parentId, body: this.state.body, timestamp: Date.now()})
      this.setState({showCommentEditor: false})
    }

    render = () => {
      return (
        <div className='comment'>
          <button>
            <FaAngleUp size={14}
              onClick={() => this.props.vote({id: this.props.id, parentId: this.props.parentId, option: 'upVote'})}
            />
          </button>
          {this.props.voteScore}
          <button>
            <FaAngleDown size={14}
              onClick={() => this.props.vote({id: this.props.id, parentId: this.props.parentId, option: 'downVote'})}
            />
          </button>
          {this.props.body} by {this.props.author} {moment(this.props.timestamp).fromNow()}
          <button><FaEdit onClick={this.toggleCommentEditor} size={14}/></button>
          <button><FaTrashO onClick={() => this.props.delete(this.props.id)} size={14}/></button>
          {(this.state.showCommentEditor) ?
            <form onSubmit={this.submitForm}>
              <label>Comment Body: <input value={this.state.body} onChange={this.handleBody}/></label>
              <input type='submit' value="Submit"/>
            </form>
          : ''}
        </div>
      )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  vote: (voteObj) => dispatch(voteOnComment(voteObj)),
  submitEdit: (commentObj) => dispatch(editComment(commentObj)),
  delete: (id) => dispatch(deleteComment({id, parentId: ownProps.parentId}))
})
export default connect(null, mapDispatchToProps)(Comment)
