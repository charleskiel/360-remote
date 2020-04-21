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
			dataField: 'df1', isDummyField: true, text: 'Action',
			formatter: (cellContent, row) => { return (<h5><span className="label label-success btn btn-xs" onClick={() => this.props.addvideo(row.id)} >PLAY</span></h5>); }
		},
		{ dataField: 'id', text: 'ID', sort: true },
		{ dataField: 'Artist', text: 'Artist', filter: textFilter(), sort: true },
		{ dataField: 'Title', text: 'Title', filter: textFilter(), sort: true },
		{ dataField: 'Year', text: 'Year', filter: textFilter(), sort: true }
	];
	componentWillMount() {

	}

	//your code here
	// getvideos = () => {
	// 	if (this.props.videos) {
	// 		//debugger
	// 		return this.props.videos.map(_video => {
	// 			return <VideoCard video={_video} onClick={this.props.showdetails} />
	// 		})
	// 	}
	// }

	render() {
		return (
			<div>

				<div className="library">
					<h1>Collection of all videos</h1>
					{this.props.videos.length > 0 &&

						<BootstrapTable
							keyField='id'
							data={this.props.videos}
							columns={this.columns}
							filter={filterFactory()}
							caption={`${this.props.videos.length} Videos Available`}
							BootstrapTable={false}
							pagination={paginationFactory({
								sizePerPage: 20,
								sizePerPageList: [{
									text: '5th', value: 5
								}, {
									text: '10th', value: 10
								}, {
									text: 'All', value: this.props.videos.length
								}]
							})}
						/>}
				</div>

			</div>
		);
	}

};

export default VideoLibrary;
