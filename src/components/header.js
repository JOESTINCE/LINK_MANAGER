import React from 'react';

const Header = ({ headerMessage }) => {
  return (
    <div style={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
      <h1>{headerMessage}!</h1>
    </div>
  );
};

export default Header;