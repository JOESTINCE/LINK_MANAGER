import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Snackbar, Button, Alert } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = useState({ emailId: '', password: '' });
  const [validationError, setValidationError] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const auth = getAuth();
  const navigate = useNavigate();

  const customInputProperties = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'white' },
      input: { color: 'white', backgroundColor: 'black' },
      '&:hover fieldset': { borderColor: 'blue' },
      '&.Mui-focused fieldset': { borderColor: 'white' },
    },
    '& .MuiInputLabel-root': { color: 'white' },
    '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
  };

  const loginDivStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexDirection: 'column', gap: '25px', width: '70vh', minHeight: '40vh',
    backgroundColor: 'rgb(0 0 255)', padding: '40px 20px', borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 1)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    color: '#fff', textAlign: 'center', fontSize: '1.5rem'
  };

  const loginChangeHandler = (type, input) => {
    setLogin((prevLogin) => ({ ...prevLogin, [type]: input }));
    setValidationError(validateForm());
  };

  const onLogin = () => {
    const errors = validateForm(true);
    setValidationError(errors);

    if (Object.keys(errors).length === 0) {
      signInWithEmailAndPassword(auth, login.emailId, login.password)
        .then((userCredential) => {
          handleSnackbarOpen('Login Successful!', 'success');
          const user = userCredential.user;
          localStorage.setItem('email', user.email);
          navigate('/main');
        })
        .catch((error) => {
          handleSnackbarOpen('Login Failed! Please try again.', 'error');
        });
    }
  };

  const validateForm = (onSubmit = false) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const errors = {};

    if (!login.emailId && onSubmit) errors.email = 'Email ID is required!';
    if (login.emailId && !emailRegex.test(login.emailId)) errors.email = 'Invalid Email ID!';
    if (!login.password && onSubmit) errors.password = 'Password is required!';
    return errors;
  };

  const handleSnackbarOpen = (message, severity) => {
    setSnackbar({ open: true, message: message, severity: severity });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}>
      <div style={loginDivStyle}>
        <div style={{ color: 'white', fontSize: '35px' }}>Login</div>

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

        <Button
          style={{ backgroundColor: 'black', color: 'white', border: '1px solid white' }}
          variant="outlined"
          onClick={onLogin}
        >
          Login
        </Button>

        <span style={{ fontSize: '16px', marginBottom: '20px' }}>
          Don't have an account? <a href='/signup' style={{ textDecoration: 'underline', color: 'white' }}>Sign up</a>
        </span>

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

export default Login;
