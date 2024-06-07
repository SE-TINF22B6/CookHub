import {Ingredient} from "../components/types";

export class CreateRecipeModel {
    name: string = '';
    picture: string = '';
    prepTime: number = 0;
    cookingTime: number = 0;
    difficulty: number = 50;
    description: string = '';
    instructionText: string = '';
    categories: string[] = [];
    ingredients: Ingredient[] = [];
}