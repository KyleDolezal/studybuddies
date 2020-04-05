import React from 'react';
import Nav from 'react-bootstrap/Nav'

const Header = (props) => {
  return(
    <Nav bg="primary" variant="light" className="justify-content-center">
      <h1>Welcome{props.useremail ? (', ' + props.useremail.split('@')[0]) : ''}</h1>
    </Nav>
  );
}

export default Header;
