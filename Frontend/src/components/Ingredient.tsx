import React, { useState } from "react";

interface IngredientInputProps {
    addIngredient: (value: string, amount: number, unit: string) => void;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({ addIngredient }) => {
    const [ingredientValue, setIngredientValue] = useState<string>("");
    const [ingredientAmount, setIngredientAmount] = useState<number>(0);
    const [ingredientUnit, setIngredientUnit] = useState<string>("");

    return (
        <div>
            <input
                type="number"
                value={ingredientAmount}
                onChange={(e) => setIngredientAmount(Number(e.target.value))}
                placeholder="Amount"
                style={{width: "3vw"}}
            />
            <select
                value={ingredientUnit}
                onChange={(e) => setIngredientUnit(e.target.value)}
                placeholder="Unit"
                style={{width: "4vw", height: "1.5vw"}}
            >
                <option value="" disabled>Unit</option>
                <option value="mg">mg</option>
                <option value="g">g</option>
                <option value="kg">kg</option>
                <option value="ml">ml</option>
                <option value="l">l</option>
                <option value="cup">cup</option>
                <option value="tsp">tsp</option>
                <option value="tbsp">tbsp</option>
                <option value="pinch">pinch</option>
                <option value="piece">piece</option>
            </select>
            <input
                type="text"
                value={ingredientValue}
                onChange={(e) => setIngredientValue(e.target.value)}
                placeholder="Ingredient"
                style={{width: "10vw"}}
            />


            <button onClick={() => addIngredient(ingredientValue, ingredientAmount, ingredientUnit)}>Add</button>
        </div>
    );
}

interface IngredientDisplayProps {
    id: number;
    value: string;
    amount: number;
    unit: string;
    deleteIngredient: (id: number) => void;
}

export const IngredientDisplay: React.FC<IngredientDisplayProps> = ({id, value, amount, unit, deleteIngredient}) => {
    return (
        <div>
            {value} : {amount} {unit}
            <button onClick={() => deleteIngredient(id)}>Delete</button>
        </div>
    );
}
