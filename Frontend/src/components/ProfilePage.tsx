import React from "react";
import "../design/ProfilePage.css";
import logo from "../assets/Logo_no_background.svg"
import topBackground from "../assets/ProfilePage/EllipseBackgroundTop.png"

import logoutBTN from "../assets/ProfilePage/Logout.png";
import settingsBTN from "../assets/ProfilePage/Settings.png";

export default function ProfilePage() {
    return (
        <div className="ProfilePage">
            <header className="App-header">

                <img src={topBackground} alt="topBackground"/>

                <div>
                    <img src={logo} className="App-logo" alt="logo"/>
                </div>
                <div>

                </div>


                <div className="Buttons">
                    <img src={logoutBTN} className="LogoutButton" alt="logout button"/>
                    <img src={settingsBTN} className="SettingsButton" alt="settings button"/>
                </div>
            </header>


            <div className="body">



            </div>

        </div>
    );
}