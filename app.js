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
    delete clients[socket.id];
    console.log("CONNECTED CLIENTS LIST: " + clients);
});


function newConnection(socket) {
    console.log("New connection: " + socket.id);

    clients.push(socket.id);
    console.log("CONNECTED CLIENTS LIST: " + clients);
    socket.on('mouse', mouseMsg);
    socket.to(clients[4]).emit('drawingPlayer');
/*     io.sockets.on("disconnect", function() {
        delete clients[socket.id];
        console.log("CONNECTED CLIENTS LIST: " + clients);
    }); */

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        console.log(data);
    }



}

