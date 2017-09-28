import React from 'react'
import Post from './Post'

function Posts () {
  //const posts =
  const props = {posts: [
    {title: 'new world champion',
    category: 'basket weaving',
    date: Date.now()-10,
    likes: 15000,
    author: 'Btman'
  },
    {title: 'old challenger waiting in wings',
    category: 'knitting',
    date: Date.now() - 59,
    likes: 16334,
    author: 'Sheila'
  }]}

  return (
    <div className='container'>
      Sort by
      <button>Posted</button>
      <button>Likes</button>
      <div className='postList'>
        {props.posts.map(({title, category, author, likes, date}) => (
          <Post
            title={title}
            author={author}
            likes={likes}
            category={category}
            date={date}
            key={title}
          />
        )
        )}
      </div>
    </div>
  )
}

export default Posts
