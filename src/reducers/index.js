import { combineReducers } from 'redux'

import {
  RECEIVE_ALL_POSTS,
  RECEIVE_CATEGORIES,
  RECEIVE_CATEGORY_POSTS,
  RECEIVE_POST,
  CONFIRM_VOTE,
  CONFIRM_EDIT_POST,
  CONFIRM_DELETE_POST,
} from '../actions'

import {
  RECEIVE_POST_COMMENTS,
  CONFIRM_NEW_COMMENT,
  RECEIVE_COMMENT,
  VOTE_ON_COMMENT,
} from '../actions'

function posts (state = [], action) {
  switch (action.type) {
    case RECEIVE_CATEGORY_POSTS:
    case RECEIVE_ALL_POSTS:
    case RECEIVE_POST: //wrong? this needs its own handler ?
      const { posts } = action
      return [
        ...posts
      ]
    case CONFIRM_VOTE:
      const {id, option} = action
      return state.map((post) => (
          (post.id !== id) ?
            post :
            {...post,
              voteScore: post.voteScore += (option === 'upVote') ? 1 : -1
            }
        ))
    case CONFIRM_EDIT_POST:
      const { editID, title, body} = action
      return state.map((post) => (
        (post.id !== editID) ? //id defined above...
          post :
          {...post,
          title,
          body
        }
      ))
    case CONFIRM_DELETE_POST:
    const { deleteID } = action
    return state.map((post) => (post.id !== deleteID ? post : {...post, deleted: true}))
    default:
      return state
  }
}
function comments (state = [], action) {
  switch (action.type) {
    // need some comments to see how server-returned comments will be formatted
    case RECEIVE_POST_COMMENTS:
      const { comments } = action
      return [ ...comments ]
    case CONFIRM_NEW_COMMENT:
      const { commentObj } = action
      console.log(action)
      return [...state, commentObj]
    case RECEIVE_COMMENT:
      const { comment } = action
      return [comment]
    case VOTE_ON_COMMENT:
      const {voteObj} = action
      return state.map(comment => ((comment.id !== voteObj.id) ?
        comment :
        {...comment, voteScore: comment.voteScore += (voteObj.option === 'upVote') ? 1 : -1 }
      ))
    default:
      return state
  }
}
function categories (state = [], action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const { categories } = action
      return [
        ...categories
      ]
    default:
      return state
  }
}

export default combineReducers({
  categories,
  comments,
  posts,
})
