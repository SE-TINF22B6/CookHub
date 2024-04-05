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
    private readonly IRepository<User> _repository;

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
        Assert.Equal(testUser.Name, userFromDatabase?.Name);
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
        Assert.Equal(testUser.Name, allUsers.Single().Name);
    }

    [Fact]
    public void CanUpdateAUser()
    {
        // ARRANGE
        var testUser = CreateTestUser();
        _repository.Create(testUser);
        
        // ASSERT PRE CONDITION
        Assert.Equal(testUser.Name, _repository.GetAll().Single().Name);
        
        // ACT
        testUser.PasswordHash = "newPassword";
        _repository.Update(testUser);
        
        // ASSERT
        var userFromDataBase = _repository.GetAll().Single();
        Assert.Equal(testUser.Name, userFromDataBase.Name);
    }

    [Fact]
    public void CanDeleteAUser()
    {
        // ARRANGE
        var testUser = CreateTestUser();
        _repository.Create(testUser);
        
        // ASSERT PRE CONDITION
        Assert.Equal(testUser.Name, _repository.GetAll().Single().Name);
        
        // ACT
        _repository.Delete(testUser);
        
        // ASSERT
        Assert.Empty(_repository.GetAll());
    }

    [Fact]
    public void CanLikeARecipe()
    {
        // ARRANGE
        var testUser = CreateTestUser();
        var testRecipe = new Recipe { Name = "test recipe", Creator = testUser };
        IRepository<Recipe> recipeRepository = new RecipeRepository(_testDatabaseFactory);
        _repository.Create(testUser);
        recipeRepository.Create(testRecipe);
        
        // ASSERT PRE CONDITION
        Assert.Equal(testUser.Name, _repository.GetAll().Single().Name);
        Assert.Equal(testRecipe.Name, recipeRepository.GetAll().Single().Name);
        
        // ACT
        testUser.LikedRecipes.Add(testRecipe);
        _repository.Update(testUser);
        
        // ASSERT
        var likedRecipes = _repository.Get(testUser.Email)?.LikedRecipes;
        Assert.Equal(testRecipe.Name, likedRecipes?.Single().Name);
    }

    private static User CreateTestUser()
        => new()
        {
            Email = "test@example.com",
            PasswordHash = "password",
            Name = "test"
        };
}