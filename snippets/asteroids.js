// tiny asteroids - a tiny js asteroids game - the vector version
// (c) 2019 by @sschepis
// MIT License
// this is a reproduction of the original asteroids game. it is not a clone.
// the original asteroids game was created by Atari in 1979.

// the game is played on a 2d plane. the player controls a spaceship
// that can move in any direction. the spaceship can shoot bullets
// that destroy asteroids. the game ends when the spaceship is destroyed.
// the ship and the asteroids are represented by vectors. the ship is
// represented by a vector with a direction and a magnitude. the asteroids
// are represented by vectors with a direction and a magnitude. the
// magnitude of the ship is the speed of the ship. the magnitude of the
// asteroids is the speed of the asteroids. the direction of the ship
// is the direction the ship is facing. the direction of the asteroids
// is the direction the asteroids are moving. The game starts on the
// title screen. The title screen is a black screen with the title
// "tiny asteroids" in white text. The title screen is displayed until
// the user presses the space bar, which starts the game. The game
// starts with a single asteroid. The asteroid is a white polygon with
// a black outline. The asteroid is displayed somewhere on the screen,
// The asteroid is moving in a random direction. The ship is
// a white triangle with a black outline. The ship is displayed in the
// center of the screen. The ship is facing up. The ship is not moving.
// The game is played by pressing the arrow keys to move the ship and
// the space bar to shoot bullets. An extra life is awarded every 10
// asteroids destroyed. The game ends when the ship is destroyed.

// the game loop logic:
// 1. clear the screen
// 2. draw the title screen
// 3. wait for the user to press the space bar
// 4. start the game
// 5. draw the ship
// 6. draw the asteroids
// 7. draw the bullets
// 8. wait for the user to press the arrow keys or the space bar
// 9. move the ship
// 10. move the asteroids
// 11. move the bullets
// 12. check for collisions
// 13. check for game over
// 14. repeat from step 5

// the game loop is implemented using a recursive setTimeout function.

// the game consists of the following classes:
// - Vector: a vector with a direction and a magnitude
// - Ship: a ship represented by a vector
// - Asteroid: an asteroid represented by a vector
// - Bullet: a bullet represented by a vector
// - Asteroids: the game class

// the gameuses the context variable in the scope todraw the game
document.body.style.background = 'black';
document.querySelector('#canvas').style.background = 'black';
// set the canvas font to hyperspace

canvas.width = 800
canvas.height = window.innerHeight
class Asteroids {
    constructor() {
        this.ship = new Ship();
        this.asteroids = [];
        this.bullets = [];
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.gameOver = false;
        this.titleScreen = true;
        this.titleScreenText = "tiny asteroids";
        this.titleScreenText2 = "press space to start";
        this.titleScreenText3 = "press arrow keys to move";
        this.titleScreenText4 = "press space to shoot";
        this.titleScreenText5 = "created by @sschepis";
        this.titleScreenText6 = "MIT License";
        this.yPos = 100;
    }

    // the game loop
    loop() {
        // clear the screen
        context.clearRect(0, 0, canvas.width, canvas.height);

        // draw the title screen
        if (this.titleScreen) {
            this.drawTitleScreen();
            return;
        }

        // draw the ship
        this.ship.draw();

        // draw the asteroids
        for (let i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].draw();
        }

        // draw the bullets
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].draw();
        }

        // draw the score
        context.fillStyle = "white";
        context.font = "20px Arial";
        context.fillText("score: " + this.score, 10, 20);

        // draw the lives
        context.fillStyle = "white";
        context.font = "20px Arial";
        context.fillText("lives: " + this.lives, 10, 40);

        // draw the level
        context.fillStyle = "white";
        context.font = "20px Arial";
        context.fillText("level: " + this.level, 10, 60);

        // check for game over
        if (this.gameOver) {
            this.drawGameOverScreen();
            return;
        }

        // move the ship
        this.ship.move();

        // move the asteroids
        for (let i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].move();
        }

        // move the bullets
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].move();
        }

        // check for collisions
        this.checkCollisions();

        // repeat the game loop
        setTimeout(this.loop.bind(this), 1000 / 60);
    }

    // get the width of the text
    getTextWidth(text,fsize='20px') {
        context.font = `${fsize} Hyperspace`;
        return context.measureText(text).width;
    }

    // get the x pos of text centered on the screen
    getCenteredTextX(text,fsize) {
        return (canvas.width - this.getTextWidth(text, fsize)) / 2;
    }

    // draw text centered on the screen, tracking the y pos
    // internnally such that the next text is drawn below the
    // previous text
    drawCenteredText(text, fsize) {
        if (this.yPos === undefined) {
            this.yPos = 0;
        }
        context.fillStyle = "white";
        context.font = `${fsize} Hyperspace`;
        context.fillText(text, this.getCenteredTextX(text, fsize), this.yPos);
        this.yPos += 20;
    }

    resetTextYPos() {
        this.yPos = 100;
    }


    // draw the title screen
    drawTitleScreen() {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        this.drawCenteredText(this.titleScreenText, '24px');
        this.yPos += 10
        this.drawCenteredText(this.titleScreenText2);
        this.drawCenteredText(this.titleScreenText3);
        this.drawCenteredText(this.titleScreenText4);
        this.drawCenteredText(this.titleScreenText5);
        this.drawCenteredText(this.titleScreenText6);
        this.resetTextYPos();
    }

    // draw the game over screen
    drawGameOverScreen() {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "white";
        context.font = "20px Arial";
        this.drawCenteredText("game over");
        this.drawCenteredText("press space to restart");
        this.drawCenteredText("score: " + this.score);
        this.drawCenteredText("level: " + this.level);
        this.resetTextYPos();
    }

    // check for collisions
    checkCollisions() {
        // check for collisions between the ship and the asteroids
        for (let i = 0; i < this.asteroids.length; i++) {
            if (this.ship.collidesWith(this.asteroids[i])) {
                this.asteroids.splice(i, 1);
                this.lives--;
                zzfx(...[2.06,,389,,.15,.46,2,.16,.4,.5,,,,1.4,,.3,.23,.46,.08]); // Explosion 40
                if (this.lives === 0) {
                    this.gameOver = true;
                }
            }
        }

        // check for collisions between the bullets and the asteroids
        for (let i = 0; i < this.asteroids.length; i++) {
            for (let j = 0; j < this.bullets.length; j++) {
                if (this.bullets[j].collidesWith(this.asteroids[i])) {
                    const newAsteroids = this.asteroids[i].explode();
                    this.asteroids.splice(i, 1);
                    this.bullets.splice(j, 1);
                    zzfx(...[1.08,,713,.02,.19,.54,2,1.41,,.5,,,.18,1.5,,.8,,.47,.19,.01]); // Explosion 24
                    this.score++;
                    if (this.score % 10 === 0) {
                        this.lives++;
                    }
                    if (this.asteroids.length === 0) {
                        this.level++;
                        this.addAsteroids();
                    }
                    newAsteroids.push(...this.asteroids);
                }
            }
        }
    }

    // add asteroids to the game
    addAsteroids() {
        for (let i = 0; i < this.level; i++) {
            this.asteroids.push(new Asteroid());
        }
    }

    // start the game
    start() {
        this.addAsteroids();
        this.loop();
    }
}

class Asteroid {
    constructor(size = 10) {
        this.position = new Vector(Math.random() * canvas.width, Math.random() * canvas.height);
        this.velocity = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
        this.radius = size;
        this.createVertices();
    }

    createVertices() {
        this.vertices = [];
        for (let i = 0; i < 10; i++) {
            this.vertices.push(new Vector(Math.random() * this.radius * 2 - this.radius, Math.random() * this.radius * 2 - this.radius));
        }
    }

    // draw the asteroid
    draw() {
        context.strokeStyle = "white";
        context.beginPath();
        context.moveTo(this.position.x + this.vertices[0].x, this.position.y + this.vertices[0].y);
        for (let i = 1; i < this.vertices.length; i++) {
            context.lineTo(this.position.x + this.vertices[i].x, this.position.y + this.vertices[i].y);
        }
        context.closePath();
        context.stroke();
    }

    // move the asteroid
    move() {
        this.position.add(this.velocity);
        if (this.position.x < 0) {
            this.position.x = canvas.width;
        }
        if (this.position.x > canvas.width) {
            this.position.x = 0;
        }
        if (this.position.y < 0) {
            this.position.y = canvas.height;
        }
        if (this.position.y > canvas.height) {
            this.position.y = 0;
        }
    }

    // split up into smaller asteroids when hit the first time, and
    // remove the asteroid when hit the second time. returns new asteroids
    // if the asteroid is split
    explode() {
        if (this.radius === 10) {
            this.radius = 5;
            this.createVertices();
            return [new Asteroid(5), new Asteroid(5)];
        } else {
            return [];
        }
    }
}

class Bullet {
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 2;
    }

    // draw the bullet
    draw() {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        context.strokeStyle = "white";
        context.stroke();
    }

    // move the bullet
    move() {
        this.position.add(this.velocity);
        if (this.position.x < 0) {
            this.position.x = canvas.width;
        }
        if (this.position.x > canvas.width) {
            this.position.x = 0;
        }
        if (this.position.y < 0) {
            this.position.y = canvas.height;
        }
        if (this.position.y > canvas.height) {
            this.position.y = 0;
        }
    }

    // check for collisions
    collidesWith(asteroid) {
        if(!asteroid) {
            return false;
        }
        let distance = this.position.distance(asteroid.position);
        return distance < this.radius + asteroid.radius;
    }
}

class Ship {
    constructor() {
        this.position = new Vector(canvas.width / 2, canvas.height / 2);
        this.velocity = new Vector(0, 0);
        this.direction = 0;
        this.radius = 10;
        this.rotationSpeed = 0.1;
        this.thrust = 0.1;
        this.vertices = [];
        this.angle = 0;
        this.initVertices();
    }

    initVertices() {
        this.vertices.push(new Vector(-this.radius, this.radius));
        this.vertices.push(new Vector(0, -this.radius));
        this.vertices.push(new Vector(this.radius, this.radius));
    }
    // draw the ship
    draw() {
        context.strokeStyle = "white";
        context.beginPath();
        context.moveTo(this.position.x + this.vertices[0].x, this.position.y + this.vertices[0].y);
        for (let i = 1; i < this.vertices.length; i++) {
            context.lineTo(this.position.x + this.vertices[i].x, this.position.y + this.vertices[i].y);
        }
        context.closePath();
        context.stroke();
    }

    // move the ship
    move() {
        this.position.add(this.velocity);
        if (this.position.x < 0) {
            this.position.x = canvas.width;
        }
        if (this.position.x > canvas.width) {
            this.position.x = 0;
        }
        if (this.position.y < 0) {
            this.position.y = canvas.height;
        }
        if (this.position.y > canvas.height) {
            this.position.y = 0;
        }
    }

    // check for collisions
    collidesWith(asteroid) {
        let distance = this.position.distance(asteroid.position);
        return distance < this.radius + asteroid.radius;
    }

    // rotate all the vertices around the ships center
    rotate(direction) {
        for(var i = 0; i < this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i].rotateAroundPoint({x:0,y:0}, direction); 
        }
        this.angle += direction;
    }

    // thrust the ship
    thrustShip() { 
        this.velocity.x += this.thrust * Math.cos(this.position.x);
        this.velocity.y += this.thrust * Math.sin(this.position.y);
    }

    // fire a bullet
    fireBullet() {
        let v = new Vector();
        v.x = 2 * Math.cos(this.velocity.x + this.angle - Math.PI / 2);
        v.y = 2 * Math.sin(this.velocity.y + this.angle - Math.PI / 2);
        return new Bullet(new Vector(this.position.x, this.position.y), v);
    }

    // stop the ship
    stop() {
        this.velocity.x = 0;
        this.velocity.y = 0;
    }
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // add a vector to this vector
    add(vector) {
        this.x += vector.x;  
        this.y += vector.y;
        return this
    }

    // calculate the distance between this vector and another vector
    distance(vector) {
        let dx = this.x - vector.x;
        let dy = this.y - vector.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    rotateAroundPoint(point, angle) {
        let x = this.x - point.x;
        let y = this.y - point.y;
        let newX = x * Math.cos(angle) - y * Math.sin(angle);
        let newY = x * Math.sin(angle) + y * Math.cos(angle);
        this.x = newX + point.x;
        this.y = newY + point.y;
        return this;
    }
}

// create a new game
let game = new Asteroids();
let degree = (Math.PI*2/180);

// start the game
game.start();

// listen for key presses
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 37) { // left arrow
        game.ship.rotate(-degree);
    } else if (event.keyCode === 38) { // up arrow
        zzfx(...[,,299,.1,.12,0,2,.9,,,296,.17,,,-27,.6,,.88,.12,.03]); // Random 65
        game.ship.thrustShip();
    } else if (event.keyCode === 39) { // right arrow
        game.ship.rotate(degree);
    } else if (event.keyCode === 32) { // space bar
        // if this is the title or game over screen,
        // thenn start the game. otherwise, fire a bullet
        if (game.gameOver || game.titleScreen) {
            game.titleScreen = false;
            game.gameOver = false;
            game.start();
        } else {
            zzfx(...[,,647,,.21,.03,2,.04,,-11,,,,,,,,,.03,.18]); // Random 46
            game.bullets.push(game.ship.fireBullet());
        }
    }
});

document.addEventListener("touchStart", function(event) {
    if (event.keyCode === 37) {
        game.ship.rotate(-degree);
    } else if (event.keyCode === 38) {
        game.ship.thrustShip();
    } else if (event.keyCode === 39) {
        game.ship.rotate(degree);
    } else if (event.keyCode === 32) {
        game.bullets.push(game.ship.fireBullet());
    }
})

document.addEventListener("touchEnd", function(event) {
    if (event.keyCode === 38) {
        game.ship.stop();
    }
});
