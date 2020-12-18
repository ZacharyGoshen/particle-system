class App {
    constructor() {
        this.simulation = null;
        this.sideBar = document.getElementById('sideBar');
    }

    setUpEventHandlers() {
        /* Keeps track of the cursor position so that the boids can avoid it in the flock simulation */
        document.body.addEventListener('mousemove', (e) => {
            window.mousePos = [e.clientX / window.innerWidth, e.clientY / window.innerHeight];
        });

        document.getElementById('particleContainer').addEventListener('click', () => {
            if (this.simulation) {
                this.simulation.isRunning = !this.simulation.isRunning;
            }
        });

        document.getElementById('snowfallButton').addEventListener('click', () => {
            this.reset();
            this.simulation = new Snowfall('particleContainer');
            this.simulation.start();
            this.sideBar.style.backgroundColor = 'white';
        });

        document.getElementById('downpourButton').addEventListener('click', () => {
            this.reset();
            this.simulation = new Downpour('particleContainer');
            this.simulation.start();
            this.sideBar.style.backgroundColor = 'cyan';
        });

        document.getElementById('celebrationButton').addEventListener('click', () => {
            this.reset();
            this.simulation = new Celebration('particleContainer');
            this.simulation.start();
            this.sideBar.style.backgroundColor = 'red';
        });

        document.getElementById('flockButton').addEventListener('click', () => {
            this.reset();
            this.simulation = new Flock('particleContainer');
            this.simulation.start();
            this.sideBar.style.backgroundColor = 'green';
        });
    }

    reset() {
        if (this.simulation) {
            this.simulation.end();
            this.simulation = null;
        }
    }
}

const app = new App();
app.setUpEventHandlers();
app.simulation = new Snowfall('particleContainer');
app.simulation.start();



