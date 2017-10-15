var express = require("express");
var app = express();
var server = app.listen(process.env.PORT || 5000);

app.use(express.static("client"));

console.log("Server started.");

var socket = require("socket.io");

var io = socket(server);
var clients = [];


io.sockets.on("connection", newConnection);
io.sockets.on("disconnect", function() {
    delete socket.namespace.sockets[socket.id];
});



function newConnection(socket) {
    console.log("New connection: " + socket.id);

    clients.push(socket.id);
    console.log(clients);
    socket.on('mouse', mouseMsg);
    socket.on('drawingPlayer', drawPrompt);

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        console.log(data);
    }

    function drawPrompt() {
        socket.emit('drawingPlayer', cardPrompt);
        
    }


}

