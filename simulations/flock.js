class Flock extends Simulation {
    constructor(containerId) {
        super(containerId);
        this.numberOfBoids = 100;
        this.visionRadius = 0.1;
        this.maxVel = 0.007;
        this.maxAcc = 0.0001;
        this.avoidEdges = false;
        this.avoidCursor = false;
    }

    start() {   
        for (let i = 0; i < this.numberOfBoids; i++) {
            const posX = Math.random();
            const posy = Math.random();
            const velX = Math.random() - (1 / 2);
            const velY = Math.random() - (1 / 2);
            const boid = new Boid(posX, posy, velX, velY, 0, 0);
            boid.createElement();
            this.container.appendChild(boid.element);
            this.particles.push(boid);
        }

        this.isRunning = true; 
        this.interval = setInterval(() => {
            if (this.isRunning) {
                this.particles.forEach(boid => this.updateBoid(boid));
            }
        }, 1000 / 60);
    }

    updateBoid(boid) {
        boid.warp();
        boid.rotate();
        [boid.velX, boid.velY] = boid.scaleVector(boid.velX, boid.velY, this.maxVel);
        boid.flock(this.particles, this.visionRadius, this.maxAcc, this.avoidEdges, this.avoidCursor);
        boid.update();
        boid.render();
    }
}