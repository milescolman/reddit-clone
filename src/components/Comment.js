import React from 'react'
import {connect} from 'react-redux'
import {fetchComment} from '../actions'

class Comment extends React.Component {
    componentDidMount () {
      this.props.fetchComment(this.props.match.params.id)
    }

    render = () => {
      return (
        <div className='container'>
          {this.props.comment[0] &&
            `${this.props.comment[0].body} by ${this.props.comment[0].author}`
          }
        </div>
      )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComment: (id) => dispatch(fetchComment(id)),
  }
}

const mapStateToProps = (state) => (
  {comment: state.comments}
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)
