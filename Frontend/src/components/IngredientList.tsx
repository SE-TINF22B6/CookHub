import Ingredient from "./Ingredient";

export default function IngredientList({ingredients}:{ingredients:Array<string>}) {
    return (
        <div>
            <ul>
                {
                    ingredients.map(ingredient =>
                        <Ingredient ingredient={ingredient}></Ingredient>
                    )
                }
            </ul>
        </div>
    )
}