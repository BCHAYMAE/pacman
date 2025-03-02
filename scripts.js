const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let databot, cursors, dots, walls;

function preload() {
    this.load.image('databot', 'assets/robot.png'); // Replace with your robot sprite
    this.load.image('wall', 'assets/wall.png'); // Maze walls
    this.load.image('dot', 'assets/dot.png'); // Dots to collect
}

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

    walls = this.physics.add.staticGroup();
    dots = this.physics.add.group();

    // Build the maze
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            let x = col * 32;
            let y = row * 32;

            if (maze[row][col] === 'W') {
                walls.create(x, y, 'wall');
            } else if (maze[row][col] === '.') {
                let dot = dots.create(x, y, 'dot');
                dot.setScale(0.5);
            }
        }
    }

    // Create DataBot
    databot = this.physics.add.sprite(50, 50, 'databot');
    databot.setCollideWorldBounds(true);
    this.physics.add.collider(databot, walls);

    // Collecting dots
    this.physics.add.overlap(databot, dots, collectDot, null, this);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    databot.setVelocity(0);
    if (cursors.left.isDown) {
        databot.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        databot.setVelocityX(160);
    }
    if (cursors.up.isDown) {
        databot.setVelocityY(-160);
    } else if (cursors.down.isDown) {
        databot.setVelocityY(160);
    }
}

function collectDot(databot, dot) {
    dot.destroy();
}

const game = new Phaser.Game(config);

