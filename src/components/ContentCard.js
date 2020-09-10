import React from "react";
import { Button,Popover } from 'antd';
import "./ContentCard.scss";
import {MoreOutlined } from '@ant-design/icons';	
import Indicator from "./Indicator"
import moment from "moment"
import momentDurationFormatSetup from "moment-duration-format";
class ContentCard
  extends React.Component {

	render() {
	if (this.props.video) {
		//let cardtitle = `${this.props.video.Artist} - ${this.props.video.Title}`
		return (
			<div className="contentCard">
				<div style={{ float: "left" }}>
					<Popover
						placement="leftTop"
						title={"TITLE"}
						content={
							<Button size="small" onClick={() => this.props.status.commands.addToQueue(v.id)}>
								Q
							</Button>
						}
						trigger="click"
					>
						<MoreOutlined />
					</Popover>
					{this.props.video.Artist} - {this.props.video.Title}
				</div>
				{this.props.video.votes ?
					<div style={{ float: "right" }}>
						Votes {this.props.video.votes}
					</div> : <div></div>}
				
				<div style={{ float: "right" }}>
					<Indicator />
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
