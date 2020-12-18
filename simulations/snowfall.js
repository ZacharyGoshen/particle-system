class Snowfall extends Simulation {
    constructor(containerId) {
        super(containerId);
        this.numberOfSnowflakes = 200;
        this.snowflakeMinSize = 5;
        this.snowflakeMaxSize = 15
        this.velXMultiplier = .00002;
        this.velYMultiplier = .0002;
        this.angleChangeRate = .05;
    }

    start() {   
        for (let i = 0; i < this.numberOfSnowflakes; i++) {
            const size = (Math.random() * (this.snowflakeMaxSize - this.snowflakeMinSize)) + this.snowflakeMinSize;
            const x = Math.random();
            const y = Math.random() - 1;
            const velY = this.velYMultiplier * size;
            const snowflake = new Snowflake(x, y, 0, velY, 0, 0, size);
            snowflake.createElement();
            this.container.appendChild(snowflake.element);
            this.particles.push(snowflake);
        }

        this.isRunning = true; 
        this.interval = setInterval(() => {
            if (this.isRunning) {
                this.particles.forEach(snowflake => this.updateSnowflake(snowflake));
            }
        }, 1000 / 60);
    }

    updateSnowflake(snowflake) {
        const velX = this.velXMultiplier * snowflake.size * Math.cos(snowflake.angle);
        snowflake.velX = velX;
        snowflake.angle += this.angleChangeRate;

        snowflake.update();
        snowflake.render();
        if (snowflake.posY > 1) {
            snowflake.reset();
        }
    }
}