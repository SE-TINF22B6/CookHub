import React, { useState } from "react";
import IngredientList from "./IngredientList";
import { IngredientInput } from "./Ingredient";
import { Ingredient } from "./types";


function AddIngredientApp() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    function addIngredient(value: string, amount: number, unit: string) {
        if (value) {
            setIngredients(prevIngredients => [
                ...prevIngredients,
                {
                    id: Date.now(),
                    value: value,
                    amount: amount,
                    unit: unit
                }
            ]);
        }
    }

    function deleteIngredient(id: number) {
        setIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== id));
    }

    return (
        <div>
            <IngredientInput addIngredient={addIngredient} />
            <IngredientList ingredients={ingredients} deleteIngredient={deleteIngredient} />
        </div>
    );
}

export default AddIngredientApp;
