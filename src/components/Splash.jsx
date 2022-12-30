// Loading screen
import React from 'react';

import logo from '../assets/One-Piece-logo.svg';

function Splash() {
  return (
    <div className="splash-screen">
      <img className="OP-logo" src={logo} alt="" />
    </div>
  );
}

export default Splash;
