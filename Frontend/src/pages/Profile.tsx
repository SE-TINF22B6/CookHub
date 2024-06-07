import React, {useEffect, useState} from "react";
import "../style/Profile.css";
import carlos from "../assets/Chef_Carlo_without_background (1).png";
import logoutBTN from "../assets/ProfilePage/Logout.png";
import settingsBTN from "../assets/ProfilePage/Settings.png";
import {UserClient} from "../clients/UserClient";
import Placeholder from "../assets/fillElements/placeholder.png";
import {UserDataParams} from "../models/UserDataParams";
import NotLoggedIn from "../components/NotLoggedIn";

import {RecipeData} from "../models/RecipeData";


export default function Profile(userProfile: UserDataParams) {
    let data = userProfile.data;
    let current_index = 0


    const [likedRecipes, setLikedRecipes] = useState<Array<RecipeData>>([]);
    const [ownRecipes, setOwnRecipes] = useState<Array<RecipeData>>([]);
    const [history, setHistory] = useState<Array<RecipeData>>([]);

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


    useEffect(() => {
        async function loadData() {
            const likedResponse = await new UserClient().getLikedRecipes(data!.id);
            const ownResponse = await new UserClient().getOwnRecipes();
            const historyResponse = await new UserClient().getViewedRecipes();
            setLikedRecipes(likedResponse);
            setOwnRecipes(ownResponse);
            setHistory(historyResponse);
        }

        if (data) {
            loadData();
        }
    }, [data]);


    if (!data) {
        return (
            <>
                <NotLoggedIn></NotLoggedIn>
            </>
        )
    }


    let src = data?.profilePicture;


    return (
        <>

            <div id="ProfilePage" style={{backgroundColor: "transparent"}}>

                <div id="ContainerTop">

                    <div id="divLogo">
                        <img className="carlos" src={carlos} alt="logo"/>
                    </div>

                    <div id="divUserInfo">
                        <div className="AvatarHolder">
                            <img
                                src={src ? `https://localhost:44328/images/profile-pictures/${data?.profilePicture}` : Placeholder}
                                className="Avatar" alt="avatar"/>
                        </div>
                        <div className="UsernameHolder">
                            <h1>{data?.name}</h1>
                        </div>
                    </div>


                    <div id={"buttonContainer"}>

                        <button onClick={handleLogOut}
                                style={{backgroundColor: "transparent", borderColor: "transparent"}}><img
                            src={logoutBTN} className="LogoutButton" alt="logout button"/></button>

                        <a href="/settings"><img src={settingsBTN} className="SettingsButton"
                                                 alt="settings button"/></a>
                    </div>

                </div>


                <div id={"containerBottom"}>

                    <div className="CardHolder-1">
                        <h2 style={{color: "#C9FE71", marginTop: "1rem"}}>❤ Favorites</h2>
                        {likedRecipes === null ?
                            <span className={"loader"}></span>
                            : likedRecipes.length === 0 ? <h2>No liked recipes</h2> :
                                likedRecipes.map((recipe) => {
                                    return (
                                        <a className={"likedRecipes"} href={`myrecipes/${recipe.id}`}>
                                            <img style={{width: "4rem", height: "4rem"}}
                                                 src={recipe.pictureUrl ? `https://localhost:44328/images/recipes/${recipe.pictureUrl}`: Placeholder}
                                                 alt={"rezept"}/>
                                            <h3>{recipe.name}</h3>
                                        </a>
                                    )
                                })


                        }
                    </div>
                    <div className="CardHolder-2">
                        <h2 style={{color: "#C9FE71", marginTop: "1rem"}}>🍤 Own Recipes</h2>
                        {ownRecipes === null ?
                            <span className={"loader"}></span>
                            : ownRecipes.length === 0 ? <h2>No own recipes</h2> :
                                ownRecipes.map((recipe, index) => {
                                    return (
                                        <a key={index} className={"likedRecipes"} href={`myrecipes/${recipe.id}`}>
                                            <img style={{width: "4rem", height: "4rem"}}
                                                 src={recipe.pictureUrl ? `https://localhost:44328/images/recipes/${recipe.pictureUrl}`: Placeholder}
                                                 alt={"rezept"}/>
                                            <h3>{recipe.name}</h3>
                                        </a>
                                    )
                                })


                        }
                    </div>
                    <div className="CardHolder-3">
                        <h2 style={{color: "#C9FE71", marginTop: "1rem"}}>📄 History</h2>
                        {history === null ?
                            <span className={"loader"}></span>
                            : history.length === 0 ? <h2>No history</h2> :
                            history.map((recipe, index) => {
                            return (
                                    <a key={index} className={"likedRecipes"} href={`myrecipes/${recipe.id}`}>
                                        <img style={{width: "4rem", height: "4rem"}}
                                             src={recipe.pictureUrl ? `https://localhost:44328/images/recipes/${recipe.pictureUrl}`: Placeholder}
                                             alt={"rezept"}/>
                                        <h3>{recipe.name}</h3>
                                    </a>
                                )
                            }).reverse().slice(current_index, current_index + 4)


                        }
                    </div>

                </div>


            </div>
        </>
    );
}