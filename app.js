var express = require("express");
var app = express();
var server = app.listen(process.env.PORT || 5000);

app.use(express.static("client"));

console.log("Server started.");

var socket = require("socket.io");

var io = socket(server);

io.sockets.on("connection", newConnection);

function newConnection(socket) {
    console.log("New connection: " + socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        console.log(data);
    }

    function drawPrompt() {
        socket.broadcast.emit(cardPrompt);
    }

}

