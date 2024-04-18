
export class RecipeClient {

     public async getRecipeByName(name: string) {
         try {
         const response = await fetch(`https://localhost:44328/Recipe/byname/${name}`);
         if (!response.ok) {
             throw new Error(response.statusText);
         }
         const recipes = await response.json();
         console.log(recipes);

         }catch (error){
             console.log(error);
         }
     }

    public async getAllRecipes() {
         try {
        const response = await fetch(`https://localhost:44328/Recipe`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const recipes = await response.json();
        console.log(recipes);

         }catch (error){
             console.log(error);
         }
    }
}