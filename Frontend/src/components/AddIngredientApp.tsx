import React, {useState} from "react";
import IngredientList from "./IngredientList";
import IngredientInput from "./IngredientInput";



interface Ingredient{
    id:number;
    value:string;
}

function TodoApp() {

    const [ingredients, setIngredients] = useState<Ingredient[]>([])

    function addIngredient(newValue: string) {
        if (newValue){
            setIngredients([...ingredients, {id:Date.now(), value:newValue }])
        }
    }

    function deleteIngredient(id: number) {
       setIngredients(ingredients.filter(ingredient => ingredient.id !== id))
    }

    return (
        <div>
            <IngredientInput addIngredient={addIngredient}></IngredientInput>
            <IngredientList ingredients={ingredients} deleteTodo={deleteIngredient}></IngredientList>
        </div>
    )
}

export default TodoApp