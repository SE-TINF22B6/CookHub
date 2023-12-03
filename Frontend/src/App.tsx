import React from 'react';
import './Frontend.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import AboutUsPage from "./AboutUsPage";
import FAQsPage from "./FAQsPage";
import ImpressumPage from "./ImpressumPage";





function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage/>} />
                <Route path='/login' element={<LoginPage/>} />
                <Route path='/about' element={<AboutUsPage/>} />
                <Route path='/faqs' element={<FAQsPage/>} />
                <Route path='/impressum' element={<ImpressumPage/>} />
                <Route path='/journey' element={<LoginPage/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
