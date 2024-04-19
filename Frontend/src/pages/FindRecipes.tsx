import React, {useState} from "react";
import "../style/FindRecipes.css";
import {RecipeClient} from "../clients/RecipeClient";
import chef from "../assets/Logo_no_background.svg";

export default function FindRecipes() {

    const [data, setData] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState("");

    async function findBtn(name: string) {
        let client: RecipeClient = new RecipeClient();
        setData(await client.getRecipeByName(name));
    }

/*    async function findAll() {
        const client = new RecipeClient();
        setData(await client.getAllRecipes());
    }*/

    function handleSubmit(event: any) {
        event.preventDefault();
        console.log(inputValue);
    }


    return (
        <div className="RecipeBrowser">
            <div className={"searchForm"}>
                <form className="search" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="search__field"
                        value={inputValue}
                        placeholder="Search Recipe..."
                        onChange={e => {
                            setInputValue(e.target.value);
                            findBtn(e.target.value);
                        }
                        }
                    />
                    <button className="btn__search">
                        Search
                    </button>
                </form>

            </div>

            {data ? data.map((recipe ,index) => {
                    return (
                        <div className="recipeContainer">
                            <ul className="results">
                                <li className="preview" key={index}>
                                    <img src={chef} alt="Test"/>
                                    <div className="preview__data">
                                        <h4 className="preview__title">{recipe.name}</h4>
                                        <div className="preview__time">
                                        <p>Difficulty: {recipe.difficulty}</p>
                                        <p>Preparation Time: {recipe.prepTime}</p>
                                        <p>Cooking Time: {recipe.cookingTime}</p>
                                        </div>
                                        <p className="preview__publisher">{recipe.description}</p>
                                        <div className="preview__user-generated">
                                            {recipe.creator ?
                                                <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="100" cy="100" r="90" fill="url(#grad1)"/>
                                                    <defs>
                                                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                                            <stop offset="0%"
                                                                  style={{stopColor: "#C9FE71", stopOpacity: 1}}/>
                                                            <stop offset="100%" style={{
                                                                stopColor: "rgb(0,128,128)",
                                                                stopOpacity: 1
                                                            }}/>
                                                        </linearGradient>
                                                    </defs>
                                                    <text x="100" y="115" font-family="Verdana" font-size="20"
                                                          fill="#ffffff"
                                                          text-anchor="middle">Adventurized
                                                    </text>
                                                    <path d="M100,60 L105,80 L100,75 L95,80 Z" fill="#ffffff"/>
                                                    <rect x="97.5" y="60" width="5" height="20" fill="#ffffff"/>
                                                </svg> :
                                                <p>Not Adventurized</p>
                                            }
                                        </div>

                                    </div>
                                </li>
                            </ul>
                        </div>
                    )
                })
                :
                <h4 style={{margin: '2rem'}}> Suche nach einem Rezept</h4>
            }


            <div className={"recipes"}>

            </div>

        </div>

    );
}