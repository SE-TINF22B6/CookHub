import "bootstrap/dist/css/bootstrap.min.css";
import "../style/FoodForge.css";
import SubBtn from "../assets/fillElements/BTN_ SAVE REZIPE.png";
import CookPot from "../assets/newRecipe/Cook_Pot.png";
import CookPotCover from "../assets/newRecipe/Cook_Pot_Cover.png";
import AddIngredientApp from "../components/AddIngredientApp";
import FormPropsTextFields from "../components/FormPropsTextFields";
import Slider from "../components/Slider";

export default function FoodForge() {
    return (

        <div id={"createRecipe_grid-container"}>
            <div className="subContainer_left">
                <img src={CookPotCover} alt="picShu"/>
                <div id={"ingredientForm"}>
                    <AddIngredientApp/>
                </div>
                <img src={CookPot} alt="picShu"/>
            </div>


            <div className="subContainer_right">
                <h1>FOOD FORGE</h1>
                <div className={"formContainer"}>
                    <div className={"subC_right_1"}>
                        <FormPropsTextFields/>
                        <Slider/>
                    </div>
                    <h2>Please enter the instructions for your recipe here:</h2>
                    <br/><br/>
                    <textarea className="textArea"></textarea>
                    <br/><br/>
                    <a className="SubmitButton" style={{fontSize: 20}} href='/myRecipes'>
                        <img src={SubBtn} alt="SubmitButton"/>
                    </a>


                </div>
            </div>
        </div>
    )
        ;
}

