using NHibernate;

namespace DataAccess.Repository;

/// <summary>
/// Provides CRUD methods for database entities of the type <typeparamref name="TEntity"/>
/// </summary>
public interface IRepository<TEntity>
{
    protected ISessionFactory Factory { get; }
    
    public void Create(TEntity entity)
    {
        using var session = Factory.OpenSession();
        using var transaction = session.BeginTransaction();

        session.Save(entity);
        
        transaction.Commit();
    }
    
    public TEntity? Get(object key)
    {
        using var session = Factory.OpenSession();
        using var transaction = session.BeginTransaction();

        var entity = session.Get<TEntity>(key);
        
        transaction.Commit();
        
        return entity;
    }

    public List<TEntity> GetAll()
    {
        using var session = Factory.OpenSession();
        using var transaction = session.BeginTransaction();

        var entities = session.Query<TEntity>().ToList();

        transaction.Commit();

        return entities;
    }

    public void Update(TEntity entity)
    {
        using var session = Factory.OpenSession();
        using var transaction = session.BeginTransaction();

        session.Update(entity);
        
        transaction.Commit();
    }

    public void Delete(TEntity entity)
    {
        using var session = Factory.OpenSession();
        using var transaction = session.BeginTransaction();

        session.Delete(entity);
        
        transaction.Commit();
    }
}