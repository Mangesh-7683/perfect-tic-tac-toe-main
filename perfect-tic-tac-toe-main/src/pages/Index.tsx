import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { bestMove, checkWinner, isDraw, type Board } from "@/lib/ticTacToe";
import { cn } from "@/lib/utils";

type Status = "playing" | "thinking" | "win" | "lose" | "draw";

const emptyBoard = (): Board => Array(9).fill(null);

const Index = () => {
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [status, setStatus] = useState<Status>("playing");
  const [winLine, setWinLine] = useState<number[]>([]);
  const timer = useRef<number | null>(null);

  const clearTimer = () => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => () => clearTimer(), []);

  const finalize = (b: Board): boolean => {
    const w = checkWinner(b);
    if (w) {
      setWinLine(w.line);
      setStatus(w.winner === "X" ? "win" : "lose");
      return true;
    }
    if (isDraw(b)) {
      setStatus("draw");
      return true;
    }
    return false;
  };

  const handleClick = (i: number) => {
    if (status !== "playing" || board[i] !== null) return;
    const next = [...board];
    next[i] = "X";
    setBoard(next);
    if (finalize(next)) return;

    setStatus("thinking");
    clearTimer();
    timer.current = window.setTimeout(() => {
      const move = bestMove(next);
      if (move === -1) return;
      const after = [...next];
      after[move] = "O";
      setBoard(after);
      if (!finalize(after)) setStatus("playing");
    }, 600);
  };

  const restart = () => {
    clearTimer();
    setBoard(emptyBoard());
    setWinLine([]);
    setStatus("playing");
  };

  const statusText: Record<Status, string> = {
    playing: "Your turn",
    thinking: "AI thinking...",
    win: "You win!",
    lose: "AI wins",
    draw: "It's a draw",
  };

  const gameOver = status === "win" || status === "lose" || status === "draw";

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary to-background">
      <section className="w-full max-w-md bg-card text-card-foreground rounded-2xl shadow-xl border border-border p-6 sm:p-8">
        <header className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Tic Tac Toe</h1>
          <p className="text-sm text-muted-foreground mt-1">You are X · AI is O (unbeatable)</p>
        </header>

        <div
          className={cn(
            "text-center mb-5 h-7 font-medium transition-colors",
            status === "win" && "text-primary",
            status === "lose" && "text-destructive",
          )}
          aria-live="polite"
        >
          {statusText[status]}
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
          {board.map((cell, i) => {
            const isWin = winLine.includes(i);
            const playable = status === "playing" && cell === null;
            return (
              <button
                key={i}
                onClick={() => handleClick(i)}
                disabled={!playable}
                aria-label={`Cell ${i + 1}${cell ? `, ${cell}` : ", empty"}`}
                className={cn(
                  "aspect-square rounded-xl border border-border text-4xl sm:text-5xl font-bold",
                  "flex items-center justify-center select-none transition-all duration-150",
                  "bg-secondary/50",
                  playable && "hover:bg-accent hover:-translate-y-0.5 hover:shadow-md cursor-pointer",
                  !playable && !isWin && "cursor-not-allowed",
                  cell === "X" && "text-primary",
                  cell === "O" && "text-destructive",
                  isWin && "bg-primary/15 border-primary animate-pulse",
                )}
              >
                {cell}
              </button>
            );
          })}
        </div>

        <Button onClick={restart} className="w-full" variant={gameOver ? "default" : "secondary"}>
          Restart Game
        </Button>
      </section>
    </main>
  );
};

export default Index;
