import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import User from './components/model/User';
import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import Search from './components/SearchComps/Search';
import { render } from '@testing-library/react';
import './login.css';


function App() {

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  //useEffect(() => console.log(currentUser), [currentUser]);



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          {/* Login Page */}
          <Route path='/login' element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />

          {/* Sign Up Page */}
          <Route path='/signUp' element={<SignUp />} />

          {/* Search Page */}
          <Route path='/search' element={<Search currentUser={currentUser} setCurrentUser={setCurrentUser} />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
