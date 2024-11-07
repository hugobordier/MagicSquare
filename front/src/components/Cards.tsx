import React from "react";

interface CardProps {
  card: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => (
  <img
    src={`../assets/CARDS/${card}.png`}
    alt={card}
    onClick={onClick}
    className="w-full h-auto object-cover cursor-pointer"
  />
);

export default Card;
