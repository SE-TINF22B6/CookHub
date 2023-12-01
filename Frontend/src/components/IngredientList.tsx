import Ingredient from "./Ingredient";

interface IngredientArray {
    ingredients: { id: number, value: string }[];
    deleteTodo: (id: number) => void;

}

export default function IngredientList(ingredients: IngredientArray) {


    return (
        <div>
            <ul>
                {
                    ingredients.ingredients.map(ingredient =>
                        <Ingredient key={ingredient.id} id={ingredient.id} value={ingredient.value} onDelete={ingredients.deleteTodo}></Ingredient>
                    )
                }
            </ul>
        </div>
    )
}