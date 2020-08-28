import React from "react";
import Indicator from "./Indicator"
import { Progress, Tabs,Button } from 'antd'
import Icon from "@ant-design/icons/lib/components/Icon";
import "./Controller.scss";
//import videojs from "video.js";
//import "video.js/dist/video-js.css";

import { MoreOutlined } from '@ant-design/icons';


    
const { TabPane } = Tabs;
class Controller extends React.Component {
	//start here with your code for step one
	videoJsOptions = {
		autoplay: true,
		controls: true,
		sources: [
			{
				src: "http://stream.360tv.net:8080/live/360/index.m3u8",
				type: "application/x-mpegURL",
			},
		],
	};

	startVideo(video) {
		videojs(video);
    	}

	componentDidMount = () => {
		    this.player = videojs(this.videoNode, this.videoJsOptions, function onPlayerReady() {
				console.log("Video.js Ready", this);
			});
	}


	state = {
		selectedVideo: null,
	};

	goback = () => {
		this.setState({ selectedVideo: null });
	};

	showdetails = (Video) => {
		this.setState({ showdetails: true, selectedVideo: Video });
	};

	render() {
		return (
			<div>
				{this.props.status.videos.length > 0 && (
					<Tabs defaultActiveKey="1" className={"controller"}>
						<TabPane tab="Playing" key="1">
							<div style={{ float: "left", padding: "1em" }}>
								<Progress
									type="circle"
									strokeColor={{
										"0%": "#1000e9",
										"100%": "#FF0000",
									}}
									status="active"
									width={75}
									strokeWidth={4}
									percent={Math.round((this.props.status.controllerTickStatus.frame / this.props.status.controllerTickStatus.frames) * 100)}
								/>
							</div>
							{this.props.status.controllerTickStatus.contentType === "MusicVideo" && (
								<h4>{`${this.props.status.videos[this.props.status.controllerTickStatus.contentId].Artist} - ${
									this.props.status.videos[this.props.status.controllerTickStatus.contentId].Title
								}`}</h4>
							)}
							{/* <Progress showinfo={"false"} size="small" percent={Math.round((this.props.status.controllerTickStatus.frame / this.props.status.controllerTickStatus.frames) * 100)} /> */}

							<p className={"text-main text-semibold"}>{this.props.toHHMMSS(this.props.status.controllerTickStatus.time)}</p>
							<p>
								<Indicator indicator={this.props.status.controllerTickStatus.timestamp} type="square" />
								<span className="label label-success">{this.props.status.controllerTickStatus.contentType}</span>
							</p>
							<table>
								<tr>
									<td>
										<Indicator />{" "}
									</td>
								</tr>
								<tr>
									<Button ghost size="small">
										<MoreOutlined />
									</Button>
								</tr>
							</table>
							<video
								ref={(node) => (this.videoNode = node)}
								id="my-video"
								class="video-js"
								controls
								preload="auto"
								width="640"
								height="264"
								poster="../images/Image1.png"
								data-setup="{}"
							>
								{/* 
							<p class="vjs-no-js">
								To view this video please enable JavaScript, and consider upgrading to a
								web browser that
								<a href="https://videojs.com/html5-video-support/" target="_blank"
								>supports HTML5 video</a
								>
							</p> */}
							</video>
						</TabPane>

						{this.props.status.controllerTickStatus.contentType === "MusicVideo" && (
							<TabPane tab="Details" key="2">
								<h2>{`${this.props.status.videos[this.props.status.controllerTickStatus.contentId].Artist} - ${
									this.props.status.videos[this.props.status.controllerTickStatus.contentId].Title
								}`}</h2>
								<small>
									<p>{this.props.status.videos[this.props.status.controllerTickStatus.contentId].Artist}</p>
									<p>
										&quot;{this.props.status.videos[this.props.status.controllerTickStatus.contentId].Title}&quot;{" "}
										{this.props.status.videos[this.props.status.controllerTickStatus.contentId].AltTitle &&
											` (${this.props.status.videos[this.props.status.controllerTickStatus.contentId].AltTitle})`}
									</p>
									<p>{this.props.status.videos[this.props.status.controllerTickStatus.contentId].Album}</p>
									<p>
										{this.props.status.videos[this.props.status.controllerTickStatus.contentId].Label} (
										{this.props.status.videos[this.props.status.controllerTickStatus.contentId].Year})
									</p>
									<p>Director: {this.props.status.videos[this.props.status.controllerTickStatus.contentId].Director}</p>
								</small>
							</TabPane>
						)}
						<TabPane tab="Tab 3" key="3">
							{this.props.status.controllerTickStatus.contentId}
						</TabPane>
					</Tabs>
				)}
			</div>
		);
	}
}

export default Controller;
