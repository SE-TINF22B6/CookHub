import React from 'react';
import './style/Welcome.css';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import NavBar from "./components/NavBar";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import FAQsPage from "./pages/FAQsPage";
import Impressum from "./pages/Impressum";
import CreateRecipe from "./pages/CreateRecipe";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import MyRecipes from "./pages/MyRecipes";
import FindRecipes from "./pages/FindRecipes";
import MyAccount from "./pages/MyAccount";
import Logout from "./pages/Logout";
import AdventureZone from "./pages/AdventureZone";


const AppBarConditional = () => {
    const location = useLocation();
    const excludedRoutes = ['/', '/login', '/logout'];

    if (excludedRoutes.includes(location.pathname)) {
        return null; // Zeigt nichts an, wenn die Route eine der ausgeschlossenen Routen ist
    }

    return <NavBar />;
};


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <AppBarConditional />
            <Routes>
                <Route path='/' element={<Welcome/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/about' element={<AboutUs/>} />
                <Route path='/faqs' element={<FAQsPage/>} />
                <Route path='/impressum' element={<Impressum/>} />
                <Route path='/journey' element={<Login/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/settings' element={<Settings/>} />
                <Route path='/myrecipes' element={<MyRecipes/>} />
                <Route path='/findrecipes' element={<FindRecipes/>} />
                <Route path='/createrecipe' element={<CreateRecipe/>} />
                <Route path='/myaccount' element={<MyAccount/>} />
                <Route path='/logout' element={<Logout/>} />
                <Route path='/adventurezone' element={<AdventureZone/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
