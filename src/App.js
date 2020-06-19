import "./App.css";
import moment from "moment"
import React, { Component } from "react";
import VideoLibrary from "./containers/VideoLibrary";
import Playlist from './containers/Playlist'
import Rotation from './containers/Rotation'
import Controller from './components/Controller'
//import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
//import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
//import remote from './components/Remote.js'
import { Statistic, Row, Col, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
//import "antd/dist/antd.css";

class App extends Component {

	sessionId = ""
	nowplayingId = 0
	packetcount = 0
	casparpacketcount = 0
	broadcastpacketcount = 0
	controllerpacketcount = 0


	state = {
		regToken: "360B91708425",
		videos: [],
		playlist: [],
		broadcastStatus: {},
		broadcastListEvent: {},
		controllerTickStatus: {},
		serverStatus: {
			os: {
				type: "",
				endiannes: "",
				hostname: "",
				networkInterfaces: "",
				platform: "",
				release: "",
				totalmem: ""
			},
			system: {
				fremem: "",
				uptime: "",
				loadavg: "",
				uptime: ""

			}},

		packetcount: 0,

		commands: {
			addToQueue: (videoId) => {
				this.ws.send(JSON.stringify({
					messageType: "command",
					data: {
						class: "broadcastList",
						command: "addToQueue",
						datetime: Date.Now,
						regtoken: this.regToken,
						sessionId: this.sessionId,
						id: videoId
					}
				}))
			},
			addToPool: (videoId) => {
				this.ws.send(JSON.stringify({
					messageType: "command",
					data: {
						class: "broadcastList",
						command: "addToPool",
						datetime: Date.Now,
						regtoken: this.regToken,
						sessionId: this.sessionId,
						id: videoId
					}
				}))
			},
			deleteFromPool: (idx) => {
				this.ws.send(JSON.stringify({
					messageType: "command",
					data: {
						class: "broadcastList",
						command: "deleteFromPool",
						datetime: Date.Now,
						regtoken: this.regToken,
						sessionId: this.sessionId,
						id: idx
					}
				}))
			},
			clearPool: () => {
				this.ws.send(JSON.stringify({
					messageType: "command",
					data: {
						class: "broadcastList",
						command: "clearPool",
						datetime: Date.Now,
						regtoken: this.regToken,
						sessionId: this.sessionId
					}
				}))
			},
			swapSelection: (idx0, idx1) => {
				this.ws.send(JSON.stringify({
					messageType: "command",
					data: {
						class: "broadcastList",
						command: "swapSelection",
						datetime: Date.Now,
						regtoken: this.regToken,
						sessionId: this.sessionId,
						idx0: idx0,
						idx1: idx1
					}
				}))
			}
		}
	}


	ws = new WebSocket('wss://360tv.net:5001');


	componentDidMount() {
		fetch('https://www.360tv.net/data/_getvideos.php')
			.then(response => response.json())
			.then(response => {

				let videos = []
				response.map(_video => {
					videos[_video.id] = _video
				})

				this.setState({ videos: videos })
			})

			.catch((error) => {
				console.error('Error:', error);
			})


		this.ws.onopen = () => {
			console.log('Connected to Server ', event);
			this.ws.send(JSON.stringify({ "messageType": "login", "data": { "role": "remote", "datetime": Date.Now, "regtoken": this.state.regToken, "sessionId": this.state.sessionId } }))
		}

		this.ws.onerror = () => {
			console.log('Error ', event)
		}

		this.ws.onclose = () => {
			console.log('Disconnected ', event)
		}


		// Listen for messages
		this.ws.onmessage = () => {
			//console.log('Message from server ', event.data);
			let msg = JSON.parse(event.data)

			this.setState({ packetcount: this.state.packetcount += 1 })
			//console.log(msg)

			if (msg.role === "remote") {
				console.log("getting Status")
				this.ws.send(JSON.stringify({ "messageType": "getStatus" }))

			}
			else if (msg.messageType === "statusRefresh") {
				console.log("Got Status:",msg)
				this.setState({ ...this.state, ...msg.data })

			}
			else if (msg.messageType === "controllerTickStatus") {
				this.setState({ [msg.messageType]: msg })
			}
			else if (msg.messageType === "rotationSelections") {

				this.setState({ [msg.messageType]: msg })
				console.log(msg)
				console.log(this.state)
			}
			else {
				console.log(msg)
				this.setState({ [msg.messageType]: msg })
			}

			// if (msg.messageType === "systemStatus") { }
			// if (msg.messageType === "serverStatus") { }
			// if (msg.messageType === "userStatus") { }
			// if (msg.messageType === "streamStatus") { }

			// if (msg.messageType === "broadcastStatus") {
			//   //broadcastpacketcount += 1
			// }

			// if (msg.messageType === "casparStatus") {
			// }
			// if (msg.messageType === "broadcastListEvent") {
			//   this.setState({ broadcastList: msg })
			// }

			//this.setState({ [msg.messageType]: msg })

			//console.log(this.state)

		}

	}




	removevideo = (video) => {
		let _army = this.state.playlist.filter(item => {
			return item !== video
		})
		this.setState({ playlist: _army })
	}


	toHHMMSS = (time) => {
		var sec_num = parseInt(time, 10); // don't forget the second param
		var hours = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);

		if (hours < 10) { hours = "0" + hours; }
		if (minutes < 10) { minutes = "0" + minutes; }
		if (seconds < 10) { seconds = "0" + seconds; }
		return hours + ':' + minutes + ':' + seconds;
	}



	style = {
		statistic: {
			color: "white"
		}
	}


	render() {
		return (
			<div className="App">

				<Layout>

					<Header className="header">(360) Remote Control</Header>
					<Layout>
						<Sider style={{ color: "white", padding: ".5em" }}>
							<h5 style={{color: "inherit"}}>Broadcast Stats</h5>
							<table>
								<tr>
									<td style={{ width: "60pc" }}>Viewers:</td>
									<td style={{ width: "40pc" }}>0</td>
								</tr>
							</table>
							<h5 style={{color: "inherit"}}>Server Stats</h5>
							<table>
								<tr>
									<td style={{ width: "60pc"}}>Server Time:</td>
									<td style={{ width: "40pc", textAlign: "right" }}>{moment.unix(parseInt(this.state.serverStatus.system.epoch /1000)).format("LTS")}</td>
								</tr>
								<tr>
									<td style={{ width: "60pc"}}>Uptime:</td>
									<td style={{ width: "40pc", textAlign: "right" }}>{moment.duration(parseInt(this.state.serverStatus.system.uptime), "seconds").format("dd days hh:mm:ss")}</td>
								</tr>
								<tr>
									<td style={{ width: "60pc" }}>Total Mem:</td>
									<td style={{ width: "40pc", textAlign: "right" }}>{this.state.serverStatus.system.totalmem}</td>
								</tr>
								<tr>
									<td style={{ width: "60pc" }}>Free Mem:</td>
									<td style={{ width: "40pc", textAlign: "right" }}>{this.state.serverStatus.system.fremem}</td>
								</tr>
								<tr>
									<td style={{ width: "60pc" }}>Avg Load 1m:</td>
									<td style={{ width: "40pc", textAlign: "right" }}>{this.state.serverStatus.system.loadavg[0]}</td>
								</tr>
								<tr>
									<td style={{ width: "60pc" }}>Avg Load 5m:</td>
									<td style={{ width: "40pc", textAlign: "right" }}>{this.state.serverStatus.system.loadavg[1]}</td>
								</tr>
								<tr>
									<td style={{ width: "60pc" }}>Avg Load 15m:</td>
									<td style={{ width: "40pc", textAlign: "right" }}>{this.state.serverStatus.system.loadavg[2]}</td>
								</tr>
							</table>
						</Sider>

						<Content>
							<Row style={{ }}>
								<Col span={11} style={{ margin: ".5em" }}>
									<h3>Controller</h3>
									<Controller
										status={this.state}
										toHHMMSS={this.toHHMMSS}
										/>

									<VideoLibrary

										status={this.state}
										
									/>

								</Col>
								<Col span={12} style={{ margin: ".5em" }}>
									<table style={{ width: "100%" }}>
										<tr>
											<td><h3>Current Playlist</h3></td>
											<td><h3>Selections</h3></td>
										</tr>
										{this.state.videos ?
											<tr>
												<td style={{ verticalAlign: "top", width: "50%", backgroundColor: "lightgrey", padding: ".5em" ,borderRight: "5px solid #f0f2f5"}}>
																								
													<small>This is the immediate queue.</small>
													<Playlist status={this.state} playlist={this.state.broadcastListEvent} height={200}/>
												</td>
												<td style={{ verticalAlign: "top", width: "50%", backgroundColor: "lightgrey", padding: ".5em" }}>
														<h5>Mode Selections</h5>
														<small>Selections for vote mode. Will auto select when no vote or not in vote mode.</small>

														<div>
															
														<Playlist status={this.state} playlist={this.state.modeSelections} height={120} />
															<h5>modePool</h5>
															<Playlist status={this.state} playlist={this.state.modePool} height={120}/>
														</div> 
												</td>
											</tr>
											:
											<div></div>
												}

									</table>
									<h4>Rotation</h4>
									{this.state.rotationSelections ? <Rotation status={this.state}   />
										:
										<div></div>}
									
									
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
