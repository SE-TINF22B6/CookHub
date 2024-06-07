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

    public void SaveHistoryEntry(User user, Recipe recipe)
    {
        using var session = Factory.OpenSession();
        using var transaction = session.BeginTransaction();

        var existingEntry = user.History.FirstOrDefault(historyEntry => historyEntry.Recipe.Id == recipe.Id);

        if (existingEntry == null)
        {
            var historyEntry = new HistoryEntry { Recipe = recipe, User = user };
            session.Save(historyEntry);
            user.History.Add(historyEntry);
        }
        else
        {
            existingEntry.Time = DateTime.Now;
        }

        session.Update(user);

        transaction.Commit();
    }
}