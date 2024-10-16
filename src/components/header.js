import React from 'react';
import Button from '@mui/material/Button';
const Header = ({ headerMessage }) => {
  return (
    <div style={{ display: 'flex'}}>
    <div style={{display: 'flex', alignItems:'center', justifyContent:'center', minWidth: '80%',}}>
      <h1>{headerMessage}!</h1>
    </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '20%' }}>
        <Button variant="outlined">Edit</Button>
    </div>
    </div>
  );
};

export default Header;