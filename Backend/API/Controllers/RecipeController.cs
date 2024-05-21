using API.Models;
using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace API.Controllers;


/// <summary>
/// Class that defines api endpoints for recipes
/// </summary>
[ApiController]
[Route("[controller]")]
public class RecipeController: ControllerBase
{
    private readonly RecipeService _recipeService;
    private readonly AdventurizeService _adventurizeService;

    public RecipeController(RecipeService recipeService, AdventurizeService adventurizeService)
    {
        _recipeService = recipeService;
        _adventurizeService = adventurizeService;
    }
    
    /// <summary>
    /// Gets a List with all recipes
    /// </summary>
    [HttpGet]
    public ActionResult<IEnumerable<Recipe>> GetAllIngredients()
    {
        var ingredients = _recipeService.GetAllRecipes();
        return Ok(ingredients);
    }
    
    /// <summary>
    /// Gets a recipe by ID
    /// </summary>
    [HttpGet("{id:int}")]
    public IActionResult GetRecipe(int? id)
    {
        if (id == null)
        {
            return BadRequest("ID cannot be null.");
        }

        var recipe = _recipeService.GetRecipeById(id.Value);
    
        if (recipe == null)
        {
            return NotFound("Recipe not found.");
        }

        return Ok(recipe);
    }
    
    /// <summary>
    /// Gets recipes by search term in their name
    /// </summary>
    [HttpGet("byname/{name}")]
    public IActionResult GetRecipeByName(string name)
    {
        var recipes = _recipeService.GetRecipesByName(name);
        return Ok(recipes);
    }

    /// <summary>
    /// Gets recipe by Ingredient
    /// </summary>
    [HttpGet("byingredient")]
    public IActionResult GetRecipesByIngredients([FromQuery] List<string> ingredients)
    {
        var recipes = _recipeService.GetRecipesByIngredients(ingredients);
        return Ok(recipes);
    }

    
    [HttpGet("adventurize/{id:int}")]
    public async Task<IActionResult> AdventurizeRecipe(int id)
    {
        var recipe = _recipeService.GetRecipeById(id);

        if (recipe == null)
        {
            return NotFound("Recipe not found.");
        }
        
        var (success, message) = await _adventurizeService.TryCreateAdventureTextAsync(recipe.ToString());

        return success ? Ok(message) : Problem(message);
    }
    
    /// <summary>
    /// Create new recipe
    /// </summary>
    [HttpPost]
    public IActionResult CreateRecipe(Recipe recipe)
    {
        if (string.IsNullOrWhiteSpace(recipe.Name))
        {
            return BadRequest("Recipe name is required.");
        }
        _recipeService.CreateRecipe(recipe);
        
        return CreatedAtAction(nameof(GetRecipe), new { id = recipe.Id }, recipe);
    }

    /// <summary>
    /// Deletes Recipe by ID
    /// </summary>
    [HttpDelete("{id}")]
    public IActionResult DeleteRecipe(int id)
    {
        try
        {
            _recipeService.DeleteRecipe(id);
            return Ok("Recipe successfully deleted");
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(ex.Message);
        }
    }

    /// <summary>
    /// Gets Top Recipes
    /// </summary>
    [HttpGet("top/{count:int}")]
    public IActionResult GetTopRecipes(int count)
        => Ok(_recipeService.GetTopRecipes(count));
    
    /// <summary>
    /// Gets number of likes
    /// </summary>
    [HttpGet("{id}/likes/count")]
    public IActionResult GetLikesCount(int id)
    {
        var recipe = _recipeService.GetRecipeById(id);

        if (recipe == null)
        {
            return NotFound("Recipe not found.");
        }

        var likesCount = recipe.LikedBy.Count;
        return Ok(likesCount);
    }
    

    /// <summary>
    /// Uploads an image to a recipe
    /// </summary>
    [HttpPost("upload-image")]
    public IActionResult UploadRecipeImage([FromBody] string base64Image)
    {
        var success = RecipeService.TrySaveRecipeImage(base64Image, out var fileName);
        return success ? Ok(fileName) : BadRequest("Invalid base64 image.");
    }

    [HttpPost("adventurize")]
    public IActionResult SaveAdventure([FromBody] AdventureModel adventure)
    {
        var success = _recipeService.TrySaveAdventure(adventure.RecipeId, adventure.Text, out var errorMessage);
        return success ? Ok() : BadRequest(errorMessage);
    }
}