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
    
    if (mouseIsPressed) {
        if (mouseButton == LEFT) {
            noStroke();
            fill(0);
            ellipse(mouseX, mouseY, 8, 8);
        }
        if (mouseButton == RIGHT) {
            noStroke();
            fill(255);
            rect(mouseX, mouseY, 24, 24);
        }
        return false;
    }
    
}
