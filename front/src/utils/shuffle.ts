export const shuffle = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export const getCardValue = (value: string): number => {
  switch (value) {
    case "A":
      return 1;
    case "0":
      return 10;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    default:
      return parseInt(value, 10); // Pour les valeurs numériques normales (2-9)
  }
};
