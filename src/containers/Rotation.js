import React from "react";
import {Button, List } from "antd";

import ContentCard from "../components/ContentCard";
class Rotation extends React.Component {


	state = { className: "" }
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.indicator != this.props.indicator) {
			this.setState({ className: this.props.type === "square" ? "squareIndicator-on" : "indicator-on" })
			setTimeout(() => { this.setState({ className: this.props.type === "square" ? "squareIndicator-off" : "indicator-off" }), 10000 })
		}
	}

	getVideos = (_list) => {
		if (this.props.status.videos) {
			return _list.map(_video => {
				let v = this.props.status.videos[_video]
				return <div className="rotationRow">
					<Button size="small" onClick={() => this.props.status.commands.addToQueue(v.id)} >Q</Button>
					<Button size="small" onClick={() => this.props.status.commands.addToPool(v.id)} >P</Button>
					<span className="artist">{v.Artist}</span>
					<span className="title">{v.Title}</span>
					<span className="album">{v.Album}</span>
					<span className="year">{v.Year}</span>
				</div>
			})
		}
	}

	render() {
		return (
			<div className="rotation">
				<h4>Rotation</h4>

				{this.props.status.videos.length > 0 && (
					// <table className="rotationTable">
					// 	<thead>
					// 		<tr className="rotationHeader">
					// 			<td>Control</td>
					// 			<td>Artist</td>
					// 			<td>Title</td>
					// 			<td>Album</td>
					// 			<td>Year</td>
					// 		</tr>
					// 	</thead>
					// 	<tbody>{this.getVideos(this.props.status.rotationSelections.data)}</tbody>
					// </table>

					<List
						pagination={{
							onChange: (page) => {
								console.log(page);
							},
							pageSize: 10,
							position: "bottom",
							size: "small",
							hideOnSinglePage: true,
						}}
						header={
							<div style={{height: "1.5em"}}>
								<div style={{ float: "left" }}>Rotation</div>
								<div style={{ float: "right" }}>
									<Button onClick={() => this.props.status.commands.rotate()} size="small">
										Rotate
									</Button>
								</div>
							</div>
						}
						footer={
							<div style={{ float: "right" }}>
							</div>
						}
						size="small"
						dataSource={this.getVideos(this.props.status.rotationSelections.data)}
						renderItem={(item) => <div>{item}</div>}
					/>
				)}
			</div>
		);
	}
};

export default Rotation;
