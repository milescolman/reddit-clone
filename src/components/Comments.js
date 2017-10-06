import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { requestPostComments } from '../actions'
class Comments extends React.Component {
  componentDidMount = () => this.props.fetchComments(this.props.match.params.id) 

  render = () => (
    <ul className='comment-list'>
      {this.props.comments.map(({body, author, timestamp, id, parentID}) => (
        <li key={id} className='comment'>
          <a href='#'>{body}</a>
          by {author} {moment(timestamp).fromNow()}
        </li>

      ))
      }
    </ul>
    )
}
const mapStateToProps = (state) => ({comments: state.comments})
const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (id) => dispatch(requestPostComments(id))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments)
