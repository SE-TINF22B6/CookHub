using System.Text;
using API.Controllers;
using API.Models;
using Contracts.Entities;
using Contracts.Models;
using DataAccess;
using DataAccess.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NHibernate;
using NSubstitute;
using Services;
using Xunit;

namespace Tests.ApiTests;

[Collection("TestDatabase")]
public class UserControllerTests : IDisposable
{
    private readonly UserController _userController;
    private readonly ISessionFactory _testDatabaseFactory;
    private readonly UserService _userService;
    private readonly Dictionary<string,int> _authTokens;
    private readonly RecipeService _recipeService;
    private const int UserId = 1;
    private const string ProfilePicturesFolderPath = "wwwroot/images/profile-pictures";
    private const string SomeBase64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAFCAIAAAAVLyF7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA0SURBVBhXhcpBCgAwDALB/v/T1qKIBEL3EEbISQCs3R68DdZm/oyEYZb5btRIn281rAngAmE2d4kg2D28AAAAAElFTkSuQmCC";

    public UserControllerTests()
    {
        _testDatabaseFactory = DataAccessFactory.CreateTestDatabaseFactory();
        _userService = new UserService(new UserRepository(_testDatabaseFactory));
        _recipeService = new RecipeService(new RecipeRepository(_testDatabaseFactory));
        _authTokens = new Dictionary<string, int>();
        _userController = CreateUserControllerWithMockedContext();

        Directory.CreateDirectory(ProfilePicturesFolderPath);
    }

    public void Dispose()
    {
        DataAccessFactory.DisposeTestDatabase(_testDatabaseFactory);
        Directory.Delete(ProfilePicturesFolderPath, true);
    }

    private UserController CreateUserControllerWithMockedContext()
    {
        var httpContextMock = Substitute.For<HttpContext>();
        httpContextMock.Request.Cookies["auth-token"].Returns(_ => _authTokens.SingleOrDefault().Key);

        return new UserController(_userService, _recipeService, _authTokens)
        {
            ControllerContext = new ControllerContext { HttpContext = httpContextMock }
        };
    }

    [Fact]
    public void CanUploadProfilePicture()
    {
        // ACT
        var result = _userController.UploadProfilePicture(SomeBase64Image);

        // ASSERT
        Assert.IsType<OkObjectResult>(result);
        var filesInFolder = Directory.GetFiles(ProfilePicturesFolderPath);
        Assert.Single(filesInFolder);
        var returnedFileName = (result as OkObjectResult)!.Value!.ToString()!;
        Assert.Contains(returnedFileName, filesInFolder.Single());
    }

    [Fact]
    public void DontSaveBadBase64Image()
    {
        // ACT
        var result = _userController.UploadProfilePicture("blabla");

        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);
        Assert.Empty(Directory.GetFiles(ProfilePicturesFolderPath));
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
        Assert.Equal($"User {userId} liked recipe {recipeId}.", ResponseMessageOf(result));
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
        Assert.Equal("User already liked this recipe.", ResponseMessageOf(result));
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
        Assert.Equal("User not found.", ResponseMessageOf(result));
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
        Assert.Equal("Recipe not found.", ResponseMessageOf(result));
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
        Assert.Equal($"User {userId} unliked recipe {recipeId}.", ResponseMessageOf(result));
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
        Assert.Equal("User not found.", ResponseMessageOf(result));
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
        Assert.Equal("Recipe not found.", ResponseMessageOf(result));
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
        Assert.Equal("User hasn't liked this recipe.", ResponseMessageOf(result));
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
        var likedRecipes = ResponseMessageOf(result) as IEnumerable<RecipeModel>;
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
        Assert.Equal("User not found.", ResponseMessageOf(result));
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
        var likedRecipes = ResponseMessageOf(result) as IEnumerable<RecipeModel>;
        Assert.NotNull(likedRecipes);
        Assert.Empty(likedRecipes);
    }

    [Fact]
    public void DontChangeUserSettingsWhenNotLoggedIn()
    {
        Assert.IsType<BadRequestObjectResult>(_userController.ChangeUsername("newUsername"));
        Assert.IsType<BadRequestObjectResult>(_userController.ChangePassword(new PasswordChangeModel
        {
            OldPassword = "Old.Password123",
            NewPassword = "New.Password123",
        }));
        Assert.IsType<BadRequestObjectResult>(_userController.DeleteAccount("Some.Password123"));
        Assert.IsType<BadRequestObjectResult>(_userController.ChangeProfilePicture(SomeBase64Image));
    }

    [Fact]
    public void CanChangeUsername()
    {
        // ARRANGE
        const int userId = 1;
        _userService.CreateTestUser();
        _authTokens.Add(CryptoService.GenerateToken(), userId);
        const string newUsername = "ILoveCarlos";

        // ACT
        var result = _userController.ChangeUsername(newUsername);

        // ASSERT
        Assert.IsType<OkResult>(result);
        var userInDatabase = _userService.GetAllUsers().Single();
        Assert.Equal(newUsername, userInDatabase.Name);
    }

    [Theory]
    [InlineData(""), InlineData("h"), InlineData("H@llo"),
     InlineData("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"), InlineData(SomeBase64Image)]
    public void DontChangeUsernameToInvalidUsername(string newUsername)
    {
        // ARRANGE
        _userService.CreateTestUser();
        _authTokens.Add(CryptoService.GenerateToken(), UserId);

        // ACT
        var result = _userController.ChangeUsername(newUsername);

        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Invalid username.", ResponseMessageOf(result));
        var userInDatabase = _userService.GetAllUsers().Single();
        Assert.NotEqual(newUsername, userInDatabase.Name);
    }

    [Fact]
    public void CanChangePassword()
    {
        // ARRANGE
        _userService.CreateTestUser();
        _authTokens.Add(CryptoService.GenerateToken(), UserId);
        var passwordChangeData = new PasswordChangeModel
        {
            OldPassword = "password",
            NewPassword = "Password.123"
        };

        // ACT
        var result = _userController.ChangePassword(passwordChangeData);

        // ASSERT
        Assert.IsType<OkResult>(result);
        var userInDatabase = _userService.GetAllUsers().Single();
        Assert.Equal(CryptoService.GetHash(passwordChangeData.NewPassword), userInDatabase.PasswordHash);
    }

    [Theory]
    [InlineData("Admin123")]  // no special character
    [InlineData("Admin!")]    // no number
    [InlineData("Admin.1")]   // too short
    [InlineData(SomeBase64Image)] // mental illness
    public void DontChangePasswordToInvalidPassword(string newPassword)
    {
        // ARRANGE
        _userService.CreateTestUser();
        _authTokens.Add(CryptoService.GenerateToken(), UserId);
        var passwordChangeData = new PasswordChangeModel
        {
            OldPassword = "password",
            NewPassword = newPassword
        };

        // ACT
        var result = _userController.ChangePassword(passwordChangeData);

        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("New password is invalid.", ResponseMessageOf(result));
        var userInDatabase = _userService.GetAllUsers().Single();
        Assert.NotEqual(CryptoService.GetHash(newPassword), userInDatabase.PasswordHash);
    }

    [Fact]
    public void CanDeleteAccount()
    {
        // ARRANGE
        _userService.CreateTestUser();
        _authTokens.Add(CryptoService.GenerateToken(), UserId);
        
        // ACT
        var result = _userController.DeleteAccount("password");
        
        // ASSERT
        Assert.IsType<OkResult>(result);
        Assert.Empty(_userService.GetAllUsers());
    }

    [Fact]
    public void DontDeleteAccountWhenUserEnteredWrongPassword()
    {
        // ARRANGE
        _userService.CreateTestUser();
        _authTokens.Add(CryptoService.GenerateToken(), UserId);
        
        // ACT
        var result = _userController.DeleteAccount("wrongPassword");
        
        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Invalid password.", ResponseMessageOf(result));
        Assert.Single(_userService.GetAllUsers());
    }

    [Fact]
    public void CanChangeProfilePicture()
    {
        _userService.CreateTestUser();
        _authTokens.Add(CryptoService.GenerateToken(), UserId);
        var oldProfilePicture = _userService.GetAllUsers().Single().ProfilePicture;
        
        // ACT
        var result = _userController.ChangeProfilePicture(SomeBase64Image);
        
        // ASSERT
        Assert.IsType<OkResult>(result);

        var newProfilePicture = _userService.GetAllUsers().Single().ProfilePicture;
        Assert.NotEqual(oldProfilePicture, newProfilePicture);

        var profilePicturesFolder = Directory.GetFiles(ProfilePicturesFolderPath)
            .Select(path => path.Replace(@"\", "/")); // make paths the same on windows and linux
        Assert.Contains($"{ProfilePicturesFolderPath}/{newProfilePicture}", profilePicturesFolder);
    }

    [Theory]
    [InlineData("")]
    [InlineData("blablabalbalblalb")]
    [InlineData("asdf" + SomeBase64Image)]
    public void DontChangeProfilePictureToBadImage(string base64Image)
    {
        _userService.CreateTestUser();
        _authTokens.Add(CryptoService.GenerateToken(), UserId);
        var oldProfilePicture = _userService.GetAllUsers().Single().ProfilePicture;

        // ACT
        var result = _userController.ChangeProfilePicture(base64Image);

        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Invalid base64 image.", ResponseMessageOf(result));
        var userInDatabase = _userService.GetAllUsers().Single();
        Assert.Equal(oldProfilePicture, userInDatabase.ProfilePicture);
    }
    
    [Fact]
    public void ViewRecipe_Success()
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
            PasswordHash = Encoding.UTF8.GetBytes("password")
        };

        userService.CreateUser(user);

        // Create a recipe
        var recipe = new Recipe
        {
            Id = recipeId,
            Name = "Test Recipe"
        };

        recipeService.CreateRecipe(recipe);

        // Log in the user
        _authTokens.Add(CryptoService.GenerateToken(), userId);

        // ACT
        var result = _userController.ViewRecipe(recipeId);

        // ASSERT
        Assert.IsType<OkObjectResult>(result);
        Assert.Equal($"User {userId} viewed Recipe {recipeId}.", ResponseMessageOf(result));
    }

    [Fact]
    public void ViewRecipe_UserNotLoggedIn()
    {
        // ARRANGE
        var recipeId = 1;

        // ACT
        var result = _userController.ViewRecipe(recipeId);

        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("User is not logged in.", ResponseMessageOf(result));
    }

    [Fact]
    public void ViewRecipe_UserNotFound()
    {
        // ARRANGE
        var userId = 1;
        var recipeId = 1;

        var recipeService = new RecipeService(new RecipeRepository(_testDatabaseFactory));

        // Create a recipe
        var recipe = new Recipe
        {
            Id = recipeId,
            Name = "Test Recipe"
        };

        recipeService.CreateRecipe(recipe);

        // Log in the user
        _authTokens.Add(CryptoService.GenerateToken(), userId);

        // ACT
        var result = _userController.ViewRecipe(recipeId);

        // ASSERT
        Assert.IsType<NotFoundObjectResult>(result);
        Assert.Equal("User not found.", ResponseMessageOf(result));
    }

    [Fact]
    public void ViewRecipe_RecipeNotFound()
    {
        // ARRANGE
        var userId = 1;
        var recipeId = 1;

        var userService = new UserService(new UserRepository(_testDatabaseFactory));

        // Create a user
        var user = new User
        {
            Id = userId,
            Email = "test@test.de",
            Name = "Test User",
            PasswordHash = Encoding.UTF8.GetBytes("password")
        };

        userService.CreateUser(user);

        // Log in the user
        _authTokens.Add(CryptoService.GenerateToken(), userId);

        // ACT
        var result = _userController.ViewRecipe(recipeId);

        // ASSERT
        Assert.IsType<NotFoundObjectResult>(result);
        Assert.Equal("Recipe not found.", ResponseMessageOf(result));
    }

    [Fact]
    public void GetViewedRecipes_Success()
    {
        // ARRANGE
        var userId = 1;
        var recipeId1 = 1;
        var recipeId2 = 2;

        var userService = new UserService(new UserRepository(_testDatabaseFactory));
        var recipeService = new RecipeService(new RecipeRepository(_testDatabaseFactory));

        // Create a user
        var user = new User
        {
            Id = userId,
            Email = "test@test.de",
            Name = "Test User",
            PasswordHash = Encoding.UTF8.GetBytes("password")
        };

        userService.CreateUser(user);

        // Create recipes
        var recipe1 = new Recipe
        {
            Id = recipeId1,
            Name = "Test Recipe 1"
        };

        var recipe2 = new Recipe
        {
            Id = recipeId2,
            Name = "Test Recipe 2"
        };

        recipeService.CreateRecipe(recipe1);
        recipeService.CreateRecipe(recipe2);

        // User views the recipes
        _authTokens.Add(CryptoService.GenerateToken(), userId);
        _userController.ViewRecipe(recipeId1);
        _userController.ViewRecipe(recipeId2);

        // ACT
        var result = _userController.GetViewedRecipes();

        // ASSERT
        Assert.IsType<OkObjectResult>(result);
        var viewedRecipes = ResponseMessageOf(result) as ICollection<HistoryEntryModel>;
        Assert.NotNull(viewedRecipes);
        Assert.Contains(viewedRecipes, entry => entry.Recipe.Id == recipeId1);
        Assert.Contains(viewedRecipes, entry => entry.Recipe.Id == recipeId2);
    }

    [Fact]
    public void GetViewedRecipes_UserNotFound()
    {
        // ARRANGE
        var userId = 1;
        _authTokens.Add(CryptoService.GenerateToken(), userId);

        // ACT
        var result = _userController.GetViewedRecipes();

        // ASSERT
        Assert.IsType<NotFoundObjectResult>(result);
        Assert.Equal("User not found.", ResponseMessageOf(result));
    }

    [Fact]
    public void GetViewedRecipes_UserNotLoggedIn()
    {
        // ACT
        var result = _userController.GetViewedRecipes();

        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("User is not logged in.", ResponseMessageOf(result));
    }

    [Fact]
    public void CanGetOwnRecipes()
    {
        // ARRANGE
        const int userId = 1;
        _userService.CreateTestUser();
        _recipeService.CreateExampleRecipes();
        _authTokens.Add(CryptoService.GenerateToken(), userId);

        // ACT
        var result = _userController.GetOwnRecipes();

        // ASSERT
        Assert.IsType<OkObjectResult>(result);
        var userInDatabase = _userService.GetUserById(userId);
        var actualOwnRecipes = userInDatabase!.CreatedRecipes.Select(recipe => recipe.ToModel());
        Assert.Equivalent(actualOwnRecipes, ResponseMessageOf(result));
    }

    [Fact]
    public void DoNotReturnOwnRecipesWhenNotLoggedIn()
    {
        // ACT
        var result = _userController.GetOwnRecipes();

        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("User is not logged in.", ResponseMessageOf(result));
    }

    private static object? ResponseMessageOf(IActionResult result) => (result as ObjectResult)?.Value;
}