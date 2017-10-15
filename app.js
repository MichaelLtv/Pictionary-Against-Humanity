var express = require("express");
var app = express();
var server = app.listen(process.env.PORT || 5000);

app.use(express.static("client"));

console.log("Server started.");

var socket = require("socket.io");

var io = socket(server);

io.sockets.on("connection", newConnection);
var clients;

function newConnection(socket) {
    console.log("New connection: " + socket.id);

    clients = io.sockets.clients();
    console.log(clients);

    socket.on('mouse', mouseMsg);
    if (clients[0]) {
        socket.on('reconnect', drawPrompt);
    }

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        console.log(data);
    }

    function drawPrompt() {
        socket.broadcast.emit('reconnect');
        cardPrompt;
    }

}

