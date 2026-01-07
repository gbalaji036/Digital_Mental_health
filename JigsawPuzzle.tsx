import React, { useState, useEffect, useCallback } from 'react';

// --- Interfaces and Constants ---
interface Piece {
  id: number;
  imgUrl: string;
}

interface Puzzle {
  id: string;
  name: string;
  src: string;
}

const GRID_SIZE = 4;
const PUZZLE_DIMENSION = 500;
const PUZZLE_IMAGES: Puzzle[] = [
    { id: 'lake', name: 'Mountain Lake', src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop' },
    { id: 'forest_path', name: 'Forest Path', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2174&auto=format&fit=crop' },
    { id: 'misty_forest', name: 'Misty Forest', src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop' },
    { id: 'beach_sunset', name: 'Beach Sunset', src: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=80&w=1970&auto=format&fit=crop' },
    { id: 'mountain_valley', name: 'Mountain Valley', src: 'https://images.unsplash.com/photo-1542396494-32212a45f229?q=80&w=2070&auto=format&fit=crop' },
];
type GameState = 'selecting' | 'loading' | 'playing' | 'solved';

// --- Main Component ---
const JigsawPuzzle: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('selecting');
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle>(PUZZLE_IMAGES[0]);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [shuffledPieces, setShuffledPieces] = useState<Piece[]>([]);
  const [placedPieces, setPlacedPieces] = useState<(Piece | null)[]>(Array(GRID_SIZE * GRID_SIZE).fill(null));
  const [showReminder, setShowReminder] = useState(false);

  // --- Image Slicing Logic ---
  const sliceImage = useCallback(async (puzzle: Puzzle) => {
    setGameState('loading');
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = puzzle.src;
    img.onload = () => {
      const pieceWidth = img.width / GRID_SIZE;
      const pieceHeight = img.height / GRID_SIZE;
      const generatedPieces: Piece[] = [];
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = pieceWidth;
      canvas.height = pieceHeight;

      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          ctx.clearRect(0, 0, pieceWidth, pieceHeight);
          ctx.drawImage(img, x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
          generatedPieces.push({
            id: y * GRID_SIZE + x,
            imgUrl: canvas.toDataURL(),
          });
        }
      }
      setPieces(generatedPieces);
      setShuffledPieces(generatedPieces.sort(() => Math.random() - 0.5));
      setPlacedPieces(Array(GRID_SIZE * GRID_SIZE).fill(null));
      setGameState('playing');
    };
    img.onerror = () => {
        console.error("Failed to load puzzle image.");
        setGameState('selecting'); // Go back to selection on error
    }
  }, []);
  
  // --- Breath Reminder Logic ---
  useEffect(() => {
      if (gameState !== 'playing') return;
      const interval = setInterval(() => {
          setShowReminder(true);
          const timeout = setTimeout(() => setShowReminder(false), 5000); // Animation duration
          return () => clearTimeout(timeout);
      }, 35000); // Show every 35 seconds
      return () => clearInterval(interval);
  }, [gameState]);

  // --- Drag and Drop Handlers (Using robust dataTransfer API) ---
  const handleDragStart = (e: React.DragEvent, piece: Piece) => {
    e.dataTransfer.setData('application/json', JSON.stringify(piece));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: number) => {
    e.preventDefault();
    const pieceJSON = e.dataTransfer.getData('application/json');
    if (!pieceJSON) return;

    const draggedPiece: Piece = JSON.parse(pieceJSON);

    // Check if the drop is correct
    if (draggedPiece && draggedPiece.id === targetId) {
      setPlacedPieces(prev => {
        const newPlaced = [...prev];
        newPlaced[targetId] = draggedPiece;
        return newPlaced;
      });
      setShuffledPieces(prev => prev.filter(p => p.id !== draggedPiece.id));
    }
  };
  
  // --- Check for Puzzle Completion ---
  useEffect(() => {
    if (gameState === 'playing' && pieces.length > 0 && shuffledPieces.length === 0) {
      setGameState('solved');
    }
  }, [shuffledPieces, pieces, gameState]);
  
  // --- Game State Actions ---
  const handleSelectPuzzle = (puzzle: Puzzle) => {
      setCurrentPuzzle(puzzle);
      sliceImage(puzzle);
  }

  const handlePlayAgain = () => {
      setShuffledPieces(pieces.sort(() => Math.random() - 0.5));
      setPlacedPieces(Array(GRID_SIZE * GRID_SIZE).fill(null));
      setGameState('playing');
  }

  // --- Render Functions ---
  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center h-[500px] bg-dark-neutral rounded-lg">
        <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      <p className="text-light-text/70 mt-4">Preparing your moment of calm...</p>
    </div>
  );

  const renderSelection = () => (
      <div className="bg-dark-neutral p-6 rounded-lg shadow-lg text-center animate-fade-in-up">
          <h3 className="text-3xl font-bold text-accent mb-2">Choose Your Scene</h3>
          <p className="text-light-text/80 mb-6">Select a puzzle to begin your moment of mindful focus.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PUZZLE_IMAGES.map(puzzle => (
                  <button key={puzzle.id} onClick={() => handleSelectPuzzle(puzzle)} className="group relative rounded-lg overflow-hidden border-2 border-transparent hover:border-accent transition-all duration-300">
                      <img src={puzzle.src} alt={puzzle.name} className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"/>
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-light-text font-semibold text-lg">{puzzle.name}</span>
                      </div>
                  </button>
              ))}
          </div>
      </div>
  );

  const renderSolved = () => (
    <div className="text-center flex flex-col items-center justify-center h-auto sm:h-[500px] bg-dark-neutral rounded-lg p-8 animate-fade-in-up">
      <img src={currentPuzzle.src} alt={currentPuzzle.name} className="w-full max-w-md rounded-lg shadow-lg mb-6"/>
      <h3 className="text-3xl font-bold text-accent mb-2">A Moment of Calm, Completed</h3>
      <p className="text-light-text/80 mb-6 max-w-sm">You took a moment for yourself and found your focus. Carry this feeling with you.</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button onClick={handlePlayAgain} className="bg-accent hover:bg-accent/80 text-dark-bg font-bold py-3 px-8 rounded-full text-lg">
          Play Again
        </button>
        <button onClick={() => setGameState('selecting')} className="bg-light-neutral hover:bg-light-neutral/80 text-light-text font-bold py-3 px-8 rounded-full text-lg">
          Choose New Puzzle
        </button>
      </div>
    </div>
  );
  
  const renderPlaying = () => (
    <div className="flex flex-col lg:flex-row gap-8 items-start relative">
      {showReminder && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-bg/80 text-light-text px-4 py-2 rounded-lg animate-fade-in-out z-30 pointer-events-none shadow-lg">
          Take a deep breath
        </div>
      )}
      {/* Puzzle Grid */}
      <div
        className="grid bg-dark-bg/50 rounded-lg shadow-inner w-full max-w-[500px] aspect-square"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
          <div
            key={index}
            className="border border-light-neutral/20"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {placedPieces[index] && <img src={placedPieces[index]?.imgUrl} className="w-full h-full block" alt={`Piece ${placedPieces[index]?.id}`} />}
          </div>
        ))}
      </div>

      {/* Shuffled Pieces Tray */}
      <div className="flex-1 w-full bg-dark-neutral p-4 rounded-lg border border-light-neutral/50">
        <h3 className="text-xl font-semibold text-light-text mb-4 text-center">Pieces</h3>
        <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-3 gap-2">
          {shuffledPieces.map(piece => (
            <div
              key={piece.id}
              draggable
              onDragStart={(e) => handleDragStart(e, piece)}
              className="cursor-grab active:cursor-grabbing p-1 bg-dark-bg rounded transition-transform hover:scale-110 hover:z-10"
            >
              <img src={piece.imgUrl} className="w-full h-full block rounded-sm" alt={`Shuffled Piece ${piece.id}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  switch (gameState) {
    case 'selecting': return renderSelection();
    case 'loading': return renderLoading();
    case 'solved': return renderSolved();
    case 'playing':
    default: return renderPlaying();
  }
};

export default JigsawPuzzle;
