class Rocket {
    constructor(dna) {
        this.pos = createVector(width / 2, height - 1);
        this.vel = createVector();
        this.acc = createVector();

        if (dna) {
            this.dna = dna;
        } else {
            this.dna = new DNA();
        }

        this.crashed = false;
        this.win = false;
        this.age = 0;
        this.point = 0;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    calcPoint() {
        let d = dist(this.pos.x, this.pos.y, target.x, target.y);

        this.point = 1 / (1 + d);

        if (this.win) {
            let speedPoint = map(this.age, 0, 200, 1, 0, true)
            this.point += speedPoint;
            this.point *= 5;
        }
        // if (this.crashed || (!this.crashed && this.win)) {
        //     let agePoint = map(this.age, 0, 200, 0, 1, true) / 3;
        //     this.point += agePoint;
        // }
        // if (!this.crashed && !this.win) {
        //     let agePoint = map(this.age, 0, 200, 0, 1, true);
        //     this.point += agePoint;
        // }
    }

    update() {
        this.applyForce(this.dna.genes[counter])
        this.stopTest();
        if (this.crashed || this.win) return

        this.age = counter;
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading())
        rectMode(CENTER);
        noStroke()
        fill(50, 50, 50, 90)
        rect(0, 0, 30, 5);
        pop();
    }

    stopTest() {
        let d = dist(this.pos.x, this.pos.y, target.x, target.y);
        if (d < 10) {
            this.win = true;
        }

        // Stop at edge
        if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
            this.crashed = true;
        }

        // stop at obstacle

        if (this.pos.x > rectX && this.pos.x < rectX + rectW && this.pos.y > rectY && this.pos.y < rectY + rectH) {
            this.crashed = true;
        }

        if (this.pos.x > rectX + rectW + 25 && this.pos.x < rectX + rectW + 25 + rectW && this.pos.y > rectY && this.pos.y < rectY + rectH) {
            this.crashed = true;
        }
    }
}