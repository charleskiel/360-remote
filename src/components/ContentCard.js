import React from "react";
import { Card as div, Row, Col, Layout } from 'antd';
import "../App.css";
import moment from "moment"
import momentDurationFormatSetup from "moment-duration-format";
class ContentCard
  extends React.Component {

	render() {
	if (this.props.video) {
		//let cardtitle = `${this.props.video.Artist} - ${this.props.video.Title}`
		//if (this.props.video.contentType === "MusicVideo") {
		return (
			<div className="contentCard" >
				<div style={{ float: "left" }} >{this.props.video.Artist} - {this.props.video.Title} 
				</div>
				<div style={{ float: "right" }}>
				{moment.duration(parseInt(this.props.video.TRT), "seconds").format("mm:ss")}
				</div>
			</div>
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

export default ContentCard
