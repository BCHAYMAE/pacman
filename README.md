# AI Adventures

This is a simple game built using the Phaser 3 framework. The game features a maze where a robot (DataBot) collects dots while navigating through walls.

## Project Structure

- `index.html`: The main HTML file that includes the Phaser library and the game script.
- `scripts.js`: The JavaScript file that contains the game logic.

## Getting Started

### Prerequisites

- A web browser (Chrome, Firefox, etc.)
- Node.js and npm installed on your machine

### Running the Game

1. Clone the repository or download the project files.
2. Open a terminal and navigate to the project directory.
3. Install the `live-server` package globally if you haven't already:
    ```sh
    npm install -g live-server
    ```
4. Start the live server by running:
    ```sh
    live-server
    ```
5. The game should automatically open in your default web browser. If not, open your browser and go to `http://127.0.0.1:8080`.

### Game Controls

- Use the arrow keys to move the DataBot:
  - Up: Move up
  - Down: Move down
  - Left: Move left
  - Right: Move right

## Game Logic

- The game initializes with a maze layout defined in the `create` function.
- DataBot can move around the maze using the arrow keys.
- DataBot collects dots by overlapping with them, which triggers the `collectDot` function.

## Built With

- [Phaser 3](https://phaser.io/phaser3) - The game framework used

## Authors

- Chaymae Bellahcene

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
