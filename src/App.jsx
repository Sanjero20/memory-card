import React, { useEffect, useState } from 'react';
import { getCharacters, filterCharacters } from './modules/characters';

import Header from './components/Header';
import Footer from './components/Footer';
import Cards from './components/Cards';
import PlayButton from './components/PlayButton';

function App() {
  const [characters, setCharacters] = useState([]);

  const [round, setRound] = useState(0);
  const [pickedCharacters, setPickedCharacters] = useState([]);

  const [isGameOver, setIsGameOver] = useState(true);

  // Will only run at first render
  useEffect(() => {
    // Set the characters with filtered properties
    getCharacters().then((res) => {
      let data = res.data.data;
      data = filterCharacters(data);
      setCharacters([...data]);
    });
  }, []);

  // GameOver
  useEffect(() => {
    if (isGameOver == true) {
      setRound(0);
      return;
    }

    setRound(1);
  }, [isGameOver]);

  // Round Updates
  useEffect(() => {
    if (round == 0) return;

    let newList = [];

    let numberOfCards = 4;
    if (round == 1) {
      newList = selectRandom(characters, numberOfCards);
      setPickedCharacters([...newList]);
      return;
    }

    setPickedCharacters((prevState) => {
      const amount = prevState.length + 2;
      newList = selectRandom(characters, amount);
      return [...newList];
    });
  }, [round]);

  // Functions
  const playGame = () => {
    setIsGameOver(false);
    setRound(1);
  };

  const nextRound = (list) => {
    const isAllClicked = list.every((element) => element.isClicked == true);
    if (isAllClicked) {
      setRound((prevRound) => {
        return prevRound + 1;
      });
    }
  };

  const clickCard = (e, obj) => {
    console.log(obj);
    // if not clicked then change to true
    // shuffle card order
    // gameover
  };

  return (
    <div className="App">
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

function selectRandom(list, length) {
  const randomCharacters = [];

  while (randomCharacters.length != length) {
    const randomNumber = Math.floor(Math.random() * list.length);
    const selected = list[randomNumber];

    if (!randomCharacters.includes(selected)) {
      randomCharacters.push(selected);
    }
  }

  return randomCharacters;
}

export default App;
