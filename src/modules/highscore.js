function saveHighScore(highscore) {
  localStorage.setItem('highscore', highscore);
}

function getHighScore() {
  const highscore = localStorage.getItem('highscore');
  return highscore ? highscore : 0;
}

export { getHighScore, saveHighScore };
