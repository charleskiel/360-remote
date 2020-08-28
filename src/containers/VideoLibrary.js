import React from "react";
import VideoCard from "../components/ContentCard";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';

//import "./../dataTables.bootstrap.css";
//import "./../responsive.dataTables.min.css";
//
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Progress, Tabs } from 'antd'

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

	responseList = (_list) => {

		return _list.map((_response) => {
			return <p>
				{_response.response === "OK" ? 
					<span style={{backgroundColor : "green"}} >{_response.response}</span>
					:<span style={{backgroundColor : "red"}} >{_response.response}</span>
				} : {_response.commandResponse} {_response.command} {_response.class}
					</p>;
		});
	
}
	render() {
		return (
			<div className={"library"}>
				<Tabs defaultActiveKey="1">
					<Tabs.TabPane tab="Playing" key="1">

						<div>
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
					</Tabs.TabPane>
					<Tabs.TabPane tab="Caspar" key="2">
						{this.props.status.controllerTickStatus.contentId}
					</Tabs.TabPane>
					<Tabs.TabPane tab="Command log" key="3">
						{this.props.status.commandResponses.length > 0 ? <div>{this.responseList(this.props.status.commandResponses)}</div> : <div></div>}
					</Tabs.TabPane>
				</Tabs>
			</div>
		);
	}

};

export default VideoLibrary;
