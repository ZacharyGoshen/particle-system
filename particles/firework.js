class Firework extends Particle {
    constructor(posX, posY, velX, velY, accX, accY, size, color) {
        super(posX, posY, velX, velY, accX, accY);
        this.size = size;
        this.color = color;
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('firework');
        this.element.style.width = this.size + 'px';
        this.element.style.height = this.size + 'px';
        this.element.style.backgroundColor = this.color;
        this.element.style.boxShadow = `0px 0px ${this.size}px ${this.size / 4}px ${this.color}`;
    }
}