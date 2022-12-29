import axios from 'axios';

// ID from MyAnimeList
const onePiece = 21;
const id = onePiece;

const URL = `https://api.jikan.moe/v4/anime/${id}/characters`;

const getCharacters = () => {
  const response = axios.get(URL);
  return response;
};

function filterDetails(obj) {
  const { character, role, favorites } = obj;
  const { images, name } = character;

  return {
    name: name,
    role: role,
    img: images.webp.image_url,
    likes: favorites,
  };
}

export { getCharacters, filterDetails };
