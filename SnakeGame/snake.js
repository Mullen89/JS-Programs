function Snake(){
    // Centers snake on game canvas
    this.x = 150;
    this.y = 150;

    // Initial speed of snake
    this.xSpeed = 0;
    this.ySpeed = 0;

    // total: number of fruits eaten, that adds to tail length
    this.total = 0;
    this.tail = [];
    this.lastDirection = null;

    this.draw = function(){
        ctx.fillStyle = "#8bc34a"; // Greenish color for snake

        // Draws out tail
        for(let i = 0; i < this.tail.length; i++){
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }

        // Draws snake's head
        ctx.fillRect(this.x, this.y, scale, scale);
    }

    this.update = function(){
        // Shifts tail behind snake
        for(let i = 0; i < this.tail.length - 1; i++){
            this.tail[i] = this.tail[i+1];
        }
        this.tail[this.total-1] = {x: this.x, y: this.y};

        // Snake direction update
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    // Sets snake direction speed variables which are used by update
    // Prevents snake from going backwards on itself with "last direction"
    this.changeDirection = function(direction){
        if(direction === "w" && this.lastDirection !== "s"){         //UP
            this.xSpeed = 0;
            this.ySpeed = -10;
            this.lastDirection = "w";
        } else if(direction === "a" && this.lastDirection !== "d"){  //LEFT
            this.xSpeed = -10;
            this.ySpeed = 0;
            this.lastDirection = "a";
        }else if(direction === "s" && this.lastDirection !== "w"){   //DOWN
            this.xSpeed = 0;
            this.ySpeed = 10;
            this.lastDirection = "s";
        }else if(direction === "d" && this.lastDirection !== "a"){   //RIGHT
            this.xSpeed = 10;
            this.ySpeed = 0;
            this.lastDirection = "d";
        }
    }

    this.eat = function(fruit){
        if(this.x === fruit.x && this.y === fruit.y){
            this.total++;
            return true;
        } 
        return false;
    }
}