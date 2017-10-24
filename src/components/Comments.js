import React from 'react'
import { connect } from 'react-redux'
import { requestPostComments } from '../actions'
import Comment from './Comment'
class Comments extends React.Component {

  componentDidMount = () => this.props.fetchComments(this.props.match.params.id)

  render = () => (
    <ul className='comment-list'>
      {this.props.comments && this.props.comments.filter(({deleted, parentDeleted}) => (!(deleted || parentDeleted)))
        .map(({body, author, timestamp, id, parentId, voteScore}) => (
          <li key={id} className='comment'>
            <Comment
              body={body}
              author={author}
              timestamp={timestamp}
              id={id}
              parentId={parentId}
              voteScore={voteScore}
            />
          </li>

        ))
      }
    </ul>
    )
}
const mapStateToProps = (state, ownProps) => ({comments: state.comments[ownProps.match.params.id]})
const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (id) => dispatch(requestPostComments(id))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments)
