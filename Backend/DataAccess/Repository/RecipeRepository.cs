using DataAccess.Entities;
using NHibernate;

namespace DataAccess.Repository;

/// <inheritdoc/>
public class RecipeRepository : IRepository<Recipe>
{
    public ISessionFactory Factory { get; }

    public RecipeRepository(ISessionFactory factory)
    {
        Factory = factory;
    }
}