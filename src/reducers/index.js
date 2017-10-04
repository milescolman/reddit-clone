import { combineReducers } from 'redux'

import {
  RECEIVE_ALL_POSTS,
  RECEIVE_CATEGORIES,
  RECEIVE_CATEGORY_POSTS
} from '../actions'

function posts (state = [], action) {
  switch (action.type) {
    case RECEIVE_CATEGORY_POSTS:
    case RECEIVE_ALL_POSTS:
      const { posts } = action
      return [
        ...posts
      ]
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
  posts,
  categories
})
