import React from "react";
import "../style/Profile.css";
import carlos from "../assets/Chef_Carlo_without_background (1).png";
import logoutBTN from "../assets/ProfilePage/Logout.png";
import settingsBTN from "../assets/ProfilePage/Settings.png";
import {UserClient} from "../clients/UserClient";

import {UserDataParams} from "../models/UserDataParams";
import {useNavigate} from "react-router-dom";
import NotLoggedIn from "../components/NotLoggedIn";



export default function Profile(userProfile: UserDataParams) {
    let data = userProfile.data;
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            const response = await new UserClient().logOut();


            if (response?.ok) {
                console.log("Logout erfolgreich.");
                window.location.href = "/";

            } else {

                console.log("Logout fehlgeschlagen: ", response?.status);

            }
        } catch (error) {
            console.error("Ein Netzwerkfehler ist aufgetreten:", error);

        }
    };




                if (!data) {
                    navigate("/login");
                }



    if (!data){
        return (
            <>
            <NotLoggedIn></NotLoggedIn>
            </>
        )
    }

    return (
        <>

        <div id="ProfilePage" style={{backgroundColor: "transparent"}}>

            <div id="ContainerTop">

                <div id="divLogo">
                    <img src={carlos} className="carlos" alt="logo"/>
                </div>

                <div id="divUserInfo">
                    <div className="AvatarHolder">
                        <img src={`https://localhost:44328/images/profile-pictures/${data?.profilePicture}`} className="Avatar" alt="avatar"/>
                    </div>
                    <div className="UsernameHolder">
                        <h1 style={{color: "#C9FE71"}}>{data?.name}</h1>
                    </div>
                </div>


                <div id={"buttonContainer"}>

                        <button onClick={handleLogOut}
                                style={{backgroundColor: "transparent", borderColor: "transparent"}}><img
                            src={logoutBTN} className="LogoutButton" alt="logout button"/></button>

                    <a href="/settings"><img src={settingsBTN} className="SettingsButton" alt="settings button"/></a>
                </div>

            </div>


            <div id={"containerBottom"}>

                <div className="CardHolder-1">
                    <h2 style={{color: "#C9FE71", marginTop: "1rem"}}>❤ Favorites</h2>
                </div>
                <div className="CardHolder-2">
                    <h2 style={{color: "#C9FE71", marginTop: "1rem"}}>🍤 Own Recipes</h2>
                </div>
                <div className="CardHolder-3">
                    <h2 style={{color: "#C9FE71", marginTop: "1rem"}}>📄 History</h2>
                </div>

            </div>


        </div>
        </>
    );
}