import '../style/MyRecipeLoggedIn.css';
import {UserDataParams} from "../models/UserDataParams";
import React, {useEffect, useState} from "react";
import NotLoggedIn from "../components/NotLoggedIn";
import {UserClient} from "../clients/UserClient";


export default function MyRecipeLoggedIn(userData: UserDataParams) {
    let data = userData.data;
    const [loadedData, setLoaded] = useState<any[]>([]);


    useEffect(() => {
        const loadRecipes = async () => {
            const responseData = await new UserClient().getLikedRecipes(data?.id);
            if (Array.isArray(responseData)) {
                setLoaded(responseData);
            } else {
                setLoaded([]);
                console.error("Expected an array, but got", responseData);
            }
            console.log(responseData)
        }

        if (data?.id) {
            loadRecipes();
        }
    }, [data]);

    if (!data) {
        return <NotLoggedIn/>;
    }



    return (
        <>
            <h1>{data?.name}'s Recipes</h1>
            <div className={"allRecipeContainer"}>

                {loadedData ? loadedData.map((recipe,index) => {
                    return(
                        <a href={`/myrecipes/${recipe.id}`}><div className="card1" key={index}>
                            <div className="content">
                                <div className="back">
                                    <div className="back-content" style={{backgroundImage:`url('https://localhost:44328/images/recipes/${recipe.pictureUrl}')`, backgroundSize:"cover", backgroundRepeat:"no-repeat"}}>
                                        <strong>Hover Me</strong>
                                    </div>
                                </div>
                                <div className="front" >
                                    <div className="front-content">
                                        <div className="description">
                                            <div className="title">
                                                <p className="title">
                                                    <strong>{recipe.name}</strong>
                                                </p>

                                            </div>
                                            <p className="card-footer">
                                                {recipe.cookingTime} min | {recipe.likedUserIds.length} Likes | {recipe.prepTime} min prep
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></a>)
                }) : "No recipes found."}

            </div>
        </>
    );


}