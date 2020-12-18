class Fireball extends Particle {
    constructor(posX, posY, velX, velY, accX, accY, size, color) {
        super(posX, posY, velX, velY, accX, accX, accY);
        this.size = size;
        this.color = color;
        this.opacity = 1;
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('fireball');
        this.element.style.width = this.size + 'px';
        this.element.style.height = this.size + 'px';
        this.element.style.backgroundColor = this.color;
    }
}