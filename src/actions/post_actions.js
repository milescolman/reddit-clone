import * as API from '../utils/api'

export const RECEIVE_ALL_POSTS = 'GET_ALL_POSTS'
export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const RECEIVE_POST = 'RECEIVE_POST'
export const CONFIRM_VOTE = 'CONFIRM_VOTE'
export const CONFIRM_EDIT_POST = 'CONFIRM_EDIT_POST'
export const CONFIRM_DELETE_POST = 'CONFIRM_DELETE_POST'
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS'

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
    .then(data => dispatch(confirmNewPost(post)))
)

export const confirmNewPost = (post) => (
  {
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
  ...editObj,
  editID: editObj.id
})

export const deletePost = (id) => dispatch => (
  API
    .deletePost(id)
    .then(data => dispatch(confirmDeletePost(id)))
)

export const confirmDeletePost = (id) => ({
  type: CONFIRM_DELETE_POST,
  deleteID: id
})

export const requestPostComments = (id) => dispatch => (
  API
    .receivePostComments(id)
    .then(data => dispatch(receivePostComments(data)))
)

export const receivePostComments = (comments) => ({
  type: RECEIVE_POST_COMMENTS,
  comments
})
