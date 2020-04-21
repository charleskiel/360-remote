//basic promise

let p = new Promise((resolve, reject) => {
	let a = 1 + 1 
	if (a == 2) {
		resolve("Promise sucuess")
	} else {
		reject('failed')
	}

})

p.then((message) => {
	console.log(`Message: ${message}`)
}).catch((message) => {
	console.log(`Message: ${message}`)
})

let userLeft = false

let userWatchingCatMeme = false


//basic callback
function watchTuturialCallback(callback, errorCallback) {
	if (userLeft) {
		errorCallback({
			name: 'User Left',
			message: ':('
		})
	} else if (userWatchingCatMeme) {
		errorCallback({
			name: 'User Callback',
			message: " awgw"
		})
	} else {
		callback('Callback Thumbs up')
	}


}


//basic promise
function watchTuturialPromise(){
	return new Promise((resolve, reject) => {
		
		if (userLeft) {
			reject({
				name: 'User Left',
				message: ':('
			})
		} else if (userWatchingCatMeme) {
			reject({
				name: 'User promise',
				message: " awgw"
			})
		} else {
			resolve('Promise Thumbs up!')
		}
	})


}






watchTuturialCallback((message) => {
	console.log(`Sucuess: ${message}`)
}, (error) => {
	console.log(`${error.name} ${error.message}`)
})


watchTuturialPromise().then((message) => {
	console.log(`Sucuess: ${message}`)
}, (error) => {
	console.log(`${error.name} ${error.message}`)
})




import React, {Component} from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import { VictoryBar , VictoryLine,VictoryChart, VictoryTheme} from 'victory';
import Stock from './components/stock'
import { select } from 'd3-selection';

import TDA from './js/tda'

import "./css/bootstrap.min.css"
import "./font-awesome/css/font-awesome.css"
import "./css/plugins/toastr/toastr.min.css"
import "./js/plugins/gritter/jquery.gritter.css"
import "./css/animate.css"
import "./css/style.css" 
import ".//css/style.css"


// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');


class App extends Component {
  tda = TDA


  ws = new WebSocket('wss://ws-feed.pro.coinbase.com')


  state = { messageCount :0
  }
  

  charts = {}
  
  componentWillMount(){
    let data = []
    for (let x = 0 ; x < this.state.chartWidth; x++ ){
      data.push({x: x , y: Math.round(Math.random() * 100)})
    }
    //console.table(data)
    this.setState({chartData: data})

    let max =  Math.max(...data.map(i => {
      //console.log(i)
      return i.y
      })
    )
    
    console.log(`Max value is ${max}`)
    this.setState({ maxData : max })
    






    data = []
    for (let x = 0 ; x < this.state.chartWidth; x++ ){
      data.push({x: x , y: Math.round(Math.random() * 100)})
    }
    //console.table(data)
    this.setState({chartData2: data})
    max =  Math.max(...data.map(i => {
      //console.log(i)
      return i.y
      })
    )
    this.setState({ maxData : max })
    
  }
  

  componentDidMount() {
    this.ws.onopen = () => {
    // on connecting, do nothing but log it to the console
    console.log('connected')
    this.ws.send(JSON.stringify({"action" : "auth", "params":"PKDZZD2NBDPNT36EX14J"}))
    this.ws.send(JSON.stringify({
      "type": "subscribe",
      "product_ids": ["ETH-USD","BTC-USD","BCH-USD","LTC-USD","ETC-USD","XRP-USD"],
      "channels": ["level2","full","heartbeat",
              {
                  "name": "ticker",
                  "product_ids": ["BTC-USD","ETH-USD"]
              }
          ]
      }))
    
    }

    this.ws.onmessage = evt => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data)
      //this.setState({dataFromServer: message})
      //this.setState({messageCount : this.state.messageCount + 1})
      switch(message.type){

        case "snapshot":
           //console.log(message)
           break

        case "ticker":

          let chartData = {
            price: parseFloat(message.price),
            best_bid: parseFloat(message.best_bid),
            best_ask: parseFloat(message.best_ask),
            side: message.side,
            time: message.time,
            last_size: parseFloat(message.last_size)
          }

          //console.log(message)
          if (this.state[message.product_id]){
            this.setState({ [message.product_id] : {...message, data: [...this.state[message.product_id].data, chartData] } })
          }else{
            this.setState({
              [message.product_id] : {...message, data: [chartData]} 
              })
          }
          
          break

        default:
          //console.log(`Default Message ${message}`)

      }
    }

    this.ws.onclose = () => {
    console.log('disconnected')
    // automatically try to reconnect on connection loss

    }

  }
  
  getCrypto = () => {
    if (this.state){
      return _.values(this.state).map(stock => {
        if (stock.product_id) return <Stock.Chart key={stock.product_id} {...stock} product_id={this.state[stock.product_id].product_id}/>
        
      })
    } 
  }


  render(){

    return (
      <div className="App">
        <h1>Header</h1>
        <h3>{this.ws.url} </h3>
        {this.getCrypto()}
            {/* <VictoryChart padding={{ top: 0, bottom: 0, left: 0, right: 0 }} > 

              <VictoryLine
                data={this.state.chartData2}
                domain={{x: [0, this.state.chartWidth], y: [ this.state.maxData, this.state.maxData * -1 ]}}
                style={{
                  data: { stroke: "#c43a31" ,strokeWidth : 1},
                  parent: { border: "1px solid #ccc"}
                }}
              />

              <VictoryBar
                data={this.state.chartData}
                domain={{x: [0, this.state.chartWidth], y: [ this.state.maxData, 0 ]}}
                barRatio={1}
                style={{
                  data: { fill: "#0000FF" , fillOpacity: .5, strokeWidth: .1 }
                }}

                
              />
            </VictoryChart> */}
    </div>
    );
  }
}

export default App;
