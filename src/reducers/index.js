import { combineReducers } from 'redux'

import {
  RECEIVE_ALL_POSTS,
  RECEIVE_CATEGORIES,
  RECEIVE_CATEGORY_POSTS,
  RECEIVE_POST,
  CONFIRM_VOTE,
  CONFIRM_EDIT_POST
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
  posts,
})
