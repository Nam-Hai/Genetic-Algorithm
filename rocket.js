class Rocket {
    constructor() {
        this.pos = createVector();
        this.vel = createVector();
        this.acc = createVector();
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
}