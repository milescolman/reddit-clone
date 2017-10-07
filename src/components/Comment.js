import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {voteOnComment} from '../actions'
import FaAngleUp from 'react-icons/lib/fa/angle-up'
import FaAngleDown from 'react-icons/lib/fa/angle-down'

class Comment extends React.Component {
    render = () => {
      return (
        <div className='container'>

          <FaAngleUp size={14}
            onClick={() => this.props.vote({id: this.props.id, option: 'upVote'})}
          />
          {this.props.voteScore}
          <FaAngleDown size={14}
            onClick={() => this.props.vote({id: this.props.id, option: 'downVote'})}
          />
          {this.props.body} by {this.props.author} {moment(this.props.timestamp).fromNow()}

        </div>
      )
    }
}
const mapDispatchToProps = (dispatch) => ({
  vote: (voteObj) => dispatch(voteOnComment(voteObj))
})
export default connect(null, mapDispatchToProps)(Comment)
