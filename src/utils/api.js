//const uuidv1 = require('uuid/v1');
import uuidv1 from 'uuid/v1'
const api = "http://localhost:3001"

// Generate a unique token
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-11)

const headers = {
  'Accept': 'application/json',
  'Content-Type':'application/json',
  'Authorization': token
}

export const fetchAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(
     res => res.json(),
     error => alert(`Error in fetching all posts: ${error}`))

export const fetchCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(
      res => res.json(),
      error => alert( `Error in fetching categories: ${error}`)
    )

export const fetchCategoryPosts = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(
      res => res.json(),
      error => alert(`Error in fetching category ${category}: ${error}`)
    )

export const addNewPost = (postBody) =>
  (
    fetch(`${api}/posts`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      title: 'No title',
      body: 'No body',
      author: 'No one',
      category: 'Uncategorized',
      id: uuidv1(),
      timestamp: Date.now(),
      ...postBody,
    }),
}).then(
  res => res.json(),
  error => `Error in creating new post: ${error}`
))

export const fetchPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers})
    .then(
      res => res.json(),
      error => alert(`Error in fetching post id ${id}: ${error}`)
    )

export const voteOnPost = ({id, option}) => (
  fetch(`${api}/posts/${id}`,{
    headers,
    method: 'POST',
    body: JSON.stringify({option})
  })
    .then(
      res => res.json(),
      error => alert(`Error in voting on post id ${id}: ${error}`)
    )
)

export const editPost = ({id, title, body}) => (
  fetch(`${api}/posts/${id}`,{
    headers,
    method: 'PUT',
    body: JSON.stringify({title, body})
  })
    .then(
      res =>  res.json(),
      error => alert(`Error in editing post id ${id}: ${error}`)
    )
)

export const deletePost = (id) => (
  fetch(`${api}/posts/${id}`,{
    headers,
    method: 'DELETE',
  })
    .then(
      res => res,
      error => alert(`Error in deleting post id ${id}: ${error}`)
    )
)

export const receivePostComments = (id) => (
  fetch(`${api}/posts/${id}/comments`, {
    headers
  })
    .then(
      res => res.json(),
      error => alert(`Error in fetching comments for post id ${id}: ${error}`)
    )
)

export const newComment = (commentObj) => (
  fetch(`${api}/comments`, {
    headers,
    method: 'POST',
    body: JSON.stringify(commentObj)
  }).then(
    res => res.json(),
    error => alert(`Error in creating new comment: ${error}`)
  )
)

export const fetchComment = (commentID) =>
  fetch(`${api}/comments/${commentID}`, {
    headers,
  })
  .then(
    res => res.json(),
    error => alert(`Error in fetching comment id ${commentID}: ${error}`)
  )

export const voteOnComment = ({id, option}) =>
  fetch(`${api}/comments/${id}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({option})
  }).then(
    res => res.json(),
    error => alert(`Error in voting on comment id ${id}: ${error}`)
  )

export const editComment = ({id, timestamp, body}) =>
  fetch(`${api}/comments/${id}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify({timestamp, body})
  }).then(
    res => res.json(),
    error => alert(`Error in editing comment ${id}: ${error}`)
  )

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    headers,
    method: 'DELETE'
  }).then(
    res => res.json(),
    error => alert(`Error in deleting comment ${id}: ${error}`)
  )
