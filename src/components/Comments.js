import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { requestPostComments } from '../actions'
import Comment from './Comment'
class Comments extends React.Component {

  componentDidMount = () => this.props.fetchComments(this.props.match.params.id)

  render = () => (
    <ul className='comment-list'>
      {this.props.comments.filter(({deleted, parentDeleted}) => (!(deleted || parentDeleted)))
        .map(({body, author, timestamp, id, parentID, voteScore}) => (
          <li key={id} className='comment'>
            {/* {voteScore} <a href={`/comments/${id}`}>{body}</a>
            by {author} {moment(timestamp).fromNow()} */}
            <Comment
              body={body}
              author={author}
              timestamp={timestamp}
              id={id}
              parentId={parentID}
              voteScore={voteScore}
            />
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
