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

        <div  id="createRecipe_grid-container" style={{backgroundColor: "#38517d"}} >

            <div className="subContainer_left" >


                <div className={"topContainer"}>
                    <img src={CookPotCover} alt="picShu" style={{position: 'relative', width: '90%'}}/>
                    <br/><br/>
                    <AddIngredientApp/>
                    <img src={CookPot} alt="picShu" style={{position: 'relative', width: '90%'}}/>
                </div>
            </div>


            <div className="subContainer_right">
            <br/><br/>
                <h1 style={{top: '5rem'}}>FOOD FORGE</h1>

                <div className={"formContainer"}>

                    <div className={"subC_right_1"}>
                        <FormPropsTextFields/>
                        <Slider/>
                    </div>
                    <br/><br/>

                    <div className={"subC_right_2"}>
                        Please enter the instructions for your recipe here:
                        <textarea className="textArea"></textarea>

                        <a className="SubmitButton" style={{fontSize: 20}} href='/myRecipes'>
                            <img src={SubBtn} alt="SubmitButton" style={{width: '100%', border: '2px black'}}/>
                        </a>
                    </div>

                </div>


            </div>
        </div>
    );
}

