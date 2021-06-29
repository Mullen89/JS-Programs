function Player(radius){
    // Starting location of player
    this.x = 245;
    this.y = 600;
    this.modX = this.x+30;
    this.modY = this.y+45;
    this.radius = radius;
    this.pellets = [];
    this.bombCount = 0;
    this.enhancementCount = 0;

    // Position of player
    this.xPos = 0;

    this.draw = function(){
        ctx.drawImage(playerImage, this.x, this.y, 60, 85)
        // ctx.beginPath();
        // ctx.arc(this.modX, this.modY, this.radius, 0, 2 * Math.PI, false);
        // ctx.lineWidth = 3;
        // ctx.strokeStyle = '#FF0000';
        // ctx.stroke();
    }

    this.update = function(){
        this.x += this.xPos;
        this.modX += this.xPos;
        this.xPos = 0;
    }

    // Sets player direction speed variables which are used by update()
    this.move = function(direction){
        if(direction === "a" && this.x > 10){  //LEFT
            this.xPos = -15;
        }else if(direction === "d" && this.x < 480){   //RIGHT
            this.xPos = 15;
        }
    }

    this.fireRipeBanana = function(){
        let pellet = new Pellet(this.x-19, this.y, 20, 1.5, "a", 48, 45); //10
        this.pellets.push(pellet);
    }

    this.fireGoodBanana = function(){
        if(this.enhancementCount > 0){
            let pellet = new Pellet(this.x, this.y, 20, 1, "w", 30, 30); //20
            this.pellets.push(pellet);
            this.enhancementCount -= 1;
        }
    }

    this.fireOldBanana = function(){
        if(this.bombCount > 0){
            let pellet = new Pellet(this.x-10, this.y, 20, 0.5, "b", 40, 45); //30
            this.pellets.push(pellet);
            this.bombCount -= 1;
        }
    }
}