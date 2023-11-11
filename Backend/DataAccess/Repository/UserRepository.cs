using DataAccess.Entities;
using NHibernate;

namespace DataAccess.Repository;

public class UserRepository : IRepository<User>
{
    public ISessionFactory Factory { get; set; }

    public UserRepository(ISessionFactory factory)
    {
        Factory = factory;
    }
}