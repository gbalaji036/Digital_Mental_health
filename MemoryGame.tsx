import React, { useState, useEffect, useCallback } from 'react';
import { MEMORY_CARDS_DATA } from '../constants';
import { IconPuzzle } from './IconComponents';

// Define the shape of our card object for better type safety
interface MemoryCard {
  type: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  id: number;
  isFlipped: boolean;
  isMatched: boolean;
}

// Function to initialize and shuffle the deck of cards
const generateDeck = (): MemoryCard[] => {
  const duplicatedCards = [...MEMORY_CARDS_DATA, ...MEMORY_CARDS_DATA];
  return duplicatedCards
    .sort(() => Math.random() - 0.5)
    .map((card, index) => ({
      ...card,
      id: index,
      isFlipped: false,
      isMatched: false,
    }));
};

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<MemoryCard[]>(generateDeck());
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false); // Lock board during check

  const isGameWon = cards.every(card => card.isMatched);

  // Memoized reset function to avoid re-creation
  const resetGame = useCallback(() => {
    setCards(generateDeck());
    setFlippedIndices([]);
    setMoves(0);
    setIsChecking(false);
  }, []);

  // Effect to check for matches whenever two cards are flipped
  useEffect(() => {
    if (flippedIndices.length !== 2) return;

    setIsChecking(true); // Lock the board
    const [firstIndex, secondIndex] = flippedIndices;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    if (firstCard.type === secondCard.type) {
      // It's a match!
      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isMatched: true }
              : card
          )
        );
        setFlippedIndices([]);
        setIsChecking(false); // Unlock the board
      }, 500); // Short delay to show the match
    } else {
      // Not a match
      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isFlipped: false }
              : card
          )
        );
        setFlippedIndices([]);
        setIsChecking(false); // Unlock the board
      }, 1200); // Longer delay to let user see the cards
    }
  }, [flippedIndices, cards]);

  const handleCardClick = (clickedId: number) => {
    // Prevent clicking if board is locked, 2 cards are already flipped, or card is already matched/flipped
    if (isChecking || flippedIndices.length === 2 || cards[clickedId].isMatched || cards[clickedId].isFlipped) {
      return;
    }
    
    // Flip the card
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === clickedId ? { ...card, isFlipped: true } : card
      )
    );

    // Update flipped cards and moves
    const newFlippedIndices = [...flippedIndices, clickedId];
    setFlippedIndices(newFlippedIndices);
    if (newFlippedIndices.length === 2) {
      setMoves(prevMoves => prevMoves + 1);
    }
  };

  if (isGameWon) {
    return (
      <div className="bg-dark-neutral p-6 rounded-lg shadow-lg border border-primary/50 text-center flex flex-col items-center justify-center h-full min-h-[450px] animate-fade-in-up">
        <div className="animate-celebrate mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-primary mb-2">Excellent Focus!</h3>
        <p className="text-light-text/80 mb-6">You matched all the cards in {moves} moves.</p>
        <button onClick={resetGame} className="bg-primary hover:bg-primary-dark text-dark-bg font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-dark-neutral p-6 rounded-lg shadow-lg border border-light-neutral/50">
      <div className="flex justify-between items-center mb-6 px-2">
        <p className="text-xl font-semibold text-light-text/80">
          Moves: <span className="text-primary font-bold">{moves}</span>
        </p>
        <button onClick={resetGame} className="bg-dark-bg hover:bg-light-neutral text-primary font-semibold py-2 px-5 rounded-full text-sm transition-colors duration-300 border border-primary/50">
          Reset Game
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4" style={{ perspective: '1000px' }}>
        {cards.map(card => {
          const isCurrentlyFlippedPair = flippedIndices.length === 2 && (flippedIndices[0] === card.id || flippedIndices[1] === card.id);
          const isWrong = isCurrentlyFlippedPair && cards[flippedIndices[0]].type !== cards[flippedIndices[1]].type;

          return (
            <div
              key={card.id}
              className={`w-full aspect-square cursor-pointer transition-transform duration-700`}
              style={{ transformStyle: 'preserve-3d', transform: (card.isFlipped || card.isMatched) ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              onClick={() => handleCardClick(card.id)}
            >
              {/* Card Front */}
              <div className="absolute w-full h-full rounded-lg bg-light-neutral hover:bg-primary/20 flex items-center justify-center transition-colors duration-300" style={{ backfaceVisibility: 'hidden' }}>
                <IconPuzzle className="w-1/2 h-1/2 text-primary opacity-50" />
              </div>
              
              {/* Card Back */}
              <div
                className={`absolute w-full h-full rounded-lg flex items-center justify-center transition-all duration-500 ${card.isMatched ? 'bg-primary/20 animate-celebrate' : 'bg-dark-bg'} ${isWrong ? 'animate-shake' : ''}`}
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <card.Icon className={`w-3/4 h-3/4 ${card.isMatched ? 'text-primary' : 'text-light-text'}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryGame;
