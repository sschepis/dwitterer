// tiny space invaders - a tiny js space invaders game
// (c) 2019 by @sschepis
// MIT License
canvas.width = 800;
canvas.height = 600;
canvas.style.background = 'black';

let yPos = 60;

// game settings
const settings = {
    // game dimensions
    width: 400,
    height: 400,
    // game speed
    speed: 100,
    // player settings
    player: {
        width: 20,
        height: 20,
        color: 'white',
        speed: 10,
    },
    // bullet settings
    bullet: {
        width: 5,
        height: 10,
        color: 'white',
        speed: 10,
    },
    // enemy settings
    enemy: {
        width: 20,
        height: 20,
        color: 'white',
        speed: 10,
    },
};

// game state
const state = {
    // game objects
    player: null,
    bullets: [],
    enemies: [],
    // game state
    running: false,
    // game score
    score: 0,
};

// game objects
class GameObject {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        x.fillStyle = this.color;
        x.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Player extends GameObject {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
    }

    moveLeft() {
        this.x -= settings.player.speed;
    }

    moveRight() {
        this.x += settings.player.speed;
    }

    shoot() {
        const bullet = new Bullet(
            this.x + this.width / 2,
            this.y,
            settings.bullet.width,
            settings.bullet.height,
            settings.bullet.color,
        );
        state.bullets.push(bullet);
    }
}

class Bullet extends GameObject {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
    }

    move() {
        this.y -= settings.bullet.speed;
    }
}

class Enemy extends GameObject {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
    }

    move() {
        this.y += settings.enemy.speed;
    }
}

// game functions
function init() {
    // create player
    state.player = new Player(
        settings.width / 2,
        settings.height - settings.player.height,
        settings.player.width,
        settings.player.height,
        settings.player.color,
    );
    // create enemies
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const enemy = new Enemy(
                i * settings.enemy.width * 2,
                j * settings.enemy.height * 2,
                settings.enemy.width,
                settings.enemy.height,
                settings.enemy.color,
            );
            state.enemies.push(enemy);
        }
    }
}


function update() {
    // update player
    if (state.player.x < 0) {
        state.player.x = 0;
    }
    if (state.player.x > settings.width - state.player.width) {
        state.player.x = settings.width - state.player.width;
    }
    // update bullets
    state.bullets.forEach((bullet) => {
        bullet.move();
    });
    // update enemies
    state.enemies.forEach((enemy) => {
        enemy.move();
    });
}

function drawGame() {
    // clear canvas
    x.clearRect(0, 0, settings.width, settings.height);
    // draw player
    state.player.draw();
    // draw bullets
    state.bullets.forEach((bullet) => {
        bullet.draw();
    });
    // draw enemies
    state.enemies.forEach((enemy) => {
        enemy.draw();
    });
}
function draw() {
    switch (state.gameState) {
        case 'title':
            titlePage();
            break;
        case 'game':
            drawGame();
            break;
        case 'gameover':
            gameOver();
            break;
    }
    requestAnimationFrame(draw);
}

function getTextWidth(text, fonSize = '16') {
    x.font = `${fonSize}px Arial`;
    return x.measureText(text).width;
}

function showTextCentered(text, fonSize = '16') {
    const textWidth = getTextWidth(text, fonSize);
    const x = (settings.width - textWidth) / 2;
    const y = state.yPos;
    x.font = `${fonSize}px Arial`;
    x.fillText(text, x, y);
    state.yPos += 20;
}

// game over
function gameOver() {
    state.yPos = 60;
    state.gameState = 'gameover';
    // display a game over page with the words 'Game Over'
    // and a 'restart' button
    showTextCentered('Game Over')
}

function titlePage() {
    state.yPos = 60;
    state.gameState = 'title';
    // display a title page with the words 'Space Invaders'
    // and a 'start' button
    showTextCentered('Space Invaders')
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

function start() {
    state .gameState= 'title';
    init();
    titlePage()
    loop();
}

// arrow keys move the player left and right. space bar shoots
// as well as starts the game. the game ends when the player
// is hit by an enemy or when an enemy reaches the bottom of
// the screen.
document.addEventListener('keydown', (e) => {
    if (!state.running) {
        start();
    }
    switch (e.keyCode) {
        case 37:
            state.player.moveLeft();
            break;
        case 39:
            state.player.moveRight();
            break;
        case 32:
            if(gameState === 'title' || gameState === 'gameover') {
                gameState = 'game'
            }
            if(gameState === 'game') {
                state.player.shoot();
            }
            break;
    }
});
