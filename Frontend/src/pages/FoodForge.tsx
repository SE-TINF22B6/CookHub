import "bootstrap/dist/css/bootstrap.min.css";
import "../style/FoodForge.css";
import SubBtn from "../assets/fillElements/BTN_ SAVE REZIPE.png";
import CookPot from "../assets/newRecipe/Cook_Pot.png";
import CookPotCover from "../assets/newRecipe/Cook_Pot_Cover.png";
import AddIngredientApp from "../components/AddIngredientApp";
import FormPropsTextFields from "../components/FormPropsTextFields";
import DifficultyRadioGroup from "../components/DifficultyRadioGroup";
import ImageUploader from "../components/ImageUploader";



export default function FoodForge() {


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
                <div id={"Top-Right-Container"}>
                    <h1>FOOD FORGE</h1>
                    <ImageUploader/>
                    <FormPropsTextFields/>

                    <br/>
                    <DifficultyRadioGroup/>
                </div>
                <div id={"Bottom-Right-Container"}>
                    Please enter the instructions for your recipe here:
                    <textarea className="textArea"></textarea>
                    <a className="Save-Recipe-Button" href='/myRecipes'>
                        <img src={SubBtn} alt="SubmitButton"/>
                    </a>
                </div>
            </div>

        </div>
    );
}

