import React from 'react'

const NotFound = ({location}) => (
  <div className='not-found'>
    <h3>404: No match for <code>{location.pathname}</code></h3>
  </div>
)

export default NotFound
