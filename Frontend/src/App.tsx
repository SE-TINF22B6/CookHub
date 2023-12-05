import React from 'react';
import './design/LandingPage.css';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import ButtonAppBar from "./components/ButtonAppBar";
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
import MyAccount from "./components/MyAccount";
import Logout from "./components/Logout";


const AppBarConditional = () => {
    const location = useLocation();
    const excludedRoutes = ['/', '/login', '/logout'];

    if (excludedRoutes.includes(location.pathname)) {
        return null; // Zeigt nichts an, wenn die Route eine der ausgeschlossenen Routen ist
    }

    return <ButtonAppBar />;
};


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <AppBarConditional />
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
                <Route path='/myaccount' element={<MyAccount/>} />
                <Route path='/logout' element={<Logout/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
