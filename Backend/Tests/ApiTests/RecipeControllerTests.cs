using API.Controllers;
using API.Models;
using DataAccess.Repository;
using Microsoft.AspNetCore.Mvc;
using NHibernate;
using Services;
using Xunit;

namespace Tests.ApiTests;

[Collection("TestDatabase")]
public class RecipeControllerTests : IDisposable
{
    private readonly RecipeController _recipeController;
    private readonly UserService _userService;
    private readonly ISessionFactory _testDatabaseFactory;
    private readonly RecipeService _recipeService;

    public RecipeControllerTests()
    {
        _testDatabaseFactory = Tests.CreateTestDatabaseFactory();
        _userService = new UserService(new UserRepository(_testDatabaseFactory));
        _recipeService = new RecipeService(new RecipeRepository(_testDatabaseFactory));
        _recipeController = new RecipeController(_recipeService, null!);
    }

    public void Dispose()
    {
        Tests.DisposeTestDatabase(_testDatabaseFactory);
    }

    [Fact]
    public void CanUploadRecipeImage()
    {
        // ARRANGE
        const string folderPath = "wwwroot/images/recipes";
        const string base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAFCAIAAAAVLyF7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA0SURBVBhXhcpBCgAwDALB/v/T1qKIBEL3EEbISQCs3R68DdZm/oyEYZb5btRIn281rAngAmE2d4kg2D28AAAAAElFTkSuQmCC";
        if (Directory.Exists(folderPath))
        {
            Directory.Delete(folderPath, true);
        }
        Directory.CreateDirectory(folderPath);

        // ACT
        var result = _recipeController.UploadRecipeImage(base64Image);

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
        const string folderPath = "wwwroot/images/recipes";
        if (Directory.Exists(folderPath))
        {
            Directory.Delete(folderPath, true);
        }
        Directory.CreateDirectory(folderPath);
        
        // ACT
        var result = _recipeController.UploadRecipeImage("blabla");
        
        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);
        Assert.Empty(Directory.GetFiles(folderPath));
        
        // CLEAN UP
        Directory.Delete(folderPath, true);
    }

    [Fact]
    public void CanSaveAdventureText()
    {
        // ARRANGE
        _userService.CreateTestUser(); // a user has to exist before CreateExampleRecipes() can be used
        _recipeService.CreateExampleRecipes();
        var adventure = new AdventureModel
        {
            RecipeId = 1,
            Text = "Some adventure text"
        };

        // ACT
        var result = _recipeController.SaveAdventure(adventure);

        // ASSERT
        Assert.IsType<OkResult>(result);
        var recipeInDatabase = _recipeService.GetRecipeById(adventure.RecipeId)!;
        Assert.Contains(adventure.Text, recipeInDatabase.AdventureTexts);
    }

    [Fact]
    public void DontSaveEmptyAdventureText()
    {
        // ARRANGE
        _userService.CreateTestUser(); // a user has to exist before CreateExampleRecipes() can be used
        _recipeService.CreateExampleRecipes();
        var adventure = new AdventureModel
        {
            RecipeId = 1,
            Text = ""
        };

        // ACT
        var result = _recipeController.SaveAdventure(adventure);

        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);
        var errorMessage = (result as BadRequestObjectResult)?.Value?.ToString()!;
        Assert.Equal("Adventure text cannot be empty", errorMessage);
    }
}