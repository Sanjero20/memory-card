import React, { useContext } from 'react';
import { GameContext } from '../App';

function PlayButton() {
  const game = useContext(GameContext);
  if (!game.isGameOver) return;

  return (
    <button className="btn-play" onClick={game.playGame}>
      PLAY
    </button>
  );
}

export default PlayButton;
