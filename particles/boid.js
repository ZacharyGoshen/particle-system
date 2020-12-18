class Boid extends Particle {
    constructor(posX, posY, velX, velY, accX, accY) {
        super(posX, posY, velX, velY, accX, accY);
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('boid');
    }

    /* Boid warps to opposite side of the container if it goes out of bounds */
    warp() {
        if (this.posX < 0) {
            this.posX = 1;
        } else if (this.posX > 1) {
            this.posX = 0;
        }
        if (this.posY < 0) {
            this.posY = 1;
        } else if (this.posY > 1) {
            this.posY = 0;
        }
    }

    /* Rotate boid to face its current velocity */
    rotate() {
        let angle = Math.atan((window.innerHeight / window.innerWidth) * (this.velY / this.velX)) - (Math.PI / 2);
        if (this.velX > 0) {
            angle = angle + Math.PI;
        } else {
            angle = angle;
        }
        this.element.style.transform = `rotate(${angle}rad)`;
    }

    /* Find all the boids within a given radius */
    getNearbyBoids(boids, radius) {
        const nearbyBoids = [];
        boids.forEach(otherBoid => {
            if (this == otherBoid) {
                return;
            } 
            const a = this.posX - otherBoid.posX;
            const b = this.posY - otherBoid.posY;
            const distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
            if (distance < radius) {
                nearbyBoids.push(otherBoid);
            }
        })
        return nearbyBoids;
    }

    flock(boids, radius, maxAcc, avoidEdges, avoidCursor) {
        const nearbyBoids = this.getNearbyBoids(boids, radius);

        let cohesionForce = [0, 0]; // Accelerate boid to average pos of its neighbors
        let alignmentForce = [0, 0]; // Accelerate boid towards average velocity of its neighbors
        let seperationForce = [0, 0]; // Accelerate boid away from its neighbors to prevent clumping
        nearbyBoids.forEach(boid => {
            cohesionForce[0] += boid.posX;
            cohesionForce[1] += boid.posY;

            alignmentForce[0] += boid.velX;
            alignmentForce[1] += boid.velY;

            const a = this.posX - boid.posX;
            const b = this.posY - boid.posY;
            const distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
            seperationForce[0] += (this.posX - boid.posX) / distance;
            seperationForce[1] += (this.posY - boid.posY) / distance;
        });

        if (nearbyBoids.length != 0) {
            cohesionForce = cohesionForce.map(value => value / nearbyBoids.length);
            alignmentForce = alignmentForce.map(value => value / nearbyBoids.length);
        }

        /* Make boids avoid edges of screen */
        let edgeAvoidanceForce = [0, 0];
        if (avoidEdges) {
            if (this.posX > 0 && this.posX < 1 && this.posY > 0 && this.posY < 1) {
                const distanceToLeftBound = this.posX;
                const distanceToRightBound = 1 - this.posX;
                edgeAvoidanceForce[0] = (1 / distanceToLeftBound) - (1 / distanceToRightBound);
                
                const distanceToTopBound = this.posY;
                const distanceToBottomBound = 1 - this.posY;
                edgeAvoidanceForce[1] = (1 / distanceToTopBound) - (1 / distanceToBottomBound);
            }
        }

        /* Make boids avoid cursor */
        let cursorAvoidanceForce = [0, 0];
        if (avoidCursor) {
            const a = this.posX - window.mousePos[0];
            const b = this.posY - window.mousePos[1];
            const distance = Math.pow(a, 2) + Math.pow(b, 2);
            cursorAvoidanceForce[0] = (this.posX - window.mousePos[0]) / distance;
            cursorAvoidanceForce[1] = (this.posY - window.mousePos[1]) / distance;
        }

        /* Add all the forces together and apply it to the boid */
        let acc = [0, 0];
        acc = acc.map((value, index) => value + cohesionForce[index]);
        acc = acc.map((value, index) => value + alignmentForce[index]);
        acc = acc.map((value, index) => value + seperationForce[index]);
        acc = acc.map((value, index) => value + edgeAvoidanceForce[index]);
        acc = acc.map((value, index) => value + cursorAvoidanceForce[index]);
        acc = this.scaleVector(acc[0], acc[1], maxAcc);
        this.accX = acc[0];
        this.accY = acc[1];
    }
}