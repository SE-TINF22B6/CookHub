import React from 'react';
import logo from './assets/Logo_no_background.svg';
import './Frontend.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage/>} />
                <Route path='/login' element={<LoginPage/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
