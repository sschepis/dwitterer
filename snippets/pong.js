// javascript pong
// a pong game written in javascript. can be played with one player or no players.
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const pongState = {
    canvas: {
        width: 600,
        height: 400,
        background: 'black',
    },
    ball: {
        radius: 10,
        color: 'white',
        speed: 5,
    },
    paddle: {
        width: 10,
        height: 50,
        color: 'white',
        speed: 5,
    },
    ai: {
        speed: 5,
    },
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'w') {
        pongState.player1.up = true;
    }
    if (e.key === 's') {
        pongState.player1.down = true;
    }
    if (e.key === 'ArrowUp') {
        pongState.player2.up = true;
    }
    if (e.key === 'ArrowDown') {
        pongState.player2.down = true;
    }

    if (e.key === 'Enter') {
        pongState.running = true;
    }

    if (e.key === 'Escape') {
        pongState.running = false;
    }

    if (e.key === 'r') {
        pongState.score.player1 = 0;
        pongState.score.player2 = 0;
        pongState.running = false;
    }

    if (e.key === 'p') {
        pongState.running = !pongState.running;
    }

    if (e.key === '1') {
        pongState.players = 1;
    }

    if (e.key === '2') {
        pongState.players = 2;
    }

    if (e.key === '0') {
        pongState.players = 0;
    }
    
    if (e.key === 'h') {
        pongState.ai = 'hard';
    }

    if (e.key === 'i') {
        pongState.ai = 'impossible';
    }

    if (e.key === 'e') {
        pongState.ai = 'easy';
    }
});


function init() {
    pongState.canvas = document.getElementById('pongCanvas');
    pongState.canvas.width = pongState.canvas.width;
    pongState.canvas.height = pongState.canvas.height;
    pongState.canvas.style.background = pongState.canvas.background;
    pongState.ctx = pongState.canvas.getContext('2d');

    pongState.player1 = new Paddle(0, pongState.canvas.height / 2 - pongState.paddle.height / 2, pongState.paddle.width, pongState.paddle.height, pongState.paddle.color);
    pongState.player2 = new Paddle(pongState.canvas.width - pongState.paddle.width, pongState.canvas.height / 2 - pongState.paddle.height / 2, pongState.paddle.width, pongState.paddle.height, pongState.paddle.color);
    pongState.ball = new Ball(pongState.canvas.width / 2, pongState.canvas.height / 2, pongState.ball.radius, pongState.ball.color);
}
function update() {
    if (pongState.running) {
        pongState.player1.update();
        pongState.player2.update();
        pongState.ball.update();
    }
}
function draw() {
    pongState.ctx.clearRect(0, 0, pongState.canvas.width, pongState.canvas.height);
    pongState.player1.draw();
    pongState.player2.draw();
    pongState.ball.draw();
    pongState.ctx.fillStyle = 'white';
    pongState.ctx.font = '30px Arial';
    pongState.ctx.fillText(pongState.score.player1, pongState.canvas.width / 2 - 50, 50);
    pongState.ctx.fillText(pongState.score.player2, pongState.canvas.width / 2 + 50, 50);
}

class Paddle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.up = false;
        this.down = false;
    }
    update() {
        if (this.up && this.y > 0) {
            this.y -= pongState.paddle.speed;
        }
        if (this.down && this.y < pongState.canvas.height - this.height) {
            this.y += pongState.paddle.speed;
        }

        if (pongState.players === 1) {
            if (pongState.ai === 'easy') {
                if (pongState.ball.y < this.y) {
                    this.y -= pongState.ai.speed;
                }
                if (pongState.ball.y > this.y) {
                    this.y += pongState.ai.speed;
                }
            }
            if (pongState.ai === 'hard') {
                if (pongState.ball.y < this.y) {
                    this.y -= pongState.ai.speed;
                }
                if (pongState.ball.y > this.y) {
                    this.y += pongState.ai.speed;
                }
            }
            if (pongState.ai === 'impossible') {
                if (pongState.ball.y < this.y) {
                    this.y -= pongState.ai.speed;
                }
                if (pongState.ball.y > this.y) {
                    this.y += pongState.ai.speed;
                }
            }
        }
    }
    draw() {
        pongState.ctx.fillStyle = this.color;
        pongState.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class AI {
    constructor() {
        this.up = false;
        this.down = false;
    }
    update() {
        if (pongState.ai === 'hard') {
            if (pongState.ball.y < pongState.player2.y) {
                this.up = true;
                this.down = false;
            }
            if (pongState.ball.y > pongState.player2.y + pongState.player2.height) {
                this.up = false;
                this.down = true;
            }
        }
        if (pongState.ai === 'impossible') {
            if (pongState.ball.y < pongState.player2.y + pongState.player2.height / 2) {
                this.up = true;
                this.down = false;
            }
            if (pongState.ball.y > pongState.player2.y + pongState.player2.height / 2) {
                this.up = false;
                this.down = true;
            }
        }
        if (pongState.ai === 'easy') {
            if (pongState.ball.y < pongState.player2.y + pongState.player2.height / 2) {
                this.up = true;
                this.down = false;
            }
            if (pongState.ball.y > pongState.player2.y + pongState.player2.height / 2) {
                this.up = false;
                this.down = true;
            }
            if (Math.random() < 0.5) {
                this.up = false;
                this.down = false;
            }
        }
    }

    draw() {
        pongState.ctx.fillStyle = pongState.paddle.color;
        pongState.ctx.fillRect(pongState.player2.x, pongState.player2.y, pongState.player2.width, pongState.player2.height);
    }

    play() {
        this.update();
        this.draw();
    }
}

class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocityX = pongState.ball.speed;
        this.velocityY = pongState.ball.speed;
    }
    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.y + this.radius > pongState.canvas.height || this.y - this.radius < 0) {
            this.velocityY = -this.velocityY;
        }

        const player = (this.x < pongState.canvas.width / 2) ? pongState.player1 : pongState.player2;

        if (this.x - this.radius < player.x + player.width && this.x + this.radius > player.x && this.y + this.radius > player.y && this.y - this.radius < player.y + player.height) {
            this.velocityX = -this.velocityX;
        }

        if (this.x - this.radius < 0) {
            pongState.score.player2++;
            this.reset();
        }
        if (this.x + this.radius > pongState.canvas.width) {
            pongState.score.player1++;
            this.reset();
        }
    }
    draw() {
        pongState.ctx.fillStyle = this.color;
        pongState.ctx.beginPath();
        pongState.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        pongState.ctx.closePath();
        pongState.ctx.fill();
    }
    reset() {
        this.x = pongState.canvas.width / 2;
        this.y = pongState.canvas.height / 2;
        this.velocityX = pongState.ball.speed;
        this.velocityY = pongState.ball.speed;
    }
}

// start game in 0-player mode with game running
pongState.players = 0;
pongState.running = true;

init();

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();