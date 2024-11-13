import { useState } from "react";
import Grid from "../components/Grid";
import { useInitDeck } from "../hooks/useInitDeck";
import RemainingCards from "../components/RemainingCards";
import { handleChoice } from "../service/Game";
import CardType from "../types/Card";
import { getCardValue } from "../utils/shuffle";

const GamePage = () => {
  const [gridSize, setGridSize] = useState(6);
  const [cardSize, setCardSize] = useState(3);
  const [selectedCard, setSelectedCard] = useState<{
    card: CardType;
    position: { row: number; col: number };
  } | null>(null);
  const [playableStatus, setPlayableStatus] = useState<
    "notPlayable" | "simple" | "double" | null
  >(null);
  const [playableCards, setPlayableCards] = useState<CardType[]>([]);
  const [PlayableCardsSelected, setPlayableCardsSelected] =
    useState<CardType | null>(null);
  const { grid, remainingCards } = useInitDeck(gridSize);

  const onCardClick = (card: CardType, row: number, col: number) => {
    const isPlayable = playableCards.some(
      (playableCard) =>
        playableCard.position!.row === row &&
        playableCard.position!.col === col,
    );

    if (isPlayable) {
      setPlayableCardsSelected(card);
    } else {
      if (
        selectedCard &&
        selectedCard.position.row === row &&
        selectedCard.position.col === col
      ) {
        setPlayableStatus(null);
        setPlayableCards([]);
        setPlayableCardsSelected(null);
        setSelectedCard(null);
      } else {
        const status = isCardPlayable(row, col);
        setPlayableStatus(status);
        setSelectedCard({ card, position: { row, col } });
        setPlayableCardsSelected(null);
      }
    }
  };

  const handleUserChoice = (choice: string) => {
    if (selectedCard) {
      handleChoice(grid, selectedCard.card, selectedCard.position, choice);
      setSelectedCard(null);
      setPlayableCards([]);
    }
  };

  const isCardPlayable = (
    row: number,
    col: number,
  ): "notPlayable" | "simple" | "double" => {
    setPlayableCards([]);
    const directions = [
      { row: -1, col: 0 }, // up
      { row: 1, col: 0 }, // down
      { row: 0, col: -1 }, // left
      { row: 0, col: 1 }, // right
    ];

    const visibleAdjacents = directions.map(({ row: dRow, col: dCol }) => {
      const newRow = row + dRow;
      const newCol = col + dCol;

      if (
        newRow >= 0 &&
        newCol >= 0 &&
        newRow < grid.length &&
        newCol < grid[0].length
      ) {
        return grid[newRow][newCol];
      } else {
        return null;
      }
    });

    const horizontalVisible =
      visibleAdjacents[2]?.isVisible && visibleAdjacents[3]?.isVisible; // left & right
    const verticalVisible =
      visibleAdjacents[0]?.isVisible && visibleAdjacents[1]?.isVisible; // up & down

    const totalVisible = visibleAdjacents.filter(
      (card) => card && card.isVisible,
    ).length;

    if (totalVisible === 0 || grid[row][col].isVisible) return "notPlayable";

    let playableCardTab: CardType[] = [];
    if (horizontalVisible || verticalVisible) {
      if (horizontalVisible) {
        playableCardTab.push(grid[row][col - 1], grid[row][col + 1]);
      }
      if (verticalVisible) {
        playableCardTab.push(grid[row - 1][col], grid[row + 1][col]);
      }
      setPlayableCards(playableCardTab);
      return "double";
    }

    visibleAdjacents.forEach((card) => {
      if (card && card.isVisible) playableCardTab.push(card);
    });
    setPlayableCards(playableCardTab);

    return "simple";
  };

  return (
    <div className="">
      <div
        className="flex flex-col items-center justify-center text-2xl"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setSelectedCard(null);
        }}
      >
        Taille de la Grille
        <div className="flex items-center justify-center w-full p-2">
          {[4, 5, 6].map((size) => (
            <button
              key={size}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => {
                setGridSize(size);
                setPlayableCards([]);
                setSelectedCard(null);
                setPlayableCardsSelected(null);
              }}
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
          playableCards={playableCards}
          PlayableCardsSelected={PlayableCardsSelected}
          onCardClick={(row, col) => onCardClick(grid[row][col], row, col)}
        />

        {selectedCard && playableStatus === "simple" && (
          <div className="p-3">
            {!PlayableCardsSelected && playableCards.length > 0 && (
              <div> choisis avec quelle carte veut tu comparer</div>
            )}
            {PlayableCardsSelected && (
              <div>
                <button
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={() => {
                    handleUserChoice("plus");
                    console.log("prout", handleUserChoice("plus"));
                  }}
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
                  onClick={() => {
                    handleUserChoice("poteau");
                    console.log(PlayableCardsSelected);
                  }}
                >
                  Poteaux si t'as des grosse couille
                </button>
              </div>
            )}
          </div>
        )}

        {selectedCard && playableStatus === "double" && (
          <div className="p-3">
            {playableCards.length && (
              <div> choisis avec quelle carte veut tu comparer</div>
            )}
            {PlayableCardsSelected && playableCards.length === 2 && (
              <div>
                <button
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={() => handleUserChoice("inter")}
                >
                  Interieur
                </button>
                <button
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={() => handleUserChoice("exte")}
                >
                  Exterieur
                </button>
                <button
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={() => handleUserChoice("poteau")}
                >
                  Poteaux si t'as des grosse couille
                </button>
              </div>
            )}
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
