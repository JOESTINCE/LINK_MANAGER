import './App.css';
import Greeting from './components/main-page';
import { useState } from 'react';
import Login from './components/login';
import SignUp from './components/sign-up';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  window.addEventListener('beforeunload', () => {
    sessionStorage.clear(); // Clear storage on reload
  });
  const [isEdit, changeIsEdit] = useState('false');
  const isEditChange = (isEditFromChild)=>{
    changeIsEdit(isEditFromChild);
    console.log(isEdit)
  }
  const firebaseConfig = {
    apiKey: "AIzaSyBedeMriUgfpnbOq5BY5W5Uey6SDSzbxZk",
    authDomain: "link-manager-f4fa2.firebaseapp.com",
    projectId: "link-manager-f4fa2",
    storageBucket: "link-manager-f4fa2.appspot.com",
    messagingSenderId: "1047022878505",
    appId: "1:1047022878505:web:ff01650fc87bfb2418c138",
    measurementId: "G-738ZP5V3MB"
  };
  return (
    // <div >
    //   <div>
    //     <Header headerMessage="This is header message!"
    //       onIsEditChange={isEditChange}/>
    //   </div>
    //   <div>
    //     <Greeting name='Joe'
    //       isEdit = {isEdit} />
    //   </div>
    //   {/* <div>
    //     <Login/>
    //   </div> */}
    //   </div>
    <Router>
      <Routes>
        <Route path="/main" element={<Greeting />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}
export default App;
