const defaultState = {
  userId: -1,
  userVideos: [],
  index: 0,
  allVideos: [],
  username: ""
}

export default (state=defaultState, action) => {
  const newState = {...state}
  switch (action.type) {
    case "CHANGE_CURRENT_USER":
      newState.userId = action.user_id
      newState.username = action.username
      return newState
    case "UPDATE_USER_VIDEOS":
      newState.userVideos = action.userVideos
      return newState
    case "ADD_USER_VIDEO":
      newState.userVideos.push(action.userVideo)
      return newState
    case "UPDATE_HOME_VIDEOS":
      newState.homeVideos = action.homeVideos
      return newState
    case "UPDATE_ALL_VIDEOS":
      newState.allVideos = action.allVideos
      return newState
    case "GO_BACK":
      newState.index = newState.index - 9
      return newState
    case "GO_FORWARD":
      newState.index = newState.index + 9
      return newState
    default:
      return state
  }
}
