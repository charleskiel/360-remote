import React, { Component } from "react";
import "./App.css";
import VideoLibrary from "./containers/VideoLibrary";
import Playlist from './containers/Playlist'
import Controller from './components/Controller'
//import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
//import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
//import remote from './components/Remote.js'
import { Row, Col, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import "antd/dist/antd.css";
import "./index.css";

class App extends Component {

  sessionId = ""
  nowplayingId = 0
  packetcount = 0
  casparpacketcount = 0
  broadcastpacketcount = 0
  controllerpacketcount = 0


  state = {
    regToken: "360B91708425",
    videos: new Map(),
    playlist: [],
    broadcastList: [],
    broadcastStatus: {},
    controllerStatus: {},
    serverStatus: {},

    packetcount: 0,

    status: {
      nowPlaying: "Video"
      //nowPlaying: new Object()
    }
  }



  ws = new WebSocket('wss://360tv.net:5001');


  componentDidMount() {
    fetch('https://www.360tv.net/data/_getvideos.php')
      .then(response => response.json())
      .then(response => {

        let map = new Map()
        response.map(_video => {
          map.set(_video.id, _video)
        })


        this.setState({ videos: map })
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

      if (msg["messageType"] === "controllerTickStatus") {
        this.setState({ controllerStatus: msg })
      }

      if (msg.messageType === "playerStatus") { }
      if (msg.messageType === "systemStatus") { }
      if (msg.messageType === "serverStatus") { }
      if (msg.messageType === "userStatus") { }
      if (msg.messageType === "streamStatus") { }
      if (msg.messageType === "broadcastListEvent") {
        this.setState({ broadcastList: msg })
      }

      if (msg.messageType === "broadcastStatus") {
        //broadcastpacketcount += 1
      }

      if (msg.messageType === "casparStatus") {
      }

    }
  }

  addvideo = (videoId) => {
    this.ws.send(JSON.stringify({ "messageType": "command", "data": { "datetime": Date.Now, "regtoken": this.regToken, "sessionId": this.sessionId, "class": "broadcastList", "command": "add", "id": videoId } }))

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






  render() {
    return (
      <div className="App">





        <Layout>
          <Sider>Sider</Sider>
          <Layout>
            <Header>(360) remote control</Header>
            <Content>



              <Row>
                <Col span={12}>
                  <Controller
                    videos={this.state.videos}
                    playlist={this.state.playlist}
                    status={this.state.status}
                    controllerStatus={this.state.controllerStatus}
                    broadcastStatus={this.state.broadcastStatus}
                    toHHMMSS={this.toHHMMSS}
                  />

                  <VideoLibrary
                    videos={Array.from(this.state.videos.values())}
                    playlist={this.state.playlist}
                    addvideo={this.addvideo}
                    removeVideo={this.removevideo}
                    broadcastStatus={this.state.broadcastStatus}
                  />

                </Col>
                <Col span={12}>
                  <div>

                    <Playlist
                      playlist={this.state.broadcastList}
                      videos={this.state.videos}
                    />

                  </div>
                </Col>
              </Row>

            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>










        <Layout>


          <div className="header">
            <Sider>Sider</Sider>
          </div>


        </Layout>

      </div>
    );
  }
}

export default App;
