import CardType from "../types/Card";

const lookupTable = {
  hasAdjacent: (row: number, col: number, grid: CardType[][]) => {
    const directions = [
      { row: -1, col: 0 }, // up
      { row: 1, col: 0 }, // bottom
      { row: 0, col: -1 }, // left
      { row: 0, col: 1 }, // right
    ];
    return directions.find(({ row: dRow, col: dCol }) => {
      const newRow = row + dRow;
      const newCol = col + dCol;
      return (
        newRow >= 0 &&
        newCol >= 0 &&
        newRow < grid.length &&
        newCol < grid[0].length &&
        grid[newRow][newCol].isVisible
      );
    });
  },
};

export const status = () => {
  return;
};

export const handleChoice = (
  grid: CardType[][],
  card: CardType,
  position: { row: number; col: number },
  choice: string,
) => {
  if (isCardPlayable(grid, card, position)) {
    grid[position.row][position.col].isVisible = true;
  }
};

const isCardPlayable = (
  grid: CardType[][],
  card: CardType,
  position: { row: number; col: number },
): boolean => {
  const { row, col } = position;

  if (card.isVisible) {
    console.log("1");
    return false;
  }

  if (!lookupTable.hasAdjacent(row, col, grid)) {
    console.log("3");
    return false;
  }

  return true;
};
