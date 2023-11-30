import React from 'react';
import './design/Frontend.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import AboutUsPage from "./components/AboutUsPage";
import FAQsPage from "./FAQsPage";
import ImpressumPage from "./components/ImpressumPage";
import AddNewRecipe from "./components/AddNewRecipe";
import InputImageIcon from "./components/InputImageIcon";





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
                <Route path='/newrecipe' element={<AddNewRecipe />} />
                <Route path='/inputImageIcon' element={<InputImageIcon/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
