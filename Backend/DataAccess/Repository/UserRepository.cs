using Contracts.Entities;
using NHibernate;

namespace DataAccess.Repository;

/// <inheritdoc/>
public class UserRepository : IUserRepository
{
    public ISessionFactory Factory { get; }

    public UserRepository(ISessionFactory factory)
    {
        Factory = factory;
    }

    public void Delete(User user)
    {
        using var session = Factory.OpenSession();
        using var transaction = session.BeginTransaction();

        foreach (var recipe in user.CreatedRecipes)
        {
            recipe.Creator = null;
            session.Update(recipe);
        }

        session.Delete(user);

        transaction.Commit();
    }
}