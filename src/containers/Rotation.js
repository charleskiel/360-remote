import React from "react";
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
				return <tr className="rotationRow">
					<td><div  style={{ display: "inline - block" , fontSize: ".8em", padding: ".3em" }}><span className="label label-success btn btn-xs" onClick={() => this.props.status.commands.addToQueue(v.id)} >Q</span> <span className="label label-warning btn btn-xs" onClick={() => this.props.status.commands.addToPool(v.id)} >P</span></div></td>
					<td>{v.Artist}</td>
					<td>{v.Title}</td>
					<td>{v.Album}</td>
					<td>{v.Year}</td>
				</tr>
			})
		}
	}

	render() {
		return (<div>
				{
					this.props.status.videos.length > 0 &&
					
					<table style={{ width: "100%" }}>
					<thead>

						<tr className="rotationHeader">
							<td>Control</td>
							<td>Artist</td>
							<td>Title</td>
							<td>Album</td>
							<td>Year</td>
						</tr>
					</thead>
						<tbody>
							{this.getVideos(this.props.status.rotationSelections.data)} 
						</tbody>
					</table>
			}
			</div>
		);
	}
};

export default Rotation;
