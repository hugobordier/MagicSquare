import Card from "./Cards";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import CardType from "../types/Card";

interface GridProps {
  cards: CardType[][];
  gridSize: number;
  cardSize: number;
  PlayableCardsSelected: CardType | null;
  selectedCard: {
    card: CardType;
    position: { row: number; col: number };
  } | null;
  playableCards: CardType[];
  onCardClick: (row: number, col: number) => void;
}

const Grid = ({
  cards,
  gridSize,
  cardSize,
  selectedCard,
  playableCards,
  PlayableCardsSelected,
  onCardClick,
}: GridProps) => {
  const gridColumnsClass = {
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  }[gridSize];

  const gridClass = twMerge(clsx("grid gap-4 w-fit", gridColumnsClass));

  return (
    <div className="flex items-center justify-center">
      <div className={gridClass}>
        {cards.map((row, rowIndex) =>
          row.map((card, colIndex) => {
            const isSelected =
              selectedCard &&
              selectedCard.position.row === rowIndex &&
              selectedCard.position.col === colIndex;

            const PlayableCardsSelectedBool = PlayableCardsSelected
              ? PlayableCardsSelected.position!.row === rowIndex &&
                PlayableCardsSelected.position!.col === colIndex
              : null;

            const isPlayable = playableCards.some(
              (playableCard) =>
                playableCard.position?.row === rowIndex &&
                playableCard.position.col === colIndex,
            );
            if (PlayableCardsSelectedBool) {
              console.log(card, "lalalala");
            }

            return (
              <div className="rounded-lg ">
                <div
                  className={clsx(
                    isSelected && "shadow-2xl scale-125 shadow-green-100",
                    PlayableCardsSelectedBool && "scale-110 ",

                    isPlayable &&
                      !PlayableCardsSelectedBool &&
                      " animate-pulse  ",
                  )}
                >
                  <Card
                    key={`${rowIndex}-${colIndex}`}
                    card={card}
                    onClick={() => onCardClick(rowIndex, colIndex)}
                    cardSize={cardSize}
                  />
                </div>
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default Grid;
