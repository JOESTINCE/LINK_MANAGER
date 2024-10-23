import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Snackbar, Button, Alert, CircularProgress } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';


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
    borderRadius: '15px', // Rounded corners
    border: '1px solid rgba(255, 255, 255, 0.3)', // Subtle white border
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Soft shadow
    color: '#fff', // White text for readability
    textAlign: 'center',
    fontSize: '1.5rem',
    padding: '40px 30px'
  }
  const auth = getAuth();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [isLoader, setLoader] = useState(false)
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [login, setLogin] = useState({
    emailId:'',
    password:'',
    confirmPassword:'',
  })
  const [validationError, setValidationError] = useState({});
  const handleSnackbarOpen = (message, severity) => {
    setSnackbar({ open: true, message: message, severity: severity });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const loginChangeHandler = (type, input)=>{
    setLogin((prevLogin) => ({
      ...prevLogin,
      [type]: input
    }));
    setValidationError(validateForm());
  }
  const onSignUp = ()=>{
    const errors = validateForm(true);
    if (Object.keys(validationError).length ) {
      if(!validationError?.passwordMissMatch)
      handleSnackbarOpen('Please fill the signup field properly', 'error');
    }
    else{
      setValidationError(errors);
      if (Object.keys(errors).length === 0) {
        setLoader(true)
        createUserWithEmailAndPassword(auth, login.emailId, login.password)
          .then((userCredential) => {
            handleSnackbarOpen('SignUp Successful!', 'success');
            // Signed up 
            navigate('/login'); // Redirect to the login page
            // ...
          })
          .catch((error) => {
            setLoader(false)
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') handleSnackbarOpen('This email ID is already in use', 'error');
            else handleSnackbarOpen(errorCode, 'error');
          });
      }
   
    }

  }
  const validateForm = (onSubmit = false) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const errors = {};

    if (!login.emailId && onSubmit) errors.email = 'Email ID is required!';
    if (login.emailId && !emailRegex.test(login.emailId)) errors.email = 'Invalid Email ID!';
    if (!login.password && onSubmit) errors.password = 'Password is required!';
    if(login.password && login.password.length <6 ) errors.password = 'The length of the password should be greater than 6'
    if (!login.confirmPassword && onSubmit) errors.confirmPassword = 'Confirm password is required!'
    if(login.confirmPassword !== login.password && onSubmit) {
      errors.passwordMissMatch = true
      handleSnackbarOpen('Password mismatch', 'error');
    }
    return errors;
  };

  return (
  <div style={{display:'flex', alignItems: 'center', justifyContent:'center', width: '100%', height:'100vh'}}>
      <div style={loginDivStyle}>
      <div style={{color: 'white', fontSize: '35px'}}>
        Sign Up
        </div>
      <TextField
          label="Email ID"
          variant="outlined"
          sx={customInputProperties}
          type="text"
        value={login.emailId}
          onChange={(e) => loginChangeHandler('emailId', e.target.value)}
        fullWidth
          error={Boolean(validationError.email)}
          helperText={validationError.email}
      />
        <TextField
          label="Password"
          variant="outlined"
          sx={customInputProperties}
          type="password"
          value={login.password}
          onChange={(e) => loginChangeHandler('password', e.target.value)}
          fullWidth
          error={Boolean(validationError.password)}
          helperText={validationError.password}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          sx={customInputProperties}
          type="password"
          value={login.confirmPassword}
          onChange={(e) => loginChangeHandler('confirmPassword', e.target.value)}
          fullWidth
          error={Boolean(validationError.confirmPassword)}
          helperText={validationError.confirmPassword}
        />
        <LoadingButton
          style={{ backgroundColor: 'black', color: 'white', border: '1px solid white', minHeight: '40px', minWidth: '80px' }}
          onClick={onSignUp}
          loading={isLoader}
          variant="outlined"
          loadingIndicator={<CircularProgress sx={{ color: 'white' }} size={24} />}
        >
          {!isLoader && 'Sign up'}
        </LoadingButton>
        <span style={{ fontSize: '16px', marginBottom: '20px' }}>Already have an account? <a href="/login" style={{cursor:'pointer', textDecoration:'underline', color: 'white'}}>Login</a></span>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: '100%', backgroundColor: snackbar.severity === 'success' ? 'green' : 'red', color: 'white' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
   </div>
    </div>
  );
};

export default SignUp;