import React from 'react'
//import moment from 'moment'

import FaAngleUp from 'react-icons/lib/fa/angle-up'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaEdit from 'react-icons/lib/fa/edit'
import moment from 'moment'


class Post extends React.Component{

  render  ()  {
    return (
      <div className='post'>
        <div>
          <div className='likes'>
            <div className='arrow'>
              <FaAngleUp size={30} />
            </div>
            <div>
              {this.props.likes}
            </div>
            <div className='arrow'>
              <FaAngleDown size={30} />
            </div>
          </div>
          <div className='post-title'>
            <div>
              <a href={`/posts/${this.props.id}`} className='postTitle'>
                {this.props.title}
              </a>
              { this.props.category &&
                <span> in <a href={`/${this.props.category}/posts`} className='post-category'>{this.props.category}</a>
                </span>
              }
            </div>
            <div>
              Submitted {moment(this.props.date).fromNow()} by {this.props.author}
            </div>
            { this.props.body &&
              <div className='body'>
                {this.props.body}
              </div>
            }
            <div>
              <FaEdit size={20} />
              <FaTrashO size={20} />
            </div>
          </div>
        </div>
      </div>
    )
    }

}
export default Post
