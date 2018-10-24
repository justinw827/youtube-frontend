import React, { Component, Fragment } from 'react';
import CategoryList from './CategoryList';
import VideoList from './VideoList';
import Search from './Search';
import Adapter from '../Adapter';
import { connect } from 'react-redux';
import PageButton from './PageButton';

const API_KEY = "AIzaSyAqrNT30zUZprDAT5YoDqI89Rw4VI8ZBnA";

const getUrl = (term, maxResults) => (
  `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${term}&maxResults=${maxResults}&type=video&part=snippet&order=viewCount`
)

class Home extends Component {

  handleSearch = event => {
    // Get the input from the search bar
    let searchInput = event.target.value

    // Create URL endpoint with search input
    const url = getUrl(searchInput, 45)

    // Fetch from YouTube API with Adapater class method. Returns JSON object from promise
    Adapter.getVideos(url)
    .then(video => {
      // Update video array in Redux store with response from API
      this.props.updateAllVideos(video.items)
    })
  }

  componentDidMount() {
    // Create URL endpoint with an empty search for initial homepage load
    const url = getUrl("", 45)

    // Fetch from YouTube API with Adapater class method. Returns JSON object from promise
    Adapter.getVideos(url)
    .then(video => {
      // Update video array in Redux store with response from API
      this.props.updateAllVideos(video.items)
    })
  }

  // Event handler for Category buttons
  handleCategory = (event) => {
    // Make search term equal to the category name
    let term = event.target.innerText

    // Create URL endpoint with category name
    const url = getUrl(term, 45)

    // Fetch from YouTube API with Adapater class method. Returns JSON object from promise
    Adapter.getVideos(url)
    .then(video => {
      // Update video array in Redux store with response from API
      this.props.updateAllVideos(video.items)
    })
  }

  // @component Search - @handleSearch: Search bar handler
  // @component CategoryList - @handleCategory: Category list click handler.
  //                         - Contains Category components.
  // @component VideoList - @videos: Array of (9) video objects to render on homepage.
  //                      - Videos taken from Redux store based on page number.
  // @component PageButton - Buttons to handle previous and next page clicks
  render(){
    return (
      <Fragment>
        <h1 id="homepage-title">Really Cool App</h1>
        <br />
        <br />
        <Search handleSearch={this.handleSearch} />
        <br />
        <br />
        <br />
        <CategoryList handleCategory={this.handleCategory} />
        <br />
        <br />
        <VideoList videos={this.props.allVideos.slice(this.props.index, this.props.index+9)}/>
        <PageButton />
      </Fragment>
    )
  }
}

// Redux method to map Redux state to local component props
const mapStateToProps = (state) => {
  return {
    index: state.index,
    userId: state.userId,
    homeVideos: state.homeVideos,
    allVideos: state.allVideos
  }
}

// Redux method to dispatch local event handlers to Redux store
// @return returns (2) methods: updateHomeVideos(), updateAllVideos()
const mapDispatchToProps = (dispatch) => {
  return {
    // @param allVideos - array of videos to be rendered on homepage
    updateAllVideos(allVideos){
      const action = {
        type: 'UPDATE_ALL_VIDEOS',
        allVideos: allVideos
      }
      // Dispatch local action to Redux store
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
