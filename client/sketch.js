var socket;

function setup() {
    createCanvas(960, 1280);
    background(255);

    socket = io.connect();
    socket.on('mouse', newDrawing);
}

function newDrawing(data) {
    noStroke();
    fill(0);
    ellipse(data.x, data.y, 8, 8);    

}

function touchMoved() {
    console.log('Sending: ' + mouseX + ',' + mouseY);
    

    var data = {
        x: mouseX,
        y: mouseY
    }
    socket.emit('mouse', data);

    noStroke();
    fill(0);
    ellipse(mouseX, mouseY, 8, 8);
    return false;
}
