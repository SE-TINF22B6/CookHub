using DataAccess.Entities;
using DataAccess.Repository;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Tool.hbm2ddl;

namespace Tests;

public class TestRepositoryTests
{
    [Fact]
    public void CanGetAllEntities()
    {
        // ARRANGE
        using var testDatabaseFactory = CreateTestDatabaseFactory(out var dataBaseFileName);
        var repository = new TestRepository(testDatabaseFactory);
        var testEntity = new TestEntity
        {
            Email = "test@example.com",
            Password = "password"
        };
        repository.Create(testEntity);
        
        // ACT
        var entities = repository.GetAll();

        // CLEAN UP
        File.Delete(dataBaseFileName);
        
        // ASSERT
        Assert.NotEmpty(entities);
        Assert.Equivalent(entities.Single(), testEntity);
    }

    private ISessionFactory CreateTestDatabaseFactory(out string dataBaseFileName)
    {
        dataBaseFileName = Guid.NewGuid() + ".db";
        var fileName = dataBaseFileName; // 2nd variable bc. out parameters can't be used in lambda expressions x_x
        return Fluently.Configure()
            .Database(() => SQLiteConfiguration.Standard.UsingFile(fileName))
            .Mappings(configuration =>
            {
                configuration.FluentMappings.AddFromAssembly(typeof(TestEntity).Assembly);
            })
            .ExposeConfiguration(configuration => new SchemaUpdate(configuration).Execute(false, true))
            .BuildSessionFactory();
    }
}