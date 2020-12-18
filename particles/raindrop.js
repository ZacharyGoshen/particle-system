class Raindrop extends Particle {
    constructor(posX, posY, velX, velY, accX, accY, size, sizeRatio) {
        super(posX, posY, velX, velY, accX, accY);
        this.size = size;
        this.sizeRatio = sizeRatio;
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('raindrop');
        this.element.style.height = (this.size * this.sizeRatio) + 'px';
        this.element.style.width = this.size + 'px';
        this.element.style.borderRadius = this.size + 'px';
    }

    reset() {
        this.posX = Math.random();
        this.posY = -0.1;
    }
}