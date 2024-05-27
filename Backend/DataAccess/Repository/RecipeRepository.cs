using Contracts.Entities;
using NHibernate;
using NHibernate.Exceptions;

namespace DataAccess.Repository;

/// <inheritdoc/>
public class RecipeRepository : IRecipeRepository
{
    public ISessionFactory Factory { get; }

    public RecipeRepository(ISessionFactory factory)
    {
        Factory = factory;
    }

    public void Update(Recipe recipe)
    {
        try
        {
            using var session = Factory.OpenSession();
            using var transaction = session.BeginTransaction();

            session.Merge(recipe);

            transaction.Commit();
        }
        catch (GenericADOException e)
            when (e.Message.StartsWith("could not insert collection: [Contracts.Entities.Recipe.AdventureTexts"))
        {
            FixAdventurizeTable();
            Update(recipe);
        }
    }

    private void FixAdventurizeTable()
    {
        using var session = Factory.OpenSession();
        using var transaction = session.BeginTransaction();

        session.CreateSQLQuery("ALTER TABLE adventuretexts ALTER COLUMN text TYPE TEXT;").ExecuteUpdate();

        transaction.Commit();
    }
}