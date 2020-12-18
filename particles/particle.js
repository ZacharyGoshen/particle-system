class Particle {
    constructor(posX, posY, velX, velY, accX, accY) {
        this.posX = posX;
        this.posY = posY;
        this.velX = velX;
        this.velY = velY;
        this.accX = accX;
        this.accY = accY;
        this.element = null;
    }

    render() {
        this.element.style.left = (this.posX * window.innerWidth) + 'px';
        this.element.style.top = (this.posY * window.innerHeight) + 'px';
    }

    destroy() {
        this.element.remove();
    }

    update() {
        this.velX += this.accX;
        this.velY += this.accY;
        this.posX += this.velX;
        this.posY += this.velY;
    }

    scaleVector(x, y, desiredMagnitude) {
        const magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        const scalingFactor = desiredMagnitude / magnitude;
        if (magnitude == 0) {
            return [0, 0];
        } else if (magnitude < desiredMagnitude) {
            return [x, y];
        } else {
            return [x * scalingFactor, y * scalingFactor];
        }
    }
}

