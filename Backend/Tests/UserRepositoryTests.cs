using DataAccess.Entities;
using DataAccess.Repository;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Tool.hbm2ddl;
using Xunit;

namespace Tests;

public class UserRepositoryTests : IDisposable
{
    private const string TestDatabaseFileName = "test-database.db";
    private readonly ISessionFactory _testDatabaseFactory;
    private readonly UserRepository _repository;

    public UserRepositoryTests()
    {
        _testDatabaseFactory = Fluently.Configure()
            .Database(() => SQLiteConfiguration.Standard.UsingFile(TestDatabaseFileName))
            .Mappings(configuration =>
            {
                configuration.FluentMappings.AddFromAssembly(typeof(User).Assembly);
            })
            .ExposeConfiguration(configuration => new SchemaUpdate(configuration).Execute(false, true))
            .BuildSessionFactory();
        
        _repository = new UserRepository(_testDatabaseFactory);
    }
    
    public void Dispose()
    {
        _testDatabaseFactory.Dispose();
        File.Delete(TestDatabaseFileName);
    }

    [Fact]
    public void CanCreateAndGetAUser()
    {
        // ARRANGE
        var testUser = CreateTestUser();
        
        // ASSERT PRE CONDITION
        Assert.Null(_repository.Get(testUser.Email));
        
        // ACT
        _repository.Create(testUser);
        var userFromDatabase = _repository.Get(testUser.Email);
        
        // ASSERT
        Assert.Equivalent(testUser, userFromDatabase);
    }

    [Fact]
    public void CanGetAllUsers()
    {
        // ARRANGE
        var testUser = CreateTestUser();
        _repository.Create(testUser);
        
        // ACT
        var allUsers = _repository.GetAll();
        
        // ASSERT
        Assert.NotEmpty(allUsers);
        Assert.Equivalent(allUsers.Single(), testUser);
    }

    [Fact]
    public void CanUpdateAUser()
    {
        // ARRANGE
        var testUser = CreateTestUser();
        _repository.Create(testUser);
        
        // ASSERT PRE CONDITION
        Assert.Equivalent(_repository.GetAll().Single(), testUser);
        
        // ACT
        testUser.PasswordHash = "newPassword";
        _repository.Update(testUser);
        
        // ASSERT
        var userFromDataBase = _repository.GetAll().Single();
        Assert.Equivalent(userFromDataBase, testUser);
    }

    [Fact]
    public void CanDeleteAUser()
    {
        // ARRANGE
        var testUser = CreateTestUser();
        _repository.Create(testUser);
        
        // ASSERT PRE CONDITION
        Assert.Equivalent(_repository.GetAll().Single(), testUser);
        
        // ACT
        _repository.Delete(testUser);
        
        // ASSERT
        Assert.Empty(_repository.GetAll());
    }

    private static User CreateTestUser()
    {
        return new User
        {
            Email = "test@example.com",
            PasswordHash = "password"
        };
    }
}