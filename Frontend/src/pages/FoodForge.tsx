import "bootstrap/dist/css/bootstrap.min.css";
import "../style/FoodForge.css";
import * as React from "react";
import CookPot from "../assets/newRecipe/Cook_Pot.png";
import CookPotCover from "../assets/newRecipe/Cook_Pot_Cover.png";
import AddIngredientApp from "../components/AddIngredientApp";
import DifficultyRadioGroup from "../components/DifficultyRadioGroup";
import FormPropsTextFields from "../components/FormPropsTextFields";
import ImageUploader from "../components/ImageUploader";
import CARLOS_POPUP from "../helpers/CARLOS_POPUP";
import {UserDataParams} from "../models/UserDataParams";
import NotLoggedIn from "../components/NotLoggedIn";
import {useState} from "react";
import {CreateRecipeModel} from "../models/CreateRecipeModel";
import {RecipeClient} from "../clients/RecipeClient";
import {useNavigate} from "react-router-dom";


export default function FoodForge(isLoggedIn: UserDataParams) {
    let data = isLoggedIn.data;

    const [recipe, setRecipe] = useState<CreateRecipeModel>(new CreateRecipeModel());
    const navigate = useNavigate();

    if (!data) {
        return (
            <NotLoggedIn></NotLoggedIn>
        )
    }

    async function onSaveButtonClick() {
        const recipeClient = new RecipeClient();
        const response = await recipeClient.createRecipe(recipe);

        if (Number.isNaN(+response)) {
            alert(response);
        } else {
            navigate('/myRecipes/' + response);
        }
    }

    return (

        <div id={"Main-Container"}>


            <div id={"Left-Container"}>

                <div id={"Left-Inner-Container"}>

                    <img src={CookPotCover} alt="potTop" style={{position: 'relative', width: '80%'}}/>
                    <div className={"ingredients"}>
                        <AddIngredientApp recipe={recipe} setRecipe={setRecipe}/>
                    </div>
                    <img src={CookPot} alt="potBottom" style={{position: 'relative', width: '80%'}}/>

                </div>

            </div>


            <div id={"Right-Container"}>

                <h1 className={"header"}>FOOD FORGE</h1>
                <br/>

                <div className={"Top-Right-Container"}>

                    <div id={"LeftSide"}>
                        <ImageUploader recipe={recipe} setRecipe={setRecipe}/>
                    </div>

                    <div id={"RightSide"}>
                        <div className={"choose"}>
                            <strong>Choose the difficulty of the recipe</strong>
                        </div>

                        <div className={"group"}>
                            <DifficultyRadioGroup recipe={recipe} setRecipe={setRecipe}/>
                        </div>
                    </div>

                </div>


                <div id={"Bottom-Right-Container"}>

                    <br/><br/>
                    <FormPropsTextFields recipe={recipe} setRecipe={setRecipe}/>
                    <br/>

                    <textarea className="textArea"
                              onChange={e => setRecipe({...recipe, instructionText: e.target.value})}>
                    </textarea>
                    <br/>

                    <span className={"buttons"}>
                        <br/>

                        <button className="save-recipe" onClick={() => onSaveButtonClick()}>SAVE RECIPE</button>

                        <div className="carlos">
                            <CARLOS_POPUP
                                buttonTitle="Need help?"
                                text="To create a new recipe just fill out the form on the right side.
                                You can also add the ingredients which will be added to the pot on the left side.
                                To save the recipe just click the 'SAVE RECIPE' button in the end."
                                buttonBorderColor="#000000"
                                buttonTextColor="#000000"
                                backgroundColor='rgb(0,175,99)'
                            />
                        </div>
                    </span>

                </div>
            </div>

        </div>
    );
}

