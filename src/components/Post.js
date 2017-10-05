import React from 'react'
import {connect} from 'react-redux'

import FaAngleUp from 'react-icons/lib/fa/angle-up'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaEdit from 'react-icons/lib/fa/edit'
import moment from 'moment'

import {
  voteOnPost,
  editPost,
  deletePost,
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
  //arrow functions so don't need this bound in constructor. yay!
  setModalEditOpen = () => this.setState({modalEditOpen: true})
  setModalEditClosed = () => this.setState({modalEditOpen: false})
  toggleModalEdit = () => this.setState({modalEditOpen: !this.state.modalEditOpen})
  updateField = (event, key) => this.setState({[key]: event.target.value})
  submitEdit = (event) => (
    event.preventDefault(),
    this.setModalEditClosed(),
    this.props.editPost({id: this.props.id, body: this.state.body, title: this.state.title})
  )

  render  ()  {
    return (
      <div className='post'>
        <div>
          <div className='likes'>
            <button className='arrow'
              onClick={() => this.props.voteOnPost({id: this.props.id, option: 'upVote'})}>
              <FaAngleUp size={30} />
            </button>
            <div>
              {this.props.likes}
            </div>
            <button className='arrow' onClick={() => this.props.voteOnPost({id: this.props.id, option: 'downVote'})}>
              <FaAngleDown size={30} />
            </button>
          </div>
          <div className='post-title'>
            <div>
              <a href={`/posts/${this.props.id}`} className='postTitle'>
                {this.props.title}
              </a>
              { this.props.category &&
                <span> in <a href={`/${this.props.category}/posts`} className='post-category'>{this.props.category}</a>
                </span>
              }
            </div>
            <div>
              Submitted {moment(this.props.date).fromNow()} by {this.props.author}
            </div>
            { this.props.body &&
              <div className='body'>
                {this.props.body}
              </div>
            }
            <div>
              <button className='edit-post' onClick={this.toggleModalEdit}><FaEdit size={20} /></button>
              <button onClick={() => this.props.deletePost(this.props.id)}><FaTrashO size={20} /></button>
            </div>
            { this.state.modalEditOpen ?
              <form className='edit-post-form' onSubmit={this.submitEdit}>
                <label>Title: <input value={this.state.title} onChange={(event) => this.updateField(event, 'title')}/></label>
                <label>Body: <input value={this.state.body} onChange={(event) => this.updateField(event, 'body')}/></label>
                <input type='submit' value='Submit'/>
                <button onClick={this.setModalEditClosed}>Cancel</button>
              </form>
            : ''}
          </div>
        </div>
      </div>
    )
    }

}
const mapDispatchToProps = (dispatch) => {
  return {
    voteOnPost: (postObj) => dispatch(voteOnPost(postObj)),
    editPost: (editObj) => dispatch(editPost(editObj)),
    deletePost: (id) => dispatch(deletePost(id)),
  }
}
export default connect(
  null,
  mapDispatchToProps
)(Post)
