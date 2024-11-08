import Card from "./Cards";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import CardType from "../types/Card";

interface GridProps {
  cards: CardType[][];
  gridSize: number;
  cardSize: number;
  selectedCard: {
    card: CardType;
    position: { row: number; col: number };
  } | null;
  onCardClick: (row: number, col: number) => void;
}

const Grid = ({
  cards,
  gridSize,
  cardSize,
  selectedCard,
  onCardClick,
}: GridProps) => {
  const gridColumnsClass = {
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  }[gridSize];

  const gridClass = twMerge(clsx("grid gap-4 w-fit", gridColumnsClass));
  console.log("coucou");

  return (
    <div className="flex items-center justify-center">
      <div className={gridClass}>
        {cards.map((row, rowIndex) =>
          row.map((card, colIndex) => {
            const isSelected =
              selectedCard &&
              selectedCard.position.row === rowIndex &&
              selectedCard.position.col === colIndex;

            return (
              <div
                className={
                  isSelected ? "shadow-2xl scale-125 shadow-green-100" : ""
                }
              >
                <Card
                  key={`${rowIndex}-${colIndex}`}
                  card={card}
                  onClick={() => onCardClick(rowIndex, colIndex)}
                  cardSize={cardSize}
                />
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default Grid;
