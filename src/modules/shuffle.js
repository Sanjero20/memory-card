function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function selectRandom(list, length) {
  const randomCharacters = [];

  while (randomCharacters.length != length) {
    const randomNumber = Math.floor(Math.random() * list.length);
    const selected = list[randomNumber];

    // Already played cards will not be included
    if (selected.isClicked) return;

    // Prevent character duplication
    if (!randomCharacters.includes(selected)) {
      randomCharacters.push(selected);
    }
  }

  return randomCharacters;
}

export { shuffle, selectRandom };
