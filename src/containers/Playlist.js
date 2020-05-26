import React from "react";
import ContentCard from "../components/ContentCard";
import { List, Typography, Divider } from 'antd';
class Playlist extends React.Component {
  	//your Video videos code here...


	getVideos = (_list) => {
		//console.log(this.props.status)
		if (this.props.status.broadcastListEvent) {
			//console.log(`broadcastListEvent ${this.props.status.broadcastListEvent}`)
		}
		if (this.props.status.broadcastListEvent.list) {
			//console.log(`broadcastListEvent ${this.props.status.broadcastListEvent.list}`)
		
			return _list.map(_video => {
				return <ContentCard video={this.props.status.videos[_video]} onClick={this.props.onClick} />
			})
		}
	}

	render() {
		//console.log(this.props.playlist)
		if (this.props.playlist)
		{
			return (
				this.props.playlist ? <div>{this.getVideos(this.props.playlist.list)}</div> : <div></div>
			);
		}
		else
		{
			return (
				<div></div>
			)
		}
			
	}

};

export default Playlist;
