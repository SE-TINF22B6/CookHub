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
                                                <div className="ribbon">Adventurized</div> :
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