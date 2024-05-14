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
}