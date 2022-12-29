import React, { useEffect, useState } from 'react';
import { getCharacters, filterDetails } from './modules/characters';

const minimumLikes = 100;

function App() {
  const [characters, setCharacters] = useState([]);

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

  return <div className="App"></div>;
}

export default App;
