
import { combineReducers } from 'redux'
import categoriesReducer from './categories_reducer'
import commentsReducer from './comments_reducer'
import postsReducer from './posts_reducer'

const rootReducer = combineReducers({
  categories: categoriesReducer,
  comments: commentsReducer,
  posts: postsReducer,
})
export default rootReducer
