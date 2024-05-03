
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
            const response = await fetch(`https://localhost:44328/Recipe/${id}`);
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
}