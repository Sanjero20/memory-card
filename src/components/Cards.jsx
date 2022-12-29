import React from 'react';

function Cards({ characters, clickCard }) {
  const renderCards = () => {
    if (!characters) return;
    return characters.map((character) => (
      <div
        className="card"
        key={character.name}
        onClick={(e) => clickCard(e, character)}
      >
        <img className="card-img" src={character.img} alt="" />
        <p className="name">{character.name}</p>
      </div>
    ));
  };

  return <div className="card-container">{renderCards()}</div>;
}

export default Cards;
