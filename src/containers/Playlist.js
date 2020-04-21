import React from "react";
import ContentCard from "../components/ContentCard";
import { List, Typography, Divider } from 'antd';
class Playlist extends React.Component {
  //your Video videos code here...


  getVideos = () => {
    console.log(this.props)
    if (this.props.playlist.currentPlaylist) {
      return this.props.playlist.currentPlaylist.map(_video => {
        return <ContentCard video={this.props.videos.get(_video.split(".")[0])} onClick={this.props.onClick} />
      })
    }
  }

  render() {
    return (

      <List
        size="small"
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={this.props.playlist.currentPlaylist}
        renderItem={item => <List.Item>{item.Artist} - {item.Title}</List.Item>}
      />
    );
  }

};

export default Playlist;
