using API.Controllers;
using API.Models;
using DataAccess.Repository;
using Contracts.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NHibernate;
using NSubstitute;
using Services;
using Xunit;

namespace Tests.ApiTests;

[Collection("TestDatabase")]
public class RecipeControllerTests : IDisposable
{
    private readonly RecipeController _recipeController;
    private readonly UserService _userService;
    private readonly ISessionFactory _testDatabaseFactory;
    private readonly Dictionary<string,int> _authTokens;
    private readonly RecipeService _recipeService;
    private const string RecipePicturesFolderPath = "wwwroot/images/recipes";
    private const string SomeBase64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAFCAIAAAAVLyF7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA0SURBVBhXhcpBCgAwDALB/v/T1qKIBEL3EEbISQCs3R68DdZm/oyEYZb5btRIn281rAngAmE2d4kg2D28AAAAAElFTkSuQmCC";

    public RecipeControllerTests()
    {
        _testDatabaseFactory = Tests.CreateTestDatabaseFactory();
        _userService = new UserService(new UserRepository(_testDatabaseFactory));
        _authTokens = new Dictionary<string, int>();
        _recipeService = new RecipeService(new RecipeRepository(_testDatabaseFactory));

        var httpContextMock = Substitute.For<HttpContext>();
        httpContextMock.Request.Cookies["auth-token"].Returns(_ => _authTokens.SingleOrDefault().Key);

        _recipeController = new RecipeController(_recipeService, null!, _authTokens)
        {
            ControllerContext = new ControllerContext { HttpContext = httpContextMock }
        };
    }

    public void Dispose()
    {
        Tests.DisposeTestDatabase(_testDatabaseFactory);
        try
        {
            Directory.Delete(RecipePicturesFolderPath, true);
        }
        catch (DirectoryNotFoundException) {}
    }

    [Fact]
    public void CanUploadRecipeImage()
    {
        // ARRANGE
        CreateRecipeImagesFolder();

        // ACT
        var result = _recipeController.UploadRecipeImage(SomeBase64Image);

        // ASSERT
        Assert.IsType<OkObjectResult>(result);
        var filesInFolder = Directory.GetFiles(RecipePicturesFolderPath);
        Assert.Single(filesInFolder);
        var returnedFileName = (result as OkObjectResult)!.Value!.ToString()!;
        Assert.Contains(returnedFileName, filesInFolder.Single());
    }

    [Fact]
    public void DontSaveBadBase64Image()
    {
        // ARRANGE
        CreateRecipeImagesFolder();

        // ACT
        var result = _recipeController.UploadRecipeImage("blabla");
        
        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);
        Assert.Empty(Directory.GetFiles(RecipePicturesFolderPath));
    }

    [Fact]
    public void CanCreateRecipeWithImage()
    {
        // ARRANGE
        CreateRecipeImagesFolder();
        _userService.CreateTestUser();
        _authTokens.Add(CryptoService.GenerateToken(), 1);
        var recipe = CreateCreateRecipeModel();

        // ACT
        var result = _recipeController.CreateRecipe(recipe);

        // ASSERT
        Assert.IsType<CreatedAtActionResult>(result);
        var recipeInDatabase = _recipeService.GetAllRecipes().Single();
        Assert.Equal(recipe.Name, recipeInDatabase.Name);
        Assert.Equal(recipe.PrepTime, recipeInDatabase.PrepTime);
        Assert.Equal(recipe.CookingTime, recipeInDatabase.CookingTime);
        Assert.Equal(recipe.Difficulty, recipeInDatabase.Difficulty);
        Assert.Equal(recipe.Description, recipeInDatabase.Description);
        Assert.Equal(recipe.InstructionText, recipeInDatabase.InstructionText);
        Assert.Equal(recipe.Categories.Select(Enum.Parse<RecipeCategory>), recipeInDatabase.Categories);
        Assert.Equal(recipe.Ingredients.First().IngredientName, recipeInDatabase.Ingredients.First().Ingredient.Name);
        Assert.Equal(recipe.Ingredients.First().Quantity, recipeInDatabase.Ingredients.First().Quantity);
        Assert.Equal(recipe.Ingredients.First().UnitOfMeasure, recipeInDatabase.Ingredients.First().UnitOfMeasure);

        var filesInFolder = Directory.GetFiles(RecipePicturesFolderPath);
        Assert.Single(filesInFolder);
        Assert.NotEmpty(recipeInDatabase.PictureUrl);
        Assert.Contains(recipeInDatabase.PictureUrl, filesInFolder.Single());
    }

    [Fact]
    public void DontCreateRecipeWhenNotLoggedIn()
    {
        // ARRANGE
        var recipe = CreateCreateRecipeModel();
        
        // ACT
        var result = _recipeController.CreateRecipe(recipe);
        
        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);
        var message = (result as BadRequestObjectResult)!.Value!.ToString()!;
        Assert.Equal("You have to be logged in to create a recipe", message);
    }

    [Fact]
    public void DontCreateRecipeWithBadBase64Image()
    {
        // ARRANGE
        CreateRecipeImagesFolder();
        _userService.CreateTestUser();
        _authTokens.Add(CryptoService.GenerateToken(), 1);
        var recipe = CreateCreateRecipeModel(image: "blabla");
        
        // ACT
        var result = _recipeController.CreateRecipe(recipe);
        
        // ASSERT
        Assert.IsType<BadRequestObjectResult>(result);
        var message = (result as BadRequestObjectResult)!.Value!.ToString()!;
        Assert.Equal("Invalid base64 image.", message);
    }

    private static void CreateRecipeImagesFolder()
    {
        if (Directory.Exists(RecipePicturesFolderPath))
        {
            Directory.Delete(RecipePicturesFolderPath, true);
        }

        Directory.CreateDirectory(RecipePicturesFolderPath);
    }

    private static CreateRecipeModel CreateCreateRecipeModel(string image = SomeBase64Image)
        => new()
        {
            Name = "Test recipe",
            Picture = image,
            PrepTime = 1,
            CookingTime = 2,
            Difficulty = 50,
            Description = "Test description",
            InstructionText = "Test instruction text",
            Categories = new [] { "American", "Burger" },
            Ingredients = new []
            {
                new RecipeIngredientModel
                {
                    IngredientName = "Test ingredient",
                    Quantity = Math.PI,
                    UnitOfMeasure = "Tests"
                }
            }
        };

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