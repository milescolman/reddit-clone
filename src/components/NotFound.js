import React from 'react'
import {withRouter} from 'react-router-dom'
const NotFound = ({location}) => (
  <div className='not-found'>
    <h3>404: No match for <code>{location.pathname}</code></h3>
  </div>
)

export default withRouter(NotFound)
