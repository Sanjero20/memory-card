import React from 'react';

function PlayButton({ play }) {
  return (
    <button className="btn-play" onClick={play}>
      PLAY
    </button>
  );
}

export default PlayButton;
