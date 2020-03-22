import React from 'react';

const Header = (props) => {
  return(
    <span>
      <p>Welcome{props.useremail ? (', ' + props.useremail.split('@')[0]) : ''}</p>
    </span>
  );
}

export default Header;
