import React from 'react'
import {connect} from 'react-redux'

import {fetchCategories} from '../actions'

class Categories extends React.Component {
  componentDidMount () {
    this.props.fetchCategories()
  }

  render () {
        return (
          <div className='container'>
            {this.props.categories.map(({name}) => (
              <ul key={name} className='category-list'>
                <li className='category'><a href={`/${name}/posts`}>{name}</a></li>
              </ul>
            ))}
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
