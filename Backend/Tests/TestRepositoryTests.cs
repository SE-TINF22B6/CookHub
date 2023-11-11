using DataAccess.Entities;
using DataAccess.Repository;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Tool.hbm2ddl;
using Xunit;

namespace Tests;

public class TestRepositoryTests : IDisposable
{
    private const string TestDatabaseFileName = "test-database.db";
    private readonly ISessionFactory _testDatabaseFactory;
    private readonly TestRepository _repository;

    public TestRepositoryTests()
    {
        _testDatabaseFactory = Fluently.Configure()
            .Database(() => SQLiteConfiguration.Standard.UsingFile(TestDatabaseFileName))
            .Mappings(configuration =>
            {
                configuration.FluentMappings.AddFromAssembly(typeof(TestEntity).Assembly);
            })
            .ExposeConfiguration(configuration => new SchemaUpdate(configuration).Execute(false, true))
            .BuildSessionFactory();
        
        _repository = new TestRepository(_testDatabaseFactory);
    }
    
    public void Dispose()
    {
        _testDatabaseFactory.Dispose();
        File.Delete(TestDatabaseFileName);
    }

    [Fact]
    public void CanCreateAndGetAnEntity()
    {
        // ARRANGE
        var testEntity = CreateTestEntity();
        
        // ASSERT PRE CONDITION
        Assert.Null(_repository.Get(testEntity.Email));
        
        // ACT
        _repository.Create(testEntity);
        var entityFromDatabase = _repository.Get(testEntity.Email);
        
        // ASSERT
        Assert.Equivalent(testEntity, entityFromDatabase);
    }

    [Fact]
    public void CanGetAllEntities()
    {
        // ARRANGE
        var testEntity = CreateTestEntity();
        _repository.Create(testEntity);
        
        // ACT
        var entities = _repository.GetAll();
        
        // ASSERT
        Assert.NotEmpty(entities);
        Assert.Equivalent(entities.Single(), testEntity);
    }

    [Fact]
    public void CanUpdateAnEntity()
    {
        // ARRANGE
        var testEntity = CreateTestEntity();
        _repository.Create(testEntity);
        
        // ASSERT PRE CONDITION
        Assert.Equivalent(_repository.GetAll().Single(), testEntity);
        
        // ACT
        testEntity.Password = "newPassword";
        _repository.Update(testEntity);
        
        // ASSERT
        var entityFromDataBase = _repository.GetAll().Single();
        Assert.Equivalent(entityFromDataBase, testEntity);
    }

    [Fact]
    public void CanDeleteAnEntity()
    {
        // ARRANGE
        var testEntity = CreateTestEntity();
        _repository.Create(testEntity);
        
        // ASSERT PRE CONDITION
        Assert.Equivalent(_repository.GetAll().Single(), testEntity);
        
        // ACT
        _repository.Delete(testEntity);
        
        // ASSERT
        Assert.Empty(_repository.GetAll());
    }

    private static TestEntity CreateTestEntity()
    {
        return new TestEntity
        {
            Email = "test@example.com",
            Password = "password"
        };
    }
}