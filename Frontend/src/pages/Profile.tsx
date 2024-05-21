import React from "react";
import "../style/Profile.css";
import carlos from "../assets/Chef_Carlo_without_background (1).png";
import avatar from "../assets/Hotdog.svg";
import logoutBTN from "../assets/ProfilePage/Logout.png";
import settingsBTN from "../assets/ProfilePage/Settings.png";
import {UserClient} from "../clients/UserClient";

export default function Profile() {

    const handleLogOut = async () => {
        try {
            const response = await new UserClient().logOut();

            // @ts-ignore
            if (response.ok) {
                console.log("Logout erfolgreich.");

            } else {
                // @ts-ignore
                console.log("Logout fehlgeschlagen: ", response.status);

            }
        } catch (error) {
            console.error("Ein Netzwerkfehler ist aufgetreten:", error);

        }
    };


    return (
        <div id="ProfilePage" style={{backgroundColor: "transparent"}}>

            <div id="ContainerTop">

                <div id="divLogo">
                    <img src={carlos} className="carlos" alt="logo"/>
                </div>

                <div id="divUserInfo">
                    <div className="AvatarHolder">
                        <img src={avatar} className="Avatar" alt="avatar"/>
                    </div>
                    <div className="UsernameHolder">
                        <h1 style={{color:"#C9FE71"}}>Username</h1>
                        <h2 style={{color:"#C9FE71"}}>email</h2>
                    </div>
                </div>


                <div id={"buttonContainer"}>
                    <a href="/"><button onClick={handleLogOut} style={{backgroundColor: "transparent", borderColor:"transparent"}}><img src={logoutBTN} className="LogoutButton" alt="logout button"/></button></a>
                    <a href="/settings"><img src={settingsBTN} className="SettingsButton" alt="settings button"/></a>
                </div>

            </div>


            <div id={"containerBottom"}>

                <div className="CardHolder-1">
                    <h2 style={{color:"#C9FE71", marginTop:"1rem"}}>❤ Favorites</h2>
                </div>
                <div className="CardHolder-2">
                    <h2 style={{color: "#C9FE71", marginTop:"1rem"}}>🍤 Own Recipes</h2>
                </div>
                <div className="CardHolder-3">
                    <h2 style={{color: "#C9FE71", marginTop:"1rem"}}>📄 History</h2>
                </div>

            </div>


        </div>
    );
}