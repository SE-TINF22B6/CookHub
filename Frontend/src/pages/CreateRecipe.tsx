import "bootstrap/dist/css/bootstrap.min.css";
import "../style/CreateRecipe.css";
import AddIngredientApp from "../components/AddIngredientApp";
import FormPropsTextFields from "../components/FormPropsTextFields";
import SimplePaper from "../components/SimplePaper";


export default function CreateRecipe() {
    return (

        <div  id="createRecipe_grid-container" style={{backgroundColor: "#38517d"}} >

            <div className="subContainer_left" >


                <div className={"topContainer"}>
                    <br/><br/>
                    <h1>MY NEW INGREDIENTS</h1>
                        <AddIngredientApp/>

                    <div className="Paper">
                        <SimplePaper/>
                    </div>
                </div>
            </div>


            <div className="subContainer_right" >



                <div className={"formContainer"}>

                    <div className={"subC_right_1"}>
                        <FormPropsTextFields/>
                    </div>
                    <div className={"subC_right_2"}>
                        <textarea className="textArea"></textarea>
                    </div>

                </div>



            </div>
        </div>
    );
}

