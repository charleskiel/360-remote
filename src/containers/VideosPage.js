import React from "react";
import VideoLibrary from './VideoLibrary'
import Playlist from './Playlist'
import VideoSpecs from '../components/VideoSpecs'
import Controller from '../components/Controller'
class VideosPage extends React.Component {
  //start here with your code for step one
  state = {
    selectedVideo: null
  }


  goback = () => {
    this.setState({ selectedVideo: null })
  }


  showdetails = (Video) => {
    this.setState({ showdetails: true, selectedVideo: Video })
  }




  render() {
    console.log(this.state)
    return (
      <div>
        <VideoLibrary videos={this.props.videos} onClick={this.props.removeVideo} />
        {this.state.selectedVideo ? <VideoSpecs addVideo={this.props.addVideo} goback={this.goback} Video={this.state.selectedVideo} /> : <VideoLibrary Videos={this.props.videos} showdetails={this.showdetails} />} />
      </div>
    );
  }

}

export default VideosPage;
