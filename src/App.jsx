import './sass/app.scss';
import React, { useEffect, useReducer, useState } from 'react';

// Components
import Loading from './components/Loading';

import Header from './components/Header';
import PlayButton from './components/PlayButton';
import Game from './components/Game';
import Footer from './components/Footer';

//
import {
  getCharacters,
  filterCharacters,
  refreshList,
} from './modules/characters';
import { shuffle, selectRandom } from './modules/shuffle';
import { gameReducer, initialGameState } from './modules/gameStatus';

import { getHighScore, saveHighScore } from './modules/highscore';

// Context API
export const GameContext = React.createContext();

function App() {
  const [gameStats, gameDispatch] = useReducer(gameReducer, initialGameState);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [characters, setCharacters] = useState([]);
  const [cards, setCards] = useState([]);

  const [highScore, setHighScore] = useState(getHighScore);

  // Fetch character list from Jikan API
  useEffect(() => {
    getCharacters()
      .then((res) => {
        let data = res.data.data;
        data = filterCharacters(data);
        setCharacters([...data]);
        setLoading(false);
      })
      .catch((err) => {
        setError('Something went wrong, Try Again!');
        setLoading(false);
      });
  }, []);

  // Add or Reset Number of Cards
  useEffect(() => {
    if (gameStats.round == 0) return;

    const numberOfCards = 4;
    if (gameStats.round == 1) {
      let newList = selectRandom(characters, numberOfCards);
      setCards(newList);
      return;
    }

    setCards((prevState) => {
      const numberOfCards = prevState.length + 2;
      const newCards = selectRandom(characters, numberOfCards);
      return newCards;
    });
  }, [gameStats.round]);

  useEffect(() => {
    let score = gameStats.score;
    if (score > highScore) {
      setHighScore(score);
      saveHighScore(score);
    }
  }, [gameStats.score]);

  // Functions
  const playGame = () => {
    gameDispatch('start-game');
  };

  const gameOver = () => {
    const refresh = refreshList(characters);
    setCharacters([...refresh]);
    setCards([]);

    gameDispatch('gameover');
  };

  const nextRound = (list) => {
    const isAllClicked = list.every((element) => element.isClicked == true);
    if (isAllClicked) {
      gameDispatch('next-round');
      return;
    }
  };

  const clickCard = (card) => {
    // Stop game if card is already clicked
    if (card.isClicked) {
      gameOver();
      return;
    }

    // If not clicked, set the property to true
    const index = cards.findIndex((obj) => obj.name == card.name);
    const newList = cards;
    newList[index]['isClicked'] = true;

    // Check if every card is already click
    nextRound(cards);

    // Reshuffle card order
    const shuffledCards = shuffle(newList);
    setCards([...shuffledCards]);

    gameDispatch('add-score');
  };

  return (
    <div className="App">
      <Header></Header>

      {loading && <Loading />}
      {!loading && error}

      {!loading && !error && (
        <GameContext.Provider
          value={{
            playGame,
            cards,
            clickCard,
            highScore,
            score: gameStats.score,
            round: gameStats.round,
            isGameOver: gameStats.isGameOver,
          }}
        >
          <PlayButton />
          <Game />
        </GameContext.Provider>
      )}

      <Footer></Footer>
    </div>
  );
}

export default App;
