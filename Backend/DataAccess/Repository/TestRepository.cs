using DataAccess.Entities;
using NHibernate;

namespace DataAccess.Repository;

public class TestRepository
{
    private readonly ISessionFactory _factory;

    public TestRepository(ISessionFactory factory)
    {
        _factory = factory;
    }

    public void Create(TestEntity entity)
    {
        using var session = _factory.OpenSession();
        using var transaction = session.BeginTransaction();

        session.Save(entity);
        
        transaction.Commit();
    }
    
    public TestEntity Get(string email)
    {
        using var session = _factory.OpenSession();
        using var transaction = session.BeginTransaction();

        var entity = session.Get<TestEntity>(email);
        
        transaction.Commit();
        
        return entity;
    }

    public List<TestEntity> GetAll()
    {
        using var session = _factory.OpenSession();
        using var transaction = session.BeginTransaction();

        var entities = session.Query<TestEntity>().ToList();

        transaction.Commit();

        return entities;
    }

    public void Update(TestEntity entity)
    {
        using var session = _factory.OpenSession();
        using var transaction = session.BeginTransaction();

        session.Update(entity);
        
        transaction.Commit();
    }

    public void Delete(TestEntity entity)
    {
        using var session = _factory.OpenSession();
        using var transaction = session.BeginTransaction();

        session.Delete(entity);
        
        transaction.Commit();
    }
}