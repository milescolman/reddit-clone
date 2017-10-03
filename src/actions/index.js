import * as API from '../utils/api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_ALL_POSTS = 'GET_ALL_POSTS'
export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS'
export const ADD_NEW_POST = 'ADD_NEW_POST'


export const fetchCategories = () => dispatch => (
  API
    .fetchCategories()
    .then(data => dispatch(receiveCategories(data)))
)

export const receiveCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchAllPosts = () => dispatch => (
  API
  .fetchAllPosts()
  .then(data => dispatch(receiveAllPosts(data)))
)

export const receiveAllPosts = (posts) => ({
  type: RECEIVE_ALL_POSTS,
  posts
})

export const fetchCategoryPosts = (category) => dispatch => (
  API
    .fetchCategoryPosts(category)
    .then(data => dispatch(receiveCategoryPosts(data)))
)

export const receiveCategoryPosts = (posts) => ({
  type: RECEIVE_CATEGORY_POSTS,
  posts
})

export const sendNewPost = (post) => dispatch => (
  API
    .addNewPost(post)
    .then(data => dispatch(confirmNewPost(data)))
)

export const confirmNewPost = (post) => ({
  type: ADD_NEW_POST,
  post
})
