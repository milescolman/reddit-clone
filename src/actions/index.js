import * as API from '../utils/api'

export const RECEIVE_ALL_POSTS = 'GET_ALL_POSTS'

export const receiveAllPosts = posts => ({
  type: RECEIVE_ALL_POSTS,
  posts
})

export const fetchAllPosts = () => dispatch => (
  API
    .fetchAllPosts()
    .then(posts => dispatch(receiveAllPosts(posts)))
)
