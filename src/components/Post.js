import React from 'react'
import {connect} from 'react-redux'

import FaAngleUp from 'react-icons/lib/fa/angle-up'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaEdit from 'react-icons/lib/fa/edit'
import moment from 'moment'

import {voteOnPost} from '../actions'

class Post extends React.Component{

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
              <FaEdit size={20} />
              <FaTrashO size={20} />
            </div>
          </div>
        </div>
      </div>
    )
    }

}
const mapDispatchToProps = (dispatch) => {
  return {
    voteOnPost: (postObj) => dispatch(voteOnPost(postObj)),
  }
}
export default connect(
  null,
  mapDispatchToProps
)(Post)
