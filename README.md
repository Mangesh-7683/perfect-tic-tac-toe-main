Tic Tac Toe using Minimax and Alpha-Beta Pruning
This project is a Tic Tac Toe game developed using Python (Flask) and HTML. The game uses the Minimax algorithm with Alpha-Beta Pruning to make intelligent decisions for the computer player.

Features
Human vs Computer gameplay
AI-based opponent
Uses Minimax Algorithm
Uses Alpha-Beta Pruning for optimization
Winner and draw detection
Reset game option
Simple HTML interface
Technologies Used
Python
Flask
HTML
JavaScript
Project Structure
tic-tac-toe/
│── app.py
│── templates/
│     └── index.html
│── README.md
Algorithm Used
Minimax Algorithm
The Minimax algorithm is used to make the best possible move for the AI player. It checks all possible game states and selects the move with the best outcome.

Maximizing Player → AI (O)
Minimizing Player → Human (X)
Alpha-Beta Pruning
Alpha-Beta Pruning improves the Minimax algorithm by removing unnecessary branches from the search tree.

Benefits:

Faster execution
Reduced calculations
Better performance
How to Run the Project
1. Install Flask
Open terminal and run:

pip install flask
2. Run the Project
python app.py
3. Open in Browser
Open:

http://127.0.0.1:5000
How to Play
Player chooses a box and places X.
Computer automatically plays O.
The first player to match 3 symbols in a row, column, or diagonal wins.
If all boxes are filled and nobody wins, the game ends in a draw.
Learning Outcomes
Learned implementation of the Minimax algorithm.
Understood Alpha-Beta Pruning optimization.
Learned Flask routing and backend integration.
Connected Python logic with HTML frontend.
Author
Mangesh Tate
