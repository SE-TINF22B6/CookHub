import "bootstrap/dist/css/bootstrap.min.css";
import "../style/CreateRecipe.css";
import SubBtn from "../assets/fillElements/BTN_ SAVE REZIPE.png";
import GrumpyShshi from "../assets/newRecipe/ShushiFace1.png";
import AnotherSushi from "../assets/newRecipe/SushiFace2.png";
import AddIngredientApp from "../components/AddIngredientApp";
import FormPropsTextFields from "../components/FormPropsTextFields";
import SimplePaper from "../components/SimplePaper";


export default function FoodForge() {
    return (

        <div  id="createRecipe_grid-container" style={{backgroundColor: "#38517d"}} >

            <div className="subContainer_left" >


                <div className={"topContainer"}>
                    <br/><br/>
                    <br/><br/>
                    <AddIngredientApp/>

                    <div className="Paper">
                        <SimplePaper/>
                        <img src={GrumpyShshi} alt="picShu"/>
                        <img src={AnotherSushi} alt="picsha" style={{position: 'absolute'}}/>
                    </div>
                </div>
            </div>


            <div className="subContainer_right">
                <br/><br/>
                <h1 style={{top: '5rem'}}>FOOD FORGE</h1>



                <div className={"formContainer"}>

                    <div className={"subC_right_1"}>
                        <FormPropsTextFields/>
                    </div>
                    <div className={"subC_right_2"}>
                        Please enter the instructions for your recipe here:
                        <textarea className="textArea"></textarea>

                        <a className="SubmitButton" style={{fontSize: 20}} href='/foodforge'>
                            <img src={SubBtn} alt="SubmitButton" style={{width: '100%', border: '2px black'}}/>
                        </a>
                    </div>

                </div>


            </div>
        </div>
    );
}

