//create express instance
const express = require('express');
const app = express();
//require cors for cross origin policy
const cors = require('cors')
//use cors for all requests
app.use(cors())

//for creating http server
const http = require('http');
//passing the http server the express app
const server = http.createServer(app);

//create socket io instance
const { Server } = require("socket.io");
//create a new server instance, pass in cors object to enable cross origin policy
const io = new Server(server, {
  cors: {origin:"*", methods: ["GET", "POST"]},
});

//express http responses
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//monitor socket and log when connection happens
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', () => {
      console.log('message recieved')
    })
  });

//start server on port 3000
server.listen(3000, () => {
  console.log('listening on *:3000');
});