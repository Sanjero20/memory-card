import React from 'react';

function Cards({ characters }) {
  const renderCards = () => {
    return characters.map((character) => (
      <div
        className="card"
        key={character.name}
        onClick={() => {
          // Will be used for game mechanics later
          console.log(character.name);
        }}
      >
        <img className="card-img" src={character.img} alt="" />
        <h3>{character.name}</h3>
      </div>
    ));
  };

  return <div className="card-container">{renderCards()}</div>;
}

export default Cards;
