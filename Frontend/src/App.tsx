import React from 'react';
import './design/LandingPage.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import AboutUsPage from "./components/AboutUsPage";
import FAQsPage from "./components/FAQsPage";
import ImpressumPage from "./components/ImpressumPage";
import RecipeCreator from "./components/RecipeCreator";
import ProfilePage from "./components/ProfilePage";
import SettingsPage from "./components/SettingsPage";
import RecipePage from "./components/RecipePage";
import RecipeBrowser from "./components/RecipeBrowser";



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
                <Route path='/profile' element={<ProfilePage/>} />
                <Route path='/settings' element={<SettingsPage/>} />
                <Route path='/recipe' element={<RecipePage/>} />
                <Route path='/browse' element={<RecipeBrowser/>} />
                <Route path='/recipeCreate' element={<RecipeCreator/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
