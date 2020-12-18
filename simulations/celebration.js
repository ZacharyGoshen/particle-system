class Celebration extends Simulation {
    constructor(containerId) {
        super(containerId);
        this.fireworkSpawnChance = .05;
        this.fireworkMinSize = 5;
        this.fireworkMaxSize = 10;
        this.fireworkMinVelY = -0.005;
        this.fireworkMaxVelY = -0.015;
        this.fireballsPerFirework = 100;
        this.fireballVelMultiplier = 0.0008;
        this.fireballFadeRate = -0.02;
        this.gravity = 0.0001;
    }
    
    start() {   
        this.isRunning = true; 
        this.interval = setInterval(() => {
            if (this.isRunning) {
                if (this.fireworkSpawnChance > Math.random()) {
                    this.spawnFirework();
                }
                this.particles.forEach(particle => {
                    if (particle instanceof Firework) {
                        this.updateFirework(particle);
                    } else if (particle instanceof Fireball) {
                        this.updateFireball(particle);
                    }
                });
            }
        }, 1000 / 60);
    }

    spawnFirework() {
        const posX = Math.random();
        const posY = 1;
        const velY = (Math.random() * (this.fireworkMaxVelY - this.fireworkMinVelY)) + this.fireworkMinVelY;
        const size = (Math.random() * (this.fireworkMaxSize - this.fireworkMinSize)) + this.fireworkMinSize;
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const color = `rgb(${r},${g},${b})`;

        const firework = new Firework(posX, posY, 0, velY, 0, this.gravity, size, color);
        firework.createElement();
        this.container.appendChild(firework.element);
        this.particles.push(firework);
    }

    spawnFireball(firework) {
        const angle = Math.random() * 2 * Math.PI;
        const velX = Math.random() * (window.innerHeight / window.innerWidth) * Math.cos(angle) * this.fireballVelMultiplier * firework.size;
        const velY = Math.random() * Math.sin(angle) * this.fireballVelMultiplier * firework.size;
        const size = firework.size;
        const fireball = new Fireball(firework.posX, firework.posY, velX, velY, 0, this.gravity, size, firework.color);
        fireball.createElement();
        this.container.appendChild(fireball.element);
        this.particles.push(fireball);
    }

    updateFirework(firework) {
        firework.update();
        firework.render();
        if (firework.velY > 0) {
            for (let i = 0; i < this.fireballsPerFirework; i++) {
                this.spawnFireball(firework);
            }
            firework.destroy();
            this.particles.splice(this.particles.indexOf(firework), 1);
        }
    }

    updateFireball(fireball) {
        fireball.opacity += this.fireballFadeRate;
        fireball.element.style.opacity = fireball.opacity;
        fireball.update();
        fireball.render();
        if (fireball.opacity < 0) {
            fireball.destroy();
            this.particles.splice(this.particles.indexOf(fireball), 1);
        }
    }
}