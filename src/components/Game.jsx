import React, { useContext } from 'react';
import Cards from './Cards';

import { GameContext } from '../App';
import Scoreboard from './Scoreboard';

function Game() {
  const game = useContext(GameContext);
  if (game.isGameOver) return;

  return (
    <div className="Game">
      <Scoreboard />
      <Cards />
    </div>
  );
}

export default Game;
