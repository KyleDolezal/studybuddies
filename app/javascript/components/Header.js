import React from 'react';

const Header = (props) => {
  return(
    <span>
      <p>Welcome{props.user ? (', ' + props.user) : ''}</p>
    </span>
  );
}

export default Header;
