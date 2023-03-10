import axios from 'axios';

// ID from MyAnimeList
const onePiece = 21;
const id = onePiece;

const URL = `https://api.jikan.moe/v4/anime/${id}/characters`;

const getCharacters = () => {
  const response = axios.get(URL);
  return response;
};

const filterCharacters = (list) => {
  // Remove voice actor and role property
  const filter1 = list.map(
    ({ voice_actors, role, ...properties }) => properties
  );

  // Sort based on number of likes / favorites
  const sorted = filter1.sort((a, b) => {
    return a.favorites > b.favorites ? -1 : 1;
  });

  // Only get the popular characters
  let populars = sorted.splice(0, 88);

  // Filter out everything else, except name and image url
  populars = populars.map(({ character }) => {
    return {
      name: character.name,
      img: character.images.webp.image_url,
      isClicked: false,
    };
  });

  return populars;
};

const refreshList = (list) => {
  // Set isClicked to false for every character
  return list.map((character) => {
    return {
      ...character,
      isClicked: false,
    };
  });
};

export { getCharacters, filterCharacters, refreshList };
