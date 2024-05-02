using DataAccess.Entities;

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
}