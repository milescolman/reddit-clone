import * as API from '../utils/api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const fetchCategories = () => dispatch => (
  API
    .fetchCategories()
    .then(data => dispatch(receiveCategories(data)))
)

export const receiveCategories = ({categories}) => ({
  type: RECEIVE_CATEGORIES,
  categories
})
