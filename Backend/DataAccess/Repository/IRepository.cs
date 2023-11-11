using NHibernate;

namespace DataAccess.Repository;

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
    
    public TEntity Get(string email)
    {
        using var session = Factory.OpenSession();
        using var transaction = session.BeginTransaction();

        var entity = session.Get<TEntity>(email);
        
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