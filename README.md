# Tic Tac Toe Game

A modern, interactive Tic Tac Toe game built with vanilla HTML, CSS, and JavaScript. Features a beautiful gradient design, animated buttons, and comprehensive game state management.

## Features

- **Interactive Gameplay**: Classic 3x3 Tic Tac Toe with visual feedback
- **Player Customization**: Custom player names for personalized experience
- **Win Tracking**: Persistent score tracking for multiple rounds
- **Draw Detection**: Automatic detection and handling of draw games
- **Modern UI**: Gradient backgrounds, animated buttons, and smooth transitions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Game State Management**: Proper game flow with start/reset functionality

## How to Play

1. Enter names for both players in the input fields
2. Click "Start Game" to begin
3. Players take turns clicking on empty squares
4. Player 1 uses "X" marks, Player 2 uses "O" marks
5. First player to get three marks in a row (horizontally, vertically, or diagonally) wins
6. If all squares are filled without a winner, the game ends in a draw
7. Use "Reset Game" to clear the board and start a new round

## Game Rules

- Player 1 always goes first with "X"
- Players alternate turns
- Once a square is occupied, it cannot be changed
- Game ends when there's a winner or all squares are filled
- Win conditions: 3 in a row horizontally, vertically, or diagonally

## Technical Details

### Architecture

The game uses a modular JavaScript architecture with three main components:

- **Gameboard Module**: Manages the game board state and rendering
- **Player Factory**: Creates player objects with names and scores  
- **Game Controller**: Handles game flow, turns, and win/draw detection

### Key Functions

- `Gameboard.render()`: Updates the visual game board
- `Game.start()`: Initializes a new game with player names
- `Game.handleClick()`: Processes player moves
- `Gameboard.checkWinner()`: Determines if there's a winning combination
- `Game.reset()`: Clears the board for a new round

### File Structure

```
tic-tac-toe/
├── index.html          # Main HTML structure
├── styles.css          # Styling and animations
└── script.js          # Game logic and functionality
```

## Styling Features

- **Gradient Backgrounds**: Beautiful blue-to-light-blue gradients
- **Animated Buttons**: Hover effects with sliding icons
- **Color-coded Elements**: Different colors for players and draws
- **Responsive Grid**: CSS Grid layout that adapts to screen size
- **Visual Feedback**: Hover states and click animations

## Browser Compatibility

This game works in all modern browsers that support:
- CSS Grid
- ES6 JavaScript features
- CSS animations and transitions

## Getting Started

1. Clone or download the project files
2. Open `index.html` in your web browser
3. Enter player names and start playing!

No build process or dependencies required - just open and play!

## Future Enhancements

Potential features that could be added:
- AI opponent with difficulty levels
- Online multiplayer support
- Custom board sizes (4x4, 5x5)
- Theme customization
- Sound effects
- Game statistics and analytics
- Save/load game state

## License

This project is open source and available under the MIT License.

---

*Built with vanilla HTML, CSS, and JavaScript - no frameworks required!*
