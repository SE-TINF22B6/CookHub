import '../style/MyRecipeLoggedIn.css';
import { UserDataParams } from "../models/UserDataParams";
import React, { useEffect, useState } from "react";
import NotLoggedIn from "../components/NotLoggedIn";
import { UserClient } from "../clients/UserClient";
import { RecipeData } from "../models/RecipeData";

export default function MyRecipeLoggedIn(userData: UserDataParams) {
    let data = userData.data;
    const [likedRecipes, setLikedRecipes] = useState<RecipeData[]>([]);
    const [ownRecipes, setOwnRecipes] = useState<RecipeData[]>([]);

    useEffect(() => {
        const loadData = async () => {
            if (data?.id) {
                const liked = await new UserClient().getLikedRecipes(data.id);
                const own = await new UserClient().getOwnRecipes();
                setLikedRecipes(liked);
                setOwnRecipes(own);
            }
        };

        loadData();
    }, [data]);

    if (!data) {
        return <NotLoggedIn />;
    }

    const renderRecipeCards = (recipes: RecipeData[]) => {
        return recipes.map((recipe, index) => (
            <a href={`/myrecipes/${recipe.id}`} key={index}>
                <div className="recipe-card">
                    <div className="content">
                        <div className="back">
                            <div className="recipe-card-image" style={{backgroundImage: `url('https://localhost:44328/images/recipes/${recipe.pictureUrl}')`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
                            </div>
                        </div>
                        <div className="front">
                            <div className="front-content">
                                    <div className="recipe-card-overlay">
                                        <strong>{recipe.name}</strong>
                                        <p> {recipe.prepTime} min prep | {recipe.cookingTime} min cooking</p>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        ));
    };

    return (
        <div className="my-recipes-container">
            <div className="recipe-column">
                <h2>{data.name}'s Liked Recipes</h2>
                {likedRecipes.length > 0 ? (
                    <div className="allRecipeContainer">
                        {chunkArray(likedRecipes, 3).map((row, index) => (
                            <div className="recipe-row" key={index}>
                                {renderRecipeCards(row)}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No liked recipes found.</p>
                )}
            </div>

            <div className="recipe-column">
                <h2>{data.name}'s Own Recipes</h2>
                {ownRecipes.length > 0 ? (
                    <div className="allRecipeContainer">
                        {chunkArray(ownRecipes, 3).map((row, index) => (
                            <div className="recipe-row" key={index}>
                                {renderRecipeCards(row)}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No own recipes found.</p>
                )}
            </div>
        </div>
    );
}

// Utility function to chunk array into smaller arrays
function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
    return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, i) =>
        arr.slice(i * chunkSize, i * chunkSize + chunkSize)
    );
}
