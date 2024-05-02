using NHibernate;

namespace DataAccess.Repository;

/// <inheritdoc/>
public class RecipeRepository : IRecipeRepository
{
    public ISessionFactory Factory { get; }

    public RecipeRepository(ISessionFactory factory)
    {
        Factory = factory;
    }
}