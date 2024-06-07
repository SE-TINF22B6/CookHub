import React, { useState } from "react";
import IngredientList from "./IngredientList";
import { IngredientInput } from "./Ingredient";
import { Ingredient } from "./types";
import {CreateRecipeModel} from "../models/CreateRecipeModel";

function AddIngredientApp(data: {recipe: CreateRecipeModel, setRecipe: React.Dispatch<React.SetStateAction<CreateRecipeModel>>}) {
    const {recipe, setRecipe} = data;
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    function addIngredient(value: string, amount: number, unit: string) {
        if (value) {
            const ingredient = {
                id: Date.now(),
                ingredientName: value,
                quantity: amount,
                unitOfMeasure: unit
            };
            setIngredients(prevIngredients => [...prevIngredients, ingredient]);
            setRecipe({...recipe, ingredients: [...recipe.ingredients, ingredient]});
        }
    }

    function deleteIngredient(id: number) {
        setIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== id));
        setRecipe({...recipe, ingredients: recipe.ingredients.filter(ingredient => ingredient.id !== id)});
    }

    return (
        <div>
            <IngredientInput addIngredient={addIngredient} />
            <IngredientList ingredients={ingredients} deleteIngredient={deleteIngredient} />
        </div>
    );
}

export default AddIngredientApp;
