import React from "react";
import VideoCard from "../components/ContentCard";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';

class VideoLibrary extends React.Component {

	state = {}
	columns = [
		{
			dataField: 'df1', isDummyField: true, text: 'Control', style: { width: "70px" },
			formatter: (cellContent, row) => { return (<div style={{ display: "inline - block" }}><span style={{ display: "inline - block" }} className="label label-success btn btn-xs" onClick={() => this.props.status.commands.addToQueue(row.id)} >Q</span> <span style={{ display: "inline - block"}} className="label label-warning btn btn-xs" onClick={() => this.props.status.commands.addToPool(row.id)} >P</span></div>); }
		},
		{ dataField: 'id', text: 'ID', sort: true, style: { width: "4em" } },
		{ dataField: 'Artist', text: 'Artist', filter: textFilter(), sort: true, style: { width: "30%" } },
		{ dataField: 'Title', text: 'Title', filter: textFilter(), sort: true } ,
		{ dataField: 'Year', text: 'Year', filter: textFilter({ width: "4em" }), sort: true, style: { width: "35px" } }];
	
	componentWillMount() {}

	render() {
		return (
			<div>

				<div className="library">
					<h4>Library</h4>
					{this.props.status.videos.length.toString()} videos in library.
					{this.props.status.videos.length > 0 &&

						<BootstrapTable
							keyField='id'
							data={this.props.status.videos.filter(video => {if (video.Artist && video.Artist !== "") {return true}})}
						columns={this.columns}
						
							filter={filterFactory()}
							caption={`${this.props.status.videos.length} Videos Available`}
							BootstrapTable={false}
							rowStyle={{ lineHeight: ".6em", margin: "3px", backgroundColor: "rgb(240, 242, 245)", borderColor : "black", fontSize : ".8em"}}
							pagination={paginationFactory({
								sizePerPage: 30,
								sizePerPageList: [{
									text: '5th', value: 5
								}, {
									text: '10th', value: 10
								}, {
									text: 'All', value: this.props.status.videos.length
								}]
							})}
						/>}
				</div>

			</div>
		);
	}

};

export default VideoLibrary;
