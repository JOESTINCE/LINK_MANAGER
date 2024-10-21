import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const customInputProperties = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // Border color
      },
      input: {
        color: 'white', // Input text color
        backgroundColor: 'black'
      },
      '&:hover fieldset': {
        borderColor: 'blue', // Hover color
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white', // Focused color
      },
    },
    '& .MuiInputLabel-root': {
      color: 'white', // Label color
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'white', // Focused label color
    },
  }
  const loginDivStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '25px',
    width: '70vh',
    minHeight: '40vh',
    backgroundColor: 'rgb(0 0 255)', // Blue tint with transparency
    // backdropFilter: 'blur(10px)', // Glass blur effect
    // WebkitBackdropFilter: 'blur(10px)', // Safari support
    padding: '20px',
    borderRadius: '15px', // Rounded corners
    border: '1px solid rgba(255, 255, 255, 0.3)', // Subtle white border
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Soft shadow
    color: '#fff', // White text for readability
    textAlign: 'center',
    fontSize: '1.5rem',
    padding: '40px 30px'
  }
  const auth = getAuth();
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [login, setLogin] = useState({
    emailId:'',
    password:'',
    confirmPassword:'',
  })
  const loginChangeHandler = (type, input)=>{
    setLogin((prevLogin) => ({
      ...prevLogin,
      [type]: input
    }));
    console.log(login);
  }
  const onSignUp = ()=>{
    createUserWithEmailAndPassword(auth, login.emailId, login.password)
      .then((userCredential) => {
        // Signed up 
        navigate('/login'); // Redirect to the login page
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  }
  

  return (
  <div style={{display:'flex', alignItems: 'center', justifyContent:'center', width: '100%', height:'100vh'}}>
      <div style={loginDivStyle}>
      <div style={{color: 'white', fontSize: '35px'}}>
        Login
        </div>
      <TextField
          label="Email ID"
          variant="outlined"
          sx={customInputProperties}
          type="text"
        value={login.emailId}
          onChange={(e) => loginChangeHandler('emailId', e.target.value)}
        fullWidth
      />
        <TextField
          label="Password"
          variant="outlined"
          sx={customInputProperties}
          type="password"
          value={login.password}
          onChange={(e) => loginChangeHandler('password', e.target.value)}
          fullWidth
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          sx={customInputProperties}
          type="password"
          value={login.confirmPassword}
          onChange={(e) => loginChangeHandler('confirmPassword', e.target.value)}
          fullWidth
        />
        <Button style={{ backgroundColor: 'black', color: 'white', borderColor: '#white' }} variant="outlined" onClick={onSignUp} >Sign up</Button>
        <span style={{ fontSize: '16px', marginBottom: '20px' }}>Already have an account? <a href="/login" style={{cursor:'pointer', textDecoration:'underline', color: 'white'}}>signup</a></span>
   </div>
    </div>
  );
};

export default SignUp;