import { useMemo } from "react";
import { shuffle } from "../utils/shuffle";
import CardType from "../types/Card";

export const useInitDeck = (gridSize: number) => {
  return useMemo(() => {
    const suits = ["H", "D", "C", "S"];
    const deck: CardType[] = [];

    suits.forEach((suit) => {
      for (let i = 1; i <= 13; i++) {
        let cardValue: string;
        if (i === 1) {
          cardValue = `A${suit}`;
        } else if (i === 11) {
          cardValue = `J${suit}`;
        } else if (i === 12) {
          cardValue = `Q${suit}`;
        } else if (i === 13) {
          cardValue = `K${suit}`;
        } else if (i === 10) {
          cardValue = `0${suit}`;
        } else {
          cardValue = `${i}${suit}`;
        }
        deck.push({ value: cardValue, isVisible: false ,position : {col : , row}});
      }
    });

    const shuffledDeck = shuffle(deck);

    const grid: CardType[][] = [];
    for (let i = 0; i < gridSize; i++) {
      grid.push(shuffledDeck.slice(i * gridSize, (i + 1) * gridSize));
    }

    if (gridSize >= 2) {
      grid[0][0].isVisible = true;
      grid[0][gridSize - 1].isVisible = true;
      grid[gridSize - 1][0].isVisible = true;
      grid[gridSize - 1][gridSize - 1].isVisible = true;
    }

    const remainingCards: CardType[] = shuffledDeck.slice(gridSize * gridSize);

    return { grid, remainingCards };
  }, [gridSize]);
};
