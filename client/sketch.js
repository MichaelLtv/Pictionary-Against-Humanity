var socket;

function setup() {

    textSize(48);
    text("Pictionary Against Humanity", 10, 50);
    fill(0, 0, 0);

    textSize(24);
    text("Play Pictionary Against Humanity.", 10, 100);
    fill(0, 0, 0);

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
