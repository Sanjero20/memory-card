import React, { useContext } from 'react';
import Cards from './Cards';

import { GameContext } from '../App';

function Game() {
  const game = useContext(GameContext);
  if (game.isGameOver) return;

  return (
    <div>
      {/* Scoreboard */}
      {/* Levels / Rounds */}
      <Cards />
    </div>
  );
}

export default Game;
