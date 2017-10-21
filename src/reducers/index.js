// import { normalize, schema } from 'normalizr'
import { combineReducers } from 'redux'
import categoriesReducer from './categories_reducer'

import {
  RECEIVE_ALL_POSTS,
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
  EDIT_COMMENT,
  DELETE_COMMENT,
} from '../actions'

// if I maintain object for comments separately, don't need normalizr
//const author = new schema.Entity('authors')
// const comment = new schema.Entity('comments')
// const post = new schema.Entity('posts', {
//   comments: [comment]
//  })

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
    // delete all comments associated with post ?
    default:
      return state
  }
}
function comments (state = {}, action) {
  switch (action.type) {
    // need some comments to see how server-returned comments will be formatted
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
      console.log(action)
      return {...state, [action.parentId]: state[action.parentId].map( comment  => ((comment.id !== action.id) ?
      comment :
       {...comment, deleted: true}
    ))}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  categories: categoriesReducer,
  comments,
  posts,
})
export default rootReducer
