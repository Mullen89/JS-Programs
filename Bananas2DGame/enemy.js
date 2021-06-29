function Enemy(speedX, radius){

    this.x = 130;
    this.y = 85;
    this.modX = this.x+42;
    this.modY = this.y+80;
    this.radius = radius;
    this.xSpeed = speedX;
    this.enemyPellets = [];
    this.smallHit = false;
    this.mediumHit = false;
    this.bigHit = false;
    this.health = 1000;

    this.draw = function(){
        ctx.drawImage(monkeyImage, this.x, this.y, 90, 130)
        // ctx.beginPath();
        // ctx.arc(this.modX, this.modY, this.radius, 0, 2 * Math.PI, false);
        // ctx.lineWidth = 3;
        // ctx.strokeStyle = '#FF0000';
        // ctx.stroke();
    }

    this.enemyFire = function(speed){
        let rand = Math.floor(Math.random() * 180);
        let powerupNum = Math.floor(Math.random() * 1500);
        let bigChungus = Math.floor(Math.random() * 2000);
        if(rand === 5){
            let pellet = new EnemyPellet(this.x, this.y+85, 10, speed, "r", 30, 30);
            enemy.enemyPellets.push(pellet);
        }
        if(powerupNum === 100){
            let pellet = new EnemyPellet(this.x, this.y+85, 20, 0.25, "pow", 30, 30);
            enemy.enemyPellets.push(pellet);
        }
        if(bigChungus === 100){
            let pellet = new EnemyPellet(this.x, this.y+85, 20, 0.25, "big", 30, 30);
            enemy.enemyPellets.push(pellet);
        }
    }

    this.update = function(){
        if(this.x > 10 && this.x < 460){
            this.x += this.xSpeed;
            this.modX += this.xSpeed;
        } else {
            this.xSpeed = this.xSpeed * (-1);
            this.x += this.xSpeed;
            this.modX += this.xSpeed;
        }
        if(this.health > 700){
            this.enemyFire(1);
        } else if(this.health > 300){
            this.enemyFire(2);
        } else {
            this.enemyFire(3);
        }
        
    }
}