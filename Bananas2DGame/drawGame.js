const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const cols = canvas.width / scale;
document.getElementById("gameover").style.display = "none";
document.getElementById("victory").style.display = "none";
document.getElementById("score").style.display = "none";

// Enemy image
let monkeyPath = "Monkey.png";
let monkeyImage = new Image();
monkeyImage.src = monkeyPath;

// Player image
let imgPath2 = "banana.png";
let playerImage = new Image();
playerImage.src = imgPath2;

// Powerup 1 image
let hawkeyePath = "hawkeyes.png";
let hawkeyeImage = new Image();
hawkeyeImage.src = hawkeyePath;

// Powerup 2 image
let cyclonePath = "cyclones.png";
let cycloneImage = new Image();
cycloneImage.src = cyclonePath;

// Enemy pellet image
let pelletPath = "tennisball.png";
let pelletImage = new Image();
pelletImage.src = pelletPath;

// Pellet image good banana
let goodBananaPath = "good_banana.png";
let goodBananaImage = new Image();
goodBananaImage.src = goodBananaPath;

// Pellet image ripe banana
let ripeBananaPath = "ripe_banana.png";
let ripeBananaImage = new Image();
ripeBananaImage.src = ripeBananaPath;

// Pellet image old banana
let oldBananaPath = "old_banana.png";
let oldBananaImage = new Image();
oldBananaImage.src = oldBananaPath;

let enemy;
let player;
let score = 0;
let bossHealth = 1000;
let playerHealth = 3;

function showScore(text, num){
    document.getElementById("score").textContent = text;
}

function showBossHealth(text, num){
    document.getElementById("player").textContent = text;
}

function showPlayerHealth(text, num){
    document.getElementById("boss").textContent = text;
}

function showMediumAmmo(text, num){
    document.getElementById("GoodBananaCount").textContent = text;
}

function showLargeAmmo(text, num){
    document.getElementById("OldBananaCount").textContent = text;
}

function displayScore(){
    document.getElementById("score").style.display = "block";
}

function displayBossHealth(){
    document.getElementById("boss").style.display = "block";
}

function displayPlayerHealth(){
    document.getElementById("player").style.display = "block";
}

function gameOver(){
    document.getElementById("gameover").style.display = "block";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameWin(){
    document.getElementById("victory").style.display = "block";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Finds the distance between 2 objects (pellets, enemy, player, etc...)
// Used by "collision" function
function distance(object1, object2){
    return Math.sqrt(Math.pow((object1.modX - object2.modX), 2) + Math.pow((object1.modY - object2.modY), 2));
}

// Uses distance <= sum of both objects radii to determine if there is a collision
function collision(obj1, obj2){
    sumR = obj1.radius + obj2.radius;
    dis = distance(obj1, obj2);
    if(dis <= sumR){
        return true;
    } else {
        return false;
    }
}

function removePellet(pellet){
    let idx = player.pellets.indexOf(pellet);
    if (idx > -1) {
        player.pellets.splice(idx, 1);
      }
}

function removeEnemyPellet(pellet){
    let idx = enemy.enemyPellets.indexOf(pellet);
    if (idx > -1) {
        enemy.enemyPellets.splice(idx, 1);
      }
}

function addBananas(){
    player.enhancementCount += 10;
}

function addBigBananas(){
    player.bombCount += 5;
}

// Main game loop
(function createGame(){
    player = new Player(30);
    enemy = new Enemy(0.3, 20);
    displayScore();
    displayBossHealth();
    displayPlayerHealth();
    showScore("SCORE: " + score);
    showBossHealth("BOSS HEALTH: " + bossHealth);
    showPlayerHealth("PLAYER HEALTH: " + playerHealth);

    // Updates the game loop every 150 milliseconds
    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.update();
        showMediumAmmo("AMMO: " + player.enhancementCount);
        showLargeAmmo("AMMO: " + player.bombCount);
        if(bossHealth <= 0){
            gameWin();
        } else if(playerHealth <= 0){
            gameOver();
        } else {
            player.draw();
            enemy.update();
            enemy.draw();


            // Checks status of player-fired pellets
            for(let i = 0; i < player.pellets.length; i++){
                // If pellet hits an enemy
                if(collision(player.pellets[i], enemy) === true){
                    if(player.pellets[i].type === "a"){
                        bossHealth -= 3;
                        enemy.health -= 3;
                        showBossHealth("BOSS HEALTH: " + bossHealth);
                        if(enemy.smallHit === true || enemy.mediumHit === true || enemy.bigHit === true){
                            enemy.smallHit = false;
                            enemy.mediumHit = false;
                            enemy.bigHit = false;
                        } else {
                            enemy.smallHit = true
                        }
                    } else if(player.pellets[i].type === "w"){
                        bossHealth -= 25;
                        enemy.health -= 25;
                        showBossHealth("BOSS HEALTH: " + bossHealth);
                        if(enemy.smallHit === true || enemy.mediumHit === true || enemy.bigHit === true){
                            enemy.smallHit = false;
                            enemy.mediumHit = false;
                            enemy.bigHit = false;
                        } else {
                            enemy.mediumHit = true
                        }
                    } else if(player.pellets[i].type === "b"){
                        bossHealth -= 50;
                        enemy.health -= 50;
                        showBossHealth("BOSS HEALTH: " + bossHealth);
                        if(enemy.smallHit === true || enemy.mediumHit === true || enemy.bigHit === true){
                            enemy.smallHit = false;
                            enemy.mediumHit = false;
                            enemy.bigHit = false;
                        } else {
                            enemy.bigHit = true
                        }
                    } 
                    removePellet(player.pellets[i]);
                    score++;
                    showScore("SCORE: " + score);

    // TODO take damage function ********************************************************************
                }
                // Removes pellet from pellet[] in player object if pellet is off canvas
                else if(player.pellets[i].y < 10){
                    removePellet(player.pellets[i]);

                // If pellet still on canvas
                } else {
                    player.pellets[i].update();
                    player.pellets[i].draw();
                }
            }
            for(let j = 0; j < enemy.enemyPellets.length; j++){
                if(collision(enemy.enemyPellets[j], player) === true){
                    if(enemy.enemyPellets[j].type === "r"){
                        playerHealth -= 1;
                        showPlayerHealth("PLAYER HEALTH: " + playerHealth);
                    } else if(enemy.enemyPellets[j].type === "pow"){
                        player.enhancementCount += 5;
                        showMediumAmmo("AMMO: " + player.enhancementCount);
                    } else {
                        player.bombCount += 5;
                        showLargeAmmo("AMMO: " + player.bombCount);
                    }
                    removeEnemyPellet(enemy.enemyPellets[j]);
                }
                enemy.enemyPellets[j].update();
                enemy.enemyPellets[j].draw();
            }

        }
    }, 5);
}());

// Handles keyboard inputs
let lastEvent;
let heldKeys = {};

window.onkeydown = function(evt) {
    if (lastEvent && lastEvent.keyCode == event.keyCode) {
        return;
    }
    lastEvent = event;
    heldKeys[event.keyCode] = true;
    let dir = evt.keyCode;
    if(dir === 74){
        player.fireGoodBanana();
    } else if(dir === 73){
        player.fireRipeBanana();
    } else if(dir === 76){
        player.fireOldBanana();
    } else if(dir === 65 || dir === 37){
        player.move("a");
    } else if(dir === 68 || dir === 39){
        player.move("d");
    }
};

window.onkeyup = function(event) {
    lastEvent = null;
    delete heldKeys[event.keyCode];
};