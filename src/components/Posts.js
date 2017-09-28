import React from 'react'

function Posts (props) {
  return (
    <div className='container'>
      Sort by
      <button>Posted</button>
      <button>Likes</button>
      {props.posts.map(({title, category, author, likes, date}) => (
        <div className='post'>

          <a href='#' className='postTitle'>
            {title}
          </a> in
          <a href='#' className='postCategory'>{category}</a>
          Submitted {Math.floor((Date.now() - date)/60)} min ago by {author}
          <div className='likes'>
            <button>Vote up</button>
            {likes}
            <button>Vote Down</button>
          </div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default Posts
