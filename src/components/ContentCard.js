import React from "react";
import { Card, Row, Col, Layout } from 'antd';

class ContentCard
  extends React.Component {

	render() {
	//console.log(this.props)
	
	if (this.props.video) {
		let cardtitle = `${this.props.video.Artist} - ${this.props.video.Title}`
		//if (this.props.video.contentType ==="MusicVideo")
		return (
		<Card 
			size="small" 
			style={{ 
				"width": 400,
				"padding": "1px",
				"margin" : ".2em",
				"background" : "#aaa" 
				}} 
			className="contentCard">
			{this.props.video.Artist} - {this.props.video.Title} 
			<small>00:00:00</small>


		</Card>
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
  ;



// by reference & by value
//closures
//hashtables

// function deleteRow(rowId) {
//   console.log('clicked', name);
//   return 'done';
// }

// forEach(row in rows) {
//   <button onClick={() => deleteRow(row.id)} value="Click Me" />
// }

