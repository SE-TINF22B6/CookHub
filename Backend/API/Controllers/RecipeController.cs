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

    public RecipeController(RecipeService recipeService)
    {
        _recipeService = recipeService;
    }
    
    /// <summary>
    /// Gets a recipe by ID
    /// </summary>
    [HttpGet("{id}")]
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
}