function EnemyPellet(xPos, yPos, radius, speed, pType, modX, modY){
    this.x = xPos;
    this.y = yPos;
    this.modX = this.x + modX
    this.modY = this.y + modY;
    this.radius = radius;
    this.type = pType;

    this.draw = function(){
        if(this.type === "r"){
        ctx.drawImage(pelletImage, this.x, this.y, 50, 50);
    // Draws a circle around each pellet for debugging collision zone
            // ctx.beginPath();
            // ctx.arc(this.modX, this.modY, this.radius, 0, 2 * Math.PI, false);
            // ctx.lineWidth = 3;
            // ctx.strokeStyle = '#FF0000';
            // ctx.stroke();
        } else if(this.type === "pow"){
            ctx.drawImage(hawkeyeImage, this.x, this.y, 60, 60);
            // ctx.beginPath();
            // ctx.arc(this.modX, this.modY, this.radius, 0, 2 * Math.PI, false);
            // ctx.lineWidth = 3;
            // ctx.strokeStyle = '#FF0000';
            // ctx.stroke();
        } else {
            ctx.drawImage(cycloneImage, this.x, this.y, 60, 60);
            // ctx.beginPath();
            // ctx.arc(this.modX, this.modY, this.radius, 0, 2 * Math.PI, false);
            // ctx.lineWidth = 3;
            // ctx.strokeStyle = '#FF0000';
            // ctx.stroke();
        }

    }

    this.update = function(){
        this.y += speed;
        this.modY += speed;
    }
}