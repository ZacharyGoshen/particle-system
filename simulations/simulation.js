class Simulation {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.particles = [];
        this.isRunning = false;
        this.interval = null;
    }

    pause() {
        this.isRunning = !this.isRunning;
    }

    end() {
        this.particles.forEach(particle => {
            particle.destroy();
        })
        clearInterval(this.interval);
    }
}