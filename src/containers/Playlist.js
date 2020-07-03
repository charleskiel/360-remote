import React from "react";
import ContentCard from "../components/ContentCard";
import { List, Typography, Divider } from 'antd';
class Playlist extends React.Component {
  	//your Video videos code here...


	getVideos = (_list) => {

			return _list.map((_video) => {
				return <ContentCard key={_video} video={this.props.status.videos[_video]} onClick={this.props.onClick} />;
			});
		
	}

	render() {
		//console.log(this.props.playlist)
		if (this.props.playlist)
		{
			return (
				this.props.playlist.list ?
					<div style={{ height: `${this.props.cellHeight}px` }}>
					{this.getVideos(this.props.playlist.list)}</div> : <div>[EMPTY]</div>
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
