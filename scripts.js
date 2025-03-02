// Configuration object for the Phaser game
const config = {
    type: Phaser.AUTO, // Automatically choose WebGL or Canvas rendering
    width: 800, // Width of the game canvas
    height: 600, // Height of the game canvas
    physics: {
        default: 'arcade', // Use Arcade Physics
        arcade: {
            gravity: { y: 0 }, // No gravity
            debug: false // Disable debug mode
        }
    },
    scene: {
        preload: preload, // Preload function to load assets
        create: create, // Create function to set up the game
        update: update // Update function for game logic
    }
};

let databot, cursors, dots, walls;

// Preload function to load game assets
function preload() {
    this.load.image('databot', 'assets/robot.png'); // Load robot sprite
    this.load.image('wall', 'assets/wall.png'); // Load wall sprite
    this.load.image('dot', 'assets/dot.png'); // Load dot sprite
}

// Create function to set up the game
function create() {
    // Maze Layout (Grid-Based)
    const maze = [
        'WWWWWWWWWWWWWWWWWWWW',
        'W........WW........W',
        'W.WWW.WWWWW.WWW.WWW',
        'W.WWW.WWWWW.WWW.WWW',
        'W..................W',
        'W.WWW.WW.WW.WWW.WWW',
        'W.WWW.WW.WW.WWW.WWW',
        'W........WW........W',
        'WWWWWWWWWWWWWWWWWWWW',
    ];

    walls = this.physics.add.staticGroup(); // Group for static wall objects
    dots = this.physics.add.group(); // Group for collectible dots

    // Build the maze
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            let x = col * 32; // Calculate x position
            let y = row * 32; // Calculate y position

            if (maze[row][col] === 'W') {
                walls.create(x, y, 'wall'); // Create wall at (x, y)
            } else if (maze[row][col] === '.') {
                let dot = dots.create(x, y, 'dot'); // Create dot at (x, y)
                dot.setScale(0.5); // Scale down the dot
            }
        }
    }

    // Create DataBot
    databot = this.physics.add.sprite(50, 50, 'databot'); // Create DataBot sprite
    databot.setCollideWorldBounds(true); // Prevent DataBot from leaving the game world
    this.physics.add.collider(databot, walls); // Add collision between DataBot and walls

    // Collecting dots
    this.physics.add.overlap(databot, dots, collectDot, null, this); // Add overlap check between DataBot and dots

    cursors = this.input.keyboard.createCursorKeys(); // Create cursor keys for input
}

// Update function for game logic
function update() {
    databot.setVelocity(0); // Reset DataBot velocity
    if (cursors.left.isDown) {
        databot.setVelocityX(-160); // Move left
    } else if (cursors.right.isDown) {
        databot.setVelocityX(160); // Move right
    }
    if (cursors.up.isDown) {
        databot.setVelocityY(-160); // Move up
    } else if (cursors.down.isDown) {
        databot.setVelocityY(160); // Move down
    }
}

// Function to handle dot collection
function collectDot(databot, dot) {
    dot.destroy(); // Remove the dot from the game
}

// Create a new Phaser game instance
const game = new Phaser.Game(config);

