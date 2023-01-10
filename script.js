//board
var blockSize = 25;
var cols = 20;
var rows = 20;
var board;
var context;

// snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

// snake speed / velocity 

var speedX = 0;
var speedY = 0;

// snake body
 var snakeBody = []; //this array have (X , Y) dimensions / it is similar to the head // snakeBody is an array of arrays that we will push


// food
var foodX ;
var foodY ;


// score 
var score = 0;

// sound

var snakeSound = new Audio("game-jump-coin-216.wav")
var gameOverSound = new Audio("game-over.wav")
var goodScoreSound = new Audio("good-score.wav")

// game over
var gameOver = false;


window.onload = function(){
    board = document.getElementById("board"); // now variable board have the canvas tag
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // used for drawing on the board 

    placeFood();
    document.addEventListener("keyup",changeDirection);
    
    setInterval(update,1000/10)
} 


debugger;
// score 
function yourScore(){
    context = board.getContext("2d");
    context.font = "18px Arial"
    context.fillStyle = "white"
    context.fillText("Score : " + score ,board.width-90,25);

}




function update(){

    if(gameOver){
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle = "red";
    context.fillRect(foodX,foodY,blockSize,blockSize);


    // to make snake eat the food 
    if(snakeX == foodX && snakeY == foodY){  // that mean they are in the same square
        
        snakeBody.push([foodX , foodY]) // grow the segment where the food was   / add a segment 
        score++;
        snakeSound.play();
        placeFood(); 

    }



// Good score Sound
if (score === 5) {
    goodScoreSound.play();
    setTimeout(() => {
    goodScoreSound.pause();
    goodScoreSound.currentTime = 0;
    score = 6;
    }, 2000);
}


    // to move the body with the head //
    for (let i = snakeBody.length-1; i >0; i--){
        snakeBody[i] = snakeBody[i-1];          // * we are starting from the end of the snake body (the tail) 
                                                // * we want the tail to get the previous (X,Y) coordinates so that they can move forward 
        
    }

     // update the second segment to take the head's place / coordinates
    if (snakeBody.length){
        snakeBody[0] = [snakeX , snakeY]; // snakeBody[0] is the first element in snakeBody array and it the second segment in the snake body after the head
    }

context.fillStyle = "yellow";   // the head color
snakeX += speedX * blockSize;   // to move one unit / one square over
snakeY += speedY * blockSize;
context.fillRect(snakeX,snakeY,blockSize,blockSize);

context.fillStyle = "green";  // the body color  // to apply this color to the snake body 
for (let i = 0; i < snakeBody.length; i++){   // we have an array of body segment we need to draw them
    context.fillRect(snakeBody[i][0], snakeBody[i][1] , blockSize, blockSize); // snakeBody[i][0]== X  , snakeBody[i][1]== Y

}


// 1- game over conditions
if(snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
    gameOver = true;
    // alert("Game Over");
}

// 2- 
for(let i = 0; i < snakeBody.length; i++){
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
        gameOver=true;
        // alert("Game Over");
    }


}

// Game Over text
if (gameOver) {
    context.fillStyle = "white"
    context.font = "60px Verdana"

    var textStyle= context.createLinearGradient(0,0, board.width,0)
    textStyle.addColorStop("0","magenta");
    textStyle.addColorStop("0.5","blue");
    textStyle.addColorStop("1.0","red");
    context.fillStyle = textStyle;

    context.fillText("Game Over!", board.width / 7 , board.height / 2)

    gameOverSound.play();
}

// call Score function
yourScore();

}


// snake move // change Direction  //  basically "keyUp" is going to waiting for you to press on arrow key (up - down - left - right)
// if snake turn around it will eat it's body
function changeDirection(ev){
    if(ev.code == "ArrowUp" && speedY != 1) { // speedY != 1 mean don't going down  
        speedX = 0;
        speedY = -1;
    }
    else if(ev.code == "ArrowDown" && speedY != -1) { // speedY != -1 mean don't going up
        speedX = 0;
        speedY = 1;
    }
    else if(ev.code == "ArrowLeft" && speedX != 1) {  // speedX != 1 mean don't going right
        speedX = -1;
        speedY = 0;
    }
    else if(ev.code == "ArrowRight" && speedX != -1) {  // speedX != -1 mean don't going left
        speedX = 1;
        speedY = 0;
    }
    // console.log(ev.code)
}




// function to place the food in random x & y corner // the food randomly placed

function placeFood(){
    
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
// console.log(Math.floor(Math.random()*10))