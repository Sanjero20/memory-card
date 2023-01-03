import './sass/app.scss';
import React, { useEffect, useState } from 'react';

// Components
import Loading from './components/Loading';

import Header from './components/Header';
import PlayButton from './components/PlayButton';
import Game from './components/Game';
import Footer from './components/Footer';

//
import { shuffle, selectRandom } from './modules/shuffle';
import {
  getCharacters,
  filterCharacters,
  refreshList,
} from './modules/characters';

// Context API
export const GameContext = React.createContext();

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [characters, setCharacters] = useState([]);
  const [cards, setCards] = useState([]);

  const [round, setRound] = useState(0);
  const [isGameOver, setIsGameOver] = useState(true);

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
        setLoading(false);
        setError('Something went wrong, Try Again!');
      });
  }, []);

  // Add or Reset Number of Cards
  useEffect(() => {
    if (round == 0) return;

    let numberOfCards = 4;
    if (round == 1) {
      let newList = selectRandom(characters, numberOfCards);
      setCards([...newList]);
      return;
    }

    setCards((prevState) => {
      const amount = prevState.length + 2;
      let newList = selectRandom(characters, amount);
      return [...newList];
    });
  }, [round]);

  // Functions
  const playGame = () => {
    setIsGameOver(false);
    setRound(1);
  };

  const gameOver = () => {
    setIsGameOver(true);
    setRound(0);
    const refresh = refreshList(characters);
    setCharacters([...refresh]);
    setCards([]);
  };

  const nextRound = (list) => {
    const isAllClicked = list.every((element) => element.isClicked == true);
    if (isAllClicked) {
      setRound((prevRound) => {
        return prevRound + 1;
      });
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

    // Reshuffle card order
    const shuffledCards = shuffle(newList);
    setCards([...shuffledCards]);
  };

  return (
    <div className="App">
      <Header></Header>

      {loading && <Loading />}
      {!loading && error}

      {!loading && !error && (
        <GameContext.Provider
          value={{
            isGameOver,
            playGame,
            cards,
            clickCard,
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
