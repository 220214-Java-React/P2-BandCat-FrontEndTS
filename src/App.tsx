import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

function App() {

  const [currentUser, setCurrentUser] = useState('');
  //useEffect(() => console.log(currentUser), [currentUser]);

  return (
    <>
    <BrowserRouter>
      <Routes>
        
        {/* Sign Up Page */}
        <Route path='/signUp' element={<SignUp />}/>


      {/* Each "page" is a route, each route has its own URL => path= "/url" element={<Component />} */}
        <Route path='/login' element={<Login /*{Pass in what ever info this component needs in order to operate}*//>} />

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
