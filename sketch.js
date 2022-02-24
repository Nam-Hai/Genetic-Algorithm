let rocket;
let population;

function setup() {
  createCanvas(400, 300);
  population = new Population();
}

function draw() {
  background(220);
  population.run()
}

class Population {
  constructor() {
    this.rockets = [];
    this.popsize = 25;

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

}