import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCategories,
  fetchAllPosts,
  fetchCategoryPosts,
} from '../actions'

class Categories extends React.Component {
  componentDidMount () {
    console.log('categories reloaded')
    this.props.fetchCategories()
  }

  render () {
        return (
          <div className='category-container'>
            <ul className='category-list'>
              {(this.props.match && this.props.location.pathname === `/posts`) ?
                <li key='all' className='bold category'><Link onClick={this.props.fetchAllPosts} to={`/posts`}>all</Link></li>
              : <li key='all' className='category'><Link onClick={this.props.fetchAllPosts} to={`/posts`}>all</Link></li> }
              {this.props.categories.map(({name}) => {
                //protect against not passing url match prop to <Category /> by checking this.props.category alternative
                if ((name === (this.props.match && this.props.match.params.category)) || (name === this.props.category)) {
                  return (<li key={name} className='bold category'><Link onClick={() => this.props.fetchCategoryPosts(name)}  to={`/${name}/posts`}> {'#'+name}</Link></li>)
                } else {
                  return (<li key={name} className='category'><Link onClick={() => this.props.fetchCategoryPosts(name)} to={`/${name}/posts`}> {'#'+name}</Link></li>)
                }})}
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
    fetchCategories: () => dispatch(fetchCategories()),
    fetchAllPosts: () => dispatch(fetchAllPosts()),
    fetchCategoryPosts: (cat) => dispatch(fetchCategoryPosts(cat))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)
