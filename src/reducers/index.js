import { combineReducers } from 'redux'

import {
  RECEIVE_ALL_POSTS,
} from '../actions'


function posts (state = {}, action) {
  const { posts } = action
  switch (action.type) {
    case RECEIVE_ALL_POSTS:
      return {
        ...state,
        posts: posts,
      }
    default:
      return state
  }
}

export default combineReducers({
  posts,
})
