import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {
  voteOnComment,
  editComment} from '../actions'
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
      this.props.submitEdit({id: this.props.id, body: this.state.body, timestamp: Date.now()})
    }

    render = () => {
      return (
        <div className='comment'>

          <FaAngleUp size={14}
            onClick={() => this.props.vote({id: this.props.id, option: 'upVote'})}
          />
          {this.props.voteScore}
          <FaAngleDown size={14}
            onClick={() => this.props.vote({id: this.props.id, option: 'downVote'})}
          />
          {this.props.body} by {this.props.author} {moment(this.props.timestamp).fromNow()}
          <FaEdit onClick={this.toggleCommentEditor} size={14}/>
          <FaTrashO size={14}/>
          {(this.state.showCommentEditor) ?
            <form onSubmit={this.submitForm}>
              <label>Body: <input value={this.state.body} onChange={this.handleBody}/></label>
              <input type='submit' value="Submit"/>
            </form>
          : ''}
        </div>
      )
    }
}
const mapDispatchToProps = (dispatch) => ({
  vote: (voteObj) => dispatch(voteOnComment(voteObj)),
  submitEdit: (commentObj) => dispatch(editComment(commentObj))
})
export default connect(null, mapDispatchToProps)(Comment)
