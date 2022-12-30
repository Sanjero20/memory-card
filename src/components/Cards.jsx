import React from 'react';

function Cards({ characters, clickCard }) {
  const cardAnimation = () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
      card.classList.add('minimize');
      setTimeout(() => {
        card.classList.remove('minimize');
      }, 100);
    });
  };

  const renderCards = () => {
    if (!characters) return;
    return characters.map((character) => (
      <div
        className="card"
        key={character.name}
        onClick={(e) => {
          clickCard(e, character);
          cardAnimation();
        }}
      >
        <img className="card-img" src={character.img} alt="" />
      </div>
    ));
  };

  return <div className="card-container">{renderCards()}</div>;
}

export default Cards;
