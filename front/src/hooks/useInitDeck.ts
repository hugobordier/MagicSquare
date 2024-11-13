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
        deck.push({
          value: cardValue,
          isVisible: false,
        });
      }
    });

    const shuffledDeck = shuffle(deck);

    const grid: CardType[][] = [];
    for (let row = 0; row < gridSize; row++) {
      const rowCards = shuffledDeck.slice(row * gridSize, (row + 1) * gridSize);
      rowCards.forEach((card, col) => {
        card.position = { row, col };
      });
      grid.push(rowCards);
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
