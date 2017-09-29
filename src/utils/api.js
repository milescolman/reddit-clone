
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
      error => console.log(error))
    .then(data => console.log(data))
