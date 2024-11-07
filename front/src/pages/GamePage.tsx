import React, { useState } from "react";
import Grid from "../components/Grid";
import { useDeck } from "../hooks/useDeck";

const GamePage = () => {
  const [gridSize, setGridSize] = useState(6);
  const deck = useDeck(gridSize);

  return (
    <div className="p-4">
      <h1 className="text-2xl text-center mb-4">
        Jeu de Cartes - Grille {gridSize}x{gridSize}
      </h1>
      <Grid cards={deck} gridSize={gridSize} />
    </div>
  );
};

export default GamePage;
