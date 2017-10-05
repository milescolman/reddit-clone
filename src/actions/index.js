import * as API from '../utils/api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_ALL_POSTS = 'GET_ALL_POSTS'
export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const RECEIVE_POST = 'RECEIVE_POST'
export const CONFIRM_VOTE = 'CONFIRM_VOTE'
export const CONFIRM_EDIT_POST = 'CONFIRM_EDIT_POST'

export const fetchCategories = () => dispatch => (
  API
    .fetchCategories()
    .then(data => dispatch(receiveCategories(data)))
)

export const receiveCategories = ({categories}) => ({
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

// nothing return from server, so this function should have argument prefilled above
export const confirmNewPost = (post) => ({
  type: ADD_NEW_POST,
  post
})

export const fetchPost = (id) => dispatch => (
  API
    .fetchPost(id)
    .then(data => dispatch(receivePost(data)))
)

export const receivePost = (post) => ({
  type: RECEIVE_POST,
  posts: [post]
})

export const voteOnPost = (voteObj) => dispatch => (
  API
    .voteOnPost(voteObj)
    .then(data => dispatch(confirmVote(voteObj)))
)

export const confirmVote = (voteObj) => ({
  type: CONFIRM_VOTE,
  ...voteObj
})

export const editPost = (editObj) => dispatch => (
  API
    .editPost(editObj)
    .then(data => dispatch(confirmEdit(editObj)))
)

export const confirmEdit = (editObj) => ({
  type: CONFIRM_EDIT_POST,
  ...editObj
})
