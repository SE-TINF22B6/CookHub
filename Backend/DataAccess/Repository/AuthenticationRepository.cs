using DataAccess.Entities;
using NHibernate;

namespace DataAccess.Repository;

/// <inheritdoc/>
public class AuthenticationRepository : IRepository<Authentication>
{
    public ISessionFactory Factory { get; }

    public AuthenticationRepository(ISessionFactory factory)
    {
        Factory = factory;
    }
}