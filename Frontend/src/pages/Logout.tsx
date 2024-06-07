import React from 'react';
import {useNavigate} from 'react-router-dom';
import {UserClient} from '../clients/UserClient';
import "../style/Logout.css";
import ButtonGroup from "@mui/material/ButtonGroup";
import {UserDataParams} from "../models/UserDataParams";
import NotLoggedIn from "../components/NotLoggedIn";

const Logout = (userProfile: UserDataParams) => {
    let data = userProfile.data;
    const navigate = useNavigate();
    const userClient = new UserClient();

    const handleLogout = async () => {
        try {
            const response = await userClient.logOut();
            if (response?.ok) {
                navigate('/login');
                window.location.reload();
            } else {
                console.error('Failed to log out:', await response?.text());
            }
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    const handleKeepCooking = () => {
        navigate('/profile');
    };



    if (!data) {
        return (
            <>
                <NotLoggedIn></NotLoggedIn>
            </>
        )
    }

    return (
        <div className="logout-container">
            <div className="logout-box">
                <p className="logout-text">Oh no! Are you leaving?</p>
                    <ButtonGroup
                        className="button-container">
                        <button className="keep-cooking-button" onClick={handleKeepCooking}>Keep cooking</button>
                        <button className="log-out-button" onClick={handleLogout}>Yes! Log me out</button>
                    </ButtonGroup>
            </div>
        </div>
    );
}

export default Logout;
