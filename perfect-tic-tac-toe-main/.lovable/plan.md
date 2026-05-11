## Tic Tac Toe vs Unbeatable AI

Build a single-page Tic Tac Toe game where the human (X) plays against an AI (O) that uses Minimax with Alpha-Beta pruning, making it impossible to beat.

### Gameplay
- 3x3 grid, human always goes first as X
- Click an empty cell to place X; AI responds automatically as O
- 500–800ms delay before AI moves, with "AI thinking..." status
- Status line above the board: "Your turn", "AI thinking...", "You win!", "AI wins", "Draw"
- After game ends, board input is disabled and the winning 3-cell combination is highlighted
- "Restart Game" button resets the board and status

### UI / Styling
- Centered layout, full viewport height, soft gradient background
- Card-style container holding status, grid, and restart button
- Cells: large rounded squares, bold X/O glyphs, hover lift + subtle background change on empty cells, cursor changes to pointer only when playable
- Distinct colors for X and O; winning cells get a highlight color + subtle pulse animation
- Fully responsive: grid scales down on mobile, controls remain tappable
- Built with the existing Tailwind + shadcn design tokens (uses `--primary`, `--accent`, `--muted` etc.) so it stays consistent with the project theme

### Code structure
Single React page (`src/pages/Index.tsx`) plus a pure logic module (`src/lib/ticTacToe.ts`) so logic is testable and separate from UI.

`src/lib/ticTacToe.ts` exports:
- `checkWinner(board)` → returns `{ winner: 'X' | 'O', line: number[] } | null`
- `isDraw(board)` → boolean
- `minimax(board, depth, isMaximizing, alpha, beta)` → score (with alpha-beta pruning)
- `bestMove(board)` → index 0–8 for AI's optimal move

`src/pages/Index.tsx`:
- Holds `board`, `isPlayerTurn`, `gameState`, `winningLine` in React state
- Handles click → validate → update → trigger AI move via `setTimeout`
- Renders grid, status, and restart button

### Technical details
- Board represented as `(‘X' | 'O' | null)[9]`
- Minimax returns +10/−10/0 adjusted by depth so the AI prefers faster wins / slower losses
- Alpha-beta pruning inside the recursion to cut branches early
- AI move wrapped in `setTimeout` with cleanup on unmount to avoid state updates after restart
- No backend, no new dependencies

### Files
- Create: `src/lib/ticTacToe.ts`
- Replace: `src/pages/Index.tsx`
