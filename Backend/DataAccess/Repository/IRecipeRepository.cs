using Contracts.Entities;

namespace DataAccess.Repository;

public interface IRecipeRepository : IRepository<Recipe>
{
    public ICollection<Recipe> GetTopRecipes(int count)
    {
        using var session = Factory.OpenSession();
        using var transaction = session.BeginTransaction();
        
        var topRecipes = session.Query<Recipe>()
            .OrderByDescending(recipe => recipe.LikedBy.Count)
            .Take(count)
            .ToList();

        transaction.Commit();
        return topRecipes;
    }

    public int CreateWithIngredients(Recipe recipe)
    {
        using var session = Factory.OpenSession();
        using var transaction = session.BeginTransaction();
        
        foreach (var recipeIngredient in recipe.Ingredients)
        {
            session.Save(recipeIngredient.Ingredient);
            recipeIngredient.Recipe = recipe;
        }

        var id = session.Save(recipe);
        
        transaction.Commit();
        return (int) id;
    }
}