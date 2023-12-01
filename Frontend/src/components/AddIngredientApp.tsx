import React, {useState} from "react";
import IngredientList from "./IngredientList";
import IngredientInput from "./IngredientInput";


function TodoApp(){


    const [ingredients, setIngredients] = useState<Array<string>>([])

    function addIngredient(newIngredient:string){
        setIngredients([...ingredients,newIngredient])
    }
    return(
        <div>
            <IngredientInput addIngredient={addIngredient}></IngredientInput>
            <IngredientList ingredients={ingredients}></IngredientList>
        </div>
    )
}

export default TodoApp