import * as API from '../utils/api'

export const CONFIRM_NEW_COMMENT = 'CONFIRM_NEW_COMMENT'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const sendNewComment = (commentObj) => dispatch => (
  API
    .newComment(commentObj)
    .then(data => dispatch(confirmNewComment(commentObj)))
)

export const confirmNewComment = (commentObj) => ({
  type: CONFIRM_NEW_COMMENT,
  commentObj
})

export const fetchComment = (commentID) => dispatch => (
  API
    .fetchComment(commentID)
    .then(data => dispatch(receiveComment(data)))
)

export const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment
})

export const voteOnComment = (voteObj) => dispatch => (
  API
    .voteOnComment(voteObj)
    .then(data => dispatch(confirmVoteOnComment(voteObj)))
)

export const confirmVoteOnComment = (voteObj) => ({
  type: VOTE_ON_COMMENT,
  voteObj
})

export const editComment = (commentObj) => dispatch => (
  API
    .editComment(commentObj)
    .then(data => dispatch(confirmEditComment(commentObj)))
)

export const confirmEditComment = (commentObj) => ({
  type: EDIT_COMMENT,
  commentObj
})

export const deleteComment = ({id, parentId}) => dispatch => (
  API
    .deleteComment(id)
    .then(data => dispatch(confirmDeleteComment({id, parentId})))
)

export const confirmDeleteComment = ({id, parentId}) => ({
  type: DELETE_COMMENT,
  id,
  parentId
})
