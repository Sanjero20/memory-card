import React, { useContext } from 'react';
import { GameContext } from '../App';

function Cards() {
  const game = useContext(GameContext);
  const { cards, clickCard } = game;

  const renderCards = () => {
    if (!cards) return;
    return cards.map((character) => (
      <div
        className="card"
        key={Math.random()}
        onClick={() => {
          clickCard(character);
        }}
      >
        <img
          className="card-img"
          src={character.img}
          draggable="false"
          alt=""
        />
      </div>
    ));
  };

  return (
    <div className="card-container">
      {renderCards()}
      {/*  */}
    </div>
  );
}

export default Cards;
