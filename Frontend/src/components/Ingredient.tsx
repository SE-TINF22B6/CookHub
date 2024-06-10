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
                min={0}
                value={ingredientAmount}
                onChange={(e) => setIngredientAmount(Number(e.target.value))}
                placeholder="Amount"
                style={{width: "2rem", height: "2rem"}}
            />
            <select
                value={ingredientUnit}
                onChange={(e) => setIngredientUnit(e.target.value)}
                placeholder="Unit"
                style={{width: "4rem", height: "2rem"}}
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
                onKeyDown={(e) => {
                    if (!/[a-zA-Z]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                        e.preventDefault();
                    }
                }}
                value={ingredientValue}
                onChange={(e) => setIngredientValue(e.target.value)}
                placeholder="Ingredient"
                style={{width: "10rem", height: "2rem"}}
            />


            <button style={{height: "2rem"}} onClick={() => addIngredient(ingredientValue, ingredientAmount, ingredientUnit)}>Add</button>
        </div>
    );
}

interface IngredientDisplayProps {
    id: number;
    ingredientName: string;
    quantity: number;
    unitOfMeasure: string;
    deleteIngredient: (id: number) => void;
}

export const IngredientDisplay: React.FC<IngredientDisplayProps> = ({id, ingredientName, quantity, unitOfMeasure, deleteIngredient}) => {
    return (
        <div>
            {ingredientName} : {quantity} {unitOfMeasure}
            <button onClick={() => deleteIngredient(id)}>Delete</button>
        </div>
    );
}
