const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const cols = canvas.width / scale;
document.getElementById("gameover").style.display = "none";

let snake;
let fruit;
let score = 0;

function showScore(text, num){
    document.getElementById("score").textContent = text;
}

function gameOver(){
    document.getElementById("gameover").style.display = "block";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Check to see if snake collides with a wall
function wallCollide(){
    if(snake.x > canvas.width || snake.x < 0
        || snake.y > canvas.height || snake.y < 0){
            return true;
    }
    return false;
}

// Check to see if snake collides with itself
function tailCollide(){
    for(let i = 0; i < snake.tail.length; i++){
        if(snake.x === snake.tail[i].x && snake.y === snake.tail[i].y){
            return true;
        }
    }
    return false;
}

// Main game loop
(function createGame(){
    snake = new Snake();
    fruit = new Fruit();
    fruit.location();
    showScore("SCORE: " + score);

    // Updates the game loop every 150 milliseconds
    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(wallCollide() || tailCollide()){
            gameOver();
        } else {
            snake.update();
            fruit.draw();
            snake.draw();

            if(snake.eat(fruit)){
                fruit.location();
                score++;
                showScore("SCORE: " + score);
            }
        }
    }, 150);
}());

window.addEventListener("keydown", ((evt) => {
    let dir = evt.key;
    snake.changeDirection(dir);
}));