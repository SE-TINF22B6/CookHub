import React, {useCallback, useEffect} from 'react';
import './style/Welcome.css';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';

import NavBar from "./components/NavBar";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import FAQsPage from "./pages/FAQsPage";
import Impressum from "./pages/Impressum";
import FoodForge from "./pages/FoodForge";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import MyRecipes from "./pages/MyRecipes";
import FindRecipes from "./pages/FindRecipes";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import {UserClient} from "./clients/UserClient";
import {UserData} from "./models/UserData";


const AppBarConditional = () => {
    const location = useLocation();
    const excludedRoutes = ['/', '/login', '/logout'];

    if (excludedRoutes.includes(location.pathname)) {
        return null; // Zeigt nichts an, wenn die Route eine der ausgeschlossenen Routen ist
    }

    return null;      //return <Footer />
};


function App() {

    const [userData, setUserData] = React.useState<UserData | null>();


    const getUserData = useCallback(async () => {
        try {
            const response = await new UserClient().isLoggedIn();

            if (response?.ok) {
                const data = await response?.json();
                setUserData(data);
            }

        } catch (error) {
            console.error('Login check failed:', error);
            setUserData(null);
        }
    },[userData]);


    useEffect(() => {
        getUserData()
    }, [userData]);


    return (
        <div className="App">
            <BrowserRouter>
                <AppBarConditional/>
                <NavBar data={userData?? null}/>
                <Routes>
                    <Route path='/' element={<Welcome/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<SignUp/>}/>
                    <Route path='/about' element={<AboutUs/>}/>
                    <Route path='/faqs' element={<FAQsPage/>}/>
                    <Route path='/impressum' element={<Impressum/>}/>
                    <Route path='/profile' element={<Profile data={userData ?? null}/>}/>
                    <Route path='/settings' element={<Settings  data={userData?? null}/>}/>
                    <Route path='/myrecipes/:slug' element={<MyRecipes/>}/>
                    <Route path='/findrecipes' element={<FindRecipes/>}/>
                    <Route path='/foodforge' element={<FoodForge data={userData?? null}/>}/>
                    <Route path='/logout' element={<Logout/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
