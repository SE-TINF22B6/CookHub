export interface Ingredient {
    id: number;
    value: string;
    amount: number;
    unit: string;
}

export interface IngredientListProps {
    ingredients: Ingredient[];
    deleteIngredient: (id: number) => void;
}
