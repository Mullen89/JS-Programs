function Pellet(xPos, yPos, radius, speed, pType, modX, modY){
    this.x = xPos;
    this.y = yPos;
    this.modX = this.x + modX
    this.modY = this.y + modY;
    this.radius = radius;
    this.type = pType;

    this.draw = function(){
        if(this.type === "w"){
            ctx.drawImage(goodBananaImage, this.x, this.y, 105, 105); //60, 60
    // Draws a circle around each pellet for debugging collision zone
            // ctx.beginPath();
            // ctx.arc(this.modX, this.modY, this.radius, 0, 2 * Math.PI, false);
            // ctx.lineWidth = 3;
            // ctx.strokeStyle = '#FF0000';
            // ctx.stroke();
        } else if(this.type === "a"){
            ctx.drawImage(ripeBananaImage, this.x, this.y, 80, 80);
            // ctx.beginPath();
            // ctx.arc(this.modX, this.modY, this.radius, 0, 2 * Math.PI, false);
            // ctx.lineWidth = 3;
            // ctx.strokeStyle = '#FF0000';
            // ctx.stroke();
        } else if(this.type === "b"){
            ctx.drawImage(oldBananaImage, this.x, this.y, 120, 120);
            // ctx.beginPath();
            // ctx.arc(this.modX, this.modY, this.radius, 0, 2 * Math.PI, false);
            // ctx.lineWidth = 3;
            // ctx.strokeStyle = '#FF0000';
            // ctx.stroke();
        }
    }

    this.update = function(){
        this.y -= speed;
        this.modY -= speed;
    }
}