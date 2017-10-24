import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import FaAngleUp from 'react-icons/lib/fa/angle-up'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaEdit from 'react-icons/lib/fa/edit'
import FaCommentsO from 'react-icons/lib/fa/comments-o'
import moment from 'moment'

import {
  voteOnPost,
  editPost,
  deletePost,
  requestPostComments,
} from '../actions'

class Post extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      modalEditOpen: false,
      title: this.props.title,
      body: this.props.body, //need this body param all the tim   e
    }

  }

  componentDidMount = () => ( // fetch number of comments
    this.props.getCommentTotal(this.props.id)
  )
  //arrow functions so don't need this bound in constructor. yay!
  setModalEditOpen = () => this.setState({modalEditOpen: true})
  setModalEditClosed = () => this.setState({modalEditOpen: false})
  toggleModalEdit = () => this.setState({modalEditOpen: !this.state.modalEditOpen})
  updateField = (event, key) => this.setState({[key]: event.target.value})
  submitEdit = (event) => {
    event.preventDefault()
    this.setModalEditClosed()
    this.props.editPost({id: this.props.id, body: this.state.body, title: this.state.title})
  }

  render  ()  {
    return (
      <div className='post'>
        <div className='likes'>
          <button className='arrow'
            onClick={() => this.props.voteOnPost({id: this.props.id, option: 'upVote'})}>
            <FaAngleUp size={20} />
          </button>
          <div>
            {this.props.likes}
          </div>
          <button className='arrow' onClick={() => this.props.voteOnPost({id: this.props.id, option: 'downVote'})}>
            <FaAngleDown size={20} />
          </button>
        </div>
        <div className='post-title'>
          <div>
            <Link to={`/posts/${this.props.id}`} className='postTitle'>
              {this.props.title}
            </Link>
          </div>
          <div className='submitted-info'>
            Submitted {moment(this.props.date).fromNow()} by <strong>{this.props.author}</strong>
          </div>
          { this.props.body &&
            <div className='body'>
              {/* true at location /post/:id */}
              {(this.props.id === (this.props.match && this.props.match.params.id)) ?
              this.props.body :
              <div>
                {(this.props.body == this.props.body.substr(0,80)) ? this.props.body : (<div>{this.props.body.substr(0, 80)}... <Link to={`/posts/${this.props.id}`}>Read more</Link></div>)}
              </div>
              }
              <div className='post-button-bar'>
                    <FaCommentsO size={20}/> {this.props.commentTotal}
                    <button className='edit-post' onClick={this.toggleModalEdit}><FaEdit size={15} /></button>
                    <button onClick={() => this.props.deletePost(this.props.id)}><FaTrashO size={15} /></button>
              </div>
              { this.state.modalEditOpen ?
                <form className='edit-post-form' onSubmit={this.submitEdit}>
                  <label>Title: <input value={this.state.title} onChange={(event) => this.updateField(event, 'title')}/></label>
                  <label>Body: <input value={this.state.body} onChange={(event) => this.updateField(event, 'body')}/></label>
                  <input className='submit-button' type='submit' value='Submit'/>
                  <button onClick={this.setModalEditClosed}>Cancel</button>
                </form>
              : ''}
            </div>
          }

        </div>
      </div>
    )
    }

}
const mapStateToProps = (state, ownProps) => ({
  commentTotal: (state.comments[ownProps.id]) ?
    state.comments[ownProps.id].reduce((sum, comment) =>
    ((comment.parentId === ownProps.id && !comment.deleted) ? ++sum : sum), 0) :
    0
})
const mapDispatchToProps = (dispatch) => {
  return {
    voteOnPost: (postObj) => dispatch(voteOnPost(postObj)),
    editPost: (editObj) => dispatch(editPost(editObj)),
    deletePost: (id) => dispatch(deletePost(id)),
    getCommentTotal: (id) => dispatch(requestPostComments(id))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
