import React from 'react';
import './style/Welcome.css';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
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
import AdventureZone from "./pages/AdventureZone";
import PleaseLogin from "./pages/PleaseLogin";


interface RequireAuthProps {
    children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const loginStatus = true;  // @ backend Team: implement logic for checking if user is logged in

    return loginStatus ? <>{children}</> : <Navigate to="/please-login" />;
}

const AppBarConditional = () => {
    const location = useLocation();
    const excludedRoutes = ['/', '/login', '/logout'];

    if (excludedRoutes.includes(location.pathname)) {
        return null; // Zeigt nichts an, wenn die Route eine der ausgeschlossenen Routen ist
    }

    return null;      //return <Footer />
};



function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AppBarConditional />
                <NavBar />
                <Routes>
                    <Route path='/' element={<Welcome/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/about' element={<AboutUs/>} />
                    <Route path='/faqs' element={<FAQsPage/>}/>
                    <Route path='/impressum' element={<Impressum/>}/>
                    <Route path='/please-login' element={<PleaseLogin/>} />

                    <Route path='/profile' element={<RequireAuth><Profile/></RequireAuth>}/>
                    <Route path='/settings' element={<RequireAuth><Settings/></RequireAuth>}/>
                    <Route path='/myrecipes' element={<RequireAuth><MyRecipes/></RequireAuth>}/>
                    <Route path='/findrecipes' element={<RequireAuth><FindRecipes/></RequireAuth>}/>
                    <Route path='/foodforge' element={<RequireAuth><FoodForge/></RequireAuth>}/>
                    <Route path='/logout' element={<RequireAuth><Logout/></RequireAuth>}/>
                    <Route path='/adventurezone' element={<RequireAuth><AdventureZone/></RequireAuth>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
