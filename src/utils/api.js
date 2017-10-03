const uuidv1 = require('uuid/v1');

const api = "http://localhost:3001"

// Generate a unique token
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-11)

const headers = {
  'Accept': 'application/json',
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

export const addNewPost = ({title='No title', body='No body', author='No one', category='Uncategorized'}) =>
  fetch(`${api}/posts`, {
    method: "POST",
    headers,
    id: uuidv1(),
    timestamp: Date.now(),
    title,
    body,
    author,
    category})

// TODO: below POST /posts in localhost:3001 
