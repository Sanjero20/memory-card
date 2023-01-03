const initialGameState = {
  score: 0,
  round: 0,
  isGameOver: true,
};

const gameReducer = (state, action) => {
  switch (action) {
    case 'gameover':
      return initialGameState;
    case 'start-game':
      return {
        ...state,
        round: 1,
        isGameOver: false,
      };
    case 'add-score':
      return {
        ...state,
        score: state.score + 1,
      };
    case 'next-round':
      return {
        ...state,
        round: state.round + 1,
      };
    default:
      return state;
  }
};

export { gameReducer, initialGameState };
