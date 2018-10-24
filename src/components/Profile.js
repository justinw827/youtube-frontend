import React, { Component, Fragment } from 'react';
import Adapter from '../Adapter';
import VideoList from './VideoList'
import { connect } from 'react-redux';

class Profile extends Component {

  render() {
    let tags = <p></p>

    if (this.props.userId < 0) {
      tags = <h2>Login to see your videos</h2>
    } else if (this.props.userVideos.length > 0) {
      tags = <Fragment><h1>My Videos</h1><VideoList videos={this.props.userVideos} /></Fragment>
    } else {
      tags = <h2>No Videos</h2>
    }


    return (
      <Fragment>
        <h1 id="profile-name">{this.props.username}</h1>
        {tags}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    userVideos: state.userVideos,
    username: state.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserVideos(userVideos){
      const action = {
        type: 'UPDATE_USER_VIDEOS',
        userVideos: userVideos
      }
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
