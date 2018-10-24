import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image, Button, Label } from 'semantic-ui-react';

import Adapter from '../Adapter';

class Video extends Component {

    state = {
      likes: 0,
      btnColor: ""
    }

  componentDidMount() {
    Adapter.getLocalVideoLikes(this.props.video.id.videoId)
    .then(likeData => {
      this.setState({
        likes: likeData.likes
      })
    })
  }

  handleLike = () => {
    if (this.props.userId < 0) {
      alert("Please signin to like videos")
    } else if (this.props.userVideos.find(video => video.id.videoId == this.props.video.id.videoId)){
      alert("You aleady liked this video")
    } else {
      const url = "http://localhost:3001/api/v1/videos/like"
      const fetchBody = {
        video: {
          name: this.props.video.snippet.title,
          description: this.props.video.snippet.description,
          video_id: this.props.video.id.videoId
        },
        like: {
          user_id: this.props.userId
        }
      }

      Adapter.fetchPost(url, fetchBody)
      .then(likes => {
        this.setState({
          likes: likes.length,
          btnColor: "red"
        })
        this.props.addUserVideo(this.props.video)
      })
    }
  }

  render() {
    const {video, handleLike} = this.props
    const videoId = video.id.videoId;
    const videoUrl = `http://www.youtube.com/embed/${videoId}`;

    const time = video.snippet.publishedAt.split("T")[0]

    return (
        <Card>
        <iframe src={videoUrl} frameBorder="0" allowFullScreen></iframe>
        <Card.Content>
          <Card.Header>{video.snippet.title}</Card.Header>
          <Card.Meta>
            <span className='date'>Published at: {time}</span>
          </Card.Meta>
          <Card.Description>{video.snippet.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button as='div' labelPosition='right'>
           <Button color={this.state.btnColor} onClick={this.handleLike} icon>
             <Icon name='fire' />
             Like
           </Button>
           <Label as='a' basic pointing='left'>
            {this.state.likes}
           </Label>
         </Button>
        </Card.Content>
      </Card>
    )
  } // end render
} // end class


const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    userVideos: state.userVideos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUserVideo(userVideo){
      const action = {
        type: 'ADD_USER_VIDEO',
        userVideo: userVideo
      }
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
