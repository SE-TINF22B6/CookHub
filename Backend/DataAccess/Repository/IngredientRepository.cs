using Contracts.Entities;
using NHibernate;

namespace DataAccess.Repository;

/// <inheritdoc/>
public class IngredientRepository : IRepository<Ingredient>
{
    public ISessionFactory Factory { get; }

    public IngredientRepository(ISessionFactory factory)
    {
        Factory = factory;
    }
}