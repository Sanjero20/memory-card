import React, { useContext } from 'react';
import { GameContext } from '../App';

function Scoreboard() {
  const stats = useContext(GameContext);
  return (
    <div className="score-board">
      <h2 className="round">Round {stats.round}</h2>
      <div className="scores">
        <h4>Score: {stats.score}</h4>
        <h4>Highscore: {stats.highScore} </h4>
      </div>
    </div>
  );
}

export default Scoreboard;
