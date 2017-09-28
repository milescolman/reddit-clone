import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Link} from 'react-router-dom'
import * as API from '../utils/api'

import Posts from './Posts'

class RedditApp extends React.Component {
  state = {
  }

  render = () => {

    const posts = [
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
    }]

    return (
      <Posts posts={posts}/>
    )
  }
}

export default connect()(RedditApp)
