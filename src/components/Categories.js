import React from 'react'

function Categories (props) {
  return (
    <div className='container'>
      <h1>Categories</h1>
      Sort by <button>Posted</button>
      <button>Likes</button>
      {props.categories.map(category => (
        <div className='category'>
          <h2>{category}</h2>
        </div>
      ))}
    </div>
  )}

  export default Categories
