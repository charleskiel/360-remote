import React from "react";
import { Progress, Tabs } from 'antd'

const { TabPane } = Tabs;
class Controller extends React.Component {
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
	//console.log(this.props)
	return (


		<div >
		{this.props.status.videos.length > 0 &&

		<Tabs defaultActiveKey="1"
			className={"controller"}>
			<TabPane tab="Playing" key="1">
				{/* <div style={{ float: "left", padding: "1em" }}>
				<Progress
					type="circle"
					strokeColor={{
					'0%': '#108ee9',
					'100%': '#87d068',
					}}
					status="active"
					width={75}
					strokeWidth={2}
					percent={this.props.status.controllerStatus.frame / this.props.status.controllerStatus.frames * 100}
					/>
				</div> */}
				{this.props.status.controllerTickStatus.contentType === "MusicVideo" && <h4>{`${this.props.status.videos[this.props.status.controllerTickStatus.contentId].Artist} - ${this.props.status.videos[this.props.status.controllerTickStatus.contentId].Title}` }</h4>}
				<Progress showinfo={"false"} size="small" percent={(this.props.status.controllerTickStatus.frame / this.props.status.controllerTickStatus.frames) * 100} />

				<p className={"text-main text-semibold"}>{this.props.toHHMMSS(this.props.status.controllerTickStatus.time)}</p>

				<p><span className="label label-success">{this.props.status.controllerTickStatus.contentType}</span></p>
			</TabPane>



			{this.props.status.controllerTickStatus.contentType === "MusicVideo" &&			
				<TabPane tab="Details" key="2">
					<h5>{`${this.props.status.videos[this.props.status.controllerTickStatus.contentId].Artist} - ${this.props.status.videos[this.props.status.controllerTickStatus.contentId].Title}` }</h5>
						<small>
							<p>{this.props.status.videos[this.props.status.controllerTickStatus.contentId].Artist}</p>
							<p>{this.props.status.videos[this.props.status.controllerTickStatus.contentId].Title} {this.props.status.videos[this.props.status.controllerTickStatus.contentId].AltTitle && ` (${this.props.status.videos[this.props.status.controllerTickStatus.contentId].AltTitle})`}</p>
							<p>{this.props.status.videos[this.props.status.controllerTickStatus.contentId].Album}</p>
							<p>{this.props.status.videos[this.props.status.controllerTickStatus.contentId].Label} ({this.props.status.videos[this.props.status.controllerTickStatus.contentId].Year})</p>
							<p>Director: {this.props.status.videos[this.props.status.controllerTickStatus.contentId].Director}</p>
						</small>
				</TabPane>
			}
			<TabPane tab="Tab 3" key="3">
				{this.props.status.controllerTickStatus.contentId}
			</TabPane>
		</Tabs>
	}
	</div>

	);

}}

export default Controller;
