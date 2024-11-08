import CardType from "../types/Card";
import Card from "./Cards";

interface RemainingCardProp {
  remainingCards: CardType[];
  cardSize: number;
}

const RemainingCards = ({ remainingCards, cardSize }: RemainingCardProp) => {
  const width = Math.round(50 + cardSize * 6);
  const height = Math.round(width * (88 / 62));
  return (
    <div
      className="relative flex items-center justify-center "
      style={{
        height,
        width,
      }}
    >
      {remainingCards.map((card, index) => (
        <div
          key={index}
          className="absolute top-0 transform left-10"
          style={{ transform: `translateX(${index * 10}px)` }}
        >
          <Card card={card} cardSize={cardSize} />
        </div>
      ))}
    </div>
  );
};

export default RemainingCards;
