let defensor;

let bolas = [];

let pontos = 0;

let vidas = 3;

function setup() {

  createCanvas(600, 400);

  defensor = new Defensor();

  frameRate(60);

}

function draw() {

  background(51);

  

  // Mostrar e mover defensor

  defensor.mostrar();

  defensor.mover();

  // Gerar bolas aleatórias

  if (frameCount % 60 == 0) {

    bolas.push(new Bola());

  }

  // Atualizar bolas

  for (let i = bolas.length - 1; i >= 0; i--) {

    bolas[i].mover();

    bolas[i].mostrar();

    if (bolas[i].passou()) {

      vidas--;

      bolas.splice(i, 1);

    } else if (bolas[i].colidiu(defensor)) {

      pontos++;

      bolas.splice(i, 1);

    }

  }

  // Mostrar placar

  fill(255);

  textSize(16);

  text("Pontos: " + pontos, 10, 20);

  text("Vidas: " + vidas, 10, 40);

  if (vidas <= 0) {

    noLoop();

    textSize(32);

    textAlign(CENTER);

    text("Game Over", width/2, height/2);

  }

}

// Classe do defensor

class Defensor {

  constructor() {

    this.x = width / 2;

    this.y = height - 30;

    this.tam = 60;

    this.vel = 7;

  }

  mostrar() {

    fill(0, 255, 0);

    rectMode(CENTER);

    rect(this.x, this.y, this.tam, 15);

  }

  mover() {

    if (keyIsDown(LEFT_ARROW)) {

      this.x -= this.vel;

    }

    if (keyIsDown(RIGHT_ARROW)) {

      this.x += this.vel;

    }

    this.x = constrain(this.x, this.tam/2, width - this.tam/2);

  }

}

// Classe da bola

class Bola {

  constructor() {

    this.x = random(width);

    this.y = 0;

    this.vel = random(2, 5);

    this.raio = 15;

  }

  mostrar() {

    fill(255, 0, 0);

    ellipse(this.x, this.y, this.raio*2);

  }

  mover() {

    this.y += this.vel;

  }

  passou() {

    return this.y > height;

  }

  colidiu(defensor) {

    return (

      this.y + this.raio > defensor.y - 7 &&

      this.y - this.raio < defensor.y + 7 &&

      this.x > defensor.x - defensor.tam/2 &&

      this.x < defensor.x + defensor.tam/2

    );

  }

}


