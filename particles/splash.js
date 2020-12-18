class Splash extends Particle {
    constructor(posX, posY, velX, velY, accX, accY, size) {
        super(posX, posY, velX, velY, accX, accY);
        this.size = size;
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('splash');
        this.element.style.height = this.size + 'px';
        this.element.style.width = this.size + 'px';
    }
}