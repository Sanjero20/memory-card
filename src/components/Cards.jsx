import React from 'react';

function Cards({ characters, clickCard }) {
  const renderCards = () => {
    if (!characters) return;
    return characters.map((character) => (
      <div
        className="card"
        key={Math.random()}
        onClick={() => {
          clickCard(character);
        }}
      >
        <img className="card-img" src={character.img} alt="" />
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
