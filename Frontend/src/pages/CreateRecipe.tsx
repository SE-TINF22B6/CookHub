import "bootstrap/dist/css/bootstrap.min.css";
import "../style/CreateRecipe.css";
import AddIngredientApp from "../components/AddIngredientApp";

export default function CreateRecipe() {
    return (

        <div  id="createRecipeContainer_top" >

            <div id="grid-container" style={{backgroundColor: "#38517d"}}>

                <div className="createRecipeContainer_left"style={{backgroundColor: "#38517d"}}>
                    <div className={"topContainer"}>
                        <br/><br/>
                        <h1>MY NEW RECIPE</h1>
                        <AddIngredientApp></AddIngredientApp>
                    </div>
                </div>

                <div className="createRecipeContainer_right" style={{backgroundColor: "#38517d"}}>
                    <div className={"formContainer"}>
                        <textarea className="textArea"></textarea>
                    </div>
                </div>

            </div>

        </div>
    );
}

