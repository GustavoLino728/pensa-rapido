"use client";

type LetterState = "available" | "selected" | "used";

interface Letter {
  char: string;
  state: LetterState;
}

interface GameBoardProps {
  letters: Letter[];
  onLetterClick: (index: number) => void;
}

export default function GameBoard({ letters, onLetterClick }: GameBoardProps) {
  return (
    <div className="grid grid-cols-6 gap-5 p-4">
      {letters.map((letter, i) => (
        <button
          key={letter.char}
          onClick={() => onLetterClick(i)}
          disabled={letter.state === "used"}
          className={`
            flex items-center justify-center w-28 h-28 border rounded-lg font-bold
            ${
              letter.state === "available"
                ? "bg-gray-100 hover:bg-gray-200"
                : letter.state === "selected"
                ? "bg-blue-500 text-white"
                : "bg-gray-400 text-white cursor-not-allowed"
            }
          `}
        >
          {letter.char}
        </button>
      ))}
    </div>
  );
}
