using System.Reflection;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Tool.hbm2ddl;

namespace DataAccess;

public static class DataAccessFactory
{
    private const string TestDatabaseFileName = "test-database.db";

    static DataAccessFactory()
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    public static ISessionFactory CreateSessionFactory(string connectionString) => Fluently.Configure()
        .Database(PostgreSQLConfiguration.PostgreSQL83.ConnectionString(connectionString))
        .Mappings(configuration =>
        {
            configuration.FluentMappings.AddFromAssembly(Assembly.GetExecutingAssembly());
        })
        .ExposeConfiguration(configuration => new SchemaUpdate(configuration).Execute(false, true))
        .BuildSessionFactory();

    public static ISessionFactory CreateTestDatabaseFactory()
        => Fluently.Configure()
            .Database(() => SQLiteConfiguration.Standard.UsingFile(TestDatabaseFileName))
            .Mappings(configuration =>
            {
                configuration.FluentMappings.AddFromAssembly(Assembly.GetExecutingAssembly());
            })
            .ExposeConfiguration(configuration => new SchemaUpdate(configuration).Execute(false, true))
            .BuildSessionFactory();

    public static void DisposeTestDatabase(ISessionFactory testDatabaseFactory)
    {
        testDatabaseFactory.Dispose();
        File.Delete(TestDatabaseFileName);
    }
}