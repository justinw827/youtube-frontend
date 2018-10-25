import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react'

import Adapter from '../Adapter'

const Login = (props) => {

  if(props.userId > 0){
    return <Redirect to="/profile" />
  }

  return (
    <Fragment>
      <div id="form-container">
        <div id="login-div">
          <h1>Login</h1>
          <Form id="login-form" onSubmit={props.handleLogin}>
          <Form.Field>
           <label>
             Username:
             <input type="text" name="username" />
           </label>
           </Form.Field>
           <Form.Field>
           <label>
            Password:
            <input type="password" name="password" />
           </label>
           </Form.Field>
           <Button type="submit" value="Submit" color='youtube'>Login</Button>
          </Form>
        </div>

        <div id="signup-div">
          <h1>Sign Up</h1>
          <Form id="signup-form" onSubmit={props.handleSignup}>
          <Form.Field>
           <label>
             Username:
             <input type="text" name="username" />
           </label>
           </Form.Field>
           <Form.Field>
           <label>
            Password:
            <input type="password" name="password" />
           </label>
           <br />
           <Button type="submit" value="Submit" color='youtube'>Sign Up</Button>
           </Form.Field>
          </Form>
        </div>
      </div>
    </Fragment>
  )
}

// Helper function to create a CHANGE_CURRENT_USER action object
const setCurrentUser = (id, username) => {
  return {
    type: 'CHANGE_CURRENT_USER',
    user_id: id,
    username: username
  }
}

// Helper funciton to create an UPDATE_ALL_VIDEOS action object
const setUserVideos = (videos) => {
  return {
    type: "UPDATE_USER_VIDEOS",
    userVideos: videos
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // Login handler added to Login component's props
    handleLogin(event) {
      event.preventDefault()
      const username = event.target.username.value
      const password = event.target.password.value

      function formatVideos(videos) {
        return videos.map(video => {
          return {id: {videoId: video.video_id}, snippet: {title: video.name, description: video.description, publishedAt: "todayT"}}
        })
      }

      const url = "http://localhost:3001/api/v1/user/login"
      const fetchBody = {
        user: {
          username: username,
          password: password
        }}

      // Send post to backend with user input
      // Returns user JSON object on successful login
      return Adapter.fetchPost(url, fetchBody)
        .then(userData => {
          if (userData.user.username) {
            // Set the current user in Redux to returned user obj
            const action1 = setCurrentUser(userData.user.id, userData.user.username)
            // Set the current user's video list in Redux to videos sent from backend
            const action2 = setUserVideos(formatVideos(userData.videos))
            // Dispatch both actions to Redux
            dispatch(action1);
            dispatch(action2);
          } else {
            alert("Incorrect Username or Password")
          }
        })
        .then(event.target.reset()) // Reset input fields
    },
    // Sign up handler added to Login component's props
    handleSignup(event) {
      event.preventDefault()
      const username = event.target.username.value
      const password = event.target.password.value

      const url = "http://localhost:3001/api/v1/user/signup"
      const fetchBody = {
        user: {
            username: username,
            password: password
        }}

      Adapter.fetchPost(url, fetchBody)
      .then(userData => {
        if (userData.username) {
          // Set the current user in Redux to returned user obj
          const action1 = setCurrentUser(userData.id, userData.username)
          // Set the current user's video list in Redux to videos sent from backend
          const action2 = setUserVideos([])
          // Dispatch both actions to Redux
          dispatch(action1);
          dispatch(action2);
        } else {
          alert("Username already taken")
        }
      })
      .then(event.target.reset()) // Reset input fields
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
