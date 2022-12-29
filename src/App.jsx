import React, { useEffect, useState } from 'react';
import { getCharacters, filterDetails } from './modules/characters';

import Header from './components/Header';
import Footer from './components/Footer';
import Cards from './components/Cards';

const minimumLikes = 100;

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  // Will only run at first render
  useEffect(() => {
    getCharacters().then((res) => {
      const data = res.data.data;
      const list = [];

      // Only include the key/value that is needed
      data.forEach((item) => {
        list.push(filterDetails(item));
      });

      // Get the popular characters
      const filteredList = list.filter((item) => item.likes > minimumLikes);

      // Set the characters list
      setCharacters([...filteredList]);
    });
  }, []);

  const shuffleCards = () => {
    const list = selectRandomCharacters(characters, 4);
    setSelectedCharacters([...list]);
  };

  return (
    <div className="App">
      <Header></Header>

      <Cards characters={selectedCharacters} />
      <button className="btn" onClick={shuffleCards}>
        Shuffle
      </button>

      <Footer></Footer>
    </div>
  );
}

function selectRandomCharacters(list, length) {
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
