import './App.css';
import Greeting from './components/main-page';
import Login from './components/login';
import SignUp from './components/sign-up';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
//   window.addEventListener('beforeunload', () => {
//     sessionStorage.clear(); // Clear storage on reload
//   });
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Greeting />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}
export default App;
