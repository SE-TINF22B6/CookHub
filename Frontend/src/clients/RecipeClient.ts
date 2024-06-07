import {CreateRecipeModel} from "../models/CreateRecipeModel";

export class RecipeClient {

     public async getRecipeByName(name: string | undefined) {
         try {
         const response = await fetch(`https://localhost:44328/Recipe/byname/${name}`);
         /*const response = await fetch(`https://localhost:7274/Recipe/byname/${name}`);*/

         if (!response.ok) {
             throw new Error(response.statusText);
         }
         const recipes = await response.json();
         console.log(recipes);
         return recipes;
         }catch (error){
             console.log(error);
         }
     }

    public async getRecipeById(id: number|undefined) {
        try {
            const response = await fetch(`https://localhost:44328/Recipe/${id}`, {
                credentials: 'include'
            });
            /*const response = await fetch(`https://localhost:7274/Recipe/byname/${name}`);*/

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const recipes = await response.json();
            console.log(recipes);
            return recipes;
        }catch (error){
            console.log(error);
        }
    }

    public async adventurizeRecipe(id: number|undefined) {
         try {
        const response = await fetch(`https://localhost:44328/Recipe/adventurize/${id}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.text();
        console.log(data);
        return data;

         }catch (error){
             console.log(error);
         }
    }

    public async getRecipeByLikes(count: number|undefined) {
        try {
            const response = await fetch(`https://localhost:44328/Recipe/Top/${count}`);
            /*const response = await fetch(`https://localhost:7274/Recipe/byname/${name}`);*/

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const recipes = await response.json();
            console.log(recipes);
            return recipes;
        }catch (error){
            console.log(error);
        }
    }

    public async createRecipe(recipe: CreateRecipeModel) : Promise<number | string> {
         try {
             const response = await fetch('https://localhost:44328/Recipe/', {
                 method: 'POST',
                 headers: {'Content-Type': 'application/json'},
                 credentials: 'include',
                 body: JSON.stringify(recipe)
             });

             if (!response.ok) {
                 throw new Error(await response.text());
             }

             return await response.text();
         } catch (error: any) {
             console.log(error);
             return error.message?? 'Unknown error.';
         }
    }

    public async deleteRecipe(id: number) : Promise<string> {
        try {
            const response = await fetch(`https://localhost:44328/Recipe/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            return '';
        }catch (error: any){
            console.log(error);
            return 'Cannot delete recipe: ' + error.message?? 'Unknown error.';
        }
    }
}