import React from 'react'
import {connect} from 'react-redux'

import {fetchCategories} from '../actions'

class Categories extends React.Component {
  componentDidMount () {
    this.props.fetchCategories()
  }

  render () {
        return (
          <div className='category-container'>
            categories:
            <ul className='category-list'>
              {(this.props.match && this.props.location.pathname === `/posts`) ?
                <li key='all' className='bold'><a href={`/posts`}>all</a></li>
              : <li key='all' className='category'><a href={`/posts`}>all</a></li> }
              {this.props.categories.map(({name}) => {
                //protect against not passing url match prop to <Category /> by checking this.props.category alternative
                if ((name === (this.props.match && this.props.match.params.category)) || (name === this.props.category))
                return (<li key={name} className={'category', 'bold'}><a href={`/${name}/posts`}> {name}</a></li>)
                else
                return (<li key={name} className='category'><a href={`/${name}/posts`}> {name}</a></li>)
              })}
            </ul>
          </div>
        )
  }

}
const mapStateToProps = (state) => {
  return {categories: state.categories}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)
