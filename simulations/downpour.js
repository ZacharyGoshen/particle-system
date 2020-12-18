class Downpour extends Simulation {
    constructor(containerId) {
        super(containerId);
        this.raindropAmountLimit = 100;
        this.raindropMinSize = 1;
        this.raindropMaxSize = 5
        this.raindropSizeRatio = 10;
        this.raindropVelYMultiplier = .007;
        this.splashesPerRaindrop = 10;
        this.splashVelXMultiplier = 0.005;
        this.splashVelYMultiplier = -0.002;
        this.gravity = 0.001;
    }
    
    start() {   
        for (let i = 0; i < this.raindropAmountLimit; i++) {
            const size = (Math.random() * (this.raindropMaxSize - this.raindropMinSize)) + this.raindropMinSize;
            const x = Math.random();
            const y = Math.random() - 1;
            const velY = this.raindropVelYMultiplier * size;
            const raindrop = new Raindrop(x, y, 0, velY, 0, 0, size, this.raindropSizeRatio);
            raindrop.createElement();
            this.container.appendChild(raindrop.element);
            this.particles.push(raindrop);
        }

        this.isRunning = true; 
        this.interval = setInterval(() => {
            if (this.isRunning) {
                this.particles.forEach(particle => {
                    if (particle instanceof Raindrop) {
                        this.updateRaindrop(particle);
                    } else if (particle instanceof Splash) {
                        this.updateSplash(particle);
                    }
                });
            }
        }, 1000 / 60);
    }

    updateRaindrop(raindrop) {
        raindrop.update();
        raindrop.render();
        if (raindrop.posY > 1) {
            for (let i = 0; i < this.splashesPerRaindrop; i++) {
                const velX = (Math.random() - 0.5) * this.splashVelXMultiplier;
                const velY = Math.random() * raindrop.size * this.splashVelYMultiplier;
                const splash = new Splash(raindrop.posX, 1, velX, velY, 0, this.gravity, raindrop.size);
                splash.createElement();
                this.container.appendChild(splash.element);
                this.particles.push(splash);
            }
            raindrop.reset();
        } 
    }

    updateSplash(splash) {
        splash.update();
        splash.render();
        if (splash.posY > 1) {
            splash.destroy();
            this.particles.splice(this.particles.indexOf(splash), 1);
        }
    }
}