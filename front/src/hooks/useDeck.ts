import { useMemo } from "react";
import { shuffle } from "../utils/shuffle";

export const useDeck = (gridSize: number) => {
  return useMemo(() => {
    const suits = ["H", "C", "P", "T"];
    const deck: any[] = [];
    suits.forEach((suit) => {
      for (let i = 1; i <= 13; i++) {
        deck.push(`${i}${suit}`);
      }
    });
    return shuffle(deck).slice(0, gridSize * gridSize);
  }, [gridSize]);
};
