using DataAccess.Entities;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Tool.hbm2ddl;

namespace Tests;

public static class Tests
{
    private const string TestDatabaseFileName = "test-database.db";

    public static ISessionFactory CreateTestDatabaseFactory()
        => Fluently.Configure()
            .Database(() => SQLiteConfiguration.Standard.UsingFile(TestDatabaseFileName))
            .Mappings(configuration =>
            {
                configuration.FluentMappings.AddFromAssembly(typeof(User).Assembly);
            })
            .ExposeConfiguration(configuration => new SchemaUpdate(configuration).Execute(false, true))
            .BuildSessionFactory();

    public static void DisposeTestDatabase(ISessionFactory testDatabaseFactory)
    {
        testDatabaseFactory.Dispose();
        File.Delete(TestDatabaseFileName);
    }
}