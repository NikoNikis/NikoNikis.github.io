let dom_canvas = document.createElement("canvas");
document.querySelector("#canvas").appendChild(dom_canvas);
let CTX = dom_canvas.getContext("2d");

const W = (dom_canvas.width = 500);
const H = (dom_canvas.height = 500);

let serpiente,
    comida,
    casillas,
    celdas = 20,
    cellSize,
    isGameOver = false,
    tails = [],
    score = 00,
    maxScore = window.localStorage.getItem("maxScore") || undefined,
    cellsCount,
    requestID;

let ayudante = {
    Vector: class {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        añadir(v) {
            this.x += v.x;
            this.y += v.y;
            return this;
        }
    },
    colision(v1, v2) {
        return v1.x == v2.x && v1.y == v2.y;
    },

    casillas() {
        CTX.lineWidth = 1.1;
        CTX.strokeStyle = "rgba(0,0,255,0.5)";
        CTX.shadowBlur = 0;
        for (let i = 1; i < celdas; i++) {
            let f = (W / celdas) * i;
            CTX.beginPath();
            CTX.moveTo(f, 0);
            CTX.lineTo(f, H);
            CTX.stroke();
            CTX.beginPath();
            CTX.moveTo(0, f);
            CTX.lineTo(W, f);
            CTX.stroke();
            CTX.closePath();
        }
    },
    casillaAleatoria() {
        return ~~(Math.random() * 360);
    },
};

let KEY = {
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowLeft: false,
    resetState() {
        this.ArrowUp = false;
        this.ArrowRight = false;
        this.ArrowDown = false;
        this.ArrowLeft = false;
    },
    listen() {
        addEventListener(
            "keydown",
            (e) => {
                if (e.key === "ArrowUp" && this.ArrowDown) return;
                if (e.key === "ArrowDown" && this.ArrowUp) return;
                if (e.key === "ArrowLeft" && this.ArrowRight) return;
                if (e.key === "ArrowRight" && this.ArrowLeft) return;
                this[e.key] = true;
                Object.keys(this)
                    .filter((f) => f !== e.key && f !== "listen" && f !== "resetState")
                    .forEach((k) => {
                        this[k] = false;
                    });
            },
            false
        );
    },
};

class Serpiente {
    constructor(i, type) {
        this.pos = new ayudante.Vector(W / 2, H / 2);
        this.dir = new ayudante.Vector(0, 0);
        this.index = i;
        
        this.size = W / celdas;
        this.color = "green";
        this.history = [];
        this.total = 1;
    }
    draw() {
        let { x, y } = this.pos;
        CTX.fillStyle = this.color;
        CTX.shadowColor = "green";
        CTX.fillRect(x, y, this.size, this.size);
        CTX.shadowBlur = 0;
        if (this.total >= 2) {
            for (let i = 0; i < this.history.length - 1; i++) {
                let { x, y } = this.history[i];
                CTX.lineWidth = 1;
                CTX.fillStyle = "green";
                CTX.fillRect(x, y, this.size, this.size);
            }
        }
    }
    paredes() {
        let { x, y } = this.pos;
        if (x + cellSize > W) {
            isGameOver = true;
        }
        if (y + cellSize > W) {
            isGameOver = true;
        }
        if (y < 0) {
            isGameOver = true;
        }
        if (x < 0) {
            isGameOver = true;
        }
    }
    controles() {
        let dir = this.size;
        if (KEY.ArrowUp) {
            this.dir = new ayudante.Vector(0, -dir);
        }
        if (KEY.ArrowDown) {
            this.dir = new ayudante.Vector(0, dir);
        }
        if (KEY.ArrowLeft) {
            this.dir = new ayudante.Vector(-dir, 0);
        }
        if (KEY.ArrowRight) {
            this.dir = new ayudante.Vector(dir, 0);
        }
    }
    suicidio() {
        for (let i = 0; i < this.history.length; i++) {
            let p = this.history[i];
            if (ayudante.colision(this.pos, p)) {
                isGameOver = true;
            }
        }
    }
    update() {
        this.paredes();
        this.draw();
        this.controles();
        if (!this.delay--) {
            if (ayudante.colision(this.pos, comida.pos)) {
                aumentarScore();
                comida.reaparicion();
                this.total++;
            }
            this.history[this.total - 1] = new ayudante.Vector(
                this.pos.x,
                this.pos.y
            );
            for (let i = 0; i < this.total - 1; i++) {
                this.history[i] = this.history[i + 1];
            }
            this.pos.añadir(this.dir);
            this.delay = 5;
            this.total > 3 ? this.suicidio() : null;
        }
    }
}

class Comida {
    constructor() {
        this.pos = new ayudante.Vector(
            ~~(Math.random() * celdas) * cellSize,
            ~~(Math.random() * celdas) * cellSize
        );
        this.color = casillas = `hsl(${~~(Math.random() * 360)},100%,50%)`;
        this.size = cellSize;
    }
    draw() {
        let { x, y } = this.pos;
        CTX.fillStyle = this.color;
        CTX.fillRect(x, y, this.size, this.size);
        CTX.globalCompositeOperation = "source-over";
        CTX.shadowBlur = 0;
    }
    reaparicion() {
        let randX = ~~(Math.random() * celdas) * this.size;
        let randY = ~~(Math.random() * celdas) * this.size;
        for (let path of serpiente.history) {
            if (ayudante.colision(new ayudante.Vector(randX, randY), path)) {
                return this.reaparicion();
            }
        }
        this.color = casillas = `hsl(${ayudante.casillaAleatoria()}, 100%, 50%)`;
        this.pos = new ayudante.Vector(randX, randY);
    }
}

function aumentarScore() {
    score++;
    document.querySelector("#score").innerText = score
        .toString()
        .padStart(2, "0");
}

function clear() {
    CTX.clearRect(0, 0, W, H);
}

function initialize() {
    CTX.imageSmoothingEnabled = false;
    KEY.listen();
    cellsCount = celdas * celdas;
    cellSize = W / celdas;
    serpiente = new Serpiente();
    comida = new Comida();
    loop();
}

function loop() {
    clear();
    if (!isGameOver) {
        requestID = setTimeout(loop, 1000 / 60);
        ayudante.casillas();
        serpiente.update();
        comida.draw();
    } else {
        clear();
        Fin();
    }
}

function Fin() {
    maxScore ? null : (maxScore = score);
    score > maxScore ? (maxScore = score) : null;
    window.localStorage.setItem("maxScore", maxScore);
    CTX.fillStyle = "red";
    CTX.textAlign = "center";
    CTX.font = "bold 30px sans-serif";
    CTX.fillText("PERDISTE", W / 2, H / 2);
    CTX.font = "15px sans-serif";
    CTX.fillText(`SCORE   ${score}`, W / 2, H / 2 + 60);
    CTX.fillText(`MAXSCORE   ${maxScore}`, W / 2, H / 2 + 80);
}

function reset() {
    document.querySelector("#score").innerText = "00";
    score = "00";
    serpiente = new Serpiente();
    comida.reaparicion();
    KEY.resetState();
    isGameOver = false;
    clearTimeout(requestID);
    loop();
}

initialize();
