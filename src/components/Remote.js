// import React from "react";

// class remote extends React.Component {
//      ws = new WebSocket('wss://360tv.net:5001');
//      regToken = "360B91708425"


//      static connect(address) {

//           ws.addEventListener('open', function (event) {
//                console.log('Connected to Server ', event);
//                ws.send(JSON.stringify({ "messageType": "login", "data": { "role": "remote", "datetime": Date.Now, "regtoken": regToken, "sessionId": sessionId } }))
//           });

//           ws.addEventListener('error', function (event) {
//                console.log('Error ', event);
//           });

//           ws.addEventListener('close', function (event) {
//                console.log('Disconnected ', event);
//                //ws.send(JSON.stringify( {"type": "login", "data": { "datetime": Date.Now, "regtoken": regToken, "sessionId": sessionId } }))
//           });


//           // Listen for messages
//           ws.addEventListener('message', function (event) {
//                //console.log('Message from server ', event.data);
//                msg = event.data
//                let j = JSON.parse(msg)
//                packetcount += 1

//                document.getElementById("packetcount").innerHTML = packetcount
//                console.log(j)



//                if (j["messageType"] === "controllerTickStatus") {

//                     if (nowplayingId != j["contentId"] && j["contentType"] == "MusicVideo") {
//                          nowplayingId = j["contentId"]
//                          getvideo(nowplayingId)
//                     }
//                     else if (nowplayingId != j["contentId"]) {
//                          nowplayingId = j["contentId"]
//                          //clearschedule()
//                     }
//                     controllerpacketcount += 1
//                     document.getElementById("controllerpacketcount").innerHTML = controllerpacketcount

//                     document.getElementById("controllerStatusBadge").classList.add("blink-red")
//                     setTimeout(function () { document.getElementById("controllerStatusBadge").classList.remove("blink-red"); }, 300);


//                     //document.getElementById("time").innerHTML = j["time"]
//                     document.getElementById("nowPlayingTime").innerHTML = toHHMMSS(j["time"])
//                     document.getElementById("nowPlayingTimes").innerHTML = toHHMMSS(j["times"])
//                     document.getElementById("broadcastEndTime").innerHTML = toHHMMSS(j["broadcastEndTime"])
//                     document.getElementById("nowPlayingText").innerHTML = j["contentString"]

//                     //console.log(j.frame / j.frames)
//                     //document.getElementById("timebar").style.width = `${(j.frame / j.frames)*100}%`
//                     document.getElementById("nowplaying-progressbar").style.width = `${(j.frame / j.frames) * 100}%`
//                     //console.log(`${(j["content"]["time(0)"])*100}%`)
//                }

//                if (j.messageType === "playerStatus") {

//                }

//                if (j.messageType === "systemStatus") {

//                }

//                if (j.messageType === "serverStatus") {

//                }

//                if (j.messageType === "userStatus") {

//                }

//                if (j.messageType === "streamStatus") {

//                }

//                if (j.messageType === "broadcastListEvent") {
//                     let playlist = document.getElementById('playlistBox')
//                     let sindex = document.getElementById("playlistBox").selectedIndex
//                     playlist.options.length = 0

//                     for (i = 0; i < j["currentPlaylist"].length; i++) {
//                          let li = document.createElement("option")
//                          li.innerHTML = j["currentPlaylist"][i]
//                          playlist.appendChild(li)
//                     }
//                     document.getElementById("playlistBox").selectedIndex = sindex
//                     //debugger
//                     document.getElementById("playlistRuntime").innerHTML = toHHMMSS(j["timeleft"])
//                }

//                if (j.messageType === "broadcastStatus") {

//                     broadcastpacketcount += 1
//                     document.getElementById("broadcastpacketcount").innerHTML = broadcastpacketcount
//                     if (j.onair == true) {
//                          document.getElementById("onairButton").innerHTML = "OnAir"




//                          document.getElementById("onairButton").classList.add("button-red")
//                     } else {
//                          document.getElementById("onairButton").innerHTML = "OffAir"

//                     }

//                     document.getElementById("broadcastStatusBadge").classList.add("blink-red")
//                     setTimeout(function () { document.getElementById("broadcastStatusBadge").classList.remove("blink-red"); }, 900);

//                     document.getElementById(`${dayString[j['currentBlock']['blockday']]}_${j['currentBlock']['blockhour']}`).classList.add("block-blink-red")
//                     setTimeout(function () { document.getElementById(`${dayString[j['currentBlock']['blockday']]}_${j['currentBlock']['blockhour']}`).classList.remove("block-blink-red"); }, 900);

//                     document.getElementById("uptime").innerHTML = toHHMMSS(j["uptime"])

//                     document.getElementById("bumptimer").innerHTML = toHHMMSS(j["bumptimer"])
//                     //debugger
//                     document.getElementById("bumptime").innerHTML = toHHMMSS(j["currentBlock"]["bumptime"] * 60)

//                     document.getElementById("breaktimer").innerHTML = toHHMMSS(j["breaktimer"])
//                     document.getElementById("breaktime").innerHTML = toHHMMSS(j["currentBlock"]["breaktime"] * 60)

//                     document.getElementById("cardtimer").innerHTML = toHHMMSS(j["cardtimer"])
//                     document.getElementById("cardtime").innerHTML = toHHMMSS(j["currentBlock"]["cardtime"] * 60)
//                }

//                if (j.messageType === "casparStatus") {
//                     casparpacketcount += 1
//                     document.getElementById("casparpacketcount").innerHTML = casparpacketcount
//                     document.getElementById("casparStatusBadge").classList.add("slow-blink-red")
//                     setTimeout(function () { document.getElementById("casparStatusBadge").classList.remove("blink-red"); }, 500);

//                }

//           }




//      moveUp = () => {
//                     ws.send(JSON.stringify({ "messageType": "command", "data": { "datetime": Date.Now, "regtoken": regToken, "sessionId": sessionId, "class": "broadcastList", "command": "moveUp", "index": document.getElementById("playlistBox").selectedIndex } }))
//                }

//      moveDown = () => {
//                     ws.send(JSON.stringify({ "messageType": "command", "data": { "datetime": Date.Now, "regtoken": regToken, "sessionId": sessionId, "class": "broadcastList", "command": "moveDown", "index": document.getElementById("playlistBox").selectedIndex } }))
//                }

//      export function moveClear() {
//                ws.send(JSON.stringify({ "messageType": "command", "data": { "datetime": Date.Now, "regtoken": regToken, "sessionId": sessionId, "class": "broadcastList", "command": "clear", "index": 0 } }))
//           }

//           export function moveRemove() {
//                ws.send(JSON.stringify({ "messageType": "command", "data": { "datetime": Date.Now, "regtoken": regToken, "sessionId": sessionId, "class": "broadcastList", "command": "remove", "index": document.getElementById("playlistBox").selectedIndex } }))
//           }








//           addvideo = (id) => {
//                if (ws.readyState === 1) {
//                     event.preventDefault()
//                     console.log(JSON.stringify({ "messageType": "command", "data": { "datetime": Date.Now, "regtoken": regToken, "sessionId": sessionId, "class": "broadcastList", "command": "add", "id": id } }))
//                     ws.send(JSON.stringify({ "messageType": "command", "data": { "datetime": Date.Now, "regtoken": regToken, "sessionId": sessionId, "class": "broadcastList", "command": "add", "id": id } }))
//                }
//                document.getElementById("playlistBox").selectedIndex = -1
//           }


//           requestvideo = (id) => {
//                if (ws.readyState === 1) {
//                     event.preventDefault()
//                     console.log(JSON.stringify({ "messageType": "command", "data": { "datetime": Date.Now, "regtoken": regToken, "sessionId": sessionId, "class": "broadcastList", "command": "request", "id": id } }))
//                     ws.send(JSON.stringify({ "messageType": "command", "data": { "datetime": Date.Now, "regtoken": regToken, "sessionId": sessionId, "class": "broadcastList", "command": "request", "id": id } }))
//                }
//                document.getElementById("playlistBox").selectedIndex = -1
//           }


//           getvideo = (id, altid) => {
//                fetch("/admin/videos/_videodetail.php?id=" + nowplayingId.toString())
//                     .then(response => response.json())
//                     .then(video => {
//                          video = video[0]
//                          video.schedule = JSON.parse(video.schedule)


//                          for (let day = 0; day < dayString.length; day++) {
//                               for (let hour = 0; hour <= 23; hour++) {
//                                    if (video.schedule[day][hour] > 0) {

//                                         document.getElementById(`${dayString[day]}_${hour}`).style.backgroundColor = `rgb(${Math.round(r * video.schedule[day][hour])},${Math.round(g * video.schedule[day][hour])},${Math.round(b * video.schedule[day][hour])})`;
//                                    } else {

//                                         document.getElementById(`${dayString[day]}_${hour}`).style.backgroundColor = `rgb(0,0,0,0)`;
//                                    }
//                                    document.getElementById(`${dayString[day]}_${hour}`).setAttribute("data-blockval", video.schedule[day][hour])
//                               }
//                          }
//                     });
//           }





//      }



// // Create WebSocket connection.
// //const ws = new WebSocket('wss://192.168.1.102:5001');
