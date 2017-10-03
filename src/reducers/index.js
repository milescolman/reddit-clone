import { combineReducers } from 'redux'

import {
  RECEIVE_ALL_POSTS,
} from '../actions'

// const initialState = {
//   posts: []
// }

function posts (state = [], action) {
  switch (action.type) {
    case RECEIVE_ALL_POSTS:
      const { posts } = action
      return [
        ...posts
      ]
    default:
      return state
  }
}

export default combineReducers({
  posts,
})
