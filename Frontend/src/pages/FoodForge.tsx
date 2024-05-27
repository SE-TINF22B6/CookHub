import "bootstrap/dist/css/bootstrap.min.css";
import "../style/FoodForge.css";
import * as React from "react";
import CookPot from "../assets/newRecipe/Cook_Pot.png";
import CookPotCover from "../assets/newRecipe/Cook_Pot_Cover.png";
import AddIngredientApp from "../components/AddIngredientApp";
import DifficultyRadioGroup from "../components/DifficultyRadioGroup";
import FormPropsTextFields from "../components/FormPropsTextFields";
import ImageUploader from "../components/ImageUploader";
import Carlos_PopUp from "../helpers/Carlos_PopUp";
import {UserDataParams} from "../models/UserDataParams";
import NotLoggedIn from "../components/NotLoggedIn";


export default function FoodForge(isLoggedIn: UserDataParams) {
let data = isLoggedIn.data;

if (!data){
    return (
        <NotLoggedIn></NotLoggedIn>
    )
}

    return (

        <div id={"Main-Container"}>


            <div id={"Left-Container"}>

                <div id={"Left-Inner-Container"}>

                    <img src={CookPotCover} alt="potTop" style={{position: 'relative', width: '80%'}}/>
                    <AddIngredientApp/>
                    <img src={CookPot} alt="potBottom" style={{position: 'relative', width: '80%'}}/>

                </div>

            </div>


            <div id={"Right-Container"}>

                <br/>
                <h1 className={"header"}>FOOD FORGE</h1>
                <br/>

                <div className={"Top-Right-Container"}>

                    <div id={"LeftSide"}>
                        <ImageUploader/>
                    </div>

                    <div id={"RightSide"}>
                        <div className={"choose"}>
                            <strong>Choose the difficulty of the recipe</strong>
                        </div>

                        <div className={"group"}>
                            <DifficultyRadioGroup/>
                        </div>
                    </div>

                </div>


                <div id={"Bottom-Right-Container"}>

                    <br/><br/><FormPropsTextFields/><br/>

                    <textarea className="textArea"></textarea>
                    <br/>

                    <span className={"buttons"}>
                        <br/>
                        <a className="Save-Recipe-Button" href='/myRecipes'>
                            <button className="save-recipe">SAVE RECIPE</button>
                        </a>
                        <div className="carlos">
                            {Carlos_PopUp(
                                "Need help?",
                                "To create a new recipe just fill out the form on the right side." +
                                " You can also add the ingredients which will be added to the pot on the left side." +
                                " To save the recipe just click the 'SAVE RECIPE' button in the end."
                            )}
                        </div>
                    </span>

                </div>
            </div>

        </div>
    );
}

