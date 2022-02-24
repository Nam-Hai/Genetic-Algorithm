let rocket;
let population;
let counter;
let lifeP;
let target;
const speed = 0.3;
const popul = 400;
const rectX = 100;
const rectY = 200;
const rectW = 150;
const rectH = 10;

const generationCountDiv = document.querySelector(".generationCount");
let generation = 0;
const lifespan = 200;


function setup() {
  createCanvas(400, 300);
  population = new Population();
  counter = 0;


  lifeP = createP();

  target = createVector(width / 2, 50)
}

function draw() {
  background(220);
  population.run()
  lifeP.html(counter);
  counter++;

  if (counter == lifespan) {
    population.evaluate();
    population.selection()
    counter = 0;
    generation++;
    generationCountDiv.textContent = "Generation : " + generation;
  }

  // Obstacle
  rect(rectX, rectY, rectW, rectH);

  rect(rectX + rectW + 25, rectY, rectW, rectH)
  // Target
  ellipse(target.x, target.y, 16, 16)
}

class Population {
  constructor() {
    this.rockets = [];
    this.popsize = popul;
    this.matingPool = [];

    for (let i = 0; i < this.popsize; i++) {
      this.rockets.push(new Rocket())
    }
  }

  run() {
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }

  evaluate() {
    let maxPoint = 0;

    for (let roc of this.rockets) {
      roc.calcPoint();
      if (roc.point > maxPoint) {
        maxPoint = roc.point;
      }
    }

    // Normalize points
    for (let roc of this.rockets) {
      roc.point /= maxPoint;
    }

    this.matingPool = [];

    // increase chances for better rockets to be picked (to mate)
    for (let roc of this.rockets) {
      let n = roc.point * 40;

      for (let j = 0; j < n; j++) {
        this.matingPool.push(roc);
      }
    }

  }

  selection() {
    let newRockets = [];

    for (let i = 0; i < this.rockets.length; i++) {
      let parentA = random(this.matingPool).dna;
      let parentB = random(this.matingPool).dna;

      let child = parentA.crossoverOnePoint(parentB);
      child.mutation();
      newRockets.push(new Rocket(child))
    }
    this.rockets = newRockets;
  }
}

class DNA {
  constructor(genes) {
    if (genes) {
      this.genes = genes;
    } else {
      this.genes = [];

      for (let i = 0; i < lifespan; i++) {
        this.genes.push(p5.Vector.random2D())
        this.genes[i].setMag(speed)
      }
    }
  }

  crossoverOnePoint(partnerDNA) {
    let newGenes = [];
    let mid = floor(random(this.genes.length));

    for (let i = 0; i < this.genes.length; i++) {
      if (i > mid) {
        newGenes.push(this.genes[i]);
      } else {
        newGenes.push(partnerDNA.genes[i]);
      }
    }
    return new DNA(newGenes)
  }

  crossoverUniform(partnerDNA) {
    let newGenes = [];
    for (let i = 0; i < this.genes.length; i++) {
      let r = random(0, 2);
      if (r <= 1) {
        newGenes.push(this.genes[i]);
      } else {
        newGenes.push(partnerDNA.genes[i]);
      }

    }
    return new DNA(newGenes)
  }

  mutation() {
    for (let gene of this.genes) {
      if (random(1) < 0.5) {
        gene = p5.Vector.random2D();
        gene.setMag(speed)
      }
    }
    if (random(1) < 0.005) {
      for (let gene of this.genes) {
        gene = p5.Vector.random2D();
        gene.setMag(speed)
      }
    }
  }
}