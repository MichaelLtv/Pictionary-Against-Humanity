var socket;

function preload() {
    cards = loadStrings('wcards.txt');
  }

function setup() {
    createCanvas(720, 960);
    background(255);

    textSize(48);
    text("Pictionary Against Humanity", 10, 50);
    fill(0, 0, 0);

    textSize(24);
    text("Play Pictionary Against Humanity.", 10, 100);
    fill(0, 0, 0); 

    socket = io.connect();
    socket.on('mouse', newDrawing);
    socket.on('drawingPlayer', cardPrompt);
    socket.on('guessingPlayer', guess);

}


function newDrawing(data) {
    noStroke();
    fill(0);
    ellipse(data.x, data.y, 8, 8);    

}

function cardPrompt() {
    button = createButton('Draw something else!');
    button.position(10, 700);
    button.mousePressed(newCard);

    textSize(24);
    text("Draw... " + cards[Math.floor(Math.random() * cards.length)], 10, 160);
    fill(0, 0, 0);


}

function newCard() {
    clear();
    textSize(48);
    text("Pictionary Against Humanity", 10, 50);
    fill(0, 0, 0);

    textSize(24);
    text("Play Pictionary Against Humanity.", 10, 100);
    fill(0, 0, 0); 

    cardPrompt();

}
function guess() {
    textSize(24);
    text("Guess what they're drawing!", 10, 160);
    fill(0, 0, 0);
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
