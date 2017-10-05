const uuidv1 = require('uuid/v1');

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
}))

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

// TODO: below GET /posts/:id in localhost:3001
