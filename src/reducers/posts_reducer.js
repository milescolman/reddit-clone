import {
  RECEIVE_ALL_POSTS,
  RECEIVE_CATEGORY_POSTS,
  ADD_NEW_POST,
  RECEIVE_POST,
  CONFIRM_VOTE,
  CONFIRM_EDIT_POST,
  CONFIRM_DELETE_POST,
} from '../actions'


// data from API is  already normalized, don't need normalizr

function postsReducer (state = [], action) {
  switch (action.type) {
    case RECEIVE_CATEGORY_POSTS:
    case RECEIVE_ALL_POSTS:
    case RECEIVE_POST: //wrong? this needs its own handler ?
      const { posts } = action
      return [
        ...posts
      ]
    case ADD_NEW_POST:
        const {post} = action
        return [...state, post]
    case CONFIRM_VOTE:
      const {id, option} = action
      return state.map((post) => (
          (post.id !== id) ?
            post :
            {...post,
              voteScore: post.voteScore += (option === 'upVote') ? 1 : -1
            }
        ))
    case CONFIRM_EDIT_POST:
      const { editID, title, body} = action
      return state.map((post) => (
        (post.id !== editID) ? //id defined above...
          post :
          {...post,
          title,
          body
        }
      ))
    case CONFIRM_DELETE_POST:
    const { deleteID } = action
    return state.map((post) => (post.id !== deleteID ? post : {...post, deleted: true}))
    // delete all comments associated with post ?
    default:
      return state
  }
}
export default postsReducer
