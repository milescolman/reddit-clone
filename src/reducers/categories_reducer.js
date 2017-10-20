import {  RECEIVE_CATEGORIES,} from '../actions'

function categoriesReducer (state = [], action) {
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
export default categoriesReducer
