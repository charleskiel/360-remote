import React from "react";
import Indicator from "../components/Indicator"
import moment from "moment"

import { Layout } from 'antd';
const { Sider } = Layout;

class Sidebar
  	extends React.Component {

	render(){ 
		return (<Sider>
			Viewers:
			<p>{this.props.broadcastStatus.timestamp ? <Indicator indicator={this.props.broadcastStatus.timestamp} type="square" /> : <span></span>}Broadcast Status</p>
			<p>{this.props.controllerTickStatus.timestamp ? <Indicator indicator={this.props.controllerTickStatus.timestamp} type="square" /> : <span></span>}Controller</p>
			<h5 style={{ color: "inherit" }}>Server Stats</h5>
			<table>
				<tr>
					<td style={{ width: "60pc" }}>Server Time:</td>
					<td style={{ width: "40pc", textAlign: "right" }}>{moment.unix(parseInt(this.props.serverStatus.system.epoch / 1000)).format("LTS")}</td>
				</tr>
				<tr>
					<td style={{ width: "60pc" }}>Uptime:</td>
					<td style={{ width: "40pc", textAlign: "right" }}>{moment.duration(parseInt(this.props.serverStatus.system.uptime), "seconds").format("hh:mm:ss")}</td>
				</tr>
				<tr>
					<td style={{ width: "60pc" }}>Total Mem:</td>
					<td style={{ width: "40pc", textAlign: "right" }}>{this.props.serverStatus.system.totalmem}</td>
				</tr>
				<tr>
					<td style={{ width: "60pc" }}>Free Mem:</td>
					<td style={{ width: "40pc", textAlign: "right" }}>{this.props.serverStatus.system.fremem}</td>
				</tr>
				<tr>
					<td style={{ width: "60pc" }}>Avg Load 1m:</td>
					<td style={{ width: "40pc", textAlign: "right" }}>{Math.round(this.props.serverStatus.system.loadavg[0] * 100)}%</td>
				</tr>
				<tr>
					<td style={{ width: "60pc" }}>Avg Load 5m:</td>
					<td style={{ width: "40pc", textAlign: "right" }}>{Math.round(this.props.serverStatus.system.loadavg[1] * 100)}%</td>
				</tr>
				<tr>
					<td style={{ width: "60pc" }}>Avg Load 15m:</td>
					<td style={{ width: "40pc", textAlign: "right" }}>{Math.round(this.props.serverStatus.system.loadavg[2] * 100)}%</td>
				</tr>
			</table>
			<small>Enter "360" into the box below to control.</small>
			<input id="commandKey" ref="commandKey" onChange={(evt) => this.props.setCommandkey(evt)} className={this.props.commandKeyStyle}></input>
		</Sider>
		)
		
	}
}
export default Sidebar