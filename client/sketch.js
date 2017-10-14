var socket;

function setup() {
    createCanvas(1280, 960);
    background(255);

    socket = io.connect("https://localhost:2000");
    socket.on('mouse', newDrawing);
}

function newDrawing(data) {
    noStroke();
    fill(0);
    ellipse(data.x, data.y, 16, 16);    

}

function mouseDragged() {
    console.log('Sending: ' + mouseX + ',' + mouseY);
    

    var data = {
        x: mouseX,
        y: mouseY
    }
    socket.emit('mouse', data);

    noStroke();
    fill(0);
    ellipse(mouseX, mouseY, 16, 16);
}
