import { useState } from "react";
import Grid from "../components/Grid";
import { useInitDeck } from "../hooks/useInitDeck";
import RemainingCards from "../components/RemainingCards";
import { handleChoice } from "../service/Game";
import CardType from "../types/Card";

const GamePage = () => {
  const [gridSize, setGridSize] = useState(6);
  const [cardSize, setCardSize] = useState(3);
  const [selectedCard, setSelectedCard] = useState<{
    card: CardType;
    position: { row: number; col: number };
    PlayableCard: null | ;
  } | null>(null);
  const { grid, remainingCards } = useInitDeck(gridSize);

  const onCardClick = (card: CardType, row: number, col: number) => {
    //const status: "simple" | "double" | null = fonction();
    //setSelectedCard({ card, position: { row, col } });
  };

  const handleUserChoice = (choice: string) => {
    if (selectedCard) {
      handleChoice(grid, selectedCard.card, selectedCard.position, choice);
      setSelectedCard(null);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-center text-2xl">
        Taille de la Grille
        <div className="flex items-center justify-center w-full p-2">
          {[4, 5, 6].map((size) => (
            <button
              key={size}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => setGridSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <h1 className="mb-4 text-2xl text-center">
        Carré Magique - Grille {gridSize}x{gridSize}
      </h1>

      <div className="flex flex-col items-center justify-center">
        <Grid
          cards={grid}
          gridSize={gridSize}
          cardSize={cardSize}
          selectedCard={selectedCard}
          onCardClick={(row, col) => onCardClick(grid[row][col], row, col)}
        />

        {selectedCard && (
          <div className="p-3">
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => handleUserChoice("plus")}
            >
              Plus
            </button>
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => handleUserChoice("moins")}
            >
              Moins
            </button>
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => handleUserChoice("poteaux")}
            >
              Poteaux si t'as des grosse couille
            </button>
          </div>
        )}

        <div className="w-3/4 mt-4">
          <div className="ml-14 text-start">Pioche</div>
          <RemainingCards remainingCards={remainingCards} cardSize={cardSize} />
        </div>

        <label
          htmlFor="large-range"
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
        >
          Taille des cartes
        </label>
        <input
          id="large-range"
          type="range"
          min="1"
          max="20"
          value={cardSize}
          onChange={(e) => setCardSize(Number(e.target.value))}
          className="w-1/2 h-6 bg-gray-200 rounded-full appearance-none cursor-pointer dark:bg-gray-700"
        />
        <div className="p-4">
          <button
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => {
              setCardSize((prev) => (prev > 1 ? prev - 1 : prev));
            }}
          >
            -
          </button>
          <button
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => {
              setCardSize((prev) => (prev < 20 ? prev + 1 : prev));
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
