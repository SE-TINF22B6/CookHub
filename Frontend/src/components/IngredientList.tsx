import React from "react";
import { IngredientListProps } from "./types";
import { IngredientDisplay } from "./Ingredient";

const IngredientList: React.FC<IngredientListProps> = (
    { ingredients, deleteIngredient }) => {
    return (
        <div>
            {ingredients.map((ingredient) => (
                <IngredientDisplay
                    key={ingredient.id} {...ingredient}
                    deleteIngredient={deleteIngredient}
                />
            ))}
        </div>
    );
};

export default IngredientList;
