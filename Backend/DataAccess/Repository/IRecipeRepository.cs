using Contracts.Entities;
using NHibernate.Linq;

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

    // this looks very schizophrenic, but if you remove any of these lines nhibernate refuses to delete it
    public new void Delete(Recipe recipe)
    {
        using var session = Factory.OpenSession();
        using var transaction = session.BeginTransaction();

        var users = session.Query<User>().Where(user => user.History.Any(h => h.Recipe == recipe));
        recipe = users.FirstOrDefault()?.History.FirstOrDefault(h => h.Recipe.Id == recipe.Id)?.Recipe ?? recipe;
        session.Query<HistoryEntry>().Where(h => h.Recipe == recipe).Delete();

        foreach (var user in users)
        {
            user.History = user.History.Where(h => h.Recipe != recipe).ToList();
            session.Update(user);
        }

        session.Delete(recipe);
        transaction.Commit();
    }
}