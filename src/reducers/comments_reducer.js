import {
  RECEIVE_POST_COMMENTS,
  CONFIRM_NEW_COMMENT,
  RECEIVE_COMMENT,
  VOTE_ON_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from '../actions'

function commentsReducer (state = {}, action) {
  switch (action.type) {
    case RECEIVE_POST_COMMENTS:
      const { comments } =  action
      return (comments.length > 0) ? {...state,  [comments[0].parentId]: comments} : state
    case CONFIRM_NEW_COMMENT:
      const { commentObj } = action
      return (state[commentObj.parentId]) ? { ...state,
        [commentObj.parentId]: [...state[commentObj.parentId], commentObj]} :
        {[commentObj.parentId]: [commentObj]}
    case RECEIVE_COMMENT: //need to test
      const { comment } = action
      return {[comment.parentId]: [comment]}
    case VOTE_ON_COMMENT:
      const {voteObj} = action
      return {...state, [voteObj.parentId]: state[voteObj.parentId].map(comment => ((comment.id !== voteObj.id) ?
        comment :
        {...comment, voteScore: comment.voteScore += (voteObj.option === 'upVote') ? 1 : -1 }
      ))}
    case EDIT_COMMENT:
      const {id, parentId, timestamp, body} = action.commentObj
      return {...state, [parentId]: state[parentId].map(comment => ((comment.id !== id) ?
        comment :
        {...comment, body, timestamp}
      ))}
    case DELETE_COMMENT:
      return {...state, [action.parentId]: state[action.parentId].map( comment  => ((comment.id !== action.id) ?
      comment :
       {...comment, deleted: true}
    ))}
    default:
      return state
  }
}

export default commentsReducer
