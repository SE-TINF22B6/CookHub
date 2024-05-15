using Contracts.Entities;

namespace DataAccess.Repository;

public interface IUserRepository : IRepository<User>
{
    public User? GetByEmail(string email)
    {
        using var session = Factory.OpenSession();
        using var transaction = session.BeginTransaction();

        var entity = session.Query<User>().SingleOrDefault(user => user.Email == email);

        transaction.Commit();

        return entity;
    }
}