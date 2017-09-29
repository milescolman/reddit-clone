import React from 'react'

import FaAngleUp from 'react-icons/lib/fa/angle-up'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import FaEdit from 'react-icons/lib/fa/edit'
import FaTrashO from 'react-icons/lib/fa/trash-o'

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
              <a href='#post' className='postTitle'>
                {this.props.title}
              </a>
              { this.props.category &&
                <span> in <a href='#cat' className='post-category'>{this.props.category}</a>
                </span>
              }
            </div>
            <div>
              Submitted {Math.floor((Date.now() - this.props.date)/60)} min ago by {this.props.author}
            </div>
            <div>
              <FaEdit size={20} />
              <FaTrashO size={20} />
            </div>
          </div>
        </div>
        { this.props.body &&
          <div className='body'>
            {this.props.body}
          </div>
        }
      </div>
    )
    }

}
export default Post
