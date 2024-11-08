import CardType from "../types/Card";

interface CardProps {
  card: CardType;
  onClick?: () => void;
  cardSize: number; // Taille de 1 à 10
}

const Card = ({ card, onClick, cardSize }: CardProps) => {
  const width = Math.round(50 + cardSize * 6);
  const height = Math.round(width * (88 / 62));

  const cardImageUrl = card.isVisible
    ? `https://deckofcardsapi.com/static/img/${card.value}.png`
    : `https://deckofcardsapi.com/static/img/back.png`;
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center text-black bg-white rounded-md cursor-pointer"
      style={{
        height,
        width,
      }}
    >
      <img
        src={cardImageUrl}
        alt={card.value}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default Card;
