import React, { Component, Fragment } from 'react';
import { Card } from 'semantic-ui-react';

import Video from './Video'

const VideoList = ({videos, handleLike}) => {

  return (
    <Fragment>
      <Card.Group id="videos" itemsPerRow={3}>
        {videos.map(video => <Video key={video.etag} video={video}/>)}
      </Card.Group>
    </Fragment>
  )
}

export default VideoList
