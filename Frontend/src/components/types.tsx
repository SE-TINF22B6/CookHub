export interface Ingredient {
    id: number;
    ingredientName: string;
    quantity: number;
    unitOfMeasure: string;
}

export interface IngredientListProps {
    ingredients: Ingredient[];
    deleteIngredient: (id: number) => void;
}
