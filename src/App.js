import "./App.scss";
import moment from "moment"
import React, { Component } from "react";
import VideoLibrary from "./containers/VideoLibrary";
import Playlist from './containers/Playlist'
import Rotation from './containers/Rotation'
import Sidebar from './containers/Sidebar'
import Controller from './components/Controller'
import Indicator from './components/Indicator'
//import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
//import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
//import remote from './components/Remote.js'
import { Row, Col, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
//import "antd/dist/antd.css";

class App extends Component {
	sessionId = "";
	nowplayingId = 0;
	packetcount = 0;
	casparpacketcount = 0;
	broadcastpacketcount = 0;
	controllerpacketcount = 0;

	state = {
		sessionId: this.sessionId,
		commandKey: this.commandKey,
		commandKeyStyle: "commandKeyStyle",
		regToken: "360B91708425",
		videos: [],
		playlist: [],
		broadcastStatus: {},
		broadcastListEvent: {},
		controllerTickStatus: {},
		commandResponses: [],
		serverStatus: {
			os: {
				type: "",
				endiannes: "",
				hostname: "",
				networkInterfaces: "",
				platform: "",
				release: "",
				totalmem: "",
			},
			system: {
				fremem: "",
				uptime: "",
				loadavg: "",
				uptime: "",
			},
		},

		packetcount: 0,

		commands: {
			addToQueue: (id) => {
				console.log(id)
				this.ws.send(
					JSON.stringify({
						messageType : "command",
						commandData: this.commandData(),
						data: {
							class: "broadcastList",
							command: "addToQueue",
							id: id
						},
					})
				);
			},
			addToPool: (id) => {
				this.ws.send(
					JSON.stringify({
						messageType : "command",
						commandData: this.commandData(),
						data: {
							class: "broadcastList",
							command: "addToPool",
							id: id
						},
					})
				);
			},
			deleteFromPool: (idx) => {
				this.ws.send(
					JSON.stringify({
						messageType : "command",
						commandData: this.commandData(),
						data: {
							class: "broadcastList",
							command: "deleteFromPool",
							idx: idx
						},
					})
				);
			},
			clear: () => {
				this.ws.send(
					JSON.stringify({
						messageType : "command",
						commandData: this.commandData(),
						data: {
							class: "broadcastList",
							command: "clear",
						},
					})
				);
			},
			rotate: () => {
				this.ws.send(
					JSON.stringify({
						messageType : "command",
						commandData: this.commandData(),
						data: {
							class: "broadcastList",
							command: "rotate",
						},
					})
				);
			},
			clearPool: () => {
				this.ws.send(
					JSON.stringify({
						messageType : "command",
						commandData: this.commandData(),
						data: {
							class: "broadcastList",
							command: "clearPool",
						},
					})
				);
			},
			swapSelection: (idx0, idx1) => {
				this.ws.send(
					JSON.stringify({
						messageType : "command",
						commandData: this.commandData(),
						data: {
							class: "broadcastList",
							command: "swapSelection",
							idx0: idx0,
							idx1: idx1,
						},
					})
				);
			},
		},
	};

	commandData = () => {
		return {
		datetime: Date.Now,
		regtoken: this.state.regToken,
		sessionId: this.state.sessionId,
		commandKey: this.state.commandKey}
	};

	ws = new WebSocket("wss://360tv.net:5001");

	componentDidMount() {
		fetch("https://www.360tv.net/data/_getvideos.php")
			.then((response) => response.json())
			.then((response) => {
				let videos = [];
				response.map((_video) => {
					videos[_video.id] = _video;
					videos[_video.id].status = { armed: false, queued: false, pooled: false, selected: false, playing: true };
				});

				this.setState({ videos: videos });
			})

			.catch((error) => {
				console.error("Error:", error);
			});

		this.ws.onopen = () => {
			console.log("Connected to Server ", event);
			this.ws.send(JSON.stringify({ messageType: "login", data: { role: "remote", datetime: Date.Now, regtoken: this.state.regToken, sessionId: this.state.sessionId } }));
			this.setInterval()
		};

		this.ws.onerror = () => {
			console.log("Error ", event);
		};

		this.ws.onclose = () => {
			console.log("Disconnected ", event);
		};

		// Listen for messages
		this.ws.onmessage = () => {
			//console.log('Message from server ', event.data);

			let msg = JSON.parse(event.data);
			//this.setState({ packetcount: (this.state.packetcount += 1) });

			switch (msg.messageType) {
				case "remote":
					this.ws.send(JSON.stringify({ messageType: "getStatus" }));
					break;
				case "commandResponse":
					this.setState ( prevState => {
						return {...prevState, ["commandResponses"] : [...prevState.commandResponses, msg]}
					})
					console.log(msg)
					this.alertCommandkey(msg.response)
					break;
				case "statusRefresh":
					//console.log(msg);
					if (msg.data.rotationSelections) this.setState({ rotationSelections: msg.data.rotationSelections });
					this.setState({ modePool: msg.data.modePool });
					this.setState({ modeSelections: msg.data.modeSelections });
					this.setState({ broadcastListEvent: msg.data.broadcastListEvent });
					this.setState({ serverStatus: msg.data.serverStatus });
					//console.log(this.state);
					break;
				case "serverStatus":
					//console.log(msg);
					if (msg.data.rotationSelections) this.setState({ rotationSelections: msg.data.rotationSelections });
					this.setState({ serverStatus: msg.data });
					//console.log(this.state);
					break;
				default:
					this.setState({ [msg.messageType]: { ...msg, timestamp: Date.now() } });
					//console.log(this.state)
			}
		};
	}

	setInterval = () => {

		
	}
	removevideo = (video) => {
		let _army = this.state.playlist.filter((item) => {
			return item !== video;
		});
		this.setState({ playlist: _army });
	};

	toHHMMSS = (time) => {
		var sec_num = parseInt(time, 10); // don't forget the second param
		var hours = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - hours * 3600) / 60);
		var seconds = sec_num - hours * 3600 - minutes * 60;

		if (hours < 10) {
			hours = "0" + hours;
		}
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		return hours + ":" + minutes + ":" + seconds;
	};

	setCommandkey = (e) => {
		console.log(e)
		this.setState({ commandKey: e.target.value }); 
		console.log(this.state)
	};

	alertCommandkey = (_status) => {
		console.log(_status)
		this.setState({ "commandKeyStyle": _status === "OK" ? "commandKeyStyleOK" : "commandKeyStyleERROR" })
		setTimeout(() => { this.setState({ "commandKeyStyle": "commandKeyStyle" }), 2000 })
	}
	

	render() {
		return (
			<div className="App">
				<div className="bg"></div>
				<Layout>
					<Header className="header">(360) Remote Control</Header>
					<Layout>
						<Sidebar {...this.state} setCommandkey={this.setCommandkey} />

						<Content>
							<Row style={{}}>
								<Col span={11} style={{ margin: ".5em" }}>
									<Controller status={this.state} toHHMMSS={this.toHHMMSS} />

									<VideoLibrary status={this.state} />
								</Col>
								<Col span={12} style={{ margin: ".5em" }}>
									<table style={{ width: "100%" }}>
										
										{this.state.videos ? (
											<tr>
												<td className="playlist">
													<small>Current queue.</small>
													<Playlist status={this.state} playlist={this.state.broadcastListEvent} height={200} />
													<div
														style={{
															display: "inline - block",
															position: "absolute",
															bottom: "0",
															width: "100%",
															height: "2.5rem",
														}}
													>
														<span
															style={{ display: "inline - block" }}
															className="label label-success btn btn-xs"
															onClick={() => this.state.commands.clear()}
														>
															Clear
														</span>
														<span
															style={{ display: "inline - block" }}
															className="label label-warning btn btn-xs"
															//onClick={() => this.state.commands.addToPool(row.id)}
														>
															Fill
														</span>
													</div>
												</td>

												<td className="playlist">
													<h5>Mode Selections</h5>
													<small>Selections for vote mode. Will auto select when no vote or not in vote mode.</small>

													<div>
														<Playlist status={this.state} playlist={this.state.modeSelections} height={120} />
														<h5>modePool</h5>
														<span
															style={{ display: "inline - block" }}
															className="label label-success btn btn-xs"
															onClick={() => this.state.commands.clearPool()}
														>
															Clear
														</span>
														<Playlist status={this.state} playlist={this.state.modePool} height={120} />
													</div>
												</td>
											</tr>
										) : (
											<div></div>
										)}
									</table>
									{this.state.rotationSelections ? <Rotation status={this.state} /> : <div></div>}
								</Col>
							</Row>
							<Footer>Footer</Footer>
						</Content>
					</Layout>
				</Layout>
			</div>
		);
	}
}

export default App;
