class Snowflake extends Particle {
    constructor(posX, posY, velX, velY, accX, accY, size) {
        super(posX, posY, velX, velY, accX, accY);
        this.size = size;
        this.angle = Math.random() * 2 * Math.PI;
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('snowflake');
        this.element.style.height = this.size + 'px';
        this.element.style.width = this.size + 'px';
    }

    reset() {
        this.posX = Math.random();
        this.posY = -0.1;
    }
}