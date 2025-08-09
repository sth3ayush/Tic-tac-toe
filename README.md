# Triple Tic-Tac-Toe Variations

## A fun collection of three unique Tic-Tac-Toe games built using HTML, CSS, and JavaScript.

This project is the result of my first 5-day JavaScript coding challenge, where I applied the concepts I learned over the past 5 days to create variations of the classic game. 

Tic-Tac-Toe is simple but offers plenty of room for creativity, so I experimented with variations that require new strategies, memory skills, and multi-layered thinking.

This helped me strengthen my DOM manipulation, event handling, and game logic skills while keeping it fun.

## Tech Stack

HTML, CSS and Javascrpit

## 🎯 Game Variations & Instructions

### 1️⃣ Regular Tic-Tac-Toe

**Objective:**
Get three X’s or O’s in a row (horizontal, vertical, or diagonal).

**How to Play:**

1. Players take turns placing X or O.

1. The first player to align three symbols wins.

1. If all cells are filled with no winner, the game is a draw.

### 2️⃣ Super Tic-Tac-Toe (Ultimate Tic-Tac-Toe Style)

**Objective:**
Win three “large” cells in a row (horizontal, vertical, or diagonal) by winning the mini Tic-Tac-Toe boards inside them.

**How to Play:**

1. The main board has 9 large cells, each containing a mini Tic-Tac-Toe board (total 81 cells).

1. Your move inside a mini-board decides which mini-board your opponent must play in next.
    
    **Example:** If you play in the top-left cell of a mini-board, your opponent must play in the top-left mini-board of the large board.

1. If the target mini-board is already won or full, the opponent can play in any mini-board.

1. You win a large cell by winning the mini-board inside it.

1. The first player to win three large cells in a row wins the game.

### 3️⃣ Advanced Tic-Tac-Toe (Memory Challenge)

**Objective:**
Same as regular Tic-Tac-Toe, but with a twist — you can only have a maximum of 3 marks on the board at any time.

**How to Play:**

1. Players can place X or O only three times.

1. When a player places a fourth mark, their oldest mark disappears.

1. Players must remember previous placements and plan moves carefully.
