import './sass/app.scss';
import React, { useEffect, useState } from 'react';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Cards from './components/Cards';
import PlayButton from './components/PlayButton';

import Splash from './components/Splash';

// External functions
import hideSplash from './modules/splash';
import { shuffle, selectRandom } from './modules/shuffle';
import {
  getCharacters,
  filterCharacters,
  refreshList,
} from './modules/characters';

function App() {
  const [characters, setCharacters] = useState([]);
  const [pickedCharacters, setPickedCharacters] = useState([]);

  const [round, setRound] = useState(0);
  const [isGameOver, setIsGameOver] = useState(true);

  // Will only run at first render
  useEffect(() => {
    // Set the characters with filtered properties
    getCharacters().then((res) => {
      let data = res.data.data;
      data = filterCharacters(data);
      setCharacters([...data]);
      hideSplash();
    });
  }, []);

  // Round Updates
  useEffect(() => {
    if (round == 0) return;

    let numberOfCards = 4;
    if (round == 1) {
      let newList = selectRandom(characters, numberOfCards);
      setPickedCharacters([...newList]);
      return;
    }

    setPickedCharacters((prevState) => {
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
    setPickedCharacters([]);
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
    const index = pickedCharacters.findIndex((obj) => obj.name == card.name);
    const newList = pickedCharacters;
    newList[index]['isClicked'] = true;

    // Reshuffle card order
    const shuffledCards = shuffle(newList);
    setPickedCharacters([...shuffledCards]);
  };

  return (
    <div className="App">
      <Splash></Splash>

      <Header></Header>

      {isGameOver ? (
        <PlayButton play={playGame} />
      ) : (
        <Cards characters={pickedCharacters} clickCard={clickCard}></Cards>
      )}

      <Footer></Footer>
    </div>
  );
}

export default App;
