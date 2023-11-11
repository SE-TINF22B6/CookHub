using DataAccess.Entities;
using NHibernate;

namespace DataAccess.Repository;

public class UserRepository
{
    private readonly ISessionFactory _factory;

    public UserRepository(ISessionFactory factory)
    {
        _factory = factory;
    }

    public void Create(User entity)
    {
        using var session = _factory.OpenSession();
        using var transaction = session.BeginTransaction();

        session.Save(entity);
        
        transaction.Commit();
    }
    
    public User Get(string email)
    {
        using var session = _factory.OpenSession();
        using var transaction = session.BeginTransaction();

        var entity = session.Get<User>(email);
        
        transaction.Commit();
        
        return entity;
    }

    public List<User> GetAll()
    {
        using var session = _factory.OpenSession();
        using var transaction = session.BeginTransaction();

        var entities = session.Query<User>().ToList();

        transaction.Commit();

        return entities;
    }

    public void Update(User entity)
    {
        using var session = _factory.OpenSession();
        using var transaction = session.BeginTransaction();

        session.Update(entity);
        
        transaction.Commit();
    }

    public void Delete(User entity)
    {
        using var session = _factory.OpenSession();
        using var transaction = session.BeginTransaction();

        session.Delete(entity);
        
        transaction.Commit();
    }
}