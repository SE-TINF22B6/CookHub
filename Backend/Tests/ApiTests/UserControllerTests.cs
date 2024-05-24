using System.Text;
using API.Controllers;
using Contracts.Entities;
using DataAccess.Repository;
using Microsoft.AspNetCore.Mvc;
using NHibernate;
using Services;
using Xunit;

namespace Tests.ApiTests;

[Collection("TestDatabase")]
public class UserControllerTests : IDisposable
{
    private readonly UserController _userController;
    private readonly ISessionFactory _testDatabaseFactory;

    public UserControllerTests()
    {
        _testDatabaseFactory = Tests.CreateTestDatabaseFactory();
        _userController = new UserController(new UserService(new UserRepository(_testDatabaseFactory)),
            new RecipeService(new RecipeRepository(_testDatabaseFactory)));
    }

    public void Dispose() => Tests.DisposeTestDatabase(_testDatabaseFactory);

    [Fact]
    public void CanUploadProfilePicture()
    {
        // ARRANGE
        const string folderPath = "wwwroot/images/profile-pictures";
        const string base64Image =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAFCAIAAAAVLyF7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA0SURBVBhXhcpBCgAwDALB/v/T1qKIBEL3EEbISQCs3R68DdZm/oyEYZb5btRIn281rAngAmE2d4kg2D28AAAAAElFTkSuQmCC";
        if (Directory.Exists(folderPath))
        {
            Directory.Delete(folderPath, true);
        }

        Directory.CreateDirectory(folderPath);

        // ACT
        var result = _userController.UploadProfilePicture(base64Image);

        // ASSERT
        Assert.IsType<OkObjectResult>(result);
        var filesInFolder = Directory.GetFiles(folderPath);
        Assert.Single(filesInFolder);
        var returnedFileName = (result as OkObjectResult)!.Value!.ToString()!;
        Assert.Contains(returnedFileName, filesInFolder.Single());

        // CLEAN UP
        Directory.Delete(folderPath, true);
    }

    [Fact]
    public void DontSaveBadBase64Image()
    {
        // ARRANGE
        const string folderPath = "wwwroot/images/profile-pictures";
        if (Directory.Exists(folderPath))
        {
            Directory.Delete(folderPath, true);
        }

        Directory.CreateDirectory(folderPath);

        // ACT
        var result = _userController.UploadProfilePicture("blabla");

        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);
        Assert.Empty(Directory.GetFiles(folderPath));

        // CLEAN UP
        Directory.Delete(folderPath, true);
    }

    [Fact]
    public void LikeRecipe_Success()
    {
        // ARRANGE
        var userId = 1;
        var recipeId = 1;

        var userService = new UserService(new UserRepository(_testDatabaseFactory));
        var recipeService = new RecipeService(new RecipeRepository(_testDatabaseFactory));

        // Create a user with required properties
        var user = new User
        {
            Id = userId,
            Email = "test@example.com",
            Name = "Test User",
            PasswordHash = Encoding.UTF8.GetBytes("password") // Set a dummy password hash
        };

        userService.CreateUser(user);

        // Create a recipe with required properties
        var recipe = new Recipe
        {
            Id = recipeId,
            Name = "Test Recipe",
        };

        recipeService.CreateRecipe(recipe);

        // ACT
        var result = _userController.LikeRecipe(userId, recipeId);

        // ASSERT
        Assert.IsType<OkObjectResult>(result);
        var expectedMessage = $"User {userId} liked recipe {recipeId}.";
        Assert.Equal(expectedMessage, (result as OkObjectResult)!.Value!.ToString());
    }

    [Fact]
    public void LikeRecipe_UserAlreadyLikedRecipe()
    {
        // ARRANGE
        var userId = 1;
        var recipeId = 1;

        var userService = new UserService(new UserRepository(_testDatabaseFactory));
        var recipeService = new RecipeService(new RecipeRepository(_testDatabaseFactory));

        var user = new User
        {
            Id = userId,
            Email = "test@example.com", // Provide a valid email address
            Name = "Test User", // Set other required properties
            PasswordHash = Encoding.UTF8.GetBytes("password") // Set a dummy password hash
        };

        userService.CreateUser(user);

        // Create a recipe with required properties
        var recipe = new Recipe
        {
            Id = recipeId,
            Name = "Test Recipe",
        };

        recipeService.CreateRecipe(recipe);

        _userController.LikeRecipe(userId, recipeId);

        // ACT: Try to like the recipe again
        var result = _userController.LikeRecipe(userId, recipeId);

        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);
        var expectedMessage = "User already liked this recipe.";
        Assert.Equal(expectedMessage, (result as BadRequestObjectResult)!.Value);
    }

    [Fact]
    public void LikeRecipe_UserNotFound()
    {
        //ARRANGE
        var recipeId = 1;
        var userId = 1;

        var recipeService = new RecipeService(new RecipeRepository(_testDatabaseFactory));

        var recipe = new Recipe
        {
            Id = recipeId,
            Name = "Test Recipe",
        };

        recipeService.CreateRecipe(recipe);

        //ACT
        var result = _userController.LikeRecipe(userId, recipeId);

        //ASSERT
        Assert.IsType<NotFoundObjectResult>(result);
        var expectedMessage = "User not found.";
        Assert.Equal(expectedMessage, (result as NotFoundObjectResult)!.Value);
    }

    [Fact]
    public void LikeRecipe_RecipeNotFound()
    {
        //ARRANGE
        var recipeId = 1;
        var userId = 1;

        var userService = new UserService(new UserRepository(_testDatabaseFactory));

        var user = new User
        {
            Id = userId,
            Email = "test@example.com",
            Name = "Test User",
            PasswordHash = Encoding.UTF8.GetBytes("password")
        };

        userService.CreateUser(user);

        //ACT
        var result = _userController.LikeRecipe(userId, recipeId);

        //ASSERT
        Assert.IsType<NotFoundObjectResult>(result);
        var expectedMessage = "Recipe not found.";
        Assert.Equal(expectedMessage, (result as NotFoundObjectResult)!.Value);
    }

    [Fact]
    public void UnlikeRecipe_Success()
    {
        // ARRANGE
        var userId = 1;
        var recipeId = 1;

        var userService = new UserService(new UserRepository(_testDatabaseFactory));
        var recipeService = new RecipeService(new RecipeRepository(_testDatabaseFactory));

        // Create a user
        var user = new User
        {
            Id = userId,
            Email = "test@example.com",
            Name = "Test User",
            PasswordHash = Encoding.UTF8.GetBytes("password") // Set a dummy password hash
        };

        userService.CreateUser(user);

        // Create a recipe with required properties
        var recipe = new Recipe
        {
            Id = recipeId,
            Name = "Test Recipe",
        };

        recipeService.CreateRecipe(recipe);

        // User likes the recipe
        _userController.LikeRecipe(userId, recipeId);

        // ACT
        var result = _userController.UnlikeRecipe(userId, recipeId);

        // ASSERT
        Assert.IsType<OkObjectResult>(result);
        var expectedMessage = $"User {userId} unliked recipe {recipeId}.";
        Assert.Equal(expectedMessage, (result as OkObjectResult)!.Value!.ToString());
    }

    [Fact]
    public void UnlikeRecipe_UserNotFound()
    {
        // ARRANGE
        var recipeId = 1;
        var userId = 1;

        var recipeService = new RecipeService(new RecipeRepository(_testDatabaseFactory));

        var recipe = new Recipe
        {
            Id = recipeId,
            Name = "Test Recipe",
        };

        recipeService.CreateRecipe(recipe);

        // ACT
        var result = _userController.UnlikeRecipe(userId, recipeId);

        // ASSERT
        Assert.IsType<NotFoundObjectResult>(result);
        var expectedMessage = "User not found.";
        Assert.Equal(expectedMessage, (result as NotFoundObjectResult)!.Value);
    }

    [Fact]
    public void UnlikeRecipe_RecipeNotFound()
    {
        // ARRANGE
        var recipeId = 1;
        var userId = 1;

        var userService = new UserService(new UserRepository(_testDatabaseFactory));

        var user = new User
        {
            Id = userId,
            Email = "test@example.com",
            Name = "Test User",
            PasswordHash = Encoding.UTF8.GetBytes("password")
        };

        userService.CreateUser(user);

        // ACT
        var result = _userController.UnlikeRecipe(userId, recipeId);

        // ASSERT
        Assert.IsType<NotFoundObjectResult>(result);
        var expectedMessage = "Recipe not found.";
        Assert.Equal(expectedMessage, (result as NotFoundObjectResult)!.Value);
    }

    [Fact]
    public void UnlikeRecipe_UserHasNotLikedRecipe()
    {
        // ARRANGE
        var userId = 1;
        var recipeId = 1;

        var userService = new UserService(new UserRepository(_testDatabaseFactory));
        var recipeService = new RecipeService(new RecipeRepository(_testDatabaseFactory));

        var user = new User
        {
            Id = userId,
            Email = "test@example.com",
            Name = "Test User",
            PasswordHash = Encoding.UTF8.GetBytes("password")
        };

        userService.CreateUser(user);

        var recipe = new Recipe
        {
            Id = recipeId,
            Name = "Test Recipe",
        };

        recipeService.CreateRecipe(recipe);

        // ACT
        var result = _userController.UnlikeRecipe(userId, recipeId);

        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);
        var expectedMessage = "User hasn't liked this recipe.";
        Assert.Equal(expectedMessage, (result as BadRequestObjectResult)!.Value);
    }
    
    [Fact]
    public void GetLikedRecipes_Success()
    {
        // ARRANGE
        var userId = 1;
        var recipeId1 = 1;
        var recipeId2 = 2;

        var userService = new UserService(new UserRepository(_testDatabaseFactory));
        var recipeService = new RecipeService(new RecipeRepository(_testDatabaseFactory));

        // Create a user with required properties
        var user = new User
        {
            Id = userId,
            Email = "test@example.com",
            Name = "Test User",
            PasswordHash = Encoding.UTF8.GetBytes("password") // Set a dummy password hash
        };

        userService.CreateUser(user);

        // Create recipes with required properties
        var recipe1 = new Recipe
        {
            Id = recipeId1,
            Name = "Test Recipe 1",
        };

        var recipe2 = new Recipe
        {
            Id = recipeId2,
            Name = "Test Recipe 2",
        };

        recipeService.CreateRecipe(recipe1);
        recipeService.CreateRecipe(recipe2);

        // User likes the recipes
        _userController.LikeRecipe(userId, recipeId1);
        _userController.LikeRecipe(userId, recipeId2);

        // ACT
        var result = _userController.GetLikedRecipes(userId);

        // ASSERT
        Assert.IsType<OkObjectResult>(result);
        var likedRecipes = (result as OkObjectResult)!.Value as IEnumerable<Recipe>;
        Assert.NotNull(likedRecipes);
        Assert.Contains(likedRecipes, r => r.Id == recipeId1);
        Assert.Contains(likedRecipes, r => r.Id == recipeId2);
    }
    
    [Fact]
    public void GetLikedRecipes_UserNotFound()
    {
        // ARRANGE
        var userId = 1;

        // ACT
        var result = _userController.GetLikedRecipes(userId);

        // ASSERT
        Assert.IsType<NotFoundObjectResult>(result);
        var expectedMessage = "User not found.";
        Assert.Equal(expectedMessage, (result as NotFoundObjectResult)!.Value);
    }

    [Fact]
    public void GetLikedRecipes_NoLikedRecipes()
    {
        // ARRANGE
        var userId = 1;

        var userService = new UserService(new UserRepository(_testDatabaseFactory));

        // Create a user with required properties
        var user = new User
        {
            Id = userId,
            Email = "test@example.com",
            Name = "Test User",
            PasswordHash = Encoding.UTF8.GetBytes("password")
        };

        userService.CreateUser(user);

        // ACT
        var result = _userController.GetLikedRecipes(userId);

        // ASSERT
        Assert.IsType<OkObjectResult>(result);
        var likedRecipes = (result as OkObjectResult)!.Value as IEnumerable<Recipe>;
        Assert.NotNull(likedRecipes);
        Assert.Empty(likedRecipes);
    }
}