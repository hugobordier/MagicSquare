import React from "react";
import Card from "./Cards";

interface GridProps {
  cards: string[];
  gridSize: number;
}

const Grid: React.FC<GridProps> = ({ cards, gridSize }) => (
  <div className={`grid grid-cols-${gridSize} gap-4`}>
    {cards.map((card, index) => (
      <Card
        key={index}
        card={card}
        onClick={() => console.log(`Card ${card} clicked!`)}
      />
    ))}
  </div>
);

export default Grid;
